#!/bin/bash
COMMIT_MSG="$1"

if [ -z "$COMMIT_MSG" ]; then
  echo "❌ Error: Commit message is required."
  echo "Usage: ./scripts/pre-commit.sh \"<type>(<scope>): <distinct description>\""
  echo "Example: ./scripts/pre-commit.sh \"feat(contact): add calendar picker and phone validation\""
  exit 1
fi

echo "========================================"
echo "Running fit-fine-website Pre-Commit..."
echo "Commit message: $COMMIT_MSG"
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
git commit -m "$COMMIT_MSG"

echo "✅ Commit successful!"
exit 0

