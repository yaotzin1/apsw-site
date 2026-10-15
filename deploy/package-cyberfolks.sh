#!/usr/bin/env bash
# Assembles the production upload for Cyber_Folks (shared hosting, no build
# step on the server) and zips it. Runs in Git Bash on Windows and on Linux;
# needs only git, tar and either zip or PowerShell.
#
#   ./deploy/package-cyberfolks.sh            # -> dist/upload/ + dist/apsw-site-<sha>.zip
#
# Upload the CONTENTS of dist/upload/ into public_html/ (or unzip the archive
# there). The file list is what git tracks (plus new, not-yet-committed files)
# minus sources, branding originals, logs, secrets and the Docker/VPS stack —
# the same shape as .dockerignore.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
    echo "package: working tree has uncommitted changes; packaging them anyway" >&2
fi

SHA="$(git rev-parse --short HEAD)"
OUT="dist/upload"
ZIP="dist/apsw-site-${SHA}.zip"

rm -rf dist
mkdir -p "${OUT}"

# Tracked + untracked-but-not-ignored files, then drop what production does not serve.
git ls-files --cached --others --exclude-standard \
    | grep -Ev '^(\.github|\.agents|\.logs|\.security|branding_raw|showcase-src|deploy|docker|dist)/' \
    | grep -Ev '^(Dockerfile|docker-compose.*\.yml|\.dockerignore|\.gitignore|\.gitattributes|\.env|\.env\.example|LICENSE|README\.md|.*\.tex|.*\.log)$' \
    > dist/filelist.txt

tar -cf - -T dist/filelist.txt | tar -xf - -C "${OUT}"

# The inquiry log directory must exist and stay unreadable over HTTP.
mkdir -p "${OUT}/.logs"
printf 'Deny from all\n' > "${OUT}/.logs/.htaccess"

if command -v zip >/dev/null 2>&1; then
    ( cd "${OUT}" && zip -qr "../$(basename "${ZIP}")" . )
elif command -v powershell.exe >/dev/null 2>&1; then
    # Compress-Archive skips dotfiles given a folder, so hand it the entries explicitly.
    powershell.exe -NoProfile -Command \
        "Compress-Archive -Path (Get-ChildItem -Force -LiteralPath '${OUT}' | ForEach-Object FullName) -DestinationPath '${ZIP}' -Force" \
        >/dev/null
else
    echo "package: neither zip nor PowerShell found; folder only" >&2
fi

echo "packaged $(wc -l < dist/filelist.txt) files from ${SHA}"
echo "  folder: ${OUT}/"
[ -f "${ZIP}" ] && echo "  zip:    ${ZIP} ($(du -h "${ZIP}" | cut -f1))"
echo
echo "Upload the contents of ${OUT}/ to public_html/, then: chmod 770 public_html/.logs"
