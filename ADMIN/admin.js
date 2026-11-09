// ============================================================================
// admin.js — Manajemen akun pengguna (data pusat: data-siswa.js)
// ============================================================================
SBL.wajibPeran('Admin');

const formAkun = document.getElementById('formAkun');
const tbodyAkun = document.getElementById('tabelPengguna');
const pilihanPeran = document.getElementById('peran');
const pilihanRombel = document.getElementById('rombelAkun');
const btnSubmitAkun = document.getElementById('btnSubmitAkun');
let daftarPengguna = SBL.daftarAkun();

function sinkronkanInputRombel() {
    if (!pilihanRombel || !pilihanPeran) return;
    const isWali = pilihanPeran.value === 'Wali Kelas';
    if (isWali) {
        const nilaiSebelumnya = pilihanRombel.value;
        pilihanRombel.disabled = false;
        pilihanRombel.style.background = '#ffffff';
        pilihanRombel.style.cursor = 'pointer';
        pilihanRombel.innerHTML = '<option value="">— Pilih Kelas / Rombel —</option>' +
            Object.keys(SBL.KELAS).map(function (p) {
                const k = SBL.KELAS[p];
                return `<option value="${p}">${k.label} · ${p}</option>`;
            }).join('');
        if (nilaiSebelumnya && SBL.KELAS[nilaiSebelumnya]) {
            pilihanRombel.value = nilaiSebelumnya;
        }
    } else {
        pilihanRombel.innerHTML = '<option value="">— Hanya untuk peran Wali Kelas —</option>';
        pilihanRombel.value = '';
        pilihanRombel.disabled = true;
        pilihanRombel.style.background = '#f1f5f9';
        pilihanRombel.style.cursor = 'not-allowed';
    }
}

if (pilihanPeran) {
    pilihanPeran.addEventListener('change', sinkronkanInputRombel);
}
sinkronkanInputRombel();

function simpanKePenyimpanan() {
    if (!SBL.simpanAkun(daftarPengguna)) {
        alert('Gagal menyimpan data akun. Penyimpanan browser mungkin penuh/diblokir.');
        return false;
    }
    return true;
}

function muatTabel() {
    daftarPengguna = SBL.daftarAkun();
    tbodyAkun.innerHTML = '';

    daftarPengguna.forEach(function (pengguna, indeks) {
        const baris = document.createElement('tr');
        const rombel = pengguna.rombel
            ? `<br><small style="color:#0d824a;font-weight:700;">🏫 ${SBL.KELAS[pengguna.rombel] ? SBL.KELAS[pengguna.rombel].label + ' (' + pengguna.rombel + ')' : pengguna.rombel}</small>`
            : '';
        const isSuperAdmin = String(pengguna.username).toLowerCase() === 'admin';
        baris.innerHTML = `
            <td><strong>${SBL.esc(pengguna.nama)}</strong>${rombel}</td>
            <td><code>${SBL.esc(pengguna.username)}</code></td>
            <td>${SBL.esc(pengguna.peran)}</td>
            <td class="${pengguna.status === 'Aktif' ? 'status-aktif' : 'status-nonaktif'}">${pengguna.status === 'Aktif' ? '✓ Aktif' : '✕ Nonaktif'}</td>
            <td style="display:flex; gap:6px; flex-wrap:wrap;">
                <button type="button" class="btn btn-primary" style="padding:6px 12px; font-size:12px;" onclick="editAkun(${indeks})">✏️ Ubah</button>
                <button type="button" class="btn ${pengguna.status === 'Aktif' ? 'btn-warning' : 'btn-primary'}" style="padding:6px 12px; font-size:12px;"
                        onclick="ubahStatus(${indeks})">
                    ${pengguna.status === 'Aktif' ? '🔒 Nonaktifkan' : '🔓 Aktifkan'}
                </button>
                ${!isSuperAdmin ? `<button type="button" class="btn btn-danger" style="padding:6px 12px; font-size:12px;" onclick="hapusAkun(${indeks})">🗑️ Hapus</button>` : ''}
            </td>
        `;
        tbodyAkun.appendChild(baris);
    });
}

