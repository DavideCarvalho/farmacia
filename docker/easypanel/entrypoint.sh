#!/bin/sh

# Set the base directory for the app
BASEDIR=/opt/laravel

# Clear the old boostrap/cache
php artisan clear-compiled

# Install composer dependencies
composer install --no-dev --no-interaction --no-scripts --optimize-autoloader

echo "Generating app key..."
# Generate an application key
php artisan key:generate
echo "App key generated."

# Clear the optimization cache
php artisan optimize:clear

# Remove prior storage links that exist
rm -rf public/storage

# Build up a new storage link
php artisan storage:link

# Cache the configuration, routes, and views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate

echo "Running in production mode"

# Start supervisord
exec /usr/bin/supervisord -c /etc/supervisord.conf