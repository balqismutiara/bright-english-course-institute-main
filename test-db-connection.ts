import 'dotenv/config';
import mysql from 'mysql2/promise';

const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnv = requiredEnv.filter((key) => process.env[key] === undefined);

if (missingEnv.length > 0) {
  console.error(`Environment belum lengkap. Yang belum diisi: ${missingEnv.join(', ')}`);
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 AS test');
    console.log('Koneksi database berhasil.');
    console.log('Hasil query:', rows);
  } catch (error) {
    console.error('Koneksi database gagal:');
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();
