#!/bin/bash
#
# Build the site and publish it to GitHub Pages.
#
# Publishes the contents of build/ to the `gh-pages` branch of origin, which
# is what https://agogte.github.io/portfolio serves. The `homepage` field in
# package.json sets the asset base path, so keep the two in sync.
#
# Usage: ./deploy.sh [-m "commit message"]

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
# CI=true turns warnings into errors on some runners; keep the build tolerant
# so a stray lint warning doesn't block a deploy.
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
