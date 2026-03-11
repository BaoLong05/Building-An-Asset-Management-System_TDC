FROM php:8.2-apache

WORKDIR /var/www/html

# Cài extension cần thiết cho Laravel
RUN docker-php-ext-install pdo_mysql

# Bật mod_rewrite cho Laravel route
RUN a2enmod rewrite

# Đổi DocumentRoot sang thư mục public
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Copy code Laravel vào container
COPY . /var/www/html

# Phân quyền thư mục cần ghi
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

EXPOSE 80

CMD ["apache2-foreground"]