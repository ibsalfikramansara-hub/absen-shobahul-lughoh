// ============================================================================
// profil.js — Pengelolaan Profil Admin & Ubah Kata Sandi
// ============================================================================
SBL.wajibPeran('Admin');

const sesi = SBL.akunSesi() || {};
const inputNama = document.getElementById('namaLengkap');
const inputUsername = document.getElementById('username');
const inputPeran = document.getElementById('peran');
const inputTerakhir = document.getElementById('terakhirMasuk');
const formProfil = document.getElementById('formProfil');

// Isi data profil saat ini
if (inputNama) inputNama.value = sesi.nama || 'Administrator Sistem';
if (inputUsername) inputUsername.value = sesi.username || 'admin';
if (inputPeran) inputPeran.value = sesi.peran || 'Admin/TU';
if (inputTerakhir) inputTerakhir.value = sessionStorage.getItem('sesiWaktuMasuk') || new Date().toLocaleString('id-ID');

// Toggle lihat password
document.querySelectorAll('.btn-lihat').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const targetInput = document.getElementById(targetId);
        if (targetInput) {
            const isPassword = targetInput.type === 'password';
            targetInput.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? '🙈' : '👁️';
        }
    });
});

// Submit form profil
if (formProfil) {
    formProfil.addEventListener('submit', function (e) {
        e.preventDefault();

        const namaBaru = inputNama.value.trim();
        const usernameBaru = inputUsername.value.trim().toLowerCase();
        const sandiLama = document.getElementById('sandiLama').value;
        const sandiBaru = document.getElementById('sandiBaru').value;
        const sandiUlang = document.getElementById('sandiUlang').value;

        if (!namaBaru || !usernameBaru) {
            alert('Nama dan Username tidak boleh kosong!');
            return;
        }

        const daftar = SBL.daftarAkun();
        const idx = daftar.findIndex(function (a) {
            return String(a.username).toLowerCase() === String(sesi.username).toLowerCase();
        });

        if (idx === -1) {
            alert('Akun admin tidak ditemukan di database.');
            return;
        }

        const akun = daftar[idx];

        // Jika ingin ubah password
        if (sandiBaru || sandiLama || sandiUlang) {
            if (!sandiLama) {
                alert('Silakan masukkan kata sandi lama Anda untuk konfirmasi perubahan kata sandi.');
                return;
            }
            if (akun.password !== sandiLama) {
                alert('Kata sandi lama salah!');
                return;
            }
            if (sandiBaru.length < 4) {
                alert('Kata sandi baru minimal 4 karakter!');
                return;
            }
            if (sandiBaru !== sandiUlang) {
                alert('Konfirmasi kata sandi baru tidak cocok!');
                return;
            }
            akun.password = sandiBaru;
        }

        akun.nama = namaBaru;
        akun.username = usernameBaru;

        // Simpan ke SBL
        if (SBL.simpanAkun(daftar)) {
            // Update session
            sesi.nama = namaBaru;
            sesi.username = usernameBaru;
            sessionStorage.setItem('penggunaSaatIni', JSON.stringify(sesi));
            sessionStorage.setItem('sesiNama', namaBaru);

            alert('✅ Profil berhasil diperbarui!');
            document.getElementById('sandiLama').value = '';
            document.getElementById('sandiBaru').value = '';
            document.getElementById('sandiUlang').value = '';
        } else {
            alert('Gagal menyimpan profil.');
        }
    });
}

