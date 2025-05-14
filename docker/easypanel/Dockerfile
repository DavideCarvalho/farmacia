FROM webdevops/php-nginx:8.3-alpine

RUN apk add --no-cache \
    nodejs \
    npm \
    sqlite \
    sqlite-dev

# Copy Nginx configuration
COPY docker/easypanel/nginx/vhost.conf /opt/docker/etc/nginx/vhost.conf

# Copy PHP configuration
COPY docker/easypanel/php/php.ini /opt/docker/etc/php/php.ini

# Copy Supervisor configuration
COPY docker/easypanel/supervisor/supervisord.conf /opt/docker/etc/supervisor.d/supervisord.conf

WORKDIR /app

# Copy composer.json and composer.lock
COPY . .

# Install dependencies
RUN composer install --no-interaction --no-scripts --no-dev --optimize-autoloader

# Install frontend dependencies and build assets
RUN npm ci \
    && npm run build:ssr

# Create storage directories with proper structure
RUN mkdir -p /app/storage/framework/{sessions,views,cache} \
    && mkdir -p /app/storage/logs \
    && mkdir -p /app/bootstrap/cache

# Set proper ownership and permissions (as suggested)
RUN chmod -R 777 /app/storage \
    && chmod -R 777 /app/bootstrap/cache \
    && chmod -R 777 /app/storage/logs \
    && chmod -R 777 /app/storage/framework/sessions \
    && chmod -R 777 /app/storage/framework/views \
    && chmod -R 777 /app/storage/framework/cache

# Optimize Laravel
RUN php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan event:cache

# Scheduler setup
# Create a log file
RUN touch /var/log/cron.log

# Add cron job directly to crontab
RUN echo "* * * * * php /app/artisan schedule:run >> /dev/null 2>&1" | crontab -



# Start supervisor
ENTRYPOINT ["/app/docker/easypanel/entrypoint.sh"]