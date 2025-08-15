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

```bash
docker compose exec skate_go python manage.py createsuperuser
```

**Остановить, собрать и запустить контейнеры 🔄**
```bash
docker-compose down && docker-compose build && docker-compose up -d
```





**Проверить статус миграций 📋**
```bash
docker compose exec skato_go python manage.py showmigrations
```

**Создать миграции для конкретного приложения 📝**
```bash
docker compose exec skato_go python manage.py makemigrations <app_name>
```

**Применить миграции для конкретного приложения 🎯**
```bash
docker compose exec skato_go python manage.py migrate <app_name>
```

**Откатить все миграции для приложения ⏮️**
```bash
docker compose exec skato_go python manage.py migrate <app_name> zero
```

**Создать суперпользователя 👑**
```bash
docker compose exec skato_go python manage.py createsuperuser
```

**Собрать статические файлы 📦**
```bash
docker compose exec skato_go python manage.py collectstatic --noinput
```