/**
 * ЛОГИ ПРИЛОЖЕНИЯ
 * 
 * Все логи хранятся в директории: /logs
 * Файлы логов:
 * - error.log   - критические ошибки
 * - warning.log - предупреждения
 * - info.log    - информационные сообщения
 * - debug.log   - отладочная информация
 * - all.log     - все логи в одном файле
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

const LOG_FILES = {
  [LOG_LEVELS.ERROR]: 'error.log',
  [LOG_LEVELS.WARN]: 'warning.log',
  [LOG_LEVELS.INFO]: 'info.log',
  [LOG_LEVELS.DEBUG]: 'debug.log',
  ALL: 'all.log'
};

class Logger {
  constructor() {
    // Создаем временное хранилище для логов
    this.memoryLogs = [];
    this.maxMemoryLogs = 1000;

    // Автоматически сохраняем логи каждые 5 минут
    setInterval(() => this.saveLogsToFile(), 5 * 60 * 1000);

    // Сохраняем логи перед закрытием страницы
    window.addEventListener('beforeunload', () => this.saveLogsToFile());
  }

  formatLogEntry(level, message, details = null) {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
      location: window.location.href,
      userAgent: navigator.userAgent
    };
  }

  async saveLogsToFile() {
    try {
      // Получаем доступ к директории
      const dirHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
        startIn: 'downloads'
      });

      // Создаем или открываем файл логов
      const fileHandle = await dirHandle.getFileHandle('app.log', { create: true });
      const writable = await fileHandle.createWritable();

      // Форматируем логи для записи
      const logsToWrite = this.memoryLogs.map(log => JSON.stringify(log)).join('\n---\n');

      // Записываем логи в файл
      await writable.write(logsToWrite);
      await writable.close();

      console.log('Логи успешно сохранены в файл');
    } catch (error) {
      console.error('Ошибка при сохранении логов:', error);
    }
  }

  addLog(level, message, details = null) {
    const logEntry = this.formatLogEntry(level, message, details);

    // Добавляем лог в память
    this.memoryLogs.unshift(logEntry);

    // Ограничиваем количество логов в памяти
    if (this.memoryLogs.length > this.maxMemoryLogs) {
      this.memoryLogs = this.memoryLogs.slice(0, this.maxMemoryLogs);
    }

    // Выводим в консоль для удобства разработки
    console[level.toLowerCase()](`[${level}]`, message, details || '');

    return logEntry;
  }

  error(message, error = null) {
    const details = error ? {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    } : null;
    return this.addLog(LOG_LEVELS.ERROR, message, details);
  }

  warn(message, details = null) {
    return this.addLog(LOG_LEVELS.WARN, message, details);
  }

  info(message, details = null) {
    return this.addLog(LOG_LEVELS.INFO, message, details);
  }

  debug(message, details = null) {
    return this.addLog(LOG_LEVELS.DEBUG, message, details);
  }

  /**
   * Получает все логи из памяти
   * @param {Object} options - опции фильтрации
   * @returns {Array} отфильтрованные логи
   */
  getLogs(options = {}) {
    let filteredLogs = [...this.memoryLogs];

    if (options.level) {
      filteredLogs = filteredLogs.filter(log => log.level === options.level);
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filteredLogs = filteredLogs.filter(log => 
        log.message.toLowerCase().includes(searchLower) ||
        (log.details && JSON.stringify(log.details).toLowerCase().includes(searchLower))
      );
    }

    if (options.startDate) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) >= new Date(options.startDate)
      );
    }

    if (options.endDate) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) <= new Date(options.endDate)
      );
    }

    return filteredLogs;
  }

  /**
   * Экспортирует все логи в файл
   */
  async exportLogs() {
    try {
      const blob = new Blob(
        [this.memoryLogs.map(log => JSON.stringify(log, null, 2)).join('\n---\n')],
        { type: 'application/json' }
      );
      
      const handle = await window.showSaveFilePicker({
        suggestedName: `app-logs-${new Date().toISOString().split('T')[0]}.log`,
        types: [{
          description: 'Log File',
          accept: { 'text/plain': ['.log'] },
        }],
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();

      console.log('Логи успешно экспортированы');
    } catch (error) {
      console.error('Ошибка при экспорте логов:', error);
    }
  }

  /**
   * Очищает все логи из памяти
   */
  clearLogs() {
    this.memoryLogs = [];
  }
}

const logger = new Logger();
export default logger; 