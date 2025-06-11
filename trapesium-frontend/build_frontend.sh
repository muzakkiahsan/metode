#!/bin/bash

# Cek apakah node tersedia
if ! command -v node &> /dev/null; then
    echo "Node.js tidak ditemukan, mencoba menginstall..."
    # Untuk nixpacks, gunakan nix-env
    nix-env -iA nixpkgs.nodejs_18 nixpkgs.nodePackages.npm
fi

# Cek lagi setelah instalasi
if ! command -v node &> /dev/null; then
    echo "GAGAL: Node.js masih tidak tersedia"
    exit 1
fi

echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

# Lanjutkan dengan build frontend
cd trapesium-frontend
npm install
npm run build
