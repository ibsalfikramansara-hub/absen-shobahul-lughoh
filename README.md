# 📋 Aplikasi Presensi Shobahul Lughoh & English Morning
### MAN 1 Jepara / Alfikra (Production-Ready Edition)

Aplikasi sistem presensi kegiatan bahasa pagi (**Shobahul Lughoh & English Morning**) berbasis web untuk 4 peran pengguna: **Admin / TU**, **Koordinator Program**, **Tentor / Guru Pendamping**, dan **Wali Kelas**.

Dilengkapi dengan konfigurasi **One-Click Deployment ke GitHub & Vercel (100% Gratis Selamanya Tanpa Kartu Kredit)**, auto-migration database serverless, serta skrip otomatisasi Windows `.bat`.

---

## 🚀 One-Click Deployment ke Vercel (Gratis Selamanya)

Aplikasi ini sudah dikonfigurasi penuh agar kompatibel dengan runtime Serverless Vercel:

### Langkah Mudah 1-Klik:
1. Jalankan skrip **`upload_ke_github.bat`** (atau menu **[3]** di `deploy.bat`).
2. Masukkan URL repositori GitHub Anda jika baru pertama kali. Proyek akan langsung terunggah ke branch `main`.
3. Buka **[https://vercel.com](https://vercel.com)** dan login menggunakan akun GitHub Anda (Free Hobby Tier).
4. Klik tombol **"Add New..."** &rarr; **"Project"**, lalu pilih repositori `absen-shobahul-lughoh`.
5. Klik **"Deploy"** (tanpa perlu ubah pengaturan apapun, `vercel.json` sudah mengatur segalanya secara otomatis).
6. Dalam 30 detik, aplikasi langsung aktif di domain:
   👉 **`https://nama-proyek-anda.vercel.app`**
7. Setiap kali Anda melakukan git push di masa depan, Vercel akan otomatis melakukan auto-deploy perubahan Anda!

---

## ⚡ Skrip Otomatisasi Windows 1-Klik (Root Folder)

Tersedia berkas batch otomatis agar Anda tidak perlu mengetik perintah terminal:

| File Skrip | Deskripsi & Fungsionalitas |
|---|---|
| **`deploy.bat`** | **Pusat Kendali Interaktif Windows:**<br>• `[1]` Menjalankan server lokal (`http://localhost:3000`).<br>• `[2]` Menjalankan automated test suite (17/17 lulus 100%).<br>• `[3]` Mengunggah & auto-deploy ke GitHub & Vercel.<br>• `[4]` Backup/ekspor data ke `initial_data.json`.<br>• `[5]` Menjalankan Cloudflare Quick Tunnel darurat. |
| **`upload_ke_github.bat`** | **One-Click GitHub Sync:**<br>Melakukan `git add -A`, commit otomatis dengan timestamp tanggal & jam, dan push ke branch `main`. Mengaktifkan auto-deploy instan di Vercel. |
| **`online_tunnel.bat`** | **Cloudflare Tunnel Darurat:**<br>Meng-online-kan server lokal ke internet dalam hitungan detik tanpa setup domain/port forwarding. Memberikan URL HTTPS publik aman (`*.trycloudflare.com`) gratis untuk dibuka dari smartphone tentor/siswa. |

---

## 🔑 Akun & Kredensial Pengguna Demo

| Peran | Username | Password | Deskripsi / Hak Akses |
|---|---|---|---|
| **Admin / TU** | `admin` | `admin123` | Kelola data siswa, cetak barcode massal, manajemen akun, pengaturan jam sistem, profil. |
| **Koordinator** | `koordinator` | `koordinator123` | Dashboard capaian keseluruhan, jadwal kegiatan, pembagian kelompok, manajemen tentor, rekap laporan, deteksi pola keterlambatan. |
| **Tentor 1** | `pak riki` | `mutawasihx` | Catat kehadiran cepat (scan/input NISN), verifikasi manual per kelas, rekap harian, riwayat sesi. |
| **Tentor 2** | `bu ifa` | `asasix` | Guru pendamping bahasa pagi. |
| **Tentor 3** | `bu khomsa` | `123456` | Guru pendamping bahasa pagi. |
| **Wali Kelas X E2** | `bu nunuk` | `XE2` | Dashboard kelas X E2 (Sains 1), status harian, catatan wali kelas, cetak rapor bulanan. |
| **Wali Kelas X E3** | `pak hamidun` | `XE3` | Dashboard kelas X E3 (Sains 2). |
| **Wali Kelas X E4** | `miss wilda` | `XE4` | Dashboard kelas X E4 (Bilingual ICT). |
| **Wali Kelas XI F2** | `bu nita` | `X1F2` | Dashboard kelas XI F2 (Sains 1). |
| **Wali Kelas XI F3** | `bu aini` | `X1F3` | Dashboard kelas XI F3 (Sains 2). |
| **Wali Kelas XI F4** | `miss noory` | `X1F4` | Dashboard kelas XI F4 (Bilingual ICT). |

---

## 🛡️ Arsitektur Keamanan & Database Serverless

1. **Storage Writable Serverless**:
   - Di lingkungan Vercel Serverless, database SQLite/JSON otomatis dialihkan ke path writable **`/tmp/db.sqlite3`** atau **`/tmp/sbl_database.json`** sehingga terbebas dari error read-only filesystem.
   - Mendukung fallback dinamis ke `DATABASE_URL` (PostgreSQL / Neon / Supabase).
2. **Auto-Migration Startup**:
   - Saat instance serverless pertama kali di-spin up, berkas `api/index.js` (atau `wsgi.py`) otomatis melakukan pengecekan tabel dan seeding awal dari `initial_data.json` jika belum ada.
3. **Keamanan Host (ALLOWED_HOSTS & CSRF)**:
   - Terproteksi terhadap Host Header Attack & CSRF, mengizinkan: `localhost`, `127.0.0.1`, `*.vercel.app`, dan `*.trycloudflare.com`.
4. **Kompresi & Caching**:
   - `server.js` mengaktifkan kompresi Gzip otomatis untuk teks/kode.
   - `vercel.json` mengonfigurasi caching immutable 1 tahun untuk aset gambar/font dan stale-while-revalidate untuk CSS/JS.
5. **Kebersihan Repositori**:
   - `.gitignore` ketat memastikan database lokal (`*.sqlite3`), virtual environment, cache, dan `.env` tidak pernah bocor ke GitHub publik.

---

## 🧪 Hasil Automated Unit Test Suite

Jalankan pengujian kapan saja dengan perintah:
```bash
npm test
```
Hasil pengujian: **17 dari 17 Pengujian Lulus 100% (Production-Ready)**
- ✅ Integritas Data Siswa (206 siswa dengan NISN 10-digit valid)
- ✅ Validasi 6 Rombel Utama & Penanganan Rombel Baru
- ✅ RBAC Guard & Pemetaan Halaman 4 Peran
- ✅ Algoritma Presensi & Toleransi Waktu (Tepat, Terlambat, Sangat Terlambat)
- ✅ Null-Safety & Error-Handling pada Data Kosong
- ✅ Serverless API Health & Verifikasi Host Security

---

## 📁 Struktur Direktori Proyek

```
Absen Shobahul Lughoh/
├── index.html               # Halaman Login Utama
├── data-siswa.js            # Single Source of Truth (Data Siswa, Akun, Pengaturan, Storage SBL)
├── script.js                # Logika proses login & validasi sesi
├── style.css                # Styling antarmuka login
├── shared-theme.css         # Tema bersama MAN 1 Jepara
├── server.js                # Server mandiri Node.js + Gzip compression + Security
├── deploy.bat               # Pusat Kendali Interaktif Windows (Menu 1-5)
├── upload_ke_github.bat     # Skrip 1-Klik upload GitHub & trigger deploy Vercel
├── online_tunnel.bat        # Skrip darurat Cloudflare Quick Tunnel (HTTPS publik instan)
├── vercel.json              # Konfigurasi Vercel Serverless, Routes, Caching, & Security
├── wsgi.py                  # Adapter WSGI Serverless kompatibel Python runtime
├── initial_data.json        # Data seed bawaan (Akun, Siswa, Kelas, Pengaturan)
├── .env.example             # Contoh panduan environment variables
├── .gitignore               # Aturan proteksi file rahasia & database lokal
├── package.json             # Konfigurasi NPM package & skrip test
│
├── api/                     # Serverless API Endpoints (Vercel Functions)
│   └── index.js             # API Handler, Health Check, Auto-Migration, & DB Manager
│
├── test/                    # Automated Test Suite
│   └── test_suite.js        # Unit test 17 skenario alur kerja utama
│
├── ADMIN/                   # Modul Peran Admin / Tata Usaha
├── KOORDINATOR/             # Modul Peran Koordinator Program
├── TENTOR/                  # Modul Peran Tentor / Guru Pendamping
└── WALI-KELAS/              # Modul Peran Wali Kelas
```
