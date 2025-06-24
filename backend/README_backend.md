# SkateGo Backend - Платформа аренды электроскейтбордов

## Описание
SkateGo — это веб-платформа для аренды электроскейтбордов. Пользователи могут находить, арендовать и возвращать электроскейтборды через веб-интерфейс.

## Технологии
- **Backend:** Django >=5.2.1, Django REST Framework
- **База данных:** PostgreSQL 17
- **Контейнеризация:** Docker, Docker Compose
- **Язык программирования:** Python 3.12
- **Дополнительные зависимости:**
  - psycopg2-binary>=2.9
  - gevent==24.11.1
  - gunicorn==23.0.0
  - django-extensions
  - django-debug-toolbar

> **Примечание:** Все актуальные зависимости указаны в [backend/skatego/requirements.txt](skatego/requirements.txt) и Dockerfile.

## Структура проекта
```
backend/
├── skatego/                 # Основной проект Django
│   ├── core/               # Модели электроскейтбордов
│   ├── users/              # Пользователи и аутентификация
│   ├── reviews/            # Отзывы о электроскейтбордах
│   ├── api/                # API endpoints
│   ├── skatego/            # Настройки проекта
│   ├── Dockerfile          # Образ Docker
│   ├── gunicorn.py         
│   └── requirements.txt.   # Зависимости Python
├── docker-compose.yml      # Конфигурация Docker Compose
├── README.md               # Документация
```

## Порты и сервисы

| Сервис      | Внешний порт | Внутри контейнера | Назначение                                 |
|-------------|--------------|-------------------|--------------------------------------------|
| nginx       | 80           | 8088              | Основной веб-интерфейс (проксирует к Django)|
| skato_go    | 8000         | 8000              | Django/gunicorn (API, админка)             |
| adminer     | 8080         | 8080              | Веб-интерфейс для работы с БД              |
| postgres    | —            | 5432              | Только внутри docker-сети                  |

**Доступы по умолчанию:**
- http://localhost:80 — основной веб-интерфейс (через nginx)
- http://localhost:8000 — напрямую Django (API/админка)
- http://localhost:8080 — Adminer (интерфейс для работы с БД)

## Быстрый старт

### Предварительные требования
- Docker
- Docker Compose

### Развертывание

1. **Клонирование репозитория:**
```bash
git clone <repository-url>
cd backend
```

2. **Запуск с помощью Docker Compose:**
```bash
docker-compose up --build
```

3. **Создание суперпользователя (опционально):**
```bash
docker compose exec skate_go python manage.py createsuperuser
```

4. **Открытие приложения:**
- Веб-интерфейс: http://localhost:8000
- Админ-панель: http://localhost:8000/admin

## Разработка

### Локальная разработка без Docker

1. **Создание виртуального окружения:**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows
```

2. **Установка зависимостей:**
```bash
pip install -r skatego/requirements.txt
```

3. **Настройка базы данных:**
```bash
# Создание миграций
python skatego/manage.py makemigrations core users reviews

# Применение миграций
python skatego/manage.py migrate

# Создание суперпользователя
python skatego/manage.py createsuperuser
```

4. **Запуск сервера разработки:**
```bash
python skatego/manage.py runserver
```

### Переменные окружения
Создайте файл `.env` в корне backend:
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_NAME=skatego_db
DATABASE_USERNAME=skatego_user
DATABASE_PASSWORD=skatego_pass
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

## Модели данных

### SkateboardModel (Модель электроскейтборда)
- name (строка, до 100 символов)
- description (текст)
- max_speed_km_h (целое, 1–200)
- battery_capacity_from_factory_ah (float, 0–120)
- max_battery_voltage_v (float, 1–120)
- min_battery_voltage_v (float, 0–120)
- power_reverse_km (целое, 1–200)

### Skateboard (Электроскейтборд)
- model (ForeignKey на SkateboardModel)
- serial_number (строка, до 50 символов, уникальный)
- current_battery_capacity_ah (float, 0–120)
- current_battery_voltage_v (float, 0–120)
- total_distance_km (float, >=0)
- status (доступен/арендован/на обслуживании/сломан)

### User (Пользователь)
- username (строка, до 31 символа, уникальный)
- kind (C — обычный, S — сотрудник, A — админ)

### SkateboardLocation (Местоположение)
- skateboard (ForeignKey на Skateboard)
- location_lat (float, -90.0 до 90.0)
- location_lng (float, -180.0 до 180.0)
- location_last_update (datetime)

### SkateboardReview (Отзыв)
- user (ForeignKey на User)
- skateboard (ForeignKey на Skateboard)
- rating (float, 1.0–5.0)
- text (текст)

## API Endpoints

API endpoints будут доступны по адресу `/api/` после настройки.

## Бизнес-логика

Подробная бизнес-логика описана в файле [ApplicationLogic.md](ApplicationLogic.md).

## Команды управления

### Docker Compose
```bash
# Запуск всех сервисов
docker-compose up

# Запуск в фоновом режиме
docker-compose up -d

# Остановка сервисов
docker-compose down

# Просмотр логов
docker-compose logs -f skato_go

# Выполнение команд в контейнере
docker-compose exec skato_go python manage.py shell
```

### Django Management
```bash
# Создание миграций
python skatego/manage.py makemigrations

# Применение миграций
python skatego/manage.py migrate

# Создание суперпользователя
python skatego/manage.py createsuperuser

# Сбор статических файлов
python skatego/manage.py collectstatic

# Запуск тестов
python skatego/manage.py test
```

## Мониторинг и обслуживание

### Состояние батарей
- Система автоматически отслеживает здоровье и заряд батарей
- При зарядке ниже 10% электроскейтборд отправляется на обслуживание
- При здоровье батареи ниже 70% рекомендуется замена

### Геолокация
- Местоположение обновляется каждые 5 минут при движении
- Система отслеживает выход из зон обслуживания
- GPS координаты сохраняются с точностью ±5 метров

## Безопасность

- JWT аутентификация
- Ролевая авторизация
- HTTPS шифрование
- Логирование всех действий пользователей

## Лицензия

MIT License

## Поддержка

Для получения поддержки обращайтесь к команде разработки.

