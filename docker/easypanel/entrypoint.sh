#!/bin/sh

# Run migrations
php artisan migrate --force

exec "$@"