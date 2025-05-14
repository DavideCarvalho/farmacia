FROM webdevops/php-nginx:8.4-alpine

RUN apk add --no-cache \
    nodejs

COPY ./docker/easypanel/php.ini /opt/docker/etc/php/php.ini
COPY ./docker/easypanel/vhost.conf /opt/docker/etc/nginx/vhost.conf
COPY composer.json composer.lock /app/
RUN composer install --no-interaction --no-scripts --no-suggest --no-dev --optimize-autoloader
COPY . /app

# Instalar dependências NPM e construir assets
RUN npm ci \
    && npm run build:ssr

# Otimizar Laravel
RUN php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

RUN php artisan migrate