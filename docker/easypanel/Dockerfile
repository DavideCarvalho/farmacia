FROM php:8.3-fpm-alpine

# Set working directory
WORKDIR /opt/laravel

# Install additional packages
RUN apk --no-cache add \
    nginx \
    supervisor \
    && docker-php-ext-enable opcache \
    nodejs \
    npm

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy Nginx configuration
COPY docker/easypanel/nginx/default.conf /etc/nginx/nginx.conf

# Copy PHP configuration
COPY docker/easypanel/php-fpm/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

COPY docker/easypanel/php/php.ini /usr/local/etc/php/conf.d/php.ini

COPY docker/easypanel/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Copy Supervisor configuration
COPY docker/easypanel/supervisor/supervisord.conf /etc/supervisord.conf

# Copy Laravel application files
COPY . /opt/laravel

RUN composer install --no-dev --no-interaction --no-scripts --optimize-autoloader

RUN php artisan optimize:clear

RUN php artisan config:cache

RUN php artisan route:cache

RUN php artisan view:cache

RUN npm ci

RUN npm run build:ssr

RUN php artisan key:generate

# Set up permissions
RUN chown -R www-data:www-data /opt/laravel \
    && chmod -R 755 /opt/laravel/storage

# Scheduler setup

# Create a log file
RUN touch /var/log/cron.log

# Add cron job directly to crontab
RUN echo "* * * * * /usr/local/bin/php /opt/laravel/artisan schedule:run >> /var/log/cron.log 2>&1" | crontab -

ADD docker/easypanel/entrypoint.sh /root/entrypoint.sh

# Expose ports
EXPOSE 80

ENTRYPOINT ["/root/entrypoint.sh"]