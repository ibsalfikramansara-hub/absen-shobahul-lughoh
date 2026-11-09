// Fungsi Menyimpan Catatan Wali Kelas
function simpanCatatanWali() {
    const isiCatatan = document.getElementById('inputCatatanWali').value;
    
    if (isiCatatan.trim() === '') {
        alert('Harap isi catatan terlebih dahulu!');
        return;
    }

    // Simpan ke localStorage agar tidak hilang saat halaman di-refresh
    localStorage.setItem('catatanWaliKelas', isiCatatan);
    
    // Perbarui teks yang akan dicetak
    document.getElementById('tampilCatatanPrint').innerText = isiCatatan;

    alert('Catatan Wali Kelas berhasil disimpan!');
}

// Muat catatan otomatis saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", function() {
    const savedCatatan = localStorage.getItem('catatanWaliKelas');
    if (savedCatatan) {
        if(document.getElementById('inputCatatanWali')) {
            document.getElementById('inputCatatanWali').value = savedCatatan;
        }
        if(document.getElementById('tampilCatatanPrint')) {
            document.getElementById('tampilCatatanPrint').innerText = savedCatatan;
        }
    }
});