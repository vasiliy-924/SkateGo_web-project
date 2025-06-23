/**
 * @typedef {Object} Location
 * @property {number} lat - Широта
 * @property {number} lng - Долгота
 */

/**
 * @typedef {Object} Skateboard
 * @property {number} id - Уникальный идентификатор скейтборда
 * @property {string} name - Название скейтборда
 * @property {string} status - Статус скейтборда (Доступен, Арендован, На обслуживании, Сломан)
 * @property {number} battery_level - Уровень заряда батареи (0-100)
 * @property {Location} location - Местоположение скейтборда
 * @property {string} model - Модель скейтборда
 * @property {number} price_per_hour - Цена аренды в час
 * @property {number} price_per_minute - Цена аренды в минуту
 * @property {string} image_url - URL изображения скейтборда
 */

/**
 * @typedef {Object} User
 * @property {number} id - Уникальный идентификатор пользователя
 * @property {string} username - Имя пользователя
 * @property {string} email - Email пользователя
 * @property {string} role - Роль пользователя (user, admin)
 * @property {string} first_name - Имя
 * @property {string} last_name - Фамилия
 * @property {string} phone - Номер телефона
 * @property {number} balance - Баланс пользователя
 * @property {boolean} is_verified - Подтвержден ли пользователь
 */

/**
 * @typedef {Object} Rental
 * @property {number} id - Уникальный идентификатор аренды
 * @property {number} user_id - ID пользователя
 * @property {number} skateboard_id - ID скейтборда
 * @property {string} start_time - Время начала аренды
 * @property {string} end_time - Время окончания аренды
 * @property {number} total_cost - Общая стоимость
 * @property {string} status - Статус аренды (active, completed, cancelled)
 * @property {Location} start_location - Место начала аренды
 * @property {Location} end_location - Место окончания аренды
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
 * @property {number} user_id - ID пользователя
 * @property {number} skateboard_id - ID скейтборда
 * @property {number} rating - Оценка (1-5)
 * @property {string} comment - Комментарий
 * @property {string} created_at - Дата создания отзыва
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

export const SKATEBOARD_STATUSES = {
  AVAILABLE: 'Доступен',
  RENTED: 'Арендован',
  MAINTENANCE: 'На обслуживании',
  BROKEN: 'Сломан'
};

export const RENTAL_STATUSES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
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