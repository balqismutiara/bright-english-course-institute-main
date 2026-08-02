import 'dotenv/config';
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcryptjs';
import { pool } from './server/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT ?? 3000);

  app.use(express.json());

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/message", (req, res) => {
  res.json({
    message: ""
  });
});

app.post("/api/register", async (req, res) => {
  const { student, account } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(account.password, 10);

    const [studentResult] = await pool.query(
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
    ) as any;

    const studentId = studentResult.insertId;

    await pool.query(
      `INSERT INTO accounts (student_id, username, password)
       VALUES (?, ?, ?)`,
      [
        studentId,
        account.username,
        hashedPassword
      ]
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

    const [teacherResult] = await pool.query(
      `INSERT INTO teachers (name, email, phone, specialization, bio, photo_url, is_profile_complete)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['', '', '', '', '', '', false]
    ) as any;

    const teacherId = teacherResult.insertId;

    await pool.query(
      `INSERT INTO accounts (teacher_id, username, password, role)
       VALUES (?, ?, ?, ?)`,
      [teacherId, username, hashedPassword, 'teacher']
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

app.get('/api/report/me', async (req, res) => {
  const studentId = req.query.studentId;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM reports WHERE student_id = ? ORDER BY updated_at DESC LIMIT 1`,
      [studentId]
    ) as any;

    if (rows.length === 0) {
      return res.json({
        success: true,
        report: null
      });
    }

    res.json({
      success: true,
      report: rows[0]
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil laporan siswa'
    });
  }
});

app.get('/api/student/profile', async (req, res) => {
  const studentId = req.query.studentId;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM students WHERE id = ? LIMIT 1`,
      [studentId]
    ) as any;

    if (rows.length === 0) {
      return res.json({
        success: true,
        profile: null
      });
    }

    res.json({
      success: true,
      profile: rows[0]
    });
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil profil siswa'
    });
  }
});

app.put('/api/student/profile', async (req, res) => {
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
      message: 'Profil berhasil diperbarui'
    });
  } catch (error) {
    console.error('Update student profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui profil siswa'
    });
  }
});



app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM accounts WHERE username = ? LIMIT 1`,
      [username]
    ) as any;

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

app.get('/api/admin/registrations', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM students ORDER BY id DESC`
    ) as any;

    res.json({
      success: true,
      registrations: rows
    });
  } catch (error) {
    console.error('Get students as registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data pendaftar'
    });
  }
});

app.delete('/api/admin/registrations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM students WHERE id = ?`, [id]);

    res.json({
      success: true,
      message: 'Pendaftar berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus pendaftar'
    });
  }
});

app.put('/api/admin/registrations/:id', async (req, res) => {
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
      message: 'Pendaftar berhasil diperbarui'
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui pendaftar'
    });
  }
});

app.get('/api/admin/accounts', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, username, password, role
       FROM accounts
       ORDER BY id DESC`
    ) as any;

    res.json({
      success: true,
      accounts: rows
    });
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data pengguna'
    });
  }
});


app.delete('/api/admin/accounts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM accounts WHERE id = ?`, [id]);

    res.json({
      success: true,
      message: 'Pengguna berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus pengguna'
    });
  }
});

app.put('/api/admin/accounts/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  try {
    let query = '';
    let values: any[] = [];

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);

      query = `
        UPDATE accounts
        SET username = ?,
            password = ?,
            role = ?
        WHERE id = ?
      `;

      values = [username, hashedPassword, role, id];
    } else {
      query = `
        UPDATE accounts
        SET username = ?,
            role = ?
        WHERE id = ?
      `;

      values = [username, role, id];
    }

    await pool.query(query, values);

    res.json({
      success: true,
      message: 'Pengguna berhasil diperbarui'
    });
  } catch (error) {
    console.error('Update account error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui pengguna'
    });
  }
});

app.get('/api/admin/students', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name FROM students ORDER BY name ASC`
    ) as any;

    res.json({
      success: true,
      students: rows
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data siswa'
    });
  }
});

app.post('/api/admin/reports', async (req, res) => {
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
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
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
      message: 'Nilai siswa berhasil disimpan'
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal menyimpan nilai siswa'
    });
  }
});


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
  }

  // SPA fallback for client-side routes (e.g. /about, /services)
  app.get(/^(?!\/api\/).*/, (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }

    const indexPath = process.env.NODE_ENV === 'production'
      ? path.join(__dirname, 'dist', 'index.html')
      : path.join(__dirname, 'index.html');

    res.sendFile(indexPath);
  });

  const HOST = process.env.HOST ?? "0.0.0.0";
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
