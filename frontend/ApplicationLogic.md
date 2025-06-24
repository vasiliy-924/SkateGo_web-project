# Техническое задание для Backend разработчика SkateGo

## Описание проекта

SkateGo - это сервис аренды электрических скейтбордов. Приложение позволяет пользователям арендовать электрические скейтборды, отслеживать их местоположение, управлять арендой и просматривать статистику использования.

## Основные сущности

### 1. Модель электроскейтборда (SkateboardModel)
```typescript
interface SkateboardModel {
  id: number;
  name: string;                                  // до 100 символов
  description: string;                           // текст описания
  max_speed: number;                            // 1-200 км/ч
  battery_capacity_from_factory_ah: number;      // 0-120 Ач
  max_battery_voltage_v: number;                 // 1-120 В
  min_battery_voltage_v: number;                 // 0-120 В
  max_range: number;                            // 1-200 км
  is_active: boolean;                           // активна ли модель
  features: string[];                           // список особенностей
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  type: 'electric' | 'onewheel';
  image_url: string;                            // путь к изображению
}
```

### 2. Электроскейтборд (Skateboard)
```typescript
interface Skateboard {
  id: number;
  model_id: number;                             // связь с SkateboardModel
  serial_number: string;                        // до 50 символов, уникальный
  current_battery_capacity_ah: number;          // 0-120 Ач
  current_battery_voltage_v: number;            // 0-120 В
  total_distance: number;                       // >= 0, в км
  battery_health: number;                       // 0-100%
  status: 'available' | 'rented' | 'maintenance' | 'charging' | 'broken' | 'offline';
  price_per_hour: number;                       // цена за час
  price_per_minute: number;                     // цена за минуту
  rating: number;                               // 1-5
  total_rides: number;                          // количество поездок
  location: {
    lat: number;                               // -90 до 90
    lng: number;                               // -180 до 180
    address: string;                           // текстовый адрес
    timestamp: string;                         // время последнего обновления
  };
}
```

### 3. Пользователь (User)
```typescript
interface User {
  id: number;
  username: string;                             // до 31 символа, уникальное
  email: string;                                // валидный email
  first_name: string;
  last_name: string;
  phone: string;                                // валидный телефон
  type: 'C' | 'S' | 'A';                       // Customer/Staff/Admin
  is_active: boolean;
  registration_date: string;                    // дата регистрации
  balance: number;                              // баланс пользователя
}
```

### 4. Аренда (Rental)
```typescript
interface Rental {
  id: number;
  user_id: number;
  skateboard_id: number;
  start_time: string;
  end_time: string | null;
  status: 'active' | 'completed' | 'cancelled';
  total_cost: number | null;
  start_location: {
    lat: number;
    lng: number;
    address: string;
  };
  end_location?: {
    lat: number;
    lng: number;
    address: string;
  };
  distance_traveled: number;                    // в км
}
```

### 5. Отзыв (Review)
```typescript
interface Review {
  id: number;
  user_id: number;
  skateboard_id: number;
  rating: number;                               // 1-5
  comment: string;
  created_at: string;
}
```

## API Endpoints

### Аутентификация
- POST /api/auth/register - регистрация нового пользователя
- POST /api/auth/login - вход в систему
- POST /api/auth/logout - выход из системы
- GET /api/auth/me - получение информации о текущем пользователе
- PUT /api/auth/me - обновление профиля пользователя

### Скейтборды
- GET /api/skateboards - список доступных скейтбордов с фильтрацией
  - Query параметры: status, battery_min, location_range, model_id
- GET /api/skateboards/{id} - детальная информация о скейтборде
- POST /api/skateboards (admin) - создание нового скейтборда
- PUT /api/skateboards/{id} (admin) - обновление информации о скейтборде
- DELETE /api/skateboards/{id} (admin) - удаление скейтборда
- GET /api/skateboards/{id}/location - получение текущего местоположения
- PUT /api/skateboards/{id}/location - обновление местоположения
- GET /api/skateboards/{id}/reviews - отзывы о скейтборде

