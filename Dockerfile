# APSW Site - Docker Container
# PHP 8.2 + Apache, .htaccess honoured (AllowOverride All), msmtp as the mail
# transport so contact.php's mail() reaches a real SMTP relay.
#
# Local test:   docker compose up -d                    (bind-mounts the tree, port 8090)
# VPS staging:  docker compose -f docker-compose.staging.yml up -d --build   (behind Caddy)

FROM php:8.2-apache

# msmtp: tiny SMTP client that stands in for sendmail. curl: healthcheck.
RUN apt-get update \
    && apt-get install -y --no-install-recommends msmtp msmtp-mta ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite & headers modules
RUN a2enmod rewrite headers

# Set Apache ServerName to suppress warnings
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Configure Apache virtual host with AllowOverride All
RUN { \
    echo '<VirtualHost *:80>'; \
    echo '    DocumentRoot /var/www/html'; \
    echo '    <Directory /var/www/html>'; \
    echo '        Options -Indexes +FollowSymLinks'; \
    echo '        AllowOverride All'; \
    echo '        Require all granted'; \
    echo '    </Directory>'; \
    echo '    ErrorLog ${APACHE_LOG_DIR}/error.log'; \
    echo '    CustomLog ${APACHE_LOG_DIR}/access.log combined'; \
    echo '</VirtualHost>'; \
} > /etc/apache2/sites-available/000-default.conf

# Production php.ini plus the pieces this site needs: mail() goes through msmtp
# (-t reads the recipients from the headers) and the server does not advertise
# its PHP version.
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && { \
        echo 'sendmail_path = "/usr/bin/msmtp -t"'; \
        echo 'expose_php = Off'; \
        echo 'log_errors = On'; \
        echo 'error_log = /proc/self/fd/2'; \
    } > "$PHP_INI_DIR/conf.d/zz-apsw.ini"

# Set work directory
WORKDIR /var/www/html

# Copy project files (see .dockerignore: showcase-src/, branding_raw/, logs are left out)
COPY . /var/www/html/

# Create logs folder and set permissions
RUN mkdir -p /var/www/html/.logs \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 770 /var/www/html/.logs

COPY docker/entrypoint.sh /usr/local/bin/apsw-entrypoint
RUN chmod +x /usr/local/bin/apsw-entrypoint

# Expose HTTP port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost/ -o /dev/null || exit 1

ENTRYPOINT ["apsw-entrypoint"]
CMD ["apache2-foreground"]
