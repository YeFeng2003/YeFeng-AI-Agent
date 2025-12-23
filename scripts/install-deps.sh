#!/usr/bin/env bash
set -euo pipefail

if command -v pnpm >/dev/null 2>&1; then
  echo "Using pnpm"
  pnpm install
else
  echo "pnpm not found, fallback to npm"
  npm install
fi

echo "Dependencies installed."
