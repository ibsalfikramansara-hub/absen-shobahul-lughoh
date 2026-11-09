@echo off
chcp 65001 >nul
title Pusat Kendali Deployment · Presensi Shobahul Lughoh MAN 1 Jepara
color 0A

cd /d "%~dp0"

:MENU
cls
echo ============================================================================
echo   🏫 SISTEM PRESENSI SHOBAHUL LUGHOH ^& ENGLISH MORNING
echo   MAN 1 JEPARA / ALFIKRA — CONTROL PANEL ^& DEPLOYMENT
echo ============================================================================
echo.
echo   PILIH TINDAKAN YANG INGIN DIJALANKAN:
echo.
echo   [1] 🌐 Jalankan Server Lokal (http://localhost:3000)
echo   [2] 🧪 Jalankan Automated Unit Test Suite (100%% Test Coverage)
echo   [3] 🚀 Unggah ^& Sinkronisasi ke GitHub + Auto-Deploy Vercel
echo   [4] 💾 Backup / Ekspor Data Master ke JSON (initial_data.json)
echo   [5] ⚡ Online-kan Server ke Internet via Cloudflare Tunnel (Darurat)
echo   [0] ❌ Keluar
echo.
echo ============================================================================
set /p PILIHAN="👉 Masukkan nomor pilihan Anda [0-5]: "

if "%PILIHAN%"=="1" goto RUN_LOCAL
if "%PILIHAN%"=="2" goto RUN_TEST
if "%PILIHAN%"=="3" goto RUN_PUSH
if "%PILIHAN%"=="4" goto RUN_EXPORT
if "%PILIHAN%"=="5" goto RUN_TUNNEL
if "%PILIHAN%"=="0" goto KELUAR

echo.
echo [PERINGATAN] Pilihan tidak valid! Silakan masukkan angka 0 sampai 5.
timeout /t 2 >nul
goto MENU

:RUN_LOCAL
cls
echo ============================================================================
echo   [1] MENJALANKAN SERVER LOKAL MANDIRI
echo ============================================================================
echo.
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js belum ditemukan di sistem ini!
    echo Silakan install Node.js dari https://nodejs.org
    pause
    goto MENU
)

echo [OK] Node.js terdeteksi. Membuka browser otomatis dalam 1 detik...
start "" cmd /c "timeout /t 1 /nobreak >nul && start http://localhost:3000"
echo.
node server.js
echo.
pause
goto MENU

:RUN_TEST
cls
echo ============================================================================
echo   [2] MENJALANKAN AUTOMATED UNIT TEST SUITE
echo ============================================================================
echo.
npm test
echo.
pause
goto MENU

:RUN_PUSH
cls
echo ============================================================================
echo   [3] UNGGAH ^& SINKRONISASI KE GITHUB + AUTO-DEPLOY VERCEL
echo ============================================================================
echo.
call upload_ke_github.bat
goto MENU

:RUN_EXPORT
cls
echo ============================================================================
echo   [4] BACKUP / EKSPOR DATA MASTER KE initial_data.json
echo ============================================================================
echo.
node export_seed.js
echo.
echo [OK] Data master berhasil diekspor ke file initial_data.json!
echo Berkas ini siap digunakan sebagai data seed bawaan di server Vercel.
echo.
pause
goto MENU

:RUN_TUNNEL
cls
echo ============================================================================
echo   [5] MEMBUKA CLOUDFLARE TUNNEL DARURAT
echo ============================================================================
echo.
call online_tunnel.bat
goto MENU

:KELUAR
echo.
echo Terima kasih! Sistem ditutup.
exit /b 0
