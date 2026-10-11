#!/usr/bin/env bash
set -e

echo "=== Running Pre-Commit Verification (Astro Coming Soon) ==="

echo "1. Running unit tests..."
npm test

echo "2. Building static site..."
npm run build

echo "=== All checks passed successfully! ==="

