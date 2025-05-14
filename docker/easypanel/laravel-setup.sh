#!/bin/sh
# Este script será executado pelo container no início

# Garantir que os diretórios do Laravel tenham permissões corretas
mkdir -p /var/www/html/storage/framework/{sessions,views,cache}
mkdir -p /var/www/html/storage/logs
mkdir -p /var/www/html/bootstrap/cache

# Definir permissões se necessário
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache

# Se você precisar executar comandos adicionais na inicialização
php artisan migrate