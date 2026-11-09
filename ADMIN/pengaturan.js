// ============================================================================
// pengaturan.js — Pengaturan sistem (dipakai juga oleh halaman login & Tentor)
// ============================================================================
SBL.wajibPeran('Admin');

function isiForm(data) {
    document.getElementById('jamMulai').value = data.jamMulai || '05:30';
    document.getElementById('jamBerakhir').value = data.jamBerakhir || '08:00';
    document.getElementById('toleransi').value = data.toleransi !== undefined ? data.toleransi : 5;
    document.getElementById('batasMaksimal').value = data.batasMaksimal !== undefined ? data.batasMaksimal : 15;
    document.getElementById('kirimWa').value = data.kirimWa || 'Aktif';
    document.getElementById('pesanNotif').value = data.pesanNotif || 'Siswa telah tercatat hadir pada kegiatan shobahul lughoh';
    if (document.getElementById('programAktif')) {
        document.getElementById('programAktif').value = 'Hanya Shobahul Lughoh';
    }
    if (document.getElementById('batasiJamLogin')) {
        document.getElementById('batasiJamLogin').value = data.batasiJamLogin || 'tentor';
    }
}

function simpanPengaturan(e) {
    e.preventDefault();

    const mulai = document.getElementById('jamMulai').value;
    const akhir = document.getElementById('jamBerakhir').value;
    if (mulai >= akhir) {
        alert('Jam mulai harus lebih awal daripada jam berakhir!');
        return;
    }

    const batasi = document.getElementById('batasiJamLogin') ? document.getElementById('batasiJamLogin').value : 'tentor';

    SBL.simpanPengaturan({
        jamMulai: mulai,
        jamBerakhir: akhir,
        toleransi: parseInt(document.getElementById('toleransi').value, 10) || 0,
        batasMaksimal: parseInt(document.getElementById('batasMaksimal').value, 10) || 0,
        kirimWa: document.getElementById('kirimWa').value,
        pesanNotif: document.getElementById('pesanNotif').value.trim(),
        programAktif: document.getElementById('programAktif') ? document.getElementById('programAktif').value : 'Hanya Shobahul Lughoh',
        batasiJamLogin: batasi
    });

    localStorage.setItem('sbl_mode_uji', batasi === 'bebas' ? '1' : '0');

    alert('✅ Pengaturan sistem berhasil disimpan! Jam operasional, aturan login, dan perhitungan keterlambatan langsung aktif.');
}

function resetKeAwal() {
    if (!confirm('Kembalikan semua pengaturan ke nilai awal? Perubahan yang ada akan hilang.')) return;
    localStorage.removeItem(SBL.KUNCI.PENGATURAN);
    localStorage.removeItem('sbl_mode_uji');
    isiForm(SBL.pengaturan());
    alert('✅ Telah dikembalikan ke pengaturan awal!');
}

isiForm(SBL.pengaturan());
document.getElementById('formPengaturan').addEventListener('submit', simpanPengaturan);
document.getElementById('btnKembaliAwal').addEventListener('click', resetKeAwal);
