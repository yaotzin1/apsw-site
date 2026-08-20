# APSW Site - Docker Container
# Lightweight PHP 8.2 with Apache for local testing & Hetzner/VPS deployment

FROM php:8.2-apache

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

# Set work directory
WORKDIR /var/www/html

# Copy project files
COPY . /var/www/html/

# Create logs folder and set permissions
RUN mkdir -p /var/www/html/.logs \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 770 /var/www/html/.logs

# Expose HTTP port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["apache2-foreground"]
