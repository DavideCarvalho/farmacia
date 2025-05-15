FROM serversideup/php:8.3-fpm-nginx AS base-production

ENV PHP_OPCACHE_ENABLE=1

USER root

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

COPY --chown=www-data:www-data . /var/www/html

USER www-data

RUN npm install
RUN npm run build

RUN composer install --no-interaction --optimize-autoloader --no-dev


FROM base-production AS main-app

CMD ["php", "artisan", "migrate", "--force"]

FROM base-production AS queues

CMD ["php", "artisan", "queue:work", "--sleep=3", "--tries=3", "--backoff=3", "--max-time=3600"]

FROM base-production AS horizon

CMD ["php", "artisan", "horizon"]
