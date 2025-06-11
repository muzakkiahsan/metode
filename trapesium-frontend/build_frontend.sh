#!/bin/bash

echo "--- Memulai build frontend di trapesium-frontend ---"
pwd
ls -la # See what's here

echo "Mencari npm di PATH:"
command -v npm

if [ $? -ne 0 ]; then
    echo "ERROR: npm masih TIDAK DITEMUKAN di PATH!"
    echo "PATH saat ini: $PATH"

    # Tambahkan ini untuk debugging: cek isi /root/.nix-profile/bin
    echo "Isi /root/.nix-profile/bin:"
    ls -la /root/.nix-profile/bin || echo "Gagal melihat /root/.nix-profile/bin"

    # Tambahkan ini untuk debugging: cek versi node jika ada
    echo "Mencoba menjalankan node -v langsung dari /root/.nix-profile/bin/node:"
    /root/.nix-profile/bin/node -v || echo "node tidak ditemukan di /root/.nix-profile/bin/node"

    # Ini adalah penyebab utama exit 1
    exit 1
fi

echo "npm ditemukan. Menjalankan npm install..."
npm install --no-fund --no-audit
if [ $? -ne 0 ]; then
    echo "ERROR: npm install gagal!"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: npm run build gagal!"
    exit 1
fi

echo "--- Build frontend selesai ---"
