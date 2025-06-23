// Проверка поддержки Push API
const isPushSupported = 'serviceWorker' in navigator && 'PushManager' in window;

// Запрос разрешения на отправку уведомлений
export const requestNotificationPermission = async () => {
  if (!isPushSupported) {
    console.warn('Push notifications are not supported');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Регистрация service worker для push-уведомлений
export const registerServiceWorker = async () => {
  if (!isPushSupported) return null;

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    return registration;
  } catch (error) {
    console.error('Error registering service worker:', error);
    return null;
  }
};

// Создание и показ toast-уведомления
export const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = document.createElement('span');
  icon.className = 'toast-icon';
  icon.textContent = {
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
    success: '✅'
  }[type];
  
  const text = document.createElement('span');
  text.className = 'toast-message';
  text.textContent = message;
  
  toast.appendChild(icon);
  toast.appendChild(text);
  
  // Добавляем toast в контейнер
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  container.appendChild(toast);
  
  // Анимация появления
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Автоматическое скрытие через 5 секунд
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
};

// Функции для конкретных уведомлений
export const notifyLowBattery = (level) => {
  showToast(`Низкий заряд батареи: ${level}%`, 'warning');
};

export const notifyOutOfZone = () => {
  showToast('Внимание! Вы покинули разрешенную зону', 'error');
};

export const notifyRentalComplete = (totalPrice) => {
  showToast(`Аренда завершена. Итоговая стоимость: ${totalPrice}₽`, 'success');
}; 