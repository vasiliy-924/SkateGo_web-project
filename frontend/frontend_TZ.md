### Техническое задание на разработку фронтенда приложения SkateGo  
**Версия 1.0**  
**Дата составления:** 25.06.2025  

---

#### **Этап 0: Подготовка среды разработки**  
1. **Инициализация проекта**  
   - Создать директорию `frontend/`  
   - Установить фреймворк: `npx create-react-app .` (React 18+)  
   - Установить зависимости:  
     ```bash
     npm install axios leaflet react-leaflet react-router-dom react-icons jwt-decode
     ```

2. **Настройка окружения**  
   - Создать файл `.env` с переменными:  
     ```
     REACT_APP_API_URL=http://localhost:8000/api
     REACT_APP_MAP_TILE_LAYER=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
     ```

3. **Настройка прокси для CORS**  
   - Добавить в `package.json`:  
     ```json
     "proxy": "http://localhost:8000"
     ```

---

#### **Этап 1: Базовая инфраструктура (2 дня)**  
1. **Конфигурация роутинга**  
   ```jsx
   // src/App.js
   import { BrowserRouter, Routes, Route } from 'react-router-dom';

   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/skateboards" element={<SkateListPage />} />
           <Route path="/skateboards/:id" element={<SkateDetailPage />} />
           <Route path="/profile" element={<ProfilePage />} />
           <Route path="/login" element={<AuthPage />} />
           <Route path="/admin/*" element={<AdminLayout />} />
           <Route path="*" element={<NotFoundPage />} />
         </Routes>
       </BrowserRouter>
     );
   }
   ```

2. **Сервис API**  
   ```javascript
   // src/services/api.js
   import axios from 'axios';

   const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL,
     headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
   });
   ```

3. **Система аутентификации**  
   - Реализовать:  
     - Авторизацию (POST `/auth/login/`)  
     - Хранение JWT в localStorage  
     - Авто-добавление токена в заголовки запросов  

---

#### **Этап 2: Основные страницы (5 дней)**  
1. **Главная страница (`/`)**  
   - [ ] Баннер с CTA "Арендовать"  
   - [ ] Блок преимуществ (3 карточки)  
   - [ ] Превью популярных моделей скейтов  
   - [ ] Секция "Как это работает"  

2. **Страница списка скейтбордов (`/skateboards`)**  
   ```jsx
   // src/components/SkateMap.js
   import { MapContainer, TileLayer, Marker } from 'react-leaflet';

   const SkateMap = ({ skateboards }) => (
     <MapContainer center={[55.75, 37.61]} zoom={12}>
       <TileLayer url={process.env.REACT_APP_MAP_TILE_LAYER} />
       {skateboards.map(skate => (
         <Marker 
           position={[skate.location.lat, skate.location.lng]} 
           icon={getStatusIcon(skate.status)}
         />
       ))}
     </MapContainer>
   );
   ```
   - [ ] Фильтры: статус, заряд батареи  
   - [ ] Реализация функции `getStatusIcon()`:  
     ```javascript
     const getStatusIcon = (status) => {
       const colors = { 
         'Доступен': 'green', 
         'Арендован': 'blue',
         'На обслуживании': 'orange',
         'Сломан': 'red'
       };
       return L.divIcon({className: `map-marker ${colors[status]}`});
     };
     ```

3. **Детальная страница скейта (`/skateboards/:id`)**  
   - [ ] Информация о модели  
   - [ ] Индикатор заряда: `BatteryIndicator`  
   - [ ] Кнопка аренды (условия: статус="Доступен" && заряд≥20%)  
   - [ ] Блок отзывов с формой добавления  

---

#### **Этап 3: Бизнес-процессы (4 дня)**  
1. **Система аренды**  
   - Логика компонента `TariffSelector`:  
     ```javascript
     // src/utils/priceCalculator.js
     export const calculatePrice = (hours, tariff, discounts) => {
       const base = { hourly: 100, daily: 800, weekly: 4000 }[tariff];
       return base - (base * (discounts.night + discounts.rain));
     };
     ```

2. **Процесс возврата**  
   - Алгоритм:  
     ```mermaid
     sequenceDiagram
       Пользователь->>Фронтенд: Скан QR-кода
       Фронтенд->>API: GET /skateboards/{id}
       API-->>Фронтенд: Данные скейта
       Фронтенд->>Геолокация: Проверка зоны
       alt В зоне
         Фронтенд->>API: POST /returns/
         API-->>Фронтенд: 200 OK + штрафы (если есть)
       else Вне зоны
         Фронтенд->>Пользователь: Ошибка + штраф 1000₽
       end
     ```