function editAkun(indeks) {
    const p = daftarPengguna[indeks];
    if (!p) return;
    document.getElementById('namaPengguna').value = p.nama;
    document.getElementById('username').value = p.username;
    document.getElementById('peran').value = p.peran;
    sinkronkanInputRombel();
    if (pilihanRombel && p.peran === 'Wali Kelas') {
        pilihanRombel.value = p.rombel || '';
    }
    document.getElementById('statusAkun').value = p.status;
    document.getElementById('passwordAkun').value = '';
    document.getElementById('indeksEdit').value = indeks;
    if (btnSubmitAkun) btnSubmitAkun.textContent = '💾 Simpan Perubahan Akun';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

formAkun.addEventListener('submit', function (e) {
    e.preventDefault();

    const indeks = document.getElementById('indeksEdit').value;
    const nama = document.getElementById('namaPengguna').value.trim();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const peran = document.getElementById('peran').value;
    const status = document.getElementById('statusAkun').value;
    const passwordBaru = document.getElementById('passwordAkun').value;
    const rombel = (peran === 'Wali Kelas' && pilihanRombel) ? pilihanRombel.value : '';

    if (!nama || !username) {
        alert('Nama dan username wajib diisi!');
        return;
    }
    if (peran === 'Wali Kelas' && !rombel) {
        alert('Silakan pilih Kelas / Rombel untuk akun Wali Kelas!');
        return;
    }

    const bentrok = daftarPengguna.findIndex(function (p, i) {
        return String(p.username).toLowerCase() === username && String(i) !== String(indeks);
    });
    if (bentrok > -1) {
        alert('Username "' + username + '" sudah dipakai oleh ' + daftarPengguna[bentrok].nama + '!');
        return;
    }

    if (indeks === '') {
        if (!passwordBaru) {
            alert('Password wajib diisi untuk akun baru!');
            return;
        }
        daftarPengguna.push({
            nama: nama,
            username: username,
            password: passwordBaru,
            peran: peran,
            status: status,
            rombel: rombel,
            halaman: SBL.halamanPeran(peran)
        });
    } else {
        const idxNum = parseInt(indeks, 10);
        const lama = daftarPengguna[idxNum];
        daftarPengguna[idxNum] = Object.assign({}, lama, {
            nama: nama,
            username: username,
            peran: peran,
            status: status,
            rombel: rombel,
            halaman: SBL.halamanPeran(peran),
            password: passwordBaru ? passwordBaru : lama.password
        });
    }

    if (simpanKePenyimpanan()) {
        // Sinkronkan otomatis nama Wali Kelas & username ke data Rombel jika peran adalah Wali Kelas
        if (peran === 'Wali Kelas' && rombel && SBL.infoKelas(rombel)) {
            const infoKls = SBL.infoKelas(rombel);
            SBL.simpanKelas(rombel, {
                tingkat: infoKls.tingkat,
                label: infoKls.label,
                nama: infoKls.nama,
                jabatan: infoKls.jabatan,
                wali: nama,
                username: username
            });
        }
        formAkun.reset();
        document.getElementById('indeksEdit').value = '';
        if (btnSubmitAkun) btnSubmitAkun.textContent = '💾 Simpan Akun';
        sinkronkanInputRombel();
        muatTabel();
        alert('✅ Data akun berhasil disimpan & disinkronkan!');
    }
});

if (document.getElementById('btnReset')) {
    document.getElementById('btnReset').addEventListener('click', function () {
        document.getElementById('indeksEdit').value = '';
        if (btnSubmitAkun) btnSubmitAkun.textContent = '💾 Simpan Akun';
        setTimeout(sinkronkanInputRombel, 10);
    });
}

if (document.getElementById('btnResetDefaultAkun')) {
    document.getElementById('btnResetDefaultAkun').addEventListener('click', function () {
        if (!confirm('Kembalikan seluruh daftar akun ke 13 akun bawaan sistem?')) return;
        localStorage.removeItem(SBL.KUNCI.AKUN);
        formAkun.reset();
        document.getElementById('indeksEdit').value = '';
        if (btnSubmitAkun) btnSubmitAkun.textContent = '💾 Simpan Akun';
        sinkronkanInputRombel();
        muatTabel();
        alert('✅ Daftar akun telah dikembalikan ke akun bawaan.');
    });
}

function ubahStatus(indeks) {
    const p = daftarPengguna[indeks];
    if (!p) return;
    if (String(p.username).toLowerCase() === 'admin' && p.status === 'Aktif' &&
        !confirm('Menonaktifkan akun admin utama bisa membuat Anda tidak bisa masuk. Lanjutkan?')) return;
    p.status = p.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    if (simpanKePenyimpanan()) muatTabel();
}

function hapusAkun(indeks) {
    const p = daftarPengguna[indeks];
    if (!p) return;
    if (!confirm('Hapus akun "' + p.nama + '" (' + p.username + ')?')) return;
    daftarPengguna.splice(indeks, 1);
    if (simpanKePenyimpanan()) muatTabel();
}

muatTabel();
