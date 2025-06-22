
Запустить миграции
docker compose exec skato_go python manage.py migrate

Загрузить базу данных из json
docker compose exec skate_go python manage.py loaddata db.json


