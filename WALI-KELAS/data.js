// ============================================================================
// data.js — kompatibilitas untuk halaman WALI-KELAS
// ----------------------------------------------------------------------------
// Data siswa TIDAK lagi disimpan di file ini. Sumber tunggal ada di
// ../data-siswa.js yang dimuat SEBELUM file ini pada setiap halaman.
// File ini hanya menyediakan alias STUDENTS agar kode lama tetap berjalan.
// ============================================================================
if (typeof DATA_SISWA === 'undefined') {
    console.error('data.js: ../data-siswa.js belum dimuat. Tambahkan <script src="../data-siswa.js"></script> sebelum data.js.');
}
const STUDENTS = (typeof DATA_SISWA !== 'undefined') ? DATA_SISWA : [];
