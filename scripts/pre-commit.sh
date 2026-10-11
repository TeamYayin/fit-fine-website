#!/bin/bash
echo "========================================"
echo "Running fit-fine-website Pre-Commit..."
echo "========================================"

# Run unit tests
echo "[1/2] Running Unit Tests..."
npm test
TEST_STATUS=$?

if [ $TEST_STATUS -ne 0 ]; then
  echo "❌ Unit tests failed. Commit aborted."
  exit 1
fi

echo "✅ Unit tests passed!"

# Run Astro build
echo "[2/2] Running Astro Static Site Build..."
npm run build
BUILD_STATUS=$?

if [ $BUILD_STATUS -ne 0 ]; then
  echo "❌ Astro build failed. Commit aborted."
  exit 1
fi

echo "✅ Astro build passed!"

echo "========================================"
echo "All tests passed! Performing Git Commit..."
echo "========================================"

git add .
git commit -m "${1:-"feat: Rework fit-fine-website into Astro"}"

echo "✅ Commit successful!"
exit 0

