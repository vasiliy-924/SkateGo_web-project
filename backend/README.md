# SkateGo - Платформа аренды электроскейтбордов

## Описание
SkateGo - это веб-платформа для аренды электроскейтбордов. Пользователи могут находить, арендовать и возвращать электроскейтборды через веб-интерфейс.

## Технологии
- **Backend:** Django 5.2+, Django REST Framework
- **База данных:** PostgreSQL 15
- **Контейнеризация:** Docker, Docker Compose
- **Язык программирования:** Python 3.11

## Структура проекта
```
backend/
├── skatego/                 # Основной проект Django
│   ├── core/               # Модели электроскейтбордов
│   ├── users/              # Пользователи и аутентификация
│   ├── reviews/            # Отзывы о электроскейтбордах
│   ├── api/                # API endpoints
│   └── skatego/            # Настройки проекта
├── docker-compose.yml      # Конфигурация Docker Compose
├── Dockerfile              # Образ Docker
├── requirements.txt        # Зависимости Python
└── README.md              # Документация
```

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
docker-compose exec web python skatego/manage.py createsuperuser
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
pip install -r requirements.txt
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
Создайте файл `.env` в корне проекта:
```env
DEBUG=True
SECRET_KEY=your-secret-key
DB_NAME=skatego_db
DB_USER=skatego_user
DB_PASSWORD=skatego_pass
DB_HOST=localhost
DB_PORT=5432
```

## Модели данных

### SkateBoardModel (Модель электроскейтборда)
- Название модели
- Описание
- Максимальная скорость (км/ч)
- Емкость батареи (Ач)
- Напряжение батареи (В)
- Запас хода (км)

### SkateBoard (Электроскейтборд)
- Модель (связь с SkateBoardModel)
- Серийный номер
- Исходная ёмкость (Wh)
- Текущая макс. ёмкость (Wh)
- Остаточная ёмкость (Wh)
- Общий пробег (км)
- Статус (доступен/арендован/на обслуживании/сломан)

### User (Пользователь)
- Имя пользователя
- Email
- Имя и фамилия
- Телефон
- Тип пользователя (обычный/сотрудник/администратор)

### SkateBoardLocation (Местоположение)
- Электроскейтборд
- Координаты (широта/долгота)
- Адрес
- Временная метка

### SkateboardReview (Отзыв)
- Пользователь
- Электроскейтборд
- Оценка (1.0-5.0)
- Текст отзыва

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
docker-compose logs -f web

# Выполнение команд в контейнере
docker-compose exec web python skatego/manage.py shell
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
