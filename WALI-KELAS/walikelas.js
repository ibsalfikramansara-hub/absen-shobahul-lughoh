// ============================================================================
// walikelas.js — Helper & Logika Halaman Wali Kelas (MAN 1 Jepara)
// ============================================================================
SBL.wajibPeran(['Wali', 'Admin', 'Koordinator']);

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
const ST = { H: "Hadir", I: "Izin", S: "Sakit", A: "Alpa" };
const SC = { H: 100, I: 75, S: 75, A: 0 };

function $(selector) {
    return document.querySelector(selector);
}

function profile() {
    const sesi = SBL.akunSesi() || {};
    const isWali = String(sesi.peran || '').toLowerCase().includes('wali');
    const urlKelas = new URLSearchParams(window.location.search).get('kelas');
    let rombelAktif;
    if (isWali && sesi.rombel && SBL.infoKelas(sesi.rombel)) {
        rombelAktif = sesi.rombel;
        sessionStorage.setItem('waliKelasAktif', rombelAktif);
    } else {
        if (urlKelas && SBL.infoKelas(urlKelas)) {
            sessionStorage.setItem('waliKelasAktif', urlKelas);
        }
        rombelAktif = (urlKelas && SBL.infoKelas(urlKelas))
            ? urlKelas
            : (sessionStorage.getItem('waliKelasAktif') || sesi.rombel || 'E2-SAINS');
    }
    const info = SBL.infoKelas(rombelAktif) || {};
    return {
        nama: info.wali || sesi.nama || 'Wali Kelas',
        username: sesi.username || info.username || '',
        rombel: rombelAktif
    };
}

function classStudents() {
    const p = profile();
    return SBL.siswaKelas(p.rombel);
}

function today() {
    return SBL.hariIni();
}

function pad(n) {
    return SBL.pad(n);
}

function monthName(yyyy_mm) {
    if (!yyyy_mm) return '';
    const parts = yyyy_mm.split('-');
    const y = parts[0];
    const m = parseInt(parts[1], 10) - 1;
    return (BULAN[m] || '') + ' ' + y;
}

function predikat(val) {
    if (val === null || val === undefined || val === '' || isNaN(val)) return '-';
    const n = Number(val);
    if (n >= 90) return 'A (Sangat Baik)';
    if (n >= 80) return 'B (Baik)';
    if (n >= 70) return 'C (Cukup)';
    return 'D (Kurang)';
}

function ld(key, def) {
    return SBL.baca(key, def);
}

function sv(key, val) {
    return SBL.tulis(key, val);
}

function att() {
    return SBL.absensi();
}

function esc(str) {
    return SBL.esc(str);
}

function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 300);
    }, 2500);
}

function stat(idSiswa, bulan, attData) {
    const r = (attData || att())[idSiswa] || {};
    const c = { H: 0, I: 0, S: 0, A: 0, n: 0, pct: 0 };
    Object.keys(r).forEach(function (tgl) {
        if (bulan && tgl.indexOf(bulan) !== 0) return;
        const e = r[tgl];
        if (e && c[e.s] !== undefined) {
            c[e.s]++;
            c.n++;
        }
    });
    c.pct = c.n ? Math.round((c.H / c.n) * 100) : 0;
    return c;
}

function charGrade(idSiswa, bulan) {
    const c = ld("sbl_char", {})[idSiswa + "|" + bulan] || {};
    return {
        nilai: c.nilai !== undefined && c.nilai !== "" ? c.nilai : null,
        cat: c.cat || ""
    };
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.toggle('sidebar-open');
}

function layout(activeMenu) {
    const prof = profile();
    const info = SBL.infoKelas(prof.rombel) || {};
    const cetakHref = info.cetak || 'dasbor.html';

    const header = document.getElementById('app-header');
    if (!header) return;

    header.innerHTML = `
        <!-- SIDEBAR -->
        <aside class="app-sidebar" id="sidebar">
            <div class="sidebar-brand">
                <img src="../logomansara.png" alt="Logo MAN 1 Jepara" class="brand-logo">
                <div class="brand-text">
                    <h2>MAN 1 Jepara</h2>
                    <p>IBS Al Fikra</p>
                </div>
            </div>

            <nav class="sidebar-nav">
                <a href="dasbor.html" class="nav-item ${activeMenu === 'dasbor' ? 'active' : ''}">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-label">Portal Wali Kelas</span>
                </a>
                <a href="${cetakHref}" class="nav-item ${activeMenu === 'kelas' ? 'active' : ''}">
                    <span class="nav-icon">🏫</span>
                    <span class="nav-label">Dasbor ${SBL.esc(info.label || prof.rombel)}</span>
                </a>
                <a href="detail-siswa.html" class="nav-item ${activeMenu === 'detail-siswa' ? 'active' : ''}">
                    <span class="nav-icon">👤</span>
                    <span class="nav-label">Detail Siswa</span>
                </a>
                <a href="unduh-laporan.html" class="nav-item ${activeMenu === 'unduh-laporan' ? 'active' : ''}">
                    <span class="nav-icon">📥</span>
                    <span class="nav-label">Unduh Laporan</span>
                </a>

                <a href="javascript:void(0)" class="nav-item nav-logout" onclick="keluarSistem()">
                    <span class="nav-icon">🚪</span>
                    <span class="nav-label">Keluar</span>
                </a>
            </nav>

            <div class="sidebar-watermark">
                <img src="masjid-siluet.svg" alt="Watermark Masjid">
            </div>
        </aside>

        <!-- TOPBAR -->
        <div class="walikelas-topbar-wrap noprint">
            <header class="app-topbar">
                <button class="topbar-menu-toggle" onclick="toggleSidebar()" title="Toggle Sidebar">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                </button>
                <div style="font-weight:700; font-size:15px; color:#0b4a33;">
                    Portal Wali Kelas — ${SBL.esc(info.label || prof.rombel)}
                </div>
                <div class="topbar-right">
                    <div class="topbar-notif" title="Notifikasi Sistem">
                        <span class="notif-bell">🔔</span>
                        <span class="notif-dot"></span>
                    </div>
                    <div class="topbar-user">
                        <div class="user-avatar">
                            <span class="avatar-peci">👳</span>
                        </div>
                        <div class="user-info">
                            <span class="user-name">${SBL.esc(prof.nama)}</span>
                            <span class="user-role">Wali Kelas ${SBL.esc(info.label || prof.rombel)}</span>
                        </div>
                        <span class="user-chevron">▾</span>
                    </div>
                </div>
            </header>
        </div>
    `;
}

function keluarSistem() {
    if (confirm('Yakin ingin keluar dari sistem?')) {
        sessionStorage.clear();
        window.location.href = '../index.html';
    }
}