### Модели скейтбордов
- GET /api/skateboard-models - список моделей
- GET /api/skateboard-models/{id} - детальная информация о модели
- POST /api/skateboard-models (admin) - создание новой модели
- PUT /api/skateboard-models/{id} (admin) - обновление модели
- PATCH /api/skateboard-models/{id}/status (admin) - изменение статуса активности

### Аренда
- POST /api/rentals/start - начало аренды
- POST /api/rentals/{id}/end - завершение аренды
- GET /api/rentals/active - активные аренды пользователя
- GET /api/rentals/history - история аренд пользователя
- GET /api/rentals/{id} - детали конкретной аренды

### Отзывы
- POST /api/reviews - создание отзыва
- GET /api/reviews/user/{user_id} - отзывы пользователя
- GET /api/reviews/skateboard/{skateboard_id} - отзывы о скейтборде

### Администрирование
- GET /api/admin/users - список пользователей
- PUT /api/admin/users/{id} - обновление пользователя
- GET /api/admin/statistics - общая статистика
- GET /api/admin/reports - отчеты (аренды, доходы, популярные маршруты)

## Технические требования

### Безопасность
1. Использование JWT для аутентификации
2. Разграничение доступа по ролям (C/S/A)
3. Валидация всех входных данных
4. Rate limiting для API endpoints
5. CORS настройки для frontend домена

### Валидация данных
1. Проверка диапазонов для всех числовых параметров
2. Валидация координат
3. Проверка уникальности серийных номеров
4. Валидация email и телефона
5. Проверка статусов и переходов между ними

### Мониторинг и логирование
1. Логирование всех действий с скейтбордами
2. Мониторинг состояния батарей
3. Отслеживание местоположения
4. Логирование ошибок и сбоев
5. Аудит действий администраторов

### Производительность
1. Кэширование часто запрашиваемых данных
2. Пагинация для списков
3. Оптимизация запросов к БД
4. Индексирование ключевых полей
5. Сжатие ответов API

### WebSocket API
1. Обновление местоположения в реальном времени
2. Уведомления о низком заряде батареи
3. Статус аренды и времени использования
4. Чат поддержки
5. Системные уведомления

## План разработки

### Этап 1: Базовый функционал (2 недели)
- [ ] Настройка проекта и окружения
- [ ] Реализация базовых моделей
- [ ] Аутентификация и авторизация
- [ ] CRUD операции для основных сущностей

### Этап 2: Бизнес-логика (3 недели)
- [ ] Система аренды
- [ ] Геолокация и отслеживание
- [ ] Расчет стоимости
- [ ] Система отзывов

### Этап 3: Расширенный функционал (2 недели)
- [ ] WebSocket интеграция
- [ ] Система уведомлений
- [ ] Административные функции
- [ ] Отчеты и статистика

### Этап 4: Оптимизация и тестирование (1 неделя)
- [ ] Оптимизация производительности
- [ ] Написание тестов
- [ ] Документация API
- [ ] Развертывание

## Рекомендуемый стек технологий

- **Язык**: Python 3.11+
- **Framework**: Django 4.2+ с Django REST framework
- **База данных**: PostgreSQL 14+
- **Кэширование**: Redis
- **WebSocket**: Django Channels
- **Очереди**: Celery
- **Документация**: OpenAPI (Swagger)
- **Тестирование**: pytest
- **CI/CD**: GitHub Actions

## Дополнительные требования

1. Документация API в формате OpenAPI 3.0
2. Покрытие тестами не менее 80%
3. Использование Docker для развертывания
4. Настройка CI/CD пайплайна
5. Мониторинг производительности
6. Система резервного копирования данных
7. Масштабируемая архитектура
8. Поддержка интернационализации 