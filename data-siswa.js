/* ============================================================================
   data-siswa.js â€” SUMBER DATA TUNGGAL (single source of truth)
   ----------------------------------------------------------------------------
   Dipakai oleh SEMUA halaman (Admin, Koordinator, Tentor, Wali Kelas, Login).
   Jangan lagi menyalin data siswa/akun ke dalam file HTML masing-masing.

   - NISN disimpan sebagai teks 10 digit (angka 0 di depan TIDAK hilang).
   - Perubahan data siswa oleh Admin disimpan di localStorage 'sbl_stu'
     dan langsung terbaca oleh halaman Wali Kelas / Tentor / Koordinator.
   - Perubahan akun oleh Admin disimpan di localStorage 'sbl_akun' dan
     langsung dipakai oleh halaman login.
   ============================================================================ */
var SBL = (function () {
  "use strict";

  var KUNCI = {
    AKUN: "sbl_akun",
    SISWA: "sbl_stu",
    KELAS: "sbl_kelas",
    ABSEN: "sbl_att",
    KARAKTER: "sbl_char",
    PROFIL_WALI: "sbl_profile",
    PROFIL_ADMIN: "profilAdmin",
    PENGATURAN: "pengaturanSistem",
    BARCODE: "riwayatBarcode",
    JADWAL: "sbl_jadwal",
    LAPORAN: "sbl_rep",
    CATATAN_WALI: "catatanWaliKelas",
    NOTIF_WALI: "sbl_notif_wali"
  };

  var AKUN = [
  {
    "nama": "Pak Riki",
    "username": "pak riki",
    "password": "mutawasihx",
    "peran": "Tentor/Guru Pendamping",
    "halaman": "TENTOR/dasbor.html",
    "status": "Aktif"
  },
  {
    "nama": "Pak Fajri",
    "username": "pak fajri",
    "password": "mutawasihx1",
    "peran": "Tentor/Guru Pendamping",
    "halaman": "TENTOR/dasbor.html",
    "status": "Aktif"
  },
  {
    "nama": "Bu Ifa",
    "username": "bu ifa",
    "password": "asasix",
    "peran": "Tentor/Guru Pendamping",
    "halaman": "TENTOR/dasbor.html",
    "status": "Aktif"
  },
  {
    "nama": "Pak Lukim",
    "username": "pak lukim",
    "password": "asasix1",
    "peran": "Tentor/Guru Pendamping",
    "halaman": "TENTOR/dasbor.html",
    "status": "Aktif"
  },
  {
    "nama": "Bu Khomsa",
    "username": "bu khomsa",
    "password": "123456",
    "peran": "Tentor/Guru Pendamping",
    "halaman": "TENTOR/dasbor.html",
    "status": "Aktif"
  },
  {
    "nama": "Bu Nunuk",
    "username": "bu nunuk",
    "password": "XE2",
    "peran": "Wali Kelas",
    "halaman": "WALI-KELAS/dasbor.html",
    "rombel": "E2-SAINS",
    "status": "Aktif"
  },
  {
    "nama": "Pak Hamidun",
    "username": "pak hamidun",
    "password": "XE3",
    "peran": "Wali Kelas",
    "halaman": "WALI-KELAS/dasbor.html",
    "rombel": "E3-SAINS",
    "status": "Aktif"
  },
  {
    "nama": "Miss Wilda",
    "username": "miss wilda",
    "password": "XE4",
    "peran": "Wali Kelas",
    "halaman": "WALI-KELAS/dasbor.html",
    "rombel": "E4-BILINGUAL ICT",
    "status": "Aktif"
  },
  {
    "nama": "Bu Nita",
    "username": "bu nita",
    "password": "X1F2",
    "peran": "Wali Kelas",
    "halaman": "WALI-KELAS/dasbor.html",
    "rombel": "F2-SAINS",
    "status": "Aktif"
  },
  {
    "nama": "Bu Aini",
    "username": "bu aini",
    "password": "X1F3",
    "peran": "Wali Kelas",
    "halaman": "WALI-KELAS/dasbor.html",
    "rombel": "F3-SAINS",
    "status": "Aktif"
  },
  {
    "nama": "Miss Noory",
    "username": "miss noory",
    "password": "X1F4",
    "peran": "Wali Kelas",
    "halaman": "WALI-KELAS/dasbor.html",
    "rombel": "F4-BILINGUAL ICT",
    "status": "Aktif"
  },
  {
    "nama": "Administrator Sistem",
    "username": "admin",
    "password": "admin123",
    "peran": "Admin/TU",
    "halaman": "ADMIN/dasbor.html",
    "status": "Aktif"
  },
  {
    "nama": "Koordinator Program",
    "username": "koordinator",
    "password": "koordinator123",
    "peran": "Koordinator Program",
    "halaman": "KOORDINATOR/dasboard.html",
    "status": "Aktif"
  }
];
  var KELAS = {
  "E2-SAINS": {
    "tingkat": 10,
    "label": "X E2",
    "nama": "X - E2 SAINS",
    "jabatan": "IBS SAINS 1",
    "wali": "Hj. Nunuk Sulistyaningrum S., S.Pd.",
    "username": "bu nunuk",
    "cetak": "dasbor-e2.html",
    "program": "E2-SAINS",
    "jumlah": 36,
    "kode": "E2"
  },
  "E3-SAINS": {
    "tingkat": 10,
    "label": "X E3",
    "nama": "X - E3 SAINS",
    "jabatan": "IBS SAINS 2",
    "wali": "Hamidun Nafi' S, S.Pd.",
    "username": "pak hamidun",
    "cetak": "dasbor-e3.html",
    "program": "E3-SAINS",
    "jumlah": 35,
    "kode": "E3"
  },
  "E4-BILINGUAL ICT": {
    "tingkat": 10,
    "label": "X E4",
    "nama": "X - E4 BILINGUAL ICT",
    "jabatan": "IBS BILINGUAL ICT",
    "wali": "Wilda Ulfiyanti, S.Pd., M.Pd.",
    "username": "miss wilda",
    "cetak": "dasbor-e4.html",
    "program": "E4-BILINGUAL ICT",
    "jumlah": 38,
    "kode": "E4"
  },
  "F2-SAINS": {
    "tingkat": 11,
    "label": "XI F2",
    "nama": "XI - F2 SAINS",
    "jabatan": "IBS SAINS 1",
    "wali": "Nita Lustia, S.Pd.",
    "username": "bu nita",
    "cetak": "dasbor-f2.html",
    "program": "F2-SAINS",
    "jumlah": 32,
    "kode": "F2"
  },
  "F3-SAINS": {
    "tingkat": 11,
    "label": "XI F3",
    "nama": "XI - F3 SAINS",
    "jabatan": "IBS SAINS 2",
    "wali": "Aini Qismatul Adlhiah, S.Pd.",
    "username": "bu aini",
    "cetak": "dasbor-f3.html",
    "program": "F3-SAINS",
    "jumlah": 34,
    "kode": "F3"
  },
  "F4-BILINGUAL ICT": {
    "tingkat": 11,
    "label": "XI F4",
    "nama": "XI - F4 BILINGUAL ICT",
    "jabatan": "IBS BILINGUAL ICT",
    "wali": "Noory Annisa Aulia, S.S.",
    "username": "miss noory",
    "cetak": "dasbor-f4.html",
    "program": "F4-BILINGUAL ICT",
    "jumlah": 31,
    "kode": "F4"
  }
};
  var SISWA = [
  {
    "id": 39,
    "nama": "ADZKIA HANUN MUMTAZA",
    "nisn": "0106530206",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 40,
    "nama": "AFRINA UZMA BATRISYIA",
    "nisn": "0111201185",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 41,
    "nama": "AHMAD AFLAHUL AZMII",
    "nisn": "0115593167",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 42,
    "nama": "AHMAD AINUL IHSAN",
    "nisn": "0127701942",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 43,
    "nama": "AHMAD ROYYAN FUADIYA MUTAMAKKIN",
    "nisn": "0117077588",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 44,
    "nama": "ALYYA RAJWA TSABITA",
    "nisn": "3104457971",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 45,
    "nama": "ANINDYA QURROTA A'INAYAA",
    "nisn": "0118951280",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 46,
    "nama": "ANUGRAH FAJRUN NINDYAHUSNA",
    "nisn": "0115097460",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 47,
    "nama": "ARNETTA PRAMESWARI TAJKIRANI",
    "nisn": "0119646535",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 48,
    "nama": "ARSAKHA VIRENDRA HASHIF RAHMAN",
    "nisn": "0114470725",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 49,
    "nama": "ARYAGUNA SURYATMAJA",
    "nisn": "0104517141",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 50,
    "nama": "ATALA MIKO SETIAWAN",
    "nisn": "0105720044",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 51,
    "nama": "ETNA IYYANA MISKIYA",
    "nisn": "0112299560",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 52,
    "nama": "FARAH CAHYA HAMMITA",
    "nisn": "0113813882",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 53,
    "nama": "FAYZA KULLA AZMINA",
    "nisn": "0116431474",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 54,
    "nama": "HALIZA FATHIATURRAJWA",
    "nisn": "0117917632",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 55,
    "nama": "ISNAILAH IFFATUL MUTFIDAH",
    "nisn": "3103280663",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 56,
    "nama": "KAIZAR JAWADWIPA WAHYUDI",
    "nisn": "0106077355",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 57,
    "nama": "MIRALDA AFISA PRATIWI",
    "nisn": "3100642269",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 58,
    "nama": "MUHAMMAD AZAM RIZQO",
    "nisn": "3118152300",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 59,
    "nama": "MUHAMMAD KAFFALANA RAHMATIKA",
    "nisn": "0103858954",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 60,
    "nama": "MUHAMMAD NIZAR FIKRI",
    "nisn": "3112845039",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 61,
    "nama": "MUHAMMAD RADIF ALAN NAHAJ",
    "nisn": "0102967748",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 62,
    "nama": "MUHAMMAD RAZIQ HANAN",
    "nisn": "0101673626",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 63,
    "nama": "NADA HUWAIDA WIDIANDARI",
    "nisn": "0113195534",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 64,
    "nama": "NAJIH ROSHIF AS-SHIDDIQI",
    "nisn": "0102295703",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 65,
    "nama": "NAJLA AMIRA MAULIDA",
    "nisn": "3105929900",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 66,
    "nama": "NAJLA ATHAYA MUMTAZA",
    "nisn": "0112510382",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 67,
    "nama": "NAJLA NAZILA SALSABILA",
    "nisn": "0116628663",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 68,
    "nama": "RAEESA ASYIFATUN NADA",
    "nisn": "0115328512",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 69,
    "nama": "RAFIFAH TRI ZAHIRAH",
    "nisn": "3117194883",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 70,
    "nama": "RECILIA AISYA RISAPUTRI",
    "nisn": "0113725268",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 71,
    "nama": "RENA PUTRI ARSANTI",
    "nisn": "0119074578",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 72,
    "nama": "SAFNA RIZQI AULIYA",
    "nisn": "3116150303",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 73,
    "nama": "YASMIN FARAH AULIA",
    "nisn": "0116177771",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 74,
    "nama": "ZAFIRA SALSABILA HUSNA",
    "nisn": "0101160820",
    "nisnValid": true,
    "kelas": 10,
    "program": "E2-SAINS"
  },
  {
    "id": 75,
    "nama": "AFRA NAILA ARKANA",
    "nisn": "0111604562",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 76,
    "nama": "AMMARA NADIA MAISARAH",
    "nisn": "0106925033",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 77,
    "nama": "ANAS LUTFI MUNAWAR",
    "nisn": "0114575735",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 78,
    "nama": "ANNORA ZIHAN SAVANA",
    "nisn": "3118185086",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 79,
    "nama": "AQILA PUTRI ADIBA",
    "nisn": "0105450349",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 80,
    "nama": "BUNGA SALMA FAUSTINA",
    "nisn": "0118370377",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 81,
    "nama": "EVEREST HARIYANTO",
    "nisn": "3111308340",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 82,
    "nama": "FADHIL MUHAMMAD",
    "nisn": "0112598282",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 83,
    "nama": "FAZA SUKMA ANNISA",
    "nisn": "0103792111",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 84,
    "nama": "FIRZANA AISHA RAHMAN",
    "nisn": "3116154880",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 85,
    "nama": "HAMIDA AMALIA INDRIYANI",
    "nisn": "0115667385",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 86,
    "nama": "ILMA AKMILIA KHILYAWAN",
    "nisn": "0119681608",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 87,
    "nama": "INATS TSUROYYA",
    "nisn": "0112695625",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 88,
    "nama": "ISTI JI'RONA MARWADANTI",
    "nisn": "0102128415",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 89,
    "nama": "KEISHA VIVIA AQILAH",
    "nisn": "0113064573",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 90,
    "nama": "KEYSHA KAMILAH",
    "nisn": "0113884493",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 91,
    "nama": "KHIYARATUN NISA'",
    "nisn": "0104223721",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 92,
    "nama": "KIRANA RAHMANIA APRILIANTI",
    "nisn": "0018260093",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 93,
    "nama": "MUHAMMAD ABBIYA RAMADAN",
    "nisn": "0103501925",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 94,
    "nama": "MUHAMMAD AFKARRASYID ADIS AL-BASYSYAR",
    "nisn": "0107883698",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 95,
    "nama": "MUHAMMAD DIAZ ALFAREZA",
    "nisn": "0112450971",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 96,
    "nama": "MUHAMMAD HASANAIN HAIKAL",
    "nisn": "0108161064",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 97,
    "nama": "MUHAMMAD HEIDAR AL FIRDAUS",
    "nisn": "0105203677",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 98,
    "nama": "MUHAMMAD KHABAQ AFIFI",
    "nisn": "3107915726",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 99,
    "nama": "MUHAMMAD KHOIRUR RIZQY MAYAKFI",
    "nisn": "3110924997",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 100,
    "nama": "NADYNE LATHIFATUS SYIFA'",
    "nisn": "0119776133",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 101,
    "nama": "NIZAM IRFAN AHMAD",
    "nisn": "0125860248",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 102,
    "nama": "PRADIPTA ARYA WISMAYA",
    "nisn": "0109725193",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 103,
    "nama": "QONITA HULWA ATHIFAH",
    "nisn": "0108094451",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 104,
    "nama": "RAISHA AQEELA QAIREEN",
    "nisn": "3113891418",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 105,
    "nama": "RAYHANUNG DHEA AL BAHDIM",
    "nisn": "3107711517",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 106,
    "nama": "RIFQI AZKA FIKRIANSYAH",
    "nisn": "0109125744",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 107,
    "nama": "WALADIENTAQI AL ABSHOR",
    "nisn": "3106745298",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 108,
    "nama": "ZAHRA AMALIA HUSNI",
    "nisn": "0119659581",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 109,
    "nama": "ZAHROTUL MAGHFIROH",
    "nisn": "0112685598",
    "nisnValid": true,
    "kelas": 10,
    "program": "E3-SAINS"
  },
  {
    "id": 110,
    "nama": "AHMAD AJRIEL IRFAN",
    "nisn": "3113134417",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 111,
    "nama": "AHMAD FAIRUZ SYIHAB ARAFIF",
    "nisn": "0109907075",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 112,
    "nama": "AINUL FUTICHATUR RIZQOH",
    "nisn": "3119007535",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 113,
    "nama": "ANDHIKA ADI SAPUTRA",
    "nisn": "3118784599",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 114,
    "nama": "AQILA MUMTAZ EL HADY",
    "nisn": "0109023481",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 115,
    "nama": "AULIA ZAHWA IZZATUNNISA'",
    "nisn": "3119706760",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 116,
    "nama": "AURELIA NAMIRA RAMANIYA",
    "nisn": "0116481535",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 117,
    "nama": "AZAM YUSUF MANSUR",
    "nisn": "3109473102",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 118,
    "nama": "BRIAN ARVIN YUDA ALBAIHAQI",
    "nisn": "0117855860",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 119,
    "nama": "DEFAAIQSYAH HIBATULLAH ABRAAR",
    "nisn": "0119627218",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 120,
    "nama": "DIFA FAUQI AIS FADILLA",
    "nisn": "0104123454",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 121,
    "nama": "FAIQ AULIA AMALI",
    "nisn": "0115210544",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 122,
    "nama": "FAISAL FATHIN BAYHAQI",
    "nisn": "0119053042",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 123,
    "nama": "FARHATUL ATIKAH",
    "nisn": "0104950340",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 124,
    "nama": "FITRI AMALIA HIDAYAH",
    "nisn": "0112794554",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 125,
    "nama": "HAJIRA NADA SALSABILA",
    "nisn": "0114320219",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 126,
    "nama": "HANNA AULIA",
    "nisn": "0109410011",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 127,
    "nama": "HISHAM MUHAMMAD SHOFA",
    "nisn": "0112135323",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 128,
    "nama": "ILHAM EKI NUR HAKIM",
    "nisn": "3106587065",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 129,
    "nama": "ILHAM PRABU MUKTAMAR",
    "nisn": "0102010096",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 130,
    "nama": "KAMILAH NA'ILATUN NIHLAH",
    "nisn": "0109073961",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 131,
    "nama": "KEISHA NISWATUN SUPRIYANTO",
    "nisn": "0112591827",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 132,
    "nama": "KHUSNA AULIYAUSSYIFA",
    "nisn": "0107110024",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 133,
    "nama": "MOH NIQOBULLUBAB",
    "nisn": "3111746654",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 134,
    "nama": "MUHAMMAD BALYA SAMAHAT",
    "nisn": "0114021681",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 135,
    "nama": "MUHAMMAD HAZIM AL FANANI",
    "nisn": "0115101434",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 136,
    "nama": "MUHAMMAD MUFLIH ALMURTADLO",
    "nisn": "0105200137",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 137,
    "nama": "MUHAMMAD RAFIF ARYAJUNA",
    "nisn": "0112092406",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 138,
    "nama": "MUHAMMAD ZIVAN",
    "nisn": "0113808184",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 139,
    "nama": "NABILA TSABITA PUTRI MUSTOFA",
    "nisn": "0111982065",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 140,
    "nama": "NASYWA TSABITA HAWA",
    "nisn": "0116407130",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 141,
    "nama": "NIA RAHMA IZZATI",
    "nisn": "0112915814",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 142,
    "nama": "RAFKA ARYA MAULANA",
    "nisn": "0106767818",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 143,
    "nama": "RONALD SANJAYA",
    "nisn": "0106562309",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 144,
    "nama": "SYAKIRA KHANSA SANTOSO",
    "nisn": "0104192943",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 145,
    "nama": "WILDA AYU SHOLIKHAH",
    "nisn": "0114329572",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 146,
    "nama": "ZAHARA NUR AULIA",
    "nisn": "0101472369",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 147,
    "nama": "ZAHIRA PUTRI FITRIA KHOIRUNNISA",
    "nisn": "0113060981",
    "nisnValid": true,
    "kelas": 10,
    "program": "E4-BILINGUAL ICT"
  },
  {
    "id": 184,
    "nama": "ABDUL MAJID NUR HUSEIN",
    "nisn": "0108750047",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 185,
    "nama": "ABDURRAHMAN EFFENDI",
    "nisn": "0108628666",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 186,
    "nama": "AGHNIA DIFA KAMILAH MUMTAZA",
    "nisn": "3090218438",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 187,
    "nama": "AHZA CETTA DAMAWAN",
    "nisn": "0101580506",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 188,
    "nama": "AINA MARITZA",
    "nisn": "0098250061",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 189,
    "nama": "ALMIRA MICHAELA PUTRI",
    "nisn": "3102510529",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 190,
    "nama": "ALYSHIA ZUHURA MAHESWARI",
    "nisn": "0104044914",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 191,
    "nama": "ANANDA YANUAR ZAKARIA FAZA",
    "nisn": "0106662487",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 192,
    "nama": "ANASGHANIYYU PUTRA YULAN",
    "nisn": "0109263390",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 193,
    "nama": "ANINDYA ZAFIR",
    "nisn": "3109277010",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 194,
    "nama": "ANISA MAGDALENA AS-SYIFA",
    "nisn": "0092285540",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 195,
    "nama": "ARDAN HIKMAL AKBAR",
    "nisn": "0091790369",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 196,
    "nama": "ATIQOH KHOLISHOTUL AZMI",
    "nisn": "3107313615",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 197,
    "nama": "AULIA ZIDNY BAROKAH AL-UDZMA",
    "nisn": "3096751557",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 198,
    "nama": "AZIZATUL HUSNA",
    "nisn": "0105760949",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 199,
    "nama": "AZKYA EL TSANIA",
    "nisn": "3109127447",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 200,
    "nama": "BINTAN AQILA ZAKIYA",
    "nisn": "0101178439",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 201,
    "nama": "EKA SATRIA MAULANA",
    "nisn": "0098241894",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 202,
    "nama": "JAVAS NIZAR WARANGGANI",
    "nisn": "0106580645",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 203,
    "nama": "LAYALIA NAFISAH RAMADHANI",
    "nisn": "0108884479",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 204,
    "nama": "MAHIRA KHAMIDA RAHMA",
    "nisn": "0108898433",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 205,
    "nama": "MARWAH RESYA KAMILA",
    "nisn": "0096639032",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 206,
    "nama": "MILHATIN SYIRFAH",
    "nisn": "0102611744",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 207,
    "nama": "MUFAKAT ARSADY",
    "nisn": "0093117399",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 208,
    "nama": "MUHAMMAD FAZA ALMUJAWWAD",
    "nisn": "0095658848",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 209,
    "nama": "NADIA KIRANIA PUTRI",
    "nisn": "0094331564",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 210,
    "nama": "NASYWA AQILA",
    "nisn": "0101397203",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 211,
    "nama": "NAYLA AISHA AZ-ZAHRA",
    "nisn": "0109600370",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 212,
    "nama": "NIDA JINAN NAHDAH",
    "nisn": "3102176392",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 213,
    "nama": "NURINA ZHAFIRA HASNA",
    "nisn": "0102819603",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 214,
    "nama": "SHOFIYAH KHOIRUNNISAA",
    "nisn": "0103533149",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 215,
    "nama": "SYIFA DWI HANIAH",
    "nisn": "0108084675",
    "nisnValid": true,
    "kelas": 11,
    "program": "F2-SAINS"
  },
  {
    "id": 216,
    "nama": "ADELIA AURA SYAFITRI",
    "nisn": "0099929297",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 217,
    "nama": "AHMAD AMEL RAKHIF RAUNAQI",
    "nisn": "0095476900",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 218,
    "nama": "AHMAD BILAL",
    "nisn": "3103066111",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 219,
    "nama": "AIRA BILQIS RAMADHANI",
    "nisn": "0097138212",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 220,
    "nama": "ALISA SEKAR ANANDA",
    "nisn": "0115686614",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 221,
    "nama": "AMELDA MEIFIANA",
    "nisn": "0102425479",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 222,
    "nama": "ANINDYA MEILIDARAHMAH",
    "nisn": "0105129929",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 223,
    "nama": "ARDELLA ISNAINI ZIA SYA'BANI",
    "nisn": "0106115361",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 224,
    "nama": "DAVI LUKMAN WIJAYA",
    "nisn": "0095992730",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 225,
    "nama": "DELINDA ALEA",
    "nisn": "0105040653",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 226,
    "nama": "DINAR DEVRATYA RAISYA NOVA",
    "nisn": "3104243828",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 227,
    "nama": "DITA NISRINA FITRIA",
    "nisn": "0108624966",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 228,
    "nama": "FARIS YUSUF SUGIANTO",
    "nisn": "0104515003",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 229,
    "nama": "FELISA DESTI ANGGRAINI",
    "nisn": "0092789996",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 230,
    "nama": "FIDELA PUTRI FAUZIYAH",
    "nisn": "0092133032",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 231,
    "nama": "HEMALIYA PUTRI ARIYANI",
    "nisn": "3105121598",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 232,
    "nama": "ILHAM MA'RUF KURNIAWAN",
    "nisn": "3106006363",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 233,
    "nama": "ITSNAINI KUSUMA WARDHANI",
    "nisn": "3097310087",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 234,
    "nama": "JANA ALFI MUYASSARAH",
    "nisn": "0018745314",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 235,
    "nama": "KALLISTA PUTRI SEKARWANGI",
    "nisn": "0101553268",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 236,
    "nama": "LAILA THUFAILA LATIFAH",
    "nisn": "3097213922",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 237,
    "nama": "MUHAMMAD KHAIDAR KHILMI",
    "nisn": "25",
    "nisnValid": false,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 238,
    "nama": "MUNAWWILATUN NAUQOH",
    "nisn": "0109530058",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 239,
    "nama": "NARASYA RADHA MASYIFA",
    "nisn": "0103976708",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 240,
    "nama": "NASYWA RAIHANA MULYADI",
    "nisn": "3105633803",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 241,
    "nama": "NIZAMUDIN AL AKBAR",
    "nisn": "0103262012",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 242,
    "nama": "NUR KYAN TARISA ARIF",
    "nisn": "0092031229",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 243,
    "nama": "TAZURINA EL MADINA",
    "nisn": "3109626419",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 244,
    "nama": "TITANIA FAZIRA",
    "nisn": "3101985259",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 245,
    "nama": "WAFDA MAULIDA",
    "nisn": "0106783079",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 246,
    "nama": "WAFI ZAYYAN AL MAHSA",
    "nisn": "0105809071",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 247,
    "nama": "WAHYU CHOMISUL AKMAL",
    "nisn": "0101160691",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 248,
    "nama": "ZAHROTUN NAFISAH",
    "nisn": "3106465877",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 249,
    "nama": "ZAHROTUN NISA'",
    "nisn": "0101625859",
    "nisnValid": true,
    "kelas": 11,
    "program": "F3-SAINS"
  },
  {
    "id": 250,
    "nama": "ABDURRAHMAN ALAN PRADITA",
    "nisn": "0099737407",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 251,
    "nama": "AHMAD ASHIF BASHAM SULAIMAN",
    "nisn": "0082507906",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 252,
    "nama": "ANDHIKA RIZQI PRATAMA",
    "nisn": "0096428418",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 253,
    "nama": "AQEELA HERVIE GHAIDA AZKA",
    "nisn": "0105463110",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 254,
    "nama": "ARDESTY MUTIARA",
    "nisn": "0093036117",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 255,
    "nama": "ARIMBI NARESWARI SHIDQIYAH",
    "nisn": "3101014797",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 256,
    "nama": "ARSYANDA PUTRI SATYANINGTYAS",
    "nisn": "0097349589",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 257,
    "nama": "BRILLIAN ATHA ARAYYAN",
    "nisn": "1011469656",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 258,
    "nama": "CAHAYA KHALISA PUTRI",
    "nisn": "0091781761",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 259,
    "nama": "FACHRU ARROCHMAT",
    "nisn": "0092997143",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 260,
    "nama": "FACHRY ARROCHMAT",
    "nisn": "0093985877",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 261,
    "nama": "FATTANA AISYAH NOOR",
    "nisn": "14",
    "nisnValid": false,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 262,
    "nama": "GRISELDA IZZA RANGGIDEWI",
    "nisn": "3102997169",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 263,
    "nama": "HAIKAL ARYARIDA KEYVARO",
    "nisn": "0109298982",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 264,
    "nama": "HILDA SEPTYA RAMADHANI",
    "nisn": "0103039120",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 265,
    "nama": "JEELENA AL FATH",
    "nisn": "16",
    "nisnValid": false,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 266,
    "nama": "KAREN ALMA KHALILAH",
    "nisn": "0109622953",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 267,
    "nama": "KAYLA ZAHRAH",
    "nisn": "17",
    "nisnValid": false,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 268,
    "nama": "LETISYA AYUNDA SILVIA",
    "nisn": "0109560454",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 269,
    "nama": "M ARAFKA AGHNIFILANSYAH",
    "nisn": "0109334273",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 270,
    "nama": "MUHAMMAD KHOIRUL MASINDRA",
    "nisn": "0101530183",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 271,
    "nama": "MUHAMMAD NEZA WIDIKHA PUTRA",
    "nisn": "26",
    "nisnValid": false,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 272,
    "nama": "MUHAMMAD RIKZA AZMIANSYAH",
    "nisn": "0107296835",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 273,
    "nama": "NAILA INAYATUS SHOFA",
    "nisn": "3098914836",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 274,
    "nama": "NAURA SYIFA HARTONO",
    "nisn": "0106423852",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 275,
    "nama": "NURRIYAH SINTA ASHIMA KARIM",
    "nisn": "3105962824",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 276,
    "nama": "REEFA LINTANG KANYA",
    "nisn": "0102259912",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 277,
    "nama": "RISKY SATRIA RAMADHAN",
    "nisn": "0108792459",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 278,
    "nama": "ULUNG CATRA SOCA",
    "nisn": "36",
    "nisnValid": false,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 279,
    "nama": "VANESSA AMALIA PUTRI",
    "nisn": "0098527440",
    "nisnValid": true,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  },
  {
    "id": 280,
    "nama": "ZILFANA ALIYYA DEVI FATHIYYATI",
    "nisn": "38",
    "nisnValid": false,
    "kelas": 11,
    "program": "F4-BILINGUAL ICT"
  }
];

  var PENGATURAN_AWAL = {
    jamMulai: "05:30",
    jamBerakhir: "08:00",
    toleransi: 5,
    batasMaksimal: 15,
    kirimWa: "Aktif",
    pesanNotif: "Siswa telah tercatat hadir pada kegiatan shobahul lughoh",
    programAktif: "Hanya Shobahul Lughoh",
    batasiJamLogin: "tentor"
  };

  function baca(kunci, bawaan) {
    try {
      var v = JSON.parse(localStorage.getItem(kunci));
      return (v === null || v === undefined) ? bawaan : v;
    } catch (e) { return bawaan; }
  }

  function tulis(kunci, nilai) {
    try { localStorage.setItem(kunci, JSON.stringify(nilai)); return true; }
    catch (e) { return false; }
  }

  function esc(v) {
    return String(v === null || v === undefined ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  function hariIni() {
    var d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function jamSekarang() {
    var d = new Date();
    return pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  function tanggalIndo(tgl) {
    var d = tgl ? new Date(tgl) : new Date();
    return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  /* ---------- SISWA ---------- */
  function daftarSiswa() {
    var ubah = baca(KUNCI.SISWA, {}) || {};
    var riwayatBc = baca(KUNCI.BARCODE, []) || [];
    var bcMap = {};
    if (Array.isArray(riwayatBc)) {
      for (var b = 0; b < riwayatBc.length; b++) {
        var r = riwayatBc[b];
        var keyNisn = String(r.nisn || r.nis || "");
        if (keyNisn && !bcMap[keyNisn]) {
          bcMap[keyNisn] = r.kodeBaru;
        }
      }
    }

    var hasil = [];
    SISWA.forEach(function (s) {
      var o = ubah[s.id] || {};
      if (o.dihapus) return;
      var nisn = o.nisn !== undefined ? String(o.nisn) : s.nisn;
      var prog = o.program || s.program;
      var kls = (KELAS[prog] && KELAS[prog].tingkat) || o.kelas || s.kelas;
      hasil.push({
        id: s.id,
        nama: o.nama || s.nama,
        nisn: nisn,
        nisnValid: /^\d{10}$/.test(nisn),
        kelas: kls,
        program: prog,
        diubah: !!ubah[s.id],
        tambahan: false,
        kodeBarcode: bcMap[nisn] || nisn
      });
    });

    var tambahan = Array.isArray(ubah._tambahan) ? ubah._tambahan : [];
    tambahan.forEach(function (t) {
      if (!t || t.dihapus) return;
      var o = ubah[t.id] || {};
      if (o.dihapus) return;
      var nisn = o.nisn !== undefined ? String(o.nisn) : String(t.nisn || "");
      var prog = o.program || t.program || "E2-SAINS";
      var kls = (KELAS[prog] && KELAS[prog].tingkat) || t.kelas || 10;
      hasil.push({
        id: t.id,
        nama: o.nama || t.nama,
        nisn: nisn,
        nisnValid: /^\d{10}$/.test(nisn),
        kelas: kls,
        program: prog,
        diubah: !!ubah[t.id],
        tambahan: true,
        kodeBarcode: bcMap[nisn] || nisn
      });
    });

    return hasil;
  }

  function simpanSiswa(id, data) {
    var o = baca(KUNCI.SISWA, {}) || {};
    var strId = String(id);
    if (Array.isArray(o._tambahan)) {
      var idx = o._tambahan.findIndex(function (t) { return String(t.id) === strId; });
      if (idx > -1) {
        o._tambahan[idx] = Object.assign({}, o._tambahan[idx], data);
        return tulis(KUNCI.SISWA, o);
      }
    }
    o[id] = Object.assign({}, o[id] || {}, data);
    return tulis(KUNCI.SISWA, o);
  }

  function tambahSiswa(data) {
    var o = baca(KUNCI.SISWA, {}) || {};
    if (!Array.isArray(o._tambahan)) o._tambahan = [];
    var semua = daftarSiswa();
    var maxId = 300;
    SISWA.forEach(function (s) { if (s.id > maxId) maxId = s.id; });
    semua.forEach(function (s) { if (Number(s.id) > maxId) maxId = Number(s.id); });
    var newId = maxId + 1;
    var prog = data.program || "E2-SAINS";
    var kls = (KELAS[prog] && KELAS[prog].tingkat) || 10;
    var item = {
      id: newId,
      nama: String(data.nama || "").trim().toUpperCase(),
      nisn: String(data.nisn || "").trim(),
      kelas: kls,
      program: prog,
      tambahan: true
    };
    o._tambahan.push(item);
    tulis(KUNCI.SISWA, o);
    return item;
  }

  function hapusSiswa(id) {
    var o = baca(KUNCI.SISWA, {}) || {};
    var strId = String(id);
    if (Array.isArray(o._tambahan)) {
      var idx = o._tambahan.findIndex(function (t) { return String(t.id) === strId; });
      if (idx > -1) {
        o._tambahan.splice(idx, 1);
        delete o[id];
        return tulis(KUNCI.SISWA, o);
      }
    }
    o[id] = Object.assign({}, o[id] || {}, { dihapus: true });
    return tulis(KUNCI.SISWA, o);
  }

  function resetSiswa(id) {
    var o = baca(KUNCI.SISWA, {}) || {};
    delete o[id];
    return tulis(KUNCI.SISWA, o);
  }

  function siswaKelas(program) {
    return daftarSiswa().filter(function (s) { return s.program === program; });
  }

  function cariSiswa(kata) {
    var k = String(kata || "").trim().toLowerCase();
    if (!k) return [];
    return daftarSiswa().filter(function (s) {
      return s.nama.toLowerCase().indexOf(k) > -1 ||
             String(s.nisn).toLowerCase().indexOf(k) > -1 ||
             String(s.kodeBarcode || "").toLowerCase() === k;
    });
  }

  function siswaById(id) {
    return daftarSiswa().filter(function (s) { return String(s.id) === String(id); })[0] || null;
  }

  function nisnValid(nisn) { return /^\d{10}$/.test(String(nisn || "").trim()); }

  function nisnTampil(nisn) { return nisnValid(nisn) ? String(nisn) : (String(nisn || "") + " (belum valid)"); }

  function nisnSudahDipakai(nisn, kecualiId) {
    var n = String(nisn || "").trim();
    if (!n) return null;
    return daftarSiswa().find(function (s) {
      return String(s.nisn).trim() === n && String(s.id) !== String(kecualiId);
    }) || null;
  }

  /* ---------- KELAS / ROMBEL ---------- */
  var KELAS_AWAL = JSON.parse(JSON.stringify(KELAS));

  function muatKelas() {
    var kustom = baca(KUNCI.KELAS, null);
    // Bersihkan properti KELAS saat ini
    Object.keys(KELAS).forEach(function (k) { delete KELAS[k]; });
    // Salin KELAS_AWAL terlebih dahulu
    Object.keys(KELAS_AWAL).forEach(function (k) {
      if (kustom && kustom._dihapus && kustom._dihapus[k]) return;
      KELAS[k] = Object.assign({}, KELAS_AWAL[k], (kustom && kustom.data && kustom.data[k]) || {});
    });
    // Tambahkan kelas baru dari kustom.data
    if (kustom && kustom.data) {
      Object.keys(kustom.data).forEach(function (k) {
        if (kustom._dihapus && kustom._dihapus[k]) return;
        if (!KELAS[k]) {
          KELAS[k] = Object.assign({}, kustom.data[k]);
        }
      });
    }
    return KELAS;
  }

  muatKelas();

  function simpanKelas(kodeProgram, dataKelas, kodeLama) {
    var kode = String(kodeProgram || "").trim().toUpperCase();
    if (!kode) return false;
    var kustom = baca(KUNCI.KELAS, { data: {}, _dihapus: {} }) || { data: {}, _dihapus: {} };
    if (!kustom.data) kustom.data = {};
    if (!kustom._dihapus) kustom._dihapus = {};

    // Jika ganti kode program dari kelas yang sedang diedit
    if (kodeLama && kodeLama !== kode) {
      delete kustom.data[kodeLama];
      if (KELAS_AWAL[kodeLama]) {
        kustom._dihapus[kodeLama] = true;
      }
      // Pindahkan siswa dari kodeLama ke kode baru
      var ubahSiswa = baca(KUNCI.SISWA, {}) || {};
      daftarSiswa().forEach(function (s) {
        if (s.program === kodeLama) {
          if (s.tambahan && Array.isArray(ubahSiswa._tambahan)) {
            var idx = ubahSiswa._tambahan.findIndex(function (t) { return String(t.id) === String(s.id); });
            if (idx > -1) ubahSiswa._tambahan[idx].program = kode;
          } else {
            ubahSiswa[s.id] = Object.assign({}, ubahSiswa[s.id] || {}, { program: kode });
          }
        }
      });
      tulis(KUNCI.SISWA, ubahSiswa);
    }

    delete kustom._dihapus[kode];
    var basis = KELAS_AWAL[kode] || kustom.data[kode] || {};
    var tingkat = parseInt(dataKelas.tingkat, 10) || basis.tingkat || 10;
    var label = String(dataKelas.label || basis.label || kode).trim();
    var nama = String(dataKelas.nama || (label + " - " + kode)).trim();
    var jabatan = String(dataKelas.jabatan || basis.jabatan || "IBS AL FIKRA").trim();
    var wali = String(dataKelas.wali || basis.wali || "-").trim();
    var username = String(dataKelas.username !== undefined ? dataKelas.username : (basis.username || "")).trim().toLowerCase();
    var cetak = basis.cetak || ("detail-siswa.html?kelas=" + encodeURIComponent(kode));

    kustom.data[kode] = {
      tingkat: tingkat,
      label: label,
      nama: nama,
      jabatan: jabatan,
      wali: wali,
      username: username,
      cetak: cetak,
      program: kode,
      jumlah: basis.jumlah || 0,
      kode: label.replace(/^(X|XI|XII)\s+/i, "").trim() || kode,
      tambahan: !KELAS_AWAL[kode]
    };

    tulis(KUNCI.KELAS, kustom);
    muatKelas();

    // Auto-sinkronkan data Wali Kelas ke manajemen akun (KUNCI.AKUN) agar tidak perlu input ulang
    if ((wali && wali !== "-") || username) {
      var listAkun = daftarAkun();
      var targetRombel = kodeLama || kode;
      var idxAkun = listAkun.findIndex(function (a) {
        return a.peran === "Wali Kelas" && (a.rombel === targetRombel || a.rombel === kode || (username && String(a.username).toLowerCase() === username));
      });
      var unameFinal = username || (wali && wali !== "-" ? wali.split(",")[0].replace(/[^a-zA-Z0-9\s]/g, "").trim().toLowerCase() : ("wali_" + kode.toLowerCase()));
      var passDefault = label.replace(/\s+/g, "").toUpperCase() || "123456";
      if (idxAkun > -1) {
        listAkun[idxAkun] = Object.assign({}, listAkun[idxAkun], {
          rombel: kode,
          username: username || listAkun[idxAkun].username,
          nama: (wali && wali !== "-") ? wali : listAkun[idxAkun].nama,
          halaman: "WALI-KELAS/dasbor.html"
        });
        simpanAkun(listAkun);
      } else if (unameFinal) {
        listAkun.push({
          nama: (wali && wali !== "-") ? wali : ("Wali Kelas " + label),
          username: unameFinal,
          password: passDefault,
          peran: "Wali Kelas",
          halaman: "WALI-KELAS/dasbor.html",
          rombel: kode,
          status: "Aktif"
        });
        simpanAkun(listAkun);
      }
    }

    return KELAS[kode];
  }

  function hapusKelas(kodeProgram) {
    var kode = String(kodeProgram || "").trim();
    if (!kode) return false;
    var kustom = baca(KUNCI.KELAS, { data: {}, _dihapus: {} }) || { data: {}, _dihapus: {} };
    if (!kustom.data) kustom.data = {};
    if (!kustom._dihapus) kustom._dihapus = {};
    delete kustom.data[kode];
    kustom._dihapus[kode] = true;
    tulis(KUNCI.KELAS, kustom);
    muatKelas();
    return true;
  }

  function resetSemuaKelas() {
    try { localStorage.removeItem(KUNCI.KELAS); } catch (e) {}
    muatKelas();
    return true;
  }

  function rombelList() {
    muatKelas();
    return Object.keys(KELAS);
  }

  function infoKelas(program) {
    muatKelas();
    return KELAS[program] || null;
  }

  function kelasDariNama(nama) {
    muatKelas();
    var n = String(nama || "").toLowerCase();
    for (var p in KELAS) {
      if ((KELAS[p].wali || "").toLowerCase() === n || (KELAS[p].username || "").toLowerCase() === n) return p;
    }
    return null;
  }

  /* ---------- AKUN ---------- */
  function daftarAkun() {
    var simpan = baca(KUNCI.AKUN, null);
    if (Array.isArray(simpan) && simpan.length > 0) {
      return simpan.map(function (a) { return Object.assign({}, a); });
    }
    return AKUN.map(function (a) { return Object.assign({}, a); });
  }

  function simpanAkun(list) { return tulis(KUNCI.AKUN, list); }

  function halamanPeran(peran) {
    if (peran === "Tentor/Guru Pendamping") return "TENTOR/dasbor.html";
    if (peran === "Wali Kelas") return "WALI-KELAS/dasbor.html";
    if (peran === "Koordinator Program") return "KOORDINATOR/dasboard.html";
    if (peran === "Admin/TU") return "ADMIN/dasbor.html";
    return "index.html";
  }

  function akunSesi() {
    try { return JSON.parse(sessionStorage.getItem("penggunaSaatIni")); }
    catch (e) { return null; }
  }

  function wajibPeran(peran) {
    var sesi = sessionStorage.getItem("sesiPeran") || "";
    var daftar = Array.isArray(peran) ? peran : [peran];
    var boleh = sesi.indexOf("Admin") > -1;
    if (!boleh && sesi) {
      for (var i = 0; i < daftar.length; i++) {
        if (daftar[i] && sesi.toLowerCase().indexOf(String(daftar[i]).toLowerCase()) > -1) {
          boleh = true;
          break;
        }
      }
    }
    if (!sesi || !boleh) {
      alert("Silakan login terlebih dahulu dengan hak akses yang sesuai!");
      window.location.replace("../index.html");
      throw new Error("Akses ditolak: butuh peran " + daftar.join("/"));
    }
    return akunSesi() || { peran: sesi };
  }

  function keluar() {
    sessionStorage.clear();
    window.location.href = "../index.html";
  }

  /* ---------- ABSENSI (dipakai Tentor, Wali Kelas, Koordinator) ---------- */
  function absensi() { return baca(KUNCI.ABSEN, {}); }
  function simpanAbsensi(a) { return tulis(KUNCI.ABSEN, a); }

  function setAbsensi(idSiswa, tanggal, data) {
    var a = absensi();
    a[idSiswa] = a[idSiswa] || {};
    a[idSiswa][tanggal] = Object.assign({}, a[idSiswa][tanggal] || {}, data);
    return simpanAbsensi(a);
  }

  function hapusAbsensi(idSiswa, tanggal) {
    var a = absensi();
    if (a[idSiswa]) delete a[idSiswa][tanggal];
    return simpanAbsensi(a);
  }

  function siswaByNisn(nisn) {
    var n = String(nisn || "").trim();
    if (!n) return null;
    var nUpper = n.toUpperCase();
    return daftarSiswa().find(function (s) {
      return String(s.nisn).trim() === n ||
             String(s.kodeBarcode || "").trim().toUpperCase() === nUpper;
    }) || null;
  }

  function statistikHari(tanggal, program) {
    var a = absensi();
    var tgl = tanggal || hariIni();
    var hasil = { total: 0, H: 0, I: 0, S: 0, A: 0, belum: 0, tepat: 0, terlambat: 0, sangat_terlambat: 0 };
    daftarSiswa().forEach(function (s) {
      if (program && s.program !== program) return;
      hasil.total++;
      var e = (a[s.id] || {})[tgl];
      if (e && ["H", "I", "S", "A"].indexOf(e.s) > -1) {
        hasil[e.s]++;
        if (e.s === "H") {
          if (e.status === "sangat_terlambat") hasil.sangat_terlambat++;
          else if (e.status === "terlambat") hasil.terlambat++;
          else hasil.tepat++;
        }
      } else {
        hasil.belum++;
      }
    });
    return hasil;
  }

  function statistikSiswa(idSiswa, bulan) {
    var a = absensi();
    var r = a[idSiswa] || {};
    var c = { H: 0, I: 0, S: 0, A: 0, n: 0, tepat: 0, terlambat: 0, sangat_terlambat: 0 };
    Object.keys(r).forEach(function (tgl) {
      if (bulan && tgl.indexOf(bulan) !== 0) return;
      var e = r[tgl];
      if (e && c[e.s] !== undefined) {
        c[e.s]++;
        c.n++;
        if (e.s === "H") {
          if (e.status === "sangat_terlambat") c.sangat_terlambat++;
          else if (e.status === "terlambat") c.terlambat++;
          else c.tepat++;
        }
      }
    });
    c.persen = c.n ? Math.round((c.H / c.n) * 100) : 0;
    return c;
  }

  function statusMasuk(waktu) {
    var p = pengaturan();
    var menit = function (t) {
      var x = String(t || "00:00").split(":");
      return (parseInt(x[0], 10) || 0) * 60 + (parseInt(x[1], 10) || 0);
    };
    var m = menit(waktu || jamSekarang());
    var mulai = menit(p.jamMulai || "05:30");
    var tol = mulai + (parseInt(p.toleransi, 10) || 5);
    var batasMaks = mulai + (parseInt(p.batasMaksimal, 10) || 15);
    if (m <= tol) return "tepat";
    if (m <= batasMaks) return "terlambat";
    return "sangat_terlambat";
  }

  function labelStatus(s, subStatus) {
    if (s === "H") {
      if (subStatus === "sangat_terlambat") return { teks: "Sangat Terlambat", warna: "#b71c1c", bg: "#fde8e8", badge: "danger" };
      if (subStatus === "terlambat") return { teks: "Terlambat", warna: "#b45309", bg: "#fef3c7", badge: "warning" };
      return { teks: "Tepat Waktu", warna: "#15803d", bg: "#dcfce7", badge: "success" };
    }
    if (s === "I") return { teks: "Izin", warna: "#1d4ed8", bg: "#dbeafe", badge: "info" };
    if (s === "S") return { teks: "Sakit", warna: "#c2410c", bg: "#ffedd5", badge: "warning" };
    if (s === "A") return { teks: "Alpa", warna: "#b91c1c", bg: "#fee2e2", badge: "danger" };
    return { teks: "Belum Presensi", warna: "#6b7280", bg: "#f3f4f6", badge: "secondary" };
  }

  /* ---------- PENGATURAN ---------- */
  function pengaturan() {
    return Object.assign({}, PENGATURAN_AWAL, baca(KUNCI.PENGATURAN, {}));
  }

  function simpanPengaturan(data) {
    var baru = Object.assign({}, pengaturan(), data || {});
    return tulis(KUNCI.PENGATURAN, baru);
  }

  function jamOperasional() {
    var p = pengaturan();
    var d = new Date();
    var sekarang = d.getHours() * 60 + d.getMinutes();
    var pecah = function (t) {
      var x = String(t || "00:00").split(":");
      return (parseInt(x[0], 10) || 0) * 60 + (parseInt(x[1], 10) || 0);
    };
    return sekarang >= pecah(p.jamMulai) && sekarang <= pecah(p.jamBerakhir);
  }

  /* ---------- NOTIFIKASI KOORDINATOR KE WALI KELAS ---------- */
  function kirimNotifikasiWali(data) {
    var list = baca(KUNCI.NOTIF_WALI, []) || [];
    if (!Array.isArray(list)) list = [];
    var item = {
      id: Date.now(),
      tanggal: hariIni(),
      waktu: jamSekarang(),
      idSiswa: data.idSiswa || null,
      namaSiswa: data.namaSiswa || "",
      rombel: data.rombel || "",
      wali: data.wali || "",
      pesan: data.pesan || "",
      oleh: data.oleh || "Koordinator Program"
    };
    list.unshift(item);
    tulis(KUNCI.NOTIF_WALI, list.slice(0, 100));
    return item;
  }

  function ambilNotifikasiWali(rombel) {
    var list = baca(KUNCI.NOTIF_WALI, []) || [];
    if (!Array.isArray(list)) return [];
    if (!rombel) return list;
    return list.filter(function (n) { return n.rombel === rombel; });
  }

  return {
    KUNCI: KUNCI,
    SISWA: SISWA,
    AKUN: AKUN,
    KELAS: KELAS,
    PENGATURAN_AWAL: PENGATURAN_AWAL,
    baca: baca, tulis: tulis, esc: esc, pad: pad,
    hariIni: hariIni, jamSekarang: jamSekarang, tanggalIndo: tanggalIndo,
    daftarSiswa: daftarSiswa, simpanSiswa: simpanSiswa, tambahSiswa: tambahSiswa, hapusSiswa: hapusSiswa, resetSiswa: resetSiswa,
    siswaKelas: siswaKelas, siswaById: siswaById, siswaByNisn: siswaByNisn, cariSiswa: cariSiswa,
    nisnValid: nisnValid, nisnTampil: nisnTampil, nisnSudahDipakai: nisnSudahDipakai,
    rombelList: rombelList, infoKelas: infoKelas, kelasDariNama: kelasDariNama,
    simpanKelas: simpanKelas, tambahKelas: simpanKelas, hapusKelas: hapusKelas, resetSemuaKelas: resetSemuaKelas, muatKelas: muatKelas,
    daftarAkun: daftarAkun, simpanAkun: simpanAkun, halamanPeran: halamanPeran,
    akunSesi: akunSesi, ambilPenggunaAktif: akunSesi, wajibPeran: wajibPeran, keluar: keluar,
    absensi: absensi, simpanAbsensi: simpanAbsensi, setAbsensi: setAbsensi,
    hapusAbsensi: hapusAbsensi, statistikHari: statistikHari,
    statistikSiswa: statistikSiswa, statusMasuk: statusMasuk, labelStatus: labelStatus,
    pengaturan: pengaturan, simpanPengaturan: simpanPengaturan, jamOperasional: jamOperasional,
    kirimNotifikasiWali: kirimNotifikasiWali, ambilNotifikasiWali: ambilNotifikasiWali
  };
})();

/* Alias agar mudah dipakai di halaman mana pun */
var DATA_SISWA = SBL.SISWA;
var DATA_KELAS = SBL.KELAS;
var DATA_AKUN = SBL.AKUN;


/* ============================================================================
   UNIVERSAL MOBILE DRAWER & SIDEBAR TOGGLE
   ============================================================================ */
(function() {
  function initMobileDrawer() {
    var sb = document.getElementById('sidebar') || document.querySelector('.app-sidebar');
    if (!sb) return;

    var bd = document.getElementById('sidebarBackdrop');
    if (!bd) {
      bd = document.createElement('div');
      bd.id = 'sidebarBackdrop';
      bd.className = 'sidebar-backdrop';
      document.body.appendChild(bd);
    }

    var brand = sb.querySelector('.sidebar-brand');
    if (brand && !sb.querySelector('.sidebar-close-btn')) {
      var closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'sidebar-close-btn';
      closeBtn.setAttribute('aria-label', 'Tutup Menu');
      closeBtn.innerHTML = '✕';
      closeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        sb.classList.remove('sidebar-open');
        bd.classList.remove('active');
        document.body.style.overflow = '';
      };
      brand.appendChild(closeBtn);
    }

    bd.onclick = function() {
      sb.classList.remove('sidebar-open');
      bd.classList.remove('active');
      document.body.style.overflow = '';
    };

    var syncDrawer = function() {
      var isOpen = sb.classList.contains('sidebar-open');
      if (isOpen) {
        bd.classList.add('active');
        if (window.innerWidth <= 900) {
          document.body.style.overflow = 'hidden';
        }
      } else {
        bd.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    if (window.MutationObserver) {
      var observer = new MutationObserver(syncDrawer);
      observer.observe(sb, { attributes: true, attributeFilter: ['class'] });
    }

    var navItems = sb.querySelectorAll('.nav-item');
    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener('click', function() {
        if (window.innerWidth <= 900) {
          sb.classList.remove('sidebar-open');
          bd.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  window.toggleSidebar = function() {
    var sb = document.getElementById('sidebar') || document.querySelector('.app-sidebar');
    if (!sb) return;
    var bd = document.getElementById('sidebarBackdrop');
    var willOpen = !sb.classList.contains('sidebar-open');
    sb.classList.toggle('sidebar-open');
    if (bd) {
      bd.classList.toggle('active', willOpen);
    }
    if (window.innerWidth <= 900) {
      document.body.style.overflow = willOpen ? 'hidden' : '';
    }
  };

  function sinkronTabelMobile() {
    if (!document.querySelectorAll) return;
    var tables = document.querySelectorAll('table');
    for (var t = 0; t < tables.length; t++) {
      var tbl = tables[t];
      var ths = tbl.querySelectorAll('thead th');
      if (!ths.length) ths = tbl.querySelectorAll('tr:first-child th');
      var labels = [];
      for (var h = 0; h < ths.length; h++) {
        var txt = (ths[h].innerText || ths[h].textContent || '').replace(/\s+/g, ' ').trim();
        // Persingkat label panjang seperti "Nama Lengkap Siswa (Klik untuk Edit)"
        txt = txt.replace(/\s*\(Klik[^)]*\)/gi, '').trim();
        labels.push(txt);
      }
      var rows = tbl.querySelectorAll('tbody tr');
      for (var r = 0; r < rows.length; r++) {
        var tds = rows[r].children;
        for (var c = 0; c < tds.length; c++) {
          var td = tds[c];
          if (!td || td.tagName !== 'TD') continue;
          if (td.hasAttribute('colspan')) {
            td.setAttribute('data-colspan', 'true');
            continue;
          }
          var lbl = labels[c] || '';
          if (lbl && td.getAttribute('data-label') !== lbl) {
            td.setAttribute('data-label', lbl);
          }
          var isAksi = lbl.toLowerCase().indexOf('aksi') > -1 ||
                       td.classList.contains('aksi-kolom') ||
                       !!td.querySelector('button, .btn, .btn-table-action, .aksi-grup');
          if (isAksi && !td.hasAttribute('data-field')) {
            td.setAttribute('data-aksi', 'true');
          }
        }
      }
    }
  }

  var _rafTabel = null;
  function jadwalkanSinkronTabel() {
    if (_rafTabel) return;
    _rafTabel = (window.requestAnimationFrame || setTimeout)(function() {
      _rafTabel = null;
      sinkronTabelMobile();
    }, 30);
  }

  function sinkronDasborKelasWali(kodeManual) {
    var kode = kodeManual || (typeof window.KODE_ROMBEL !== 'undefined' ? window.KODE_ROMBEL : null);
    if (!kode || !document.getElementById('presensiTbody')) return;

    // 1. RBAC Guard Vertikal & Horizontal
    var sesi = SBL.wajibPeran(['Wali', 'Admin', 'Koordinator']);
    var isWali = sesi && String(sesi.peran || '').toLowerCase().indexOf('wali') > -1;
    if (isWali && sesi.rombel && sesi.rombel !== kode) {
      var infoAsli = SBL.infoKelas(sesi.rombel);
      alert('Akses ditolak: Anda hanya memiliki hak akses untuk kelas perwalian Anda (' + (infoAsli ? infoAsli.label : sesi.rombel) + ').');
      window.location.replace(infoAsli && infoAsli.cetak ? infoAsli.cetak : 'dasbor.html');
      return;
    }

    var info = SBL.infoKelas(kode) || {};
    var siswaList = SBL.siswaKelas(kode);
    var tglHariIni = SBL.hariIni();
    var tglIndo = SBL.tanggalIndo(tglHariIni);
    var dNow = new Date();
    var namaBulanTahun = dNow.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    var bulanPrefix = tglHariIni.slice(0, 7);

    // 2. Perbarui Tanggal Statis, Lokasi Cetak, & Nama Wali Kelas
    var walkText = document.querySelectorAll('p, span, h3, div');
    for (var i = 0; i < walkText.length; i++) {
      var el = walkText[i];
      if (el.children.length === 0 && el.textContent) {
        if (el.textContent.indexOf('Rabu, 30 September 2026') > -1) {
          el.textContent = el.textContent.replace('Rabu, 30 September 2026', tglIndo);
        }
        if (el.textContent.indexOf('Surakarta, 30 September 2026') > -1) {
          el.textContent = 'Jepara, ' + tglIndo;
        }
        if (el.textContent.indexOf('Bulan September 2026') > -1) {
          el.textContent = 'Bulan ' + namaBulanTahun;
        }
        if (el.textContent.indexOf('Total Siswa:') > -1) {
          el.textContent = 'Total Siswa: ' + siswaList.length;
        }
      }
    }

    // 3. Perbarui 4 Kartu Statistik Atas & Tingkat Kehadiran Kelas dari SBL.statistikHari
    var stat = SBL.statistikHari(tglHariIni, kode);
    var hadirTotal = stat.tepat + stat.terlambat + stat.sangat_terlambat;
    var persenHari = stat.total ? ((hadirTotal / stat.total) * 100).toFixed(1) + '%' : '0.0%';
    var persenTepat = stat.total ? ((stat.tepat / stat.total) * 100).toFixed(1) + '% kehadiran tepat waktu' : 'Belum ada data';

    var secDash = document.getElementById('sec-dashboard');
    if (secDash) {
      var bannerPersen = secDash.querySelector('.text-2xl.font-bold.text-emerald-400');
      if (bannerPersen) bannerPersen.textContent = persenHari;
      var namaWaliBanner = secDash.querySelector('h3.text-2xl.font-bold.text-white');
      if (namaWaliBanner && info.wali) namaWaliBanner.textContent = info.wali;

      var statCards = secDash.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-4 h3.text-2xl.font-bold');
      if (statCards.length >= 4) {
        statCards[0].textContent = stat.total;
        statCards[1].textContent = stat.tepat;
        statCards[2].textContent = stat.terlambat + stat.sangat_terlambat;
        statCards[3].textContent = stat.A;
        var subTepat = statCards[1].parentElement && statCards[1].parentElement.querySelector('p:last-child');
        if (subTepat) subTepat.textContent = persenTepat;
      }
    }

    // 4. Override renderRekap agar dihitung otomatis dari data absensi nyata (SBL.statistikSiswa)
    window.renderRekap = function() {
      var tbody = document.getElementById('rekapTbody');
      if (!tbody) return;
      tbody.innerHTML = '';
      var list = SBL.siswaKelas(kode);
      list.forEach(function(siswa, idx) {
        var st = SBL.statistikSiswa(siswa.id, bulanPrefix);
        var tepat = st.tepat;
        var lambat = st.terlambat + st.sangat_terlambat;
        var izinSakit = st.I + st.S;
        var alpa = st.A;
        var pctVal = st.n ? st.persen : 100;
        var persenTeks = st.n ? (st.persen + '%') : 'Belum Ada Data';
        var badgeColor = !st.n ? 'bg-slate-100 text-slate-600' : (pctVal >= 85 ? 'bg-emerald-100 text-emerald-800' : (pctVal >= 75 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'));

        tbody.innerHTML +=
          '<tr>' +
            '<td class="p-3 text-xs text-slate-400">' + (idx + 1) + '</td>' +
            '<td class="p-3 font-mono text-xs text-slate-600">' + SBL.esc(siswa.nisn) + '</td>' +
            '<td class="p-3 font-medium text-slate-800">' + SBL.esc(siswa.nama) + '</td>' +
            '<td class="p-3 text-center font-bold text-emerald-600">' + tepat + ' Hari</td>' +
            '<td class="p-3 text-center font-semibold text-amber-600">' + lambat + ' Hari</td>' +
            '<td class="p-3 text-center">' + izinSakit + ' Hari</td>' +
            '<td class="p-3 text-center font-semibold text-rose-600">' + alpa + ' Hari</td>' +
            '<td class="p-3 text-center"><span class="' + badgeColor + ' text-xs px-2.5 py-1 rounded-full font-bold">' + persenTeks + '</span></td>' +
          '</tr>';
      });
    };
    window.renderRekap();

    // 5. Scoped Catatan Wali Kelas per Rombel
    var keyCatatan = 'catatanWaliKelas_' + kode;
    var savedCat = localStorage.getItem(keyCatatan) || localStorage.getItem('catatanWaliKelas_' + kode.replace(/[^a-zA-Z0-9]/g, '_')) || '';
    var inputCat = document.getElementById('inputCatatanWali');
    var printCat = document.getElementById('tampilCatatanPrint');
    if (inputCat) inputCat.value = savedCat;
    if (printCat && savedCat) printCat.innerText = savedCat;

    window.simpanCatatanWali = function() {
      var txt = inputCat ? inputCat.value : '';
      if (txt.trim() === '') {
        alert('Silakan tuliskan catatan terlebih dahulu!');
        return;
      }
      localStorage.setItem(keyCatatan, txt);
      if (printCat) printCat.innerText = txt;
      alert('Catatan Wali Kelas ' + (info.label || kode) + ' berhasil disimpan!');
    };

    // 6. Perbaiki filterTable agar mendukung pencarian di semua kolom tabel
    window.filterTable = function(tableId) {
      var input = document.getElementById('searchInput');
      if (!input) return;
      var filter = input.value.toUpperCase();
      var table = document.getElementById(tableId);
      if (!table) return;
      var tr = table.getElementsByTagName('tr');
      for (var r = 1; r < tr.length; r++) {
        var rowText = (tr[r].textContent || tr[r].innerText || '').toUpperCase();
        tr[r].style.display = rowText.indexOf(filter) > -1 ? '' : 'none';
      }
    };
  }

  function initUniversalMobile() {
    initMobileDrawer();
    sinkronDasborKelasWali();
    setTimeout(sinkronDasborKelasWali, 20);
    sinkronTabelMobile();
    if (window.MutationObserver && document.body) {
      var tblObserver = new MutationObserver(jadwalkanSinkronTabel);
      tblObserver.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUniversalMobile);
  } else {
    initUniversalMobile();
  }
})();
