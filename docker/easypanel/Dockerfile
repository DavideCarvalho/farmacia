FROM php:8.4-fpm-alpine

LABEL maintainer="Taylor Otwell"

ARG WWWGROUP=1000
ARG NODE_VERSION=22
ARG POSTGRES_VERSION=17

WORKDIR /var/www/html

ENV TZ=UTC
ENV SUPERVISOR_PHP_USER="sail"

# Instalar dependências básicas, incluindo Nginx
RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    linux-headers \
    oniguruma-dev \
    openssl-dev \
    libxml2-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    icu-dev \
    libmemcached-dev \
    postgresql-dev \
    # Dependências da aplicação
    && apk add --no-cache \
    bash \
    curl \
    ca-certificates \
    zip \
    unzip \
    git \
    supervisor \
    sqlite \
    libcap \
    libjpeg-turbo \
    libpng \
    freetype \
    libzip \
    icu \
    libmemcached \
    oniguruma \
    python3 \
    libpq \
    mysql-client \
    postgresql-client \
    tzdata \
    nano \
    shadow \
    nginx \
    # Definir timezone
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    # Instalar extensões PHP
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        pdo_pgsql \
        bcmath \
        opcache \
        exif \
        pcntl \
        intl \
        zip \
        gd \
    # Instalar extensões PECL
    && pecl install \
        redis \
        mongodb \
        igbinary \
        msgpack \
        memcached \
        swoole \
    && docker-php-ext-enable \
        redis \
        mongodb \
        igbinary \
        msgpack \
        memcached \
        swoole \
    # Instalar Composer
    && curl -sLS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin/ --filename=composer \
    # Instalar Node.js e npm
    && apk add --no-cache nodejs npm yarn \
    # Atualizar npm e instalar gerenciadores de pacotes adicionais
    && npm install -g npm pnpm bun \
    # Limpar caches
    && apk del .build-deps \
    && rm -rf /tmp/* /var/cache/apk/*

# Criar diretórios necessários
RUN mkdir -p /var/run/php /run/nginx

# Configurar PHP-FPM para rodar como sail
RUN addgroup -g $WWWGROUP sail \
    && adduser -u 1337 -G sail -h /home/sail -s /bin/bash -D sail

# Configurar Nginx para servir a aplicação Laravel
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /var/www/html/public; \
    index index.php; \
    charset utf-8; \
    location / { \
        try_files $uri $uri/ /index.php?$query_string; \
    } \
    location = /favicon.ico { access_log off; log_not_found off; } \
    location = /robots.txt  { access_log off; log_not_found off; } \
    error_page 404 /index.php; \
    location ~ \.php$ { \
        fastcgi_pass 127.0.0.1:9000; \
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name; \
        include fastcgi_params; \
    } \
    location ~ /\.(?!well-known).* { \
        deny all; \
    } \
}' > /etc/nginx/http.d/default.conf

# Configurar supervisor para executar PHP-FPM e Nginx
RUN echo '[supervisord] \
nodaemon=true \
user=root \
logfile=/var/log/supervisor/supervisord.log \
pidfile=/var/run/supervisord.pid \
\
[program:php-fpm] \
command=/usr/local/sbin/php-fpm -F \
stdout_logfile=/dev/stdout \
stdout_logfile_maxbytes=0 \
stderr_logfile=/dev/stderr \
stderr_logfile_maxbytes=0 \
\
[program:nginx] \
command=/usr/sbin/nginx -g "daemon off;" \
stdout_logfile=/dev/stdout \
stdout_logfile_maxbytes=0 \
stderr_logfile=/dev/stderr \
stderr_logfile_maxbytes=0' > /etc/supervisor/conf.d/supervisord.conf

# Customizar configuração do PHP
COPY /docker/easypanel/php.ini /usr/local/etc/php/conf.d/99-sail.ini

# Script para iniciar o container
COPY /docker/easypanel/start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

# Copiar código da aplicação
COPY . .

# Instalar dependências e otimizar Laravel
RUN composer install --no-interaction --optimize-autoloader --no-dev \
    && npm ci \
    && npm run build:ssr \
    && php artisan key:generate \
    # Corrigir permissões
    && chown -R sail:sail /var/www/html \
    # Otimizar Laravel
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Expor porta web
EXPOSE 80

ENTRYPOINT ["start-container"]