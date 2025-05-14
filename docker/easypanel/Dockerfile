FROM webdevops/php-nginx:8.3-alpine

RUN apk add --no-cache \
    nodejs

# Copy Nginx configuration
COPY docker/easypanel/nginx/default.conf /etc/nginx/nginx.conf

# Copy PHP configuration
COPY docker/easypanel/php-fpm/php-fpm.conf /opt/docker/etc/php-fpm.d/www.conf
COPY docker/easypanel/php/php.ini /opt/docker/etc/php/php.ini

# Copy OPCache configuration
COPY docker/easypanel/php/opcache.ini /opt/docker/etc/php/conf.d/opcache.ini

# Copy Supervisor configuration
COPY docker/easypanel/supervisor/supervisord.conf /opt/docker/etc/supervisord.conf/supervisord.conf

# Copy composer.json and composer.lock
# COPY composer.json composer.lock /app/
COPY . /app/

RUN ls -la

RUN cd /app

# Install dependencies
RUN composer install --no-interaction --no-scripts --no-dev --optimize-autoloader

RUN cd ..

# Copy Laravel application files
COPY . /app

RUN cd /app

# Install frontend dependencies and build assets
RUN npm ci \
    && npm run build:ssr

# Optimize Laravel
RUN php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

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