FROM php:8.2-fpm

# Install system deps + nginx + supervisor
RUN apt-get update && apt-get install -y \
    nginx supervisor git unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy app code
COPY . .

# Install PHP deps (vendor will be created here)
RUN composer install --no-dev --optimize-autoloader

# Nginx config
COPY nginx.conf /etc/nginx/sites-available/default

# Supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Laravel permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
 && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Render provides PORT env, nginx listens on it
EXPOSE 8080

CMD ["/usr/bin/supervisord", "-n"]

