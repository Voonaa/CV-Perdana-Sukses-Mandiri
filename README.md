# CV Perdana Sukses Mandiri - Company Profile

Website profil perusahaan untuk CV Perdana Sukses Mandiri, menampilkan solusi industri presisi seperti videotron, lampu surya, dan infrastruktur kantor.

Website ini menggunakan arsitektur **Fullstack** dengan React di bagian frontend dan Express di bagian backend, serta menggunakan database **MySQL**.

## Teknologi yang Digunakan
- **Frontend**: React 19, Vite, Tailwind CSS v4, Motion
- **Backend**: Node.js, Express
- **Database**: MySQL (via Laragon)

## Cara Menjalankan Project

### Prasyarat
1.  **Node.js** terinstal di komputer Anda.
2.  **Laragon** (atau server MySQL lokal lainnya) sedang berjalan.

### Langkah-langkah

1.  **Pastikan Database Siap**:
    *   Buat database bernama `CVperdana` di MySQL.
    *   Buat tabel `contacts` dengan struktur berikut (atau jalankan perintah SQL):
        ```sql
        CREATE TABLE contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          inquiry_type VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ```

2.  **Instalasi Dependensi**:
    Buka terminal di folder project ini dan jalankan:
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment**:
    Pastikan file `.env` sudah ada dan berisi kredensial database yang benar:
    ```env
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD=""
    DB_NAME="CVperdana"
    ```

4.  **Jalankan Frontend**:
    Di terminal pertama, jalankan perintah berikut untuk membuka website di browser:
    ```bash
    npm run dev
    ```
    Website akan dapat diakses di `http://localhost:3000/`.

5.  **Jalankan Backend (API)**:
    Buka terminal baru (atau tab baru) di folder yang sama, lalu jalankan:
    ```bash
    npx tsx server.ts
    ```
    Server backend akan berjalan di port 5000 dan menangani pengiriman form kontak.

## Catatan
- Website ini tidak lagi menggunakan API Gemini. Semua referensi ke Gemini telah dihapus.
- Jika Anda ingin mengubah tampilan atau menambahkan halaman baru, Anda dapat memodifikasi file di dalam folder `src/`.
