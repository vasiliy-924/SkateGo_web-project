
Запустить миграции
docker compose exec skato_go python manage.py migrate

Загрузить базу данных из json
docker compose exec skate_go python manage.py loaddata db.json

Удалить базу данных 
docker compose exec postgres psql -U skate_user -d skate_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

