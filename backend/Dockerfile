FROM php:8.2-apache
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y \
    libzip-dev zlib1g-dev libpng-dev libjpeg-dev libfreetype6-dev curl unzip git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo_mysql zip gd
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN a2enmod rewrite
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
COPY . /var/www/html
RUN composer install --no-dev --optimize-autoloader


RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache
RUN echo "Listen \${PORT}" > /etc/apache2/ports.conf \
    && sed -i 's|<VirtualHost \*:80>|<VirtualHost *:${PORT}>|g' /etc/apache2/sites-available/000-default.conf

CMD php artisan migrate --force && apache2-foreground
