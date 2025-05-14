#!/bin/sh

chmod -R gu+w /app/storage
chmod -R guo+w /app/storage
chmod -R gu+w /app/bootstrap/cache
chmod -R guo+w /app/bootstrap/cache
php artisan cache:clear

# Run migrations
php artisan migrate --force

exec "$@"