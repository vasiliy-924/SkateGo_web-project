/**
 * @typedef {Object} Location
 * @property {number} lat - Широта (-90 до 90)
 * @property {number} lng - Долгота (-180 до 180)
 * @property {string} address - Адрес
 * @property {string} timestamp - Временная метка обновления
 */

/**
 * @typedef {Object} SkateboardModel
 * @property {number} id - Уникальный идентификатор модели
 * @property {string} name - Название модели (до 100 символов)
 * @property {string} description - Описание модели
 * @property {number} max_speed - Максимальная скорость (1-200 км/ч)
 * @property {number} battery_capacity_from_factory_ah - Емкость батареи (0-120 Ач)
 * @property {number} max_battery_voltage_v - Верхний предел напряжения батареи (1-120 В)
 * @property {number} min_battery_voltage_v - Нижний предел напряжения батареи (0-120 В)
 * @property {number} max_range - Запас хода (1-200 км)
 * @property {boolean} is_active - Активна ли модель
 */

/**
 * @typedef {Object} Skateboard
 * @property {number} id - Уникальный идентификатор скейтборда
 * @property {number} model_id - ID модели скейтборда
 * @property {string} serial_number - Серийный номер (до 50 символов)
 * @property {number} current_battery_capacity_ah - Текущая емкость батареи (0-120 Ач)
 * @property {number} current_battery_voltage_v - Текущее напряжение батареи (0-120 В)
 * @property {number} total_distance - Общий пробег (км)
 * @property {number} battery_health - Здоровье батареи (0-100%)
 * @property {string} status - Статус скейтборда
 * @property {Location} location - Местоположение скейтборда
 */

/**
 * @typedef {Object} User
 * @property {number} id - Уникальный идентификатор пользователя
 * @property {string} username - Имя пользователя (до 31 символа)
 * @property {string} email - Email пользователя
 * @property {string} first_name - Имя
 * @property {string} last_name - Фамилия
 * @property {string} phone - Телефон
 * @property {string} type - Тип пользователя (C/S/A)
 * @property {boolean} is_active - Активен ли пользователь
 * @property {string} registration_date - Дата регистрации
 */

/**
 * @typedef {Object} Rental
 * @property {number} id - Уникальный идентификатор аренды
 * @property {number} user_id - ID пользователя
 * @property {number} skateboard_id - ID скейтборда
 * @property {string} start_time - Время начала аренды
 * @property {string} end_time - Время окончания аренды
 * @property {number} duration - Длительность в часах
 * @property {number} distance - Пройденное расстояние в км
 * @property {number} cost - Стоимость аренды
 * @property {Object} penalty - Информация о штрафе
 * @property {number} penalty.amount - Сумма штрафа
 * @property {string} penalty.type - Тип штрафа
 * @property {string} penalty.description - Описание штрафа
 * @property {Location} start_location - Место начала аренды
 * @property {Location} end_location - Место окончания аренды
 * @property {Array<Location>} route_points - Точки маршрута
 */

/**
 * @typedef {Object} Zone
 * @property {number} id - Уникальный идентификатор зоны
 * @property {string} name - Название зоны
 * @property {string} type - Тип зоны (parking, restricted, no_parking)
 * @property {Array<Location>} coordinates - Координаты полигона зоны
 * @property {string} description - Описание зоны
 */

/**
 * @typedef {Object} Review
 * @property {number} id - Уникальный идентификатор отзыва
 * @property {number} skateboard_id - ID скейтборда
 * @property {number} user_id - ID пользователя
 * @property {number} rating - Оценка (1-5)
 * @property {string} comment - Текст отзыва
 * @property {string} created_at - Дата создания
 */

/**
 * @typedef {Object} Transaction
 * @property {number} id - Уникальный идентификатор транзакции
 * @property {number} user_id - ID пользователя
 * @property {string} type - Тип транзакции (deposit, withdrawal, rental_payment)
 * @property {number} amount - Сумма
 * @property {string} status - Статус транзакции (pending, completed, failed)
 * @property {string} created_at - Дата создания транзакции
 */

// Статусы скейтбордов
export const SKATEBOARD_STATUSES = {
  AVAILABLE: 'available',
  RENTED: 'rented',
  MAINTENANCE: 'maintenance',
  CHARGING: 'charging',
  BROKEN: 'broken',
  OFFLINE: 'offline'
};

// Статусы аренды
export const RENTAL_STATUSES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  OVERDUE: 'overdue',
  PENDING_PAYMENT: 'pending_payment'
};

// Типы скейтбордов
export const SKATEBOARD_TYPES = {
  ELECTRIC: 'electric',
  ONEWHEEL: 'onewheel',
  HOVERBOARD: 'hoverboard'
};

// Уровни сложности
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert'
};

// Типы тарифов
export const TARIFF_TYPES = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKEND: 'weekend'
};

// Типы штрафов
export const PENALTY_TYPES = {
  LATE_RETURN: 'late_return',
  LOW_BATTERY: 'low_battery',
  DAMAGE: 'damage',
  OUT_OF_ZONE: 'out_of_zone'
};

// Характеристики скейтбордов
export const SKATEBOARD_SPECS = {
  RANGE: {
    SHORT: 'short',     // до 15 км
    MEDIUM: 'medium',   // 15-25 км
    LONG: 'long',      // 25-35 км
    EXTENDED: 'extended' // 35+ км
  },
  SPEED: {
    SLOW: 'slow',      // до 20 км/ч
    MEDIUM: 'medium',   // 20-30 км/ч
    FAST: 'fast',      // 30-40 км/ч
    EXTREME: 'extreme'  // 40+ км/ч
  },
  TERRAIN: {
    URBAN: 'urban',
    OFFROAD: 'offroad',
    ALLTERRAIN: 'allterrain',
    SMOOTH: 'smooth'
  }
};

export const ZONE_TYPES = {
  PARKING: 'parking',
  RESTRICTED: 'restricted',
  NO_PARKING: 'no_parking'
};

export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  RENTAL_PAYMENT: 'rental_payment'
};

export const TRANSACTION_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Типы пользователей
export const USER_TYPES = {
  CUSTOMER: 'C',
  STAFF: 'S',
  ADMIN: 'A'
};

// Тарифы
export const TARIFFS = {
  BASE_RATE: 100, // рублей в час
  DAILY_RATE: 800, // рублей в день
  WEEKLY_RATE: 4000, // рублей в неделю
  PENALTIES: {
    OVERTIME: 200, // рублей в час
    LOW_BATTERY: 500, // рублей
    OUT_OF_ZONE: 1000, // рублей
    DAMAGE_BASE: 1000 // рублей + стоимость ремонта
  },
  DISCOUNTS: {
    REGULAR_CLIENT: 0.1, // 10% после 10 аренд
    NIGHT_TIME: 0.2, // 20% с 22:00 до 6:00
    BAD_WEATHER: 0.15 // 15% в дождь
  }
};

// Технические параметры
export const TECHNICAL_PARAMS = {
  MIN_BATTERY_VOLTAGE: 0,
  MAX_BATTERY_VOLTAGE: 120,
  MIN_BATTERY_CAPACITY: 0,
  MAX_BATTERY_CAPACITY: 120,
  MIN_SPEED: 1,
  MAX_SPEED: 200,
  MIN_RANGE: 1,
  MAX_RANGE: 200,
  CRITICAL_HEALTH: 70,
  CRITICAL_BATTERY: 20
};

export const LOCATION_CONSTRAINTS = {
  MIN_LATITUDE: -90,
  MAX_LATITUDE: 90,
  MIN_LONGITUDE: -180,
  MAX_LONGITUDE: 180
}; 