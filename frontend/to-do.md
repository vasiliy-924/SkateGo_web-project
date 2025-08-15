# Техническое задание для фронтенд‑разработчика — Skate.GO (всё в одном)

**Проект:** Skate.GO — веб‑версия (минимально необходимая реализация).

**Цель:** реализовать SPA на React/TypeScript, запускаемую в Docker (отдаваемую через Nginx), которая демонстрирует функционал сервиса (информация о сервисе, карта зон/городов, базовые тарифы, FAQ, кнопки установки/дейплинки). Функционал приложения — *информационный/маркетинговый*, без брони/платёжной логики.

---

## Содержание этого файла

1. MVP (обязательно)
2. Технологический стек
3. Архитектура и структура папок
4. Компоненты
5. API: контракты
6. Map: требования и поведение
7. Docker / Nginx / Django — интеграция (файлы и примеры)
8. Переменные окружения
9. Качество кода и тестирование
10. A11y и перфоманс
11. Локализация
12. CI/CD (реком.)
13. Сроки и оценка работ
14. Результат передачи (что в репо)
15. Примеры файлов: package.json, .env.example, docker-compose.yml, nginx.conf, Dockerfile, Django settings фрагмент, public/data примеры
16. Чек‑лист для handoff

---

## 1. MVP — что обязательно реализовать

1. Страница «Главная» с хиро‑блоком и CTA "Скачать приложение" (кнопки App Store / Google Play и QR).
2. Карта с маркерами городов и полигонами зон катания (GeoJSON). При выборе города карта фокусируется на его зоне.
3. Страница/модал с деталями города (название, часы работы/сезон, список парковок).
4. Блок тарифов (таблица или карточки).
5. FAQ (аккордеоны) и контакты/футер.
6. Сбор основных аналитических событий (нажатие по стор‑кнопкам, выбор города/зоны, открытие FAQ) через `dataLayer` (или простую абстракцию `events.emit`).

> Всё остальное — опционально и только при наличии времени и ресурсов.

---

## 2. Технологический стек (минимум)

* **React 18 + TypeScript**.
* **Сборка:** Vite.
* **Routing:** react-router-dom.
* **Карта:** react‑leaflet + Leaflet + OpenStreetMap. GeoJSON для зон.
* **State:** React Context + useReducer или Zustand (опционально).
* **Стили:** CSS Modules (рекомендация) или Tailwind CSS — выбрать одно.
* **Тесты:** Vitest + React Testing Library; Playwright (e2e) опционально.
* **Линтинг/форматирование:** ESLint (TS), Prettier.
* **Контейнеризация:** Docker (multi‑stage), отдача через Nginx; `docker-compose` для локальной интеграции с Django.

---

## 3. Архитектура проекта / структура папок

```
src/
├─ app/            # точка монтирования (App.tsx, routes)
├─ pages/          # страницы: Home, City, FAQ, NotFound
├─ features/       # feature‑oriented: map, cities, tariffs, faq
├─ entities/       # модели типов: City, Zone, Parking, Tariff
├─ shared/         # UI: Button, Card, Modal, API client, utils
├─ assets/         # изображения, svg, icons
├─ styles/         # глобальные стили, vars
└─ api/            # контракты API (клиентские функции)
```

Принцип: feature‑sliced architecture — компоненты группируются по фичам, общие UI‑компоненты в `shared`.

---

## 4. Компоненты (обязательные, кратко)

* `Header` / `Footer` — логотип, навигация, ссылки на сторы.
* `Hero` — заголовок, подпись, StoreButtons + QR.
* `MapContainer` — инициализация Leaflet, загрузка и отрисовка GeoJSON, события клика/выбора.
* `CityList` / `CityCard` — список доступных городов; поиск.
* `TariffCardList` — карточки тарифов.
* `FAQAccordion` — аккордеоны.
* `InstallBanner` — смарт‑дейплинки и fallback.
* `Loader`, `ErrorBoundary`, `EmptyState`.

Каждый компонент должен иметь unit‑тест и Storybook‑стор (опционально, но рекомендовано).

---

## 5. API: контракты (обязательные endpoints)

> Если бекенд отсутствует — используйте статические JSON в `public/`.

**GET /api/cities**

* Response: `[{ slug, name, center: [lng,lat], bbox, season, country }]`

**GET /api/cities/\:slug/zones**

* Response: GeoJSON FeatureCollection — полигоны зон (properties: type, id и т.д.).

**GET /api/cities/\:slug/parkings**

* Response: `[{ id, name, coords: [lng,lat], type }]`

**GET /api/tariffs**

* Response: `[{ id, title, start_price, per_minute, additional }]`

Контракты должны быть документированы в `api/README.md`.

---

## 6. Map: требования и поведение

* Подключение **лениво**: динамический импорт карты только на странице с картой.
* Загружать GeoJSON для выбранного города по запросу (не подтягивать все города одновременно).
* Отрисовка полигона зоны (hover/active), маркеров парковок/точек.
* При выборе города: центрирование карты и плавный зум на bbox.
* Кластеризация маркеров при большом количестве точек (react-leaflet-markercluster).
* GeoJSON должен содержать свойство `properties.type` (ride/park/no‑ride).

---

## 7. Docker / Nginx / Django — интеграция

### Архитектурная идея

* Frontend собирается в статические файлы (`/dist`) через Vite.
* Nginx отдаёт статические файлы и выполняет reverse proxy для `/api/` к Django (gunicorn/uvicorn), а также может отдавать `/static/` и `/media/` бэкенда.
* Фронтенд использует относительный `VITE_API_BASE_URL=/api` для запросов.

### docker-compose (рекомендуемый базовый шаблон)

