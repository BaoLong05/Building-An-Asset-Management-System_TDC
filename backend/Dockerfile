FROM php:8.2-apache

WORKDIR /var/www/html

# Cài extension cần cho Laravel
RUN docker-php-ext-install pdo pdo_mysql

# Bật mod rewrite
RUN a2enmod rewrite

# Đổi document root sang public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Update Apache config
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/000-default.conf

# Cho phép .htaccess hoạt động
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/apache2.conf && \
    echo "<Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>" >> /etc/apache2/apache2.conf

# Phân quyền cho Laravel
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]