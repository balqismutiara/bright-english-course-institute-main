<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a local `.env` file from `.env.example` and set your MySQL configuration:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=YOUR_PASSWORD
   DB_NAME=bright_english
   PORT=3000
   HOST=0.0.0.0
   ```
4. Run the app:
   `npm run dev`

## Production / Hosting

1. Install dependencies:
   `npm install`
2. Build the frontend:
   `npm run build`
3. Set production environment variables for MySQL and server port/host.
4. Start the server:
   `npm start`

The server will serve the built frontend from `dist/` in production mode and use environment variables for database connection.

## Deploy ke Hostinger Web App Hosting

Berikut langkah yang disarankan untuk deploy project ini ke Hostinger Web App Hosting.

1. Pastikan paket Hostinger Anda mendukung Node.js / Web App Hosting.
2. Buat database MySQL di Hostinger:
   - Buka hPanel > Databases > MySQL Databases
   - Buat database, user, dan password
   - Catat detail koneksi MySQL Anda
3. Siapkan environment variables di panel Hostinger:
   - `DB_HOST` = host MySQL Anda
   - `DB_PORT` = `3306`
   - `DB_USER` = username MySQL
   - `DB_PASSWORD` = password MySQL
   - `DB_NAME` = nama database MySQL
   - `PORT` = port yang diberikan Hostinger, atau `3000` jika diizinkan
   - `HOST` = `0.0.0.0`
4. Upload project Anda ke Hostinger atau hubungkan repository Git.
5. Jalankan perintah di terminal hosting:
   - `npm install`
   - `npm run build`
   - `npm start`
6. Pastikan start command yang dikonfigurasi di Hostinger adalah:
   - `npm start`
7. Setelah deployment berhasil, buka domain Anda dan cek endpoint:
   - `/api/health`
   - `/api/admin/registrations`

Catatan penting:
- Jangan gunakan `npm run dev` di production.
- Server ini sudah dibuat agar berjalan di `0.0.0.0` saat `HOST=0.0.0.0`.
- Jika Hostinger tidak menyediakan MySQL, gunakan provider MySQL eksternal seperti ClearDB, PlanetScale, AWS RDS, atau database MySQL lain.

## Migrasi data dari database lama ke MySQL Hostinger

Jika Anda sudah punya database lama (misalnya PostgreSQL) dan ingin tetap mempertahankan data, ikuti langkah berikut.

1. Backup database lama terlebih dahulu.
2. Buat database MySQL baru di Hostinger.
3. Buat tabel yang dibutuhkan di MySQL dengan struktur yang sama:
   - `students`
   - `accounts`
   - `reports`
   - tabel lain yang dipakai aplikasi
4. Ekspor data dari database lama.
   - Jika database lama PostgreSQL, contoh:
     - `pg_dump -h localhost -U postgres -d bright_english --schema-only > schema.sql`
     - `pg_dump -h localhost -U postgres -d bright_english --data-only > data.sql`
5. Impor data ke MySQL.
   - Pilihan paling aman: gunakan tool migrasi seperti `pgloader`.
   - Contoh sederhana dengan `pgloader`:
     `pgloader postgresql://user:password@localhost/bright_english mysql://user:password@host:3306/bright_english`
   - Jika hanya data kecil, Anda bisa export ke CSV dari PostgreSQL lalu import ke MySQL lewat phpMyAdmin atau CLI.
6. Perbarui environment variables di Hostinger dengan kredensial MySQL baru.
7. Jalankan ulang aplikasi dan uji endpoint yang mengakses data.

Catatan migrasi:
- Data tidak akan otomatis pindah hanya karena Anda mengganti kode. Anda harus melakukan migrasi database secara terpisah.
- Pastikan kolom, tipe data, dan nama tabel cocok dengan yang dipakai aplikasi.
- Jika ada error selama import, cek tipe kolom seperti `TEXT`, `DATETIME`, `INT`, dan `AUTO_INCREMENT`.
