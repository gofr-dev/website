#!/usr/bin/env bash
# Sync the gofr-dev/gofr docs (which live in a separate repo) into this
# website's app/ tree. Required before `next build` or `docker build`,
# because the website tree only ships layout.jsx files and the markdown
# is mastered in the framework repo.
#
# Usage:
#   ./utils/sync-docs.sh               # uses ../gofr/docs by default
#   GOFR_DOCS=/path/to/gofr/docs ./utils/sync-docs.sh
#
# Idempotent: rsync deletes nothing outside the routes it targets and
# preserves layout.jsx files that already live in the website tree.

set -euo pipefail

WEBSITE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GOFR_DOCS="${GOFR_DOCS:-$WEBSITE_ROOT/../gofr/docs}"

if [[ ! -d "$GOFR_DOCS" ]]; then
  echo "error: GOFR_DOCS not found at $GOFR_DOCS" >&2
  echo "       set GOFR_DOCS=/path/to/gofr/docs and re-run" >&2
  exit 1
fi

# Routes whose page.md is sourced from a same-named dir under gofr/docs/.
# Each rsync excludes layout.jsx so the website-side React layout wrapper
# is preserved.
declare -a TOP_ROUTES=(faq learn why-gofr migrate comparison)

for route in "${TOP_ROUTES[@]}"; do
  src="$GOFR_DOCS/$route/"
  dst="$WEBSITE_ROOT/src/app/$route/"
  if [[ -d "$src" ]]; then
    mkdir -p "$dst"
    rsync -a --exclude='layout.jsx' "$src" "$dst"
    echo "synced /$route"
  fi
done

# Everything that should land under /docs/ (quick-start, advanced-guide,
# datasources, guides, references). The website's src/app/docs/ ships
# only a layout.jsx and a public/ image dir; we mirror the rest from
# gofr/docs/ minus the routes already handled above.
rsync -a --delete \
  --exclude='layout.jsx' \
  --exclude='public/' \
  --exclude='comparison/' \
  --exclude='faq/' \
  --exclude='learn/' \
  --exclude='why-gofr/' \
  --exclude='migrate/' \
  --exclude='AGENTS.md' \
  --exclude='Dockerfile' \
  --exclude='navigation.js' \
  --exclude='*.json' \
  "$GOFR_DOCS/" "$WEBSITE_ROOT/src/app/docs/"
echo "synced /docs/*"
