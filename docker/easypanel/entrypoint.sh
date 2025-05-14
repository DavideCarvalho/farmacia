#!/bin/sh

# Run migrations
php artisan migrate

echo "Running in production mode"

# Start supervisord
exec /usr/bin/supervisord -c /etc/supervisord.conf