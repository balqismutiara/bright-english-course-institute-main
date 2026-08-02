import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { createServer as createViteServer } from "vite";
import { pool } from "./server/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/message", (_req, res) => {
    res.json({ message: "" });
  });

  app.post("/api/register", async (req, res) => {
    const { student, account } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(account.password, 10);

      const [studentResult]: any = await pool.query(
        `INSERT INTO students
         (name, email, phone, birth_date, age, address, parent_name, parent_phone, level, schedule, time_slot)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          student.name,
          student.email,
          student.phone,
          student.birthDate,
          student.age,
          student.address,
          student.parentName,
          student.parentPhone,
          student.level,
          student.schedule,
          student.timeSlot
        ]
      );

      const studentId = studentResult.insertId;

      await pool.query(
        `INSERT INTO accounts (student_id, username, password, role)
         VALUES (?, ?, ?, ?)`,
        [studentId, account.username, hashedPassword, "student"]
      );

      res.json({
        success: true,
        message: "Registration saved to database"
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal menyimpan data ke database"
      });
    }
  });

  app.post("/api/admin/create-teacher", async (req, res) => {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [teacherResult]: any = await pool.query(
        `INSERT INTO teachers
         (name, email, phone, specialization, bio, photo_url, is_profile_complete)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["", "", "", "", "", "", false]
      );

      const teacherId = teacherResult.insertId;

      await pool.query(
        `INSERT INTO accounts (teacher_id, username, password, role)
         VALUES (?, ?, ?, ?)`,
        [teacherId, username, hashedPassword, "teacher"]
      );

      res.json({
        success: true,
        message: "Akun guru berhasil dibuat",
        teacherId
      });
    } catch (error) {
      console.error("Create teacher error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal membuat akun guru"
      });
    }
  });

  app.get("/api/report/me", async (req, res) => {
    const studentId = req.query.studentId;

    try {
      const [rows]: any = await pool.query(
        `SELECT * FROM reports WHERE student_id = ? ORDER BY updated_at DESC LIMIT 1`,
        [studentId]
      );

      if (rows.length === 0) {
        return res.json({ success: true, report: null });
      }

      res.json({ success: true, report: rows[0] });
    } catch (error) {
      console.error("Get report error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil laporan siswa"
      });
    }
  });

  app.get("/api/student/profile", async (req, res) => {
    const studentId = req.query.studentId;

    try {
      const [rows]: any = await pool.query(
        `SELECT * FROM students WHERE id = ? LIMIT 1`,
        [studentId]
      );

      if (rows.length === 0) {
        return res.json({ success: true, profile: null });
      }

      res.json({ success: true, profile: rows[0] });
    } catch (error) {
      console.error("Get student profile error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil profil siswa"
      });
    }
  });

  app.put("/api/student/profile", async (req, res) => {
    const {
      id,
      name,
      email,
      phone,
      birth_date,
      age,
      address,
      parent_name,
      parent_phone,
      level,
      schedule,
      time_slot
    } = req.body;

    try {
      await pool.query(
        `UPDATE students
         SET name = ?,
             email = ?,
             phone = ?,
             birth_date = ?,
             age = ?,
             address = ?,
             parent_name = ?,
             parent_phone = ?,
             level = ?,
             schedule = ?,
             time_slot = ?
         WHERE id = ?`,
        [
          name,
          email,
          phone,
          birth_date,
          age,
          address,
          parent_name,
          parent_phone,
          level,
          schedule,
          time_slot,
          id
        ]
      );

      res.json({
        success: true,
        message: "Profil berhasil diperbarui"
      });
    } catch (error) {
      console.error("Update student profile error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui profil siswa"
      });
    }
  });

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const [rows]: any = await pool.query(
        `SELECT * FROM accounts WHERE username = ? LIMIT 1`,
        [username]
      );

      if (rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Username atau password salah"
        });
      }

      const account = rows[0];
      const isMatch = await bcrypt.compare(password, account.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Username atau password salah"
        });
      }

      res.json({
        success: true,
        message: "Login berhasil",
        account: {
          id: account.id,
          student_id: account.student_id,
          username: account.username,
          role: account.role
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server"
      });
    }
  });

  app.get("/api/admin/registrations", async (_req, res) => {
    try {
      const [rows]: any = await pool.query(
        `SELECT * FROM students ORDER BY id DESC`
      );

      res.json({
        success: true,
        registrations: rows
      });
    } catch (error) {
      console.error("Get students as registrations error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data pendaftar"
      });
    }
  });

  app.delete("/api/admin/registrations/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await pool.query(`DELETE FROM students WHERE id = ?`, [id]);

      res.json({
        success: true,
        message: "Pendaftar berhasil dihapus"
      });
    } catch (error) {
      console.error("Delete student error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus pendaftar"
      });
    }
  });

  app.put("/api/admin/registrations/:id", async (req, res) => {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      birth_date,
      age,
      address,
      parent_name,
      parent_phone,
      level,
      schedule,
      time_slot
    } = req.body;

    try {
      await pool.query(
        `UPDATE students
         SET name = ?,
             email = ?,
             phone = ?,
             birth_date = ?,
             age = ?,
             address = ?,
             parent_name = ?,
             parent_phone = ?,
             level = ?,
             schedule = ?,
             time_slot = ?
         WHERE id = ?`,
        [
          name,
          email,
          phone,
          birth_date,
          age,
          address,
          parent_name,
          parent_phone,
          level,
          schedule,
          time_slot,
          id
        ]
      );

      res.json({
        success: true,
        message: "Pendaftar berhasil diperbarui"
      });
    } catch (error) {
      console.error("Update student error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui pendaftar"
      });
    }
  });

  app.get("/api/admin/accounts", async (_req, res) => {
    try {
      const [rows]: any = await pool.query(
        `SELECT id, username, password, role
         FROM accounts
         ORDER BY id DESC`
      );

      res.json({
        success: true,
        accounts: rows
      });
    } catch (error) {
      console.error("Get accounts error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data pengguna"
      });
    }
  });

  app.delete("/api/admin/accounts/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await pool.query(`DELETE FROM accounts WHERE id = ?`, [id]);

      res.json({
        success: true,
        message: "Pengguna berhasil dihapus"
      });
    } catch (error) {
      console.error("Delete account error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus pengguna"
      });
    }
  });

  app.put("/api/admin/accounts/:id", async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;

    try {
      if (password && password.trim() !== "") {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
          `UPDATE accounts
           SET username = ?,
               password = ?,
               role = ?
           WHERE id = ?`,
          [username, hashedPassword, role, id]
        );
      } else {
        await pool.query(
          `UPDATE accounts
           SET username = ?,
               role = ?
           WHERE id = ?`,
          [username, role, id]
        );
      }

      res.json({
        success: true,
        message: "Pengguna berhasil diperbarui"
      });
    } catch (error) {
      console.error("Update account error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui pengguna"
      });
    }
  });

  app.get("/api/admin/students", async (_req, res) => {
    try {
      const [rows]: any = await pool.query(
        `SELECT id, name FROM students ORDER BY name ASC`
      );

      res.json({
        success: true,
        students: rows
      });
    } catch (error) {
      console.error("Get students error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data siswa"
      });
    }
  });

  app.post("/api/admin/reports", async (req, res) => {
    const {
      student_id,
      student_name,
      reading,
      writing,
      speaking,
      listening,
      attendance,
      feedback
    } = req.body;

    try {
      await pool.query(
        `INSERT INTO reports
         (student_id, student_name, reading, writing, speaking, listening, attendance, feedback, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [
          student_id,
          student_name,
          reading,
          writing,
          speaking,
          listening,
          attendance,
          feedback
        ]
      );

      res.json({
        success: true,
        message: "Nilai siswa berhasil disimpan"
      });
    } catch (error) {
      console.error("Create report error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal menyimpan nilai siswa"
      });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const clientDist = path.resolve(process.cwd(), "dist");
    app.use(express.static(clientDist));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
