#!/usr/bin/env bash
# Server-side deploy: pull the requested branch, rebuild the image, roll it out.
#
#   ./deploy/deploy.sh            # deploys origin/main
#   ./deploy/deploy.sh my-branch  # deploys origin/my-branch
#
# Run from the checkout on the VPS (e.g. /opt/apsw-site). Safe to re-run; a
# build that fails leaves the running containers untouched.
set -euo pipefail

BRANCH="${1:-main}"
COMPOSE_FILE="docker-compose.staging.yml"

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
    echo "deploy: .env is missing — copy .env.example and fill it in first" >&2
    exit 1
fi

echo "==> fetching origin/${BRANCH}"
git fetch --prune origin
git checkout -q "${BRANCH}"
git reset -q --hard "origin/${BRANCH}"
echo "    at $(git rev-parse --short HEAD): $(git log -1 --pretty=%s)"

echo "==> building image"
docker compose -f "${COMPOSE_FILE}" build --pull apsw-site

echo "==> rolling out"
docker compose -f "${COMPOSE_FILE}" up -d --remove-orphans

echo "==> waiting for the site container to report healthy"
for _ in $(seq 1 20); do
    status="$(docker inspect -f '{{.State.Health.Status}}' apsw-site 2>/dev/null || echo unknown)"
    [ "${status}" = "healthy" ] && break
    sleep 3
done
echo "    apsw-site: ${status}"
[ "${status}" = "healthy" ] || { docker compose -f "${COMPOSE_FILE}" logs --tail=50 apsw-site; exit 1; }

echo "==> pruning old images"
docker image prune -f >/dev/null

echo "==> done: https://$(grep -E '^SITE_HOST=' .env | cut -d= -f2)/"
