#!/bin/bash

echo "--- Memulai build frontend di trapesium-frontend ---"

# Cek apakah kita berada di direktori yang benar
pwd
ls -la

# Coba cari npm di PATH yang ada
echo "Mencari npm di PATH:"
command -v npm

# Periksa exit code dari 'command -v npm'
if [ $? -ne 0 ]; then
    echo "ERROR: npm masih TIDAK DITEMUKAN di PATH!"
    echo "PATH saat ini: $PATH"
    echo "Coba instal ulang npm (jika ini terjadi, ini masalah di Nixpacks)"
    # Tambahkan perintah untuk menginstal ulang npm jika benar-benar tidak ada
    # Ini sangat jarang dibutuhkan jika 'nodejs-22_x' sudah diinstal,
    # tetapi sebagai debugging, bisa dicoba jika semua gagal.
    # Misalnya: curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    # atau coba cari path nodejs di /nix/store dan tambahkan ke PATH
    # export PATH="/nix/store/$(ls -d /nix/store/*-nodejs-*/bin | head -n 1):$PATH" # Ini hanya untuk debugging dan tidak selalu akurat
    exit 1 # Keluar dengan error agar Railway tahu ada masalah
fi

echo "npm ditemukan. Menjalankan npm install..."
npm install --no-fund --no-audit
if [ $? -ne 0 ]; then
    echo "ERROR: npm install gagal!"
    exit 1
fi

echo "Menjalankan npm run build..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: npm run build gagal!"
    exit 1
fi

echo "--- Build frontend selesai ---"