3. **Отзывы**  
   - Компонент `ReviewForm`:  
     - 5-звездочный рейтинг с шагом 0.5  
     - Валидация: текст 10-500 символов  

---

#### **Этап 4: Личный кабинет (3 дня)**  
1. **Страница профиля (`/profile`)**  
   - [ ] Текущие аренды с таймером  
   - [ ] История аренд  
   - [ ] Блок штрафов  
   - [ ] Статистика:  
     ```javascript
     const stats = {
       totalRentals: 15,
       avgDuration: '1.5 ч',
       discount: user.rentals > 10 ? 10 : 0
     };
     ```

2. **Система уведомлений**  
   - Реализовать:  
     - Push-уведомления (Web API)  
     - Toast-сообщения для:  
       * Низкий заряд (<10%)  
       * Выход из зоны  
       * Завершение аренды  

---

#### **Этап 5: Административная панель (4 дня)**  
1. **Структура роутов:**  
   ```
   /admin
     ├── /skateboards
     ├── /users
     ├── /zones
     └── /reports
   ```

2. **CRUD для скейтбордов**  
   - Таблица с колонками:  
     | ID | Модель | Заряд | Статус | Действия |  
   - Форма редактирования:  
     ```jsx
     <SkateForm 
       initialValues={skateData} 
       statusOptions={['Доступен', 'На обслуживании', 'Сломан']} 
     />
     ```

3. **Система отчетов**  
   - Графики:  
     - Распределение статусов скейтов  
     - Динамика аренд по дням  
     - Топ-5 популярных моделей  

---

#### **Этап 6: Тестирование и оптимизация (3 дня)**  
1. **Юнит-тесты (Jest)**  
   - Покрытие ключевых функций:  
     ```javascript
     test('calculateBatteryPercentage returns correct value', () => {
       expect(calculateBatteryPercentage(8, 10)).toBe(80);
     });
     ```

2. **Интеграционные тесты (Cypress)**  
   - Сценарии:  
     1. Успешная аренда  
     2. Возврат с штрафом  
     3. Добавление отзыва  

3. **Оптимизации:**  
   - Ленивая загрузка компонентов  
   - Кэширование API-запросов  
   - Сжатие статических ресурсов  

---

#### **Этап 7: Деплой и документация (2 дня)**  
1. **Сборка проекта:**  
   ```bash
   npm run build
   ```

2. **Деплой на сервер:**  
   - Настроить Nginx:  
     ```nginx
     server {
       listen 80;
       server_name skatego-front.com;
       root /var/www/skatego/frontend/build;
       index index.html;
       
       location /api {
         proxy_pass http://backend:8000;
       }
     }
     ```

3. **Документация:**  
   - `README.md` в корне `frontend/` с:  
     - Инструкцией по запуску  
     - Переменными окружения  
     - Структурой проекта  

---

### Критерии приемки этапов:  
1. **Этап 1:**  
   - Запросы к API проходят через прокси без CORS-ошибок  
   - JWT корректно сохраняется в localStorage  

2. **Этап 2:**  
   - На карте отображаются 10+ тестовых скейтов  
   - Фильтрация по статусу работает без перезагрузки страницы  

3. **Этап 3:**  
   - Расчет стоимости аренды учитывает все типы скидок  
   - Геолокационная проверка возврата работает в ±5м  

4. **Этап 4:**  
   - Push-уведомления приходят при достижении 10% заряда  
   - Таймер аренды обновляется в реальном времени  

5. **Этап 5:**  
   - Админ может изменить статус скейта через UI  
   - Графики отчетов отображают актуальные данные  

---

### Требования к качеству:  
1. **Производительность:**  
   - Lighthouse score ≥ 90 для Performance  
   - Время загрузки главной страницы < 1.5с  

2. **Безопасность:**  
   - XSS-защита для полей ввода  
   - JWT хранится только в httpOnly cookies (опционально)  

3. **Адаптивность:**  
   - Поддержка мобильных разрешений (320px+)  
   - Тестирование на Safari/Chrome/Firefox  

---

### Дополнительные рекомендации:  
1. Использовать библиотеку `react-query` для управления состоянием API  
2. Реализовать скелетоны загрузки для всех блоков с данными  
3. Добавить темную тему (приоритет - низкий)  

[Подпись ответственного разработчика]  
___________________________  
Дата: 25.06.2025  

Это ТЗ полностью покрывает все аспекты разработки фронтенда. Каждый этап содержит конкретные задачи, сроки и критерии приемки. Рекомендуется следовать этапам последовательно с обязательным тестированием после завершения каждого блока.