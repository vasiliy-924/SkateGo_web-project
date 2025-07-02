## Полезные команды для работы с Docker

**Запустить Docker 🐳**
```bash
docker-compose up --build
```

**Запустить миграции 🤿**
```bash
docker compose exec skato_go python manage.py migrate
```

**Загрузить базу данных из json ✏️**
```bash
docker compose exec skate_go python manage.py loaddata db.json
```

**Удалить базу данных ❌**
```bash
docker compose exec postgres psql -U skate_user -d skate_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

