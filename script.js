// ============================================================================
// script.js — Proses login (memakai data akun pusat dari data-siswa.js)
// ============================================================================

// ===== Tampil / Sembunyikan Kata Sandi =====
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

if (togglePassword && passwordField) {
    togglePassword.textContent = '👁';
    togglePassword.title = 'Tampilkan kata sandi';
    togglePassword.addEventListener('click', () => {
        const sedangTersembunyi = passwordField.type === 'password';
        passwordField.type = sedangTersembunyi ? 'text' : 'password';
        togglePassword.textContent = sedangTersembunyi ? '🙈' : '👁';
        togglePassword.title = sedangTersembunyi ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi';
    });
}

// ===== Proses Login =====
const formLogin = document.getElementById('loginForm');
const pesanError = document.getElementById('errorMsg');
const rememberMeCheckbox = document.getElementById('rememberMe');
const usernameField = document.getElementById('username');

// Muat username tersimpan jika fitur "Ingat Saya" aktif sebelumnya
if (rememberMeCheckbox && usernameField) {
    const savedUsername = localStorage.getItem('sbl_remember_user');
    if (savedUsername) {
        usernameField.value = savedUsername;
        rememberMeCheckbox.checked = true;
    }
}

function tampilkanPesan(teks, warna) {
    pesanError.textContent = teks;
    pesanError.style.color = warna;
}

formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    pesanError.textContent = '';

    // 1. Cari akun yang cocok (username tidak membedakan huruf besar/kecil)
    const pengguna = SBL.daftarAkun().find(
        p => String(p.username).toLowerCase() === username && String(p.password) === password
    );

    if (!pengguna) {
        tampilkanPesan('❌ Nama pengguna atau kata sandi salah!', '#d32f2f');
        efekGetar();
        return;
    }

    // 2. Cek status akun aktif
    if (pengguna.status !== 'Aktif') {
        tampilkanPesan('⚠️ Akun ini sudah dinonaktifkan. Hubungi Admin.', '#f59e0b');
        return;
    }

    // 3. Cek jam operasional berdasarkan peran & pengaturan sistem
    const p = SBL.pengaturan();
    const isAdmin = String(pengguna.peran).indexOf('Admin') > -1 || username === 'admin';
    const isTentor = String(pengguna.peran).indexOf('Tentor') > -1;
    const aturanJam = p.batasiJamLogin || 'tentor';
    const modeUji = localStorage.getItem('sbl_mode_uji') === '1' || aturanJam === 'bebas';
    const wajibCekJam = !isAdmin && !modeUji && (aturanJam === 'semua' || (aturanJam === 'tentor' && isTentor));

    if (wajibCekJam && !SBL.jamOperasional()) {
        tampilkanPesan(
            '🔒 Akses presensi Tentor terbatas pukul ' + p.jamMulai.replace(':', '.') + '–' + p.jamBerakhir.replace(':', '.') +
            ' WIB. (Admin dapat mengubah jam operasional di Pengaturan Sistem).', '#d32f2f');
        return;
    }

    // 4. Simpan sesi & arahkan ke halaman sesuai peran
    const sesi = {
        nama: pengguna.nama,
        username: pengguna.username,
        peran: pengguna.peran,
        rombel: pengguna.rombel || '',
        halaman: pengguna.halaman || SBL.halamanPeran(pengguna.peran)
    };
    sessionStorage.setItem('penggunaSaatIni', JSON.stringify(sesi));
    sessionStorage.setItem('sesiPeran', sesi.peran);
    sessionStorage.setItem('sesiNama', sesi.nama);
    sessionStorage.setItem('sesiWaktuMasuk', new Date().toLocaleString('id-ID'));

    // 5. Kelola opsi "Ingat Saya"
    if (rememberMeCheckbox && rememberMeCheckbox.checked) {
        localStorage.setItem('sbl_remember_user', pengguna.username);
    } else {
        localStorage.removeItem('sbl_remember_user');
    }

    // Tampilkan Popup Animasi Loading
    pesanError.textContent = '';
    tampilkanPopupLoading(pengguna, sesi.halaman);
});

// ===== Popup Modal Animasi Loading Sukses =====
function tampilkanPopupLoading(pengguna, tujuanHalaman) {
    const modal = document.getElementById('loginLoadingModal');
    const namaEl = document.getElementById('modalUserNama');
    const roleEl = document.getElementById('modalUserRole');

    if (namaEl) namaEl.textContent = pengguna.nama;
    if (roleEl) {
        roleEl.textContent = pengguna.peran + (pengguna.rombel ? ' · ' + pengguna.rombel : '');
    }

    if (modal) {
        modal.classList.add('active');
    }

    // Alihkan setelah animasi progress bar & checkmark berjalan (~1.5 detik)
    setTimeout(() => {
        window.location.href = tujuanHalaman;
    }, 1500);
}

// ===== Efek Getar Jika Gagal =====
function efekGetar() {
    const kartu = document.querySelector('.login-card');
    if (!kartu) return;
    kartu.style.animation = 'goyang 0.4s ease';
    setTimeout(() => kartu.style.animation = '', 400);
}

// ===== Tambah CSS Animasi Getar =====
const gayaAnimasi = document.createElement('style');
gayaAnimasi.textContent = `
@keyframes goyang {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
}
`;
document.head.appendChild(gayaAnimasi);
