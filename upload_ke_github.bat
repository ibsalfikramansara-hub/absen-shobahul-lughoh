@echo off
chcp 65001 >nul
title Upload ke GitHub & Vercel Auto-Deploy · MAN 1 Jepara
color 0B

echo ============================================================================
echo   🚀 UPLOAD KE GITHUB ^& VERCEL ONE-CLICK AUTO DEPLOY
echo   Presensi Shobahul Lughoh ^& English Morning - MAN 1 Jepara
echo ============================================================================
echo.

cd /d "%~dp0"

:: 1. Verifikasi Git terpasang
where git >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Git belum terpasang di komputer ini!
    echo Silakan unduh dan install Git dari: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

:: 2. Inisialisasi Git jika belum ada
if not exist ".git" (
    echo [INFO] Menginisialisasi repositori Git lokal...
    git init
    git branch -M main
    echo [OK] Repositori Git lokal berhasil diinisialisasi.
    echo.
)

:: Pastikan branch aktif bernama main
git branch -M main >nul 2>nul

:: 3. Verifikasi Remote Repository
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 (
    echo [PERHATIAN] Repositori remote GitHub (origin) belum terhubung.
    echo.
    echo Silakan buat repositori baru di GitHub (https://github.com/new),
    echo lalu salin URL repositorinya (misal: https://github.com/username/absen-shobahul-lughoh.git)
    echo.
    set /p "REPO_URL=👉 Masukkan URL Repositori GitHub Anda: "
    if defined REPO_URL (
        git remote add origin "%REPO_URL%"
        echo [OK] Remote origin berhasil ditambahkan: %REPO_URL%
    ) else (
        color 0C
        echo [BATAL] URL repositori tidak diisi. Proses dibatalkan.
        pause
        exit /b 1
    )
    echo.
)

:: 4. Cek remote URL saat ini
for /f "delims=" %%i in ('git remote get-url origin 2^>nul') do set "CURRENT_REMOTE=%%i"
echo [INFO] Repositori Tujuan : %CURRENT_REMOTE%
echo [INFO] Target Branch     : main
echo.

:: 5. Tambahkan perubahan dan Commit
echo [1/3] Menyiapkan berkas proyek (git add)...
git add -A

:: Cek apakah ada perubahan yang perlu di-commit
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo [INFO] Tidak ada perubahan berkas baru yang perlu di-commit.
) else (
    echo [2/3] Membuat commit otomatis dengan timestamp...
    set "TIMESTAMP=%date% %time%"
    git commit -m "Auto-deploy update: %TIMESTAMP% [Production Ready]"
)

echo.
echo [3/3] Mengunggah (git push) ke GitHub branch main...
echo.
echo 💡 CATATAN PENTING:
echo Jika muncul pop-up jendela browser "GitHub Sign In",
echo silakan klik tombol "Sign in with your browser" untuk login sekali saja.
echo.

git push -u origin main
if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ============================================================================
    echo   🎉 SUKSES BESAR! PROYEK TELAH TERUNGGAH KE GITHUB!
    echo ============================================================================
    echo   👉 Repositori: %CURRENT_REMOTE%
    echo   👉 Vercel akan otomatis mendeteksi perubahan ini dan melakukan
    echo      deployment instan dalam beberapa detik!
    echo.
    echo   Jika repositori ini sudah dihubungkan ke Vercel (https://vercel.com),
    echo   aplikasi Anda di https://*.vercel.app langsung ter-update secara otomatis!
    echo ============================================================================
) else (
    color 0C
    echo.
    echo ============================================================================
    echo   ⚠️ PUSH DITOLAK ATAU BUTUH PENYESUAIAN
    echo ============================================================================
    echo   Kemungkinan penyebab:
    echo   1. Repositori di GitHub berisi file baru (README / License).
    echo      Mencoba sinkronisasi (git pull --rebase)...
    echo.
    git pull --rebase origin main
    echo.
    echo   Mencoba push ulang...
    git push -u origin main
    if %errorlevel% equ 0 (
        color 0A
        echo [OK] Berhasil diunggah setelah sinkronisasi!
    ) else (
        echo [TIPS] Pastikan akun GitHub Anda memiliki hak akses tulis ke repositori ini.
    )
)

echo.
pause
