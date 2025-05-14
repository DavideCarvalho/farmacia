FROM trafex/php-nginx:latest

ARG POSTGRES_VERSION=17
ARG NODE_VERSION=22

# Diretório de trabalho
WORKDIR /var/www/html

# Instalação de dependências adicionais
RUN apk add --no-cache \
    postgresql-client \
    mysql-client \
    git \
    nodejs \
    npm \
    yarn \
    shadow \
    # Extensões PHP adicionais para Laravel
    && apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    postgresql-dev \
    && docker-php-ext-install pdo_pgsql \
    && pecl install redis \
    && docker-php-ext-enable redis \
    # Instalar gerenciadores de pacotes
    && npm install -g npm pnpm bun \
    # Limpar
    && apk del .build-deps

# Instalar Composer globalmente
RUN curl -sLS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin/ --filename=composer

# Script de inicialização personalizado
COPY /docker/easypanel/start-container /usr/local/bin/custom-start
RUN chmod +x /usr/local/bin/custom-start

# Configuração personalizada de PHP se necessário
COPY /docker/easypanel/php.ini /usr/local/etc/php/conf.d/99-sail.ini

# Copiar código da aplicação
# Esta imagem usa /var/www/html como documento root
COPY --chown=nobody:nobody . .

# Preparar diretórios do Laravel
RUN mkdir -p /var/www/html/storage/framework/{sessions,views,cache} \
    && mkdir -p /var/www/html/storage/logs \
    && chown -R nobody:nobody /var/www/html/storage \
    && chown -R nobody:nobody /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Instalar dependências e otimizar Laravel como usuário nobody
USER nobody
RUN composer install --no-interaction --optimize-autoloader --no-dev \
    && php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Voltar para o usuário root para instalar dependências de front-end
USER root
RUN npm ci \
    && npm run build:ssr \
    # Garantir que todas as permissões estejam corretas ao finalizar
    && chown -R nobody:nobody /var/www/html/public

# A imagem original já expõe a porta 8080, mas vamos adicionar a 80 também
EXPOSE 8080 80

# Usar o script customizado ou o script padrão da imagem
ENTRYPOINT ["/usr/local/bin/custom-start"]