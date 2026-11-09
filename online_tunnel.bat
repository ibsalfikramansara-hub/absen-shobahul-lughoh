@echo off
setlocal EnableDelayedExpansion
title Cloudflare Quick Tunnel - Online-kan Presensi MAN 1 Jepara
color 0e

echo ============================================================================
echo   CLOUDFLARE QUICK TUNNEL - 1-KLIK ONLINE INSTAN
echo   Presensi Shobahul Lughoh dan English Morning - MAN 1 Jepara
echo ============================================================================
echo   100%% Gratis Selamanya Tanpa Kartu Kredit dan Tanpa Perlu Setup Akun
echo ============================================================================
echo.

cd /d "%~dp0"

:: 1. Cek ketersediaan Node.js
where node >nul 2>nul
if %errorlevel% equ 0 goto NODE_OK

color 0c
echo [ERROR] Node.js belum ditemukan. Harap pasang Node.js terlebih dahulu.
pause
exit /b 1

:NODE_OK
:: 2. Cek apakah server lokal port 3000 sedang aktif
netstat -ano | findstr :3000 >nul 2>nul
if %errorlevel% equ 0 goto SERVER_RUNNING

echo [INFO] Menjalankan server lokal di background pada port 3000...
start "Server Presensi Shobahul Lughoh" /min cmd /c "node local-server.js"
timeout /t 2 /nobreak >nul
goto CHECK_CLOUDFLARED

:SERVER_RUNNING
echo [OK] Server lokal port 3000 terdeteksi aktif.

:CHECK_CLOUDFLARED
set CLOUDFLARED_BIN=
where cloudflared >nul 2>nul
if %errorlevel% equ 0 (
    set CLOUDFLARED_BIN=cloudflared
    goto START_TUNNEL
)

if exist "cloudflared.exe" (
    set CLOUDFLARED_BIN=cloudflared.exe
    goto START_TUNNEL
)

echo.
echo [INFO] Tool Cloudflared belum ditemukan di komputer Anda.
echo Mengunduh Cloudflared Windows resmi dari Cloudflare GitHub...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe', 'cloudflared.exe')"

if exist "cloudflared.exe" (
    set CLOUDFLARED_BIN=cloudflared.exe
    echo [OK] Cloudflared berhasil diunduh.
    goto START_TUNNEL
)

echo [INFO] Mencoba alternatif Cloudflared melalui npx...
set CLOUDFLARED_BIN=npx --yes cloudflared

:START_TUNNEL
echo.
echo ============================================================================
echo   MEMBUAT TEROWONGAN PUBLIK HTTPS AMAN...
echo ============================================================================
echo   Tunggu 5-10 detik sampai muncul URL berakhiran:
echo   [URL] https://xxxxxxxx.trycloudflare.com
echo.
echo   URL tersebut dapat langsung dibuka dari HP/Smartphone siswa, tentor,
echo   dan wali kelas dari jaringan manapun di seluruh dunia!
echo   Tekan CTRL+C jika ingin mematikan akses online.
echo ============================================================================
echo.

%CLOUDFLARED_BIN% tunnel --url http://localhost:3000

pause
exit /b 0
