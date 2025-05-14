FROM trafex/php-nginx:latest

LABEL maintainer="Taylor Otwell"

# Precisamos voltar temporariamente para o usuário root para instalações
USER root

# Instalar dependências adicionais necessárias para Laravel
RUN apk add --no-cache \
    php84-pdo_pgsql \
    php84-pdo_mysql \
    php84-redis \
    php84-pcntl \
    php84-posix \
    php84-bcmath \
    php84-exif \
    php84-zip \
    php84-iconv \
    php84-simplexml \
    php84-soap \
    php84-pdo \
    php84-pgsql \
    php84-sodium \
    php84-calendar \
    php84-imap \
    php84-sockets \
    postgresql-client \
    mysql-client \
    git \
    nodejs \
    npm \
    yarn

# Instalar Composer globalmente
RUN curl -sLS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin/ --filename=composer

# Personalizar configuração do PHP se necessário
COPY /docker/easypanel/php.ini /etc/php84/conf.d/99-laravel.ini

# Criar diretórios necessários para Laravel
RUN mkdir -p /var/www/html/storage/framework/{sessions,views,cache} \
    && mkdir -p /var/www/html/storage/logs \
    && mkdir -p /var/www/html/bootstrap/cache \
    && chown -R nobody:nobody /var/www/html

# Copiar todo o código da aplicação
COPY --chown=nobody:nobody . /var/www/html/

# Instalar dependências do Composer (ignorando requisitos de plataforma caso necessário)
RUN cd /var/www/html \
    && composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-req=ext-iconv

# Instalar dependências NPM e construir assets
RUN cd /var/www/html \
    && npm ci \
    && npm run build:ssr

# Otimizar Laravel
RUN cd /var/www/html \
    && php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Garantir permissões corretas
RUN chown -R nobody:nobody /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Criar script de inicialização
RUN echo '#!/bin/sh' > /docker-entrypoint.d/laravel-setup.sh \
    && echo '' >> /docker-entrypoint.d/laravel-setup.sh \
    && echo '# Garantir que os diretórios do Laravel tenham permissões corretas' >> /docker-entrypoint.d/laravel-setup.sh \
    && echo 'mkdir -p /var/www/html/storage/framework/{sessions,views,cache}' >> /docker-entrypoint.d/laravel-setup.sh \
    && echo 'mkdir -p /var/www/html/storage/logs' >> /docker-entrypoint.d/laravel-setup.sh \
    && echo 'mkdir -p /var/www/html/bootstrap/cache' >> /docker-entrypoint.d/laravel-setup.sh \
    && echo '' >> /docker-entrypoint.d/laravel-setup.sh \
    && echo '# Definir permissões' >> /docker-entrypoint.d/laravel-setup.sh \
    && echo 'chmod -R 755 /var/www/html/storage' >> /docker-entrypoint.d/laravel-setup.sh \
    && echo 'chmod -R 755 /var/www/html/bootstrap/cache' >> /docker-entrypoint.d/laravel-setup.sh \
    && chmod +x /docker-entrypoint.d/laravel-setup.sh

# Voltar para o usuário nobody para execução
USER nobody

# A imagem original já expõe a porta 8080
EXPOSE 8080

# Usar o comando original da imagem base
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]