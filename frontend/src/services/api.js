import axios from 'axios';

// Создаем кэш для хранения ответов
const cache = new Map();

// Время жизни кэша в миллисекундах (5 минут)
const CACHE_TTL = 5 * 60 * 1000;

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Перехватчик для добавления токена авторизации
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Функция для проверки актуальности кэша
const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_TTL;
};

// Перехватчик для кэширования GET-запросов
api.interceptors.request.use(
  async (config) => {
    if (config.method === 'get') {
      const cacheKey = `${config.url}${JSON.stringify(config.params || {})}`;
      const cachedResponse = cache.get(cacheKey);

      if (cachedResponse && isCacheValid(cachedResponse.timestamp)) {
        // Возвращаем закэшированный ответ
        return Promise.resolve({
          ...config,
          cached: true,
          data: cachedResponse.data
        });
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Перехватчик для сохранения ответов в кэш
api.interceptors.response.use(
  (response) => {
    if (response.config.method === 'get' && !response.config.cached) {
      const cacheKey = `${response.config.url}${JSON.stringify(response.config.params || {})}`;
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Редирект на страницу авторизации при истечении токена
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Функция для очистки кэша
export const clearCache = () => {
  cache.clear();
};

// Функция для очистки конкретного URL из кэша
export const clearCacheForUrl = (url) => {
  for (const key of cache.keys()) {
    if (key.startsWith(url)) {
      cache.delete(key);
    }
  }
};

export default api; 