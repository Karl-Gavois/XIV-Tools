symfony composer install

# Permissions Var / Vendor
chown -R www-data:www-data var vendor public
chmod -R 775 var
git config --global --add safe.directory /var/www

# Generation clés JWT
# php bin/console lexik:jwt:generate-keypair --overwrite

# Lancement + Apache (ports)
service apache2 start
symfony server:start