FROM ubuntu:24.04

LABEL maintainer="Taylor Otwell"

ARG WWWGROUP=1000
ARG NODE_VERSION=22
ARG MYSQL_CLIENT="mysql-client"
ARG POSTGRES_VERSION=17

WORKDIR /var/www/html

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC
ENV SUPERVISOR_PHP_COMMAND="/usr/bin/php -d variables_order=EGPCS /var/www/html/artisan serve --host=0.0.0.0 --port=80"
ENV SUPERVISOR_PHP_USER="sail"

# Combinar comandos relacionados em um único RUN para reduzir camadas
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
    && echo "Acquire::http::Pipeline-Depth 0;" > /etc/apt/apt.conf.d/99custom \
    && echo "Acquire::http::No-Cache true;" >> /etc/apt/apt.conf.d/99custom \
    && echo "Acquire::BrokenProxy    true;" >> /etc/apt/apt.conf.d/99custom \
    && mkdir -p /etc/apt/keyrings \
    # Adicionar todos os repositórios de uma vez para evitar múltiplos apt-get update
    && apt-get update \
    && apt-get install -y --no-install-recommends gnupg gosu curl ca-certificates \
    # Adicionar todas as chaves GPG de uma vez
    && curl -sS 'https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xb8dc7e53946656efbce4c1dd71daeaab4ad4cab6' | gpg --dearmor | tee /etc/apt/keyrings/ppa_ondrej_php.gpg > /dev/null \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /etc/apt/keyrings/yarn.gpg >/dev/null \
    && curl -sS https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | tee /etc/apt/keyrings/pgdg.gpg >/dev/null \
    # Configurar todos os repositórios de uma vez
    && echo "deb [signed-by=/etc/apt/keyrings/ppa_ondrej_php.gpg] https://ppa.launchpadcontent.net/ondrej/php/ubuntu noble main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_VERSION.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
    && echo "deb [signed-by=/etc/apt/keyrings/yarn.gpg] https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && echo "deb [signed-by=/etc/apt/keyrings/pgdg.gpg] http://apt.postgresql.org/pub/repos/apt noble-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    # Uma única atualização apt após adicionar todos os repositórios
    && apt-get update \
    # Instalar pacotes principais
    && apt-get install -y --no-install-recommends \
    zip unzip git supervisor sqlite3 libcap2-bin libpng-dev python3 \
    dnsutils librsvg2-bin fswatch ffmpeg nano \
    # PHP e extensões
    php8.4-cli php8.4-dev php8.4-pgsql php8.4-sqlite3 php8.4-gd \
    php8.4-curl php8.4-mongodb php8.4-imap php8.4-mysql php8.4-mbstring \
    php8.4-xml php8.4-zip php8.4-bcmath php8.4-soap php8.4-intl php8.4-readline \
    php8.4-ldap php8.4-msgpack php8.4-igbinary php8.4-redis php8.4-swoole \
    php8.4-memcached php8.4-pcov php8.4-imagick php8.4-xdebug \
    # Node.js e ferramentas
    nodejs yarn $MYSQL_CLIENT postgresql-client-$POSTGRES_VERSION \
    # Instalar Composer
    && curl -sLS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer \
    # Atualizar npm e instalar outros gerenciadores de pacotes
    && npm install -g npm pnpm bun \
    # Configurar PHP
    && setcap "cap_net_bind_service=+ep" /usr/bin/php8.4 \
    # Limpar após instalação para reduzir o tamanho da imagem
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Configurar usuário
RUN userdel -r ubuntu \
    && groupadd --force -g $WWWGROUP sail \
    && useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 sail

# Copiar arquivos de configuração
COPY /docker/easypanel/start-container /usr/local/bin/start-container
COPY /docker/easypanel/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY /docker/easypanel/php.ini /etc/php/8.4/cli/conf.d/99-sail.ini
RUN chmod +x /usr/local/bin/start-container

# Copiar código da aplicação
COPY . .

# Otimizar instalação do Composer
RUN composer install --no-interaction --optimize-autoloader --no-dev \
    && npm ci \
    && npm run build:ssr \
    && php artisan key:generate \
    # Corrigir permissões
    && chown -R sail:$WWWGROUP /var/www/html \
    # Limpar cache
    && php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

EXPOSE 80/tcp

ENTRYPOINT ["start-container"]