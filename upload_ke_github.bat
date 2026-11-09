@echo off
setlocal EnableDelayedExpansion
title Upload ke GitHub dan Vercel Auto-Deploy - MAN 1 Jepara
color 0b

echo ============================================================================
echo   UPLOAD KE GITHUB DAN VERCEL ONE-CLICK AUTO DEPLOY
echo   Presensi Shobahul Lughoh dan English Morning - MAN 1 Jepara
echo ============================================================================
echo.

cd /d "%~dp0"

:: 1. Verifikasi Git terpasang
where git >nul 2>nul
if %errorlevel% equ 0 goto GIT_OK

color 0c
echo [ERROR] Git belum terpasang di komputer ini!
echo Silakan download dan install Git dari: https://git-scm.com/download/win
echo.
pause
exit /b 1

:GIT_OK
echo [OK] Git terdeteksi di sistem.

:: 2. Inisialisasi Git jika belum ada
if exist ".git" goto REPO_EXISTS
echo [INFO] Menginisialisasi repositori Git lokal...
git init
git branch -M main
echo [OK] Repositori Git lokal berhasil dibuat.
echo.

:REPO_EXISTS
git branch -M main >nul 2>nul

:: 3. Verifikasi Remote Repository
git remote get-url origin >nul 2>nul
if %errorlevel% equ 0 goto REMOTE_OK

echo.
echo [PERHATIAN] Repositori remote GitHub origin belum terhubung.
echo.
echo Silakan buat repositori baru di GitHub https://github.com/new
echo lalu salin URL repositorinya.
echo Contoh: https://github.com/username/absen-shobahul-lughoh.git
echo.
set /p REPO_URL="Masukkan URL Repositori GitHub Anda: "

if not defined REPO_URL goto NO_URL

git remote add origin "%REPO_URL%"
echo [OK] Remote origin berhasil ditambahkan: %REPO_URL%
goto REMOTE_OK

:NO_URL
color 0c
echo [BATAL] URL repositori tidak diisi. Proses dihentikan.
pause
exit /b 1

:REMOTE_OK
echo.
for /f "delims=" %%i in ('git remote get-url origin 2^>nul') do set CURRENT_REMOTE=%%i
echo [INFO] Repositori Tujuan : %CURRENT_REMOTE%
echo [INFO] Target Branch     : main
echo.

:: 4. Tambahkan perubahan dan Commit
echo [1/3] Menyiapkan berkas proyek (git add)...
git add -A

git diff --cached --quiet
if %errorlevel% equ 0 goto NO_CHANGES

echo [2/3] Membuat commit otomatis dengan timestamp...
set COMMIT_MSG=Auto-deploy update: %date% %time%
git commit -m "%COMMIT_MSG%"
goto DO_PUSH

:NO_CHANGES
echo [2/3] Tidak ada perubahan berkas baru yang perlu di-commit.

:DO_PUSH
echo.
echo [3/3] Mengunggah (git push) ke GitHub branch main...
echo.
echo CATATAN PENTING:
echo Jika muncul jendela browser GitHub Sign In,
echo klik tombol 'Sign in with your browser' untuk login.
echo.

git push -u origin main
if %errorlevel% equ 0 goto PUSH_SUCCESS

color 0c
echo.
echo ============================================================================
echo   PERINGATAN: PUSH PERTAMA GAGAL ATAU BUTUH SINKRONISASI
echo ============================================================================
echo   Mencoba sinkronisasi (git pull --rebase)...
echo.
git pull --rebase origin main
echo.
echo   Mencoba push ulang...
git push -u origin main
if %errorlevel% equ 0 goto PUSH_SUCCESS

echo.
echo [TIPS] Pastikan:
echo 1. Anda sudah login ke akun GitHub Anda.
echo 2. URL repositori sudah benar dan akun Anda memiliki izin akses tulis.
echo.
pause
exit /b 1

:PUSH_SUCCESS
color 0a
echo.
echo ============================================================================
echo   SUKSES! PROYEK TELAH TERUNGGAH KE GITHUB
echo ============================================================================
echo   Repositori : %CURRENT_REMOTE%
echo.
echo   Vercel akan otomatis mendeteksi perubahan ini dan melakukan
echo   deployment instan dalam beberapa detik!
echo.
echo   Buka https://vercel.com untuk melihat status deployment online Anda.
echo ============================================================================
echo.
pause
exit /b 0
