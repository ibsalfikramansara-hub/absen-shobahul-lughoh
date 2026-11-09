# 📋 Aplikasi Presensi Shobahul Lughoh & English Morning
### MAN 1 Jepara / Alfikra

Aplikasi sistem presensi kegiatan bahasa pagi (Shobahul Lughoh & English Morning) berbasis web untuk 4 peran pengguna: **Admin/TU**, **Koordinator Program**, **Tentor/Guru Pendamping**, dan **Wali Kelas**.

---

## 🚀 Cara Menjalankan (Deploy Lokal)

### Cara 1: Menggunakan File Batch (Paling Praktis)
1. Cukup klik ganda (double-click) file **`deploy.bat`**.
2. Server lokal otomatis berjalan dan browser default Anda akan langsung terbuka di alamat:
   **`http://localhost:3000`**

### Cara 2: Menggunakan Terminal / Node.js
```bash
node server.js
```
atau
```bash
npm start
```

---

## 🔑 Akun & Kredensial Demo

| Peran | Username | Password | Deskripsi / Hak Akses |
|---|---|---|---|
| **Admin / TU** | `admin` | `admin123` | Kelola data siswa, cetak barcode kartu, manajemen akun, pengaturan jam sistem, profil. |
| **Koordinator** | `koordinator` | `koordinator123` | Dashboard capaian keseluruhan, jadwal kegiatan, pembagian kelompok, manajemen tentor, rekap laporan, deteksi pola. |
| **Tentor** | `pak riki` | `mutawasihx` | Catat kehadiran cepat (scan/input NISN), verifikasi manual per kelas, rekap harian, riwayat sesi. |
| **Tentor 2** | `bu ifa` | `asasix` | Guru pendamping bahasa pagi. |
| **Tentor 3** | `bu khomsa` | `123456` | Guru pendamping bahasa pagi. |
| **Wali Kelas X E2** | `bu nunuk` | `XE2` | Dashboard kelas X E2 (Sains 1), status presensi hari ini, catatan wali kelas, cetak rapor presensi bulanan. |
| **Wali Kelas X E3** | `pak hamidun` | `XE3` | Dashboard kelas X E3 (Sains 2). |
| **Wali Kelas X E4** | `miss wilda` | `XE4` | Dashboard kelas X E4 (Bilingual ICT). |
| **Wali Kelas XI F2** | `bu nita` | `X1F2` | Dashboard kelas XI F2 (Sains 1). |
| **Wali Kelas XI F3** | `bu aini` | `X1F3` | Dashboard kelas XI F3 (Sains 2). |
| **Wali Kelas XI F4** | `miss noory` | `X1F4` | Dashboard kelas XI F4 (Bilingual ICT). |

---

## 📁 Struktur Direktori Proyek

```
Absen Shobahul Lughoh/
├── index.html               # Halaman Login Utama
├── data-siswa.js            # Single Source of Truth (Data Siswa, Akun, Pengaturan, Storage SBL)
├── script.js                # Logika proses login & validasi sesi
├── style.css                # Styling antarmuka login
├── server.js                # Server lokal mandiri (Zero-dependency Node.js HTTP)
├── deploy.bat               # Skrip 1-klik deploy lokal & auto-open browser
├── package.json             # Konfigurasi npm package
│
├── ADMIN/                   # Modul Peran Admin / Tata Usaha
│   ├── dasbor.html          # Dashboard Utama Admin & Ringkasan Rombel
│   ├── data-siswa.html      # Manajemen Data Siswa (NISN 10 digit, nama, kelas)
│   ├── barcode.html         # Pembuat Barcode Individu
│   ├── cetak-barcode.html   # Cetak Massal Barcode Siswa per Rombel
│   ├── manajemen-akun.html  # Manajemen Akun Pengguna & Hak Akses
│   ├── pengaturan-sistem.html # Atur Jam Kegiatan (05:30-08:00 WIB), Batas Toleransi, Notif WA
│   ├── profil.html          # Pengaturan Profil Admin & Ganti Kata Sandi
│   ├── admin.css            # Stylesheet tema Admin MAN 1 Jepara
│   ├── admin.js             # Logika interaksi manajemen akun
│   ├── pengaturan.js        # Logika simpan pengaturan sistem
│   └── profil.js            # Logika edit profil & ganti kata sandi
│
├── KOORDINATOR/             # Modul Peran Koordinator Program
│   ├── dasboard.html        # Dashboard Capaian Global
│   ├── jadwal.html          # Jadwal Kegiatan Bahasa Pagi
│   ├── kelompok.html        # Pengelompokan Siswa & Tentor
│   ├── manajemen-tentor.html# Pembagian Tugas Tentor
│   ├── rekap-laporan.html   # Rekapitulasi Presensi & Grafik
│   ├── deteksi-pola.html    # Analisis Pola Kehadiran & Siswa Sering Terlambat
│   └── profil.html          # Profil Koordinator
│
├── TENTOR/                  # Modul Peran Tentor / Guru Pendamping
│   ├── dasbor.html          # Dashboard Presensi & Catat Kehadiran Cepat (NISN/Nama)
│   ├── verifikasi.html      # Verifikasi Manual Status Presensi per Kelas
│   ├── rekap-hari-ini.html  # Rekap Presensi Hari Berjalan & Filter Status
│   ├── riwayat-sesi.html    # Riwayat Sesi Tanggal Sebelumnya
│   ├── profil.html          # Profil Akun Tentor
│   └── tentor.css           # Stylesheet tema Tentor
│
└── WALI-KELAS/              # Modul Peran Wali Kelas
    ├── dasbor.html          # Hub & Router Dasbor Wali Kelas
    ├── dasbor-e2.html       # Dashboard Kelas X E2 (Sains 1)
    ├── dasbor-e3.html       # Dashboard Kelas X E3 (Sains 2)
    ├── dasbor-e4.html       # Dashboard Kelas X E4 (Bilingual ICT)
    ├── dasbor-f2.html       # Dashboard Kelas XI F2 (Sains 1)
    ├── dasbor-f3.html       # Dashboard Kelas XI F3 (Sains 2)
    ├── dasbor-f4.html       # Dashboard Kelas XI F4 (Bilingual ICT)
    ├── detail-siswa.html    # Riwayat Kehadiran Siswa & Penilaian Karakter
    ├── unduh-laporan.html   # Ekspor Laporan Bulanan ke CSV / Cetak PDF
    ├── walikelas.css        # Stylesheet modul Wali Kelas
    ├── walikelas.js         # Library helper modul Wali Kelas
    └── data.js              # Backward-compatibility shim
```

---

## ⚙️ Fitur Unggulan

1. **Terintegrasi Satu Sumber Data (`data-siswa.js`)**: Semua data 216 siswa dan 6 rombel tersimpan konsisten dan otomatis tersinkronisasi via `localStorage` antar modul.
2. **Jam Operasional & Toleransi**: Dibatasi 05.30 – 08.00 WIB (dapat disesuaikan oleh Admin di menu Pengaturan Sistem; Admin memiliki hak akses login kapan saja).
3. **Cetak Barcode Otomatis**: Mendukung JsBarcode untuk mencetak stiker/kartu presensi siswa.
4. **Ekspor & Cetak**: Fitur cetak rapi ramah cetak (print CSS) dan ekspor laporan ke format Excel/CSV.

