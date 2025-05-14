FROM webdevops/php-nginx:8.3-alpine

RUN apk add --no-cache \
    nodejs \
    npm \
    sqlite \
    sqlite-dev

# Copy Nginx configuration
COPY docker/easypanel/nginx/default.conf /etc/nginx/nginx.conf

# Copy PHP configuration
COPY docker/easypanel/php-fpm/php-fpm.conf /opt/docker/etc/php-fpm.d/www.conf
COPY docker/easypanel/php/php.ini /opt/docker/etc/php/php.ini

# Copy OPCache configuration
COPY docker/easypanel/php/opcache.ini /opt/docker/etc/php/conf.d/opcache.ini

# Copy Supervisor configuration
COPY docker/easypanel/supervisor/supervisord.conf /opt/docker/etc/supervisord.conf/supervisord.conf

WORKDIR /app

# Copy composer.json and composer.lock
COPY . .

# Install dependencies
RUN composer install --no-interaction --no-scripts --no-dev --optimize-autoloader

# Install frontend dependencies and build assets
RUN npm ci \
    && npm run build:ssr

# Optimize Laravel
RUN php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# # Set up permissions
# RUN chown -R www-data:www-data /app \
#     && chmod -R 755 /app/storage

RUN mkdir -p /app/storage/framework/{sessions,views,cache}
RUN mkdir -p /app/storage/logs
RUN mkdir -p /app/bootstrap/cache

RUN chmod -R 755 /app/storage
RUN chmod -R 755 /app/bootstrap/cache

# Scheduler setup

# Create a log file
RUN touch /var/log/cron.log

# Add cron job directly to crontab
RUN echo "* * * * * /usr/local/bin/php /app/artisan schedule:run >> /var/log/cron.log 2>&1" | crontab -

ENTRYPOINT ["/app/docker/easypanel/entrypoint.sh"]