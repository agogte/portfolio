#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

BRANCH="gh-pages"
MESSAGE="Deploy to GitHub Pages"

while getopts "m:" opt; do
  case "$opt" in
    m) MESSAGE="$OPTARG" ;;
    *)
      echo "Usage: ./deploy.sh [-m \"commit message\"]" >&2
      exit 1
      ;;
  esac
done

if [ ! -d node_modules ]; then
  echo "==> Installing dependencies"
  npm ci
fi

echo "==> Building production bundle"
CI=false npm run build

if [ ! -f build/index.html ]; then
  echo "Build did not produce build/index.html, aborting." >&2
  exit 1
fi

echo "==> Publishing build/ to origin/$BRANCH"
npx gh-pages --dist build --branch "$BRANCH" --message "$MESSAGE"

echo
echo "Done. GitHub Pages usually takes a minute to update."
echo "Live at: https://agogte.github.io/portfolio"
