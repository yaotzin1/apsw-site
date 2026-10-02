#!/bin/sh
# Writes /etc/msmtprc from the SMTP_* environment at container start, then
# hands over to Apache. Without SMTP_HOST the site still runs; contact.php then
# logs every inquiry to .logs/inquiries_secure.log with mail_sent=false.
set -eu

if [ -n "${SMTP_HOST:-}" ]; then
    : "${SMTP_PORT:=587}"
    : "${SMTP_FROM:=${SMTP_USER:-}}"
    case "${SMTP_PORT}" in
        465) TLS_MODE="tls on
tls_starttls off" ;;
        *)   TLS_MODE="tls on
tls_starttls on" ;;
    esac

    cat > /etc/msmtprc <<EOF
defaults
auth           on
${TLS_MODE}
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile        /proc/self/fd/2

account        default
host           ${SMTP_HOST}
port           ${SMTP_PORT}
from           ${SMTP_FROM}
user           ${SMTP_USER:-}
password       ${SMTP_PASS:-}
EOF
    # Root writes it, only www-data (which runs PHP) may read the password.
    chown root:www-data /etc/msmtprc
    chmod 640 /etc/msmtprc
    echo "[apsw] mail relay configured: ${SMTP_USER:-<no auth>}@${SMTP_HOST}:${SMTP_PORT}"
else
    echo "[apsw] SMTP_HOST not set: contact form mail is disabled, inquiries are only logged" >&2
fi

exec "$@"