```yaml
version: '3.8'
services:
  django:
    image: yourorg/django-app:latest
    container_name: django
    env_file: .env.backend
    expose:
      - "8000"
    networks:
      - skatego-net

  frontend:
    build:
      context: ./frontend
      target: build
    image: skatego-frontend:latest
    container_name: frontend_build
    networks:
      - skatego-net

  nginx:
    image: nginx:stable-alpine
    container_name: nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./deploy/nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./frontend/dist:/usr/share/nginx/html:ro
    depends_on:
      - django
      - frontend
    networks:
      - skatego-net

networks:
  skatego-net:
    driver: bridge
```

> Пояснение: nginx внутри сети проксирует `/api` на `http://django:8000/api/`.

### nginx.conf (пример)

```nginx
server {
    listen 80;
    server_name example.com;

    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain application/javascript application/json text/css image/svg+xml;
    sendfile on;

    location /api/ {
        proxy_pass http://django:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_read_timeout 90;
    }

    location /static/ {
        alias /srv/static/;
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    location /media/ {
        alias /srv/media/;
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

### Dockerfile (multi‑stage) — frontend

```dockerfile
# build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# production
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Django: рекомендуемые настройки (фрагменты `settings.py`)

```py
INSTALLED_APPS += ["corsheaders"]
MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware"] + MIDDLEWARE

CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://www.example.com",
]
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = ["https://example.com"]
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Простая health view:
# path('api/health/', lambda r: JsonResponse({'ok': True}))
```

### Интеграционные правила для фронтенда

1. В коде использовать **относительный** `VITE_API_BASE_URL='/api'`.
2. Все запросы к API — через базовый URL; не вставлять абсолютные хосты.
3. Для cookie‑auth: `fetch(..., { credentials: 'include' })`. Согласовать CSRF с бекендом.
4. Обрабатывать 502/504 и показывать пользовательский UI ошибки.
5. Добавить healthcheck (`GET /api/health/`) для проверки связности.

---

## 8. Переменные окружения (минимально)

* `VITE_API_BASE_URL` — базовый URL для API (например `/api`).
* `VITE_MAP_PROVIDER` — "leaflet" (на будущее).
* `VITE_APP_ENV` — prod/staging/dev.

Файл `.env.example` должен содержать эти переменные.

---

## 9. Качество кода и тестирование

* ESLint + Prettier.
* Unit‑тесты для критичных UI‑компонентов (MapContainer, CityList, TariffCard).
* Минимум: 1–2 e2e теста (переход на страницу города, выбор полигона).
* Storybook (опционально).

---

## 10. A11y и перфоманс (минимально)

* Семантическая разметка, alt для изображений, фокусируемые элементы.
* Ленивая загрузка тяжёлых ресурсов (карта, изображения).
* Lighthouse: Perf ≥ 80 (мобайл), CLS минимален.

---

## 11. Локализация

* Приложение на русском; кодовая база должна быть готова к i18n (react‑i18next) — но реализация локалей опциональна.

---

## 12. CI/CD (рекомендация, опционально)

* GitHub Actions: на PR — сборка, линтер, тесты; на merge в main — билд и пуш docker‑image в реестр.

---

## 13. Сроки и оценка работ (MVP)

* 1 неделя: настройка репозитория, окружения, базовый layout, header/footer, хиро.
* 1 неделя: карта + загрузка GeoJSON + CityList + City page.
* 0.5 недели: тарифы, FAQ, events/аналитика.
* 0.5 недели: тесты, Docker, документация и мелкие правки.

**Итого:** \~3–3.5 недели для одного опытного фронтендера (включая ревью и правки).

---

## 14. Результат передачи (что должно быть в репозитории)

* README с инструкцией по запуску локально и в Docker.
* Dockerfile + .env.example + nginx.conf (если используется nginx).
* Примеры JSON в `public/data/` (cities.json, zones/\*.geojson, parkings.json, tariffs.json).
* Скрипты в package.json: `dev`, `build`, `preview`, `lint`, `test`.
* Набор unit‑тестов + 1 e2e тест.

---

## 15. Примеры файлов

### package.json (шаблон)

```json
{
  "name": "skatego-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173",
    "lint": "eslint . --ext .ts,.tsx",
    "test": "vitest",
    "storybook": "start-storybook -p 6006"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.4.2",
    "eslint": "^8.46.0",
    "vitest": "^0.36.3",
    "@types/leaflet": "^1.9.3"
  }
}
```

### .env.example

```
VITE_API_BASE_URL=/api
VITE_MAP_PROVIDER=leaflet
VITE_APP_ENV=development
```

### docker-compose.yml (копия из раздела 7)

(См. выше)

### nginx.conf (копия из раздела 7)

(См. выше)

### Dockerfile (копия из раздела 7)

(См. выше)

### Django settings фрагмент (копия из раздела 7)

(См. выше)

### public/data/cities.json (пример)

```json
[
  {
    "slug": "moskva",
    "name": "Москва",
    "center": [37.6176, 55.7558],
    "bbox": [ [37.3, 55.55], [37.9, 55.95] ],
    "season": "2025-04-01..2025-10-31",
    "country": "RU"
  },
  {
    "slug": "spb",
    "name": "Санкт‑Петербург",
    "center": [30.3141, 59.9386],
    "bbox": [ [29.7, 59.6], [30.7, 60.1] ],
    "season": "2025-04-01..2025-10-31",
    "country": "RU"
  }
]
```

### public/data/zones/moskva.geojson (пример минимальный)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "id": "zone-1", "type": "ride", "name": "Центральная зона" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [37.55,55.75], [37.62,55.75], [37.62,55.78], [37.55,55.78], [37.55,55.75]
          ]
        ]
      }
    }
  ]
}
```

### public/data/parkings/moskva.json (пример)

```json
[
  {
```
