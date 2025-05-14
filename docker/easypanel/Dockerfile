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
    postgresql-client \
    mysql-client \
    git \
    nodejs \
    npm \
    yarn \
    # Instalar e configurar Composer
    && curl -sLS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin/ --filename=composer \
    # Instalar gerenciadores de pacotes JavaScript
    && npm install -g npm pnpm bun

# Personalizar configuração do PHP se necessário
COPY /docker/easypanel/php.ini /etc/php84/conf.d/99-laravel.ini

# Adicionar script de startup personalizado para Laravel
COPY /docker/easypanel/laravel-setup.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/laravel-setup.sh

# Garantir que os diretórios do Laravel existam e tenham permissões corretas
RUN mkdir -p /var/www/html/storage/framework/{sessions,views,cache} \
    && mkdir -p /var/www/html/storage/logs \
    && mkdir -p /var/www/html/bootstrap/cache \
    && chown -R nobody:nobody /var/www/html

# Copiar código da aplicação
COPY --chown=nobody:nobody . /var/www/html/

# Mudar novamente para o usuário nobody para as próximas etapas
USER nobody

# Instalar dependências do Composer
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Otimizar Laravel
RUN php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Voltar ao usuário root para instalar dependências NPM
USER root
RUN cd /var/www/html && npm ci && npm run build:ssr

# Garantir novamente permissões corretas
RUN chown -R nobody:nobody /var/www/html

# Voltar para o usuário nobody para execução
USER nobody

# A imagem original já expõe a porta 8080
EXPOSE 8080

# Usar o comando original da imagem base
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]