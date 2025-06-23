import { skateboards } from '../data/skateboards';
import { rentals } from '../data/rentals';

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Флаг для переключения между моковыми данными и реальным API
const USE_MOCK = true;

// Количество элементов на странице для пагинации
const PAGE_SIZE = 2;

class MockApi {
  constructor() {
    this.skateboards = [...skateboards];
    this.rentals = [...rentals];
  }

  // Общий метод для имитации HTTP запроса
  async mockRequest(data, error = null, delayMs = 500) {
    await delay(delayMs);
    if (error) {
      throw new Error(error);
    }
    return data;
  }

  // Методы для работы со скейтбордами
  async getSkateboards() {
    return this.mockRequest(this.skateboards);
  }

  async getSkateboard(id) {
    const skateboard = this.skateboards.find(s => s.id === id);
    if (!skateboard) {
      return this.mockRequest(null, 'Skateboard not found', 300);
    }
    return this.mockRequest(skateboard);
  }

  async updateSkateboard(id, data) {
    const index = this.skateboards.findIndex(s => s.id === id);
    if (index === -1) {
      return this.mockRequest(null, 'Skateboard not found', 300);
    }
    this.skateboards[index] = { ...this.skateboards[index], ...data };
    return this.mockRequest(this.skateboards[index]);
  }

  // Методы для работы с историей аренды
  async getRentalHistory(page = 1) {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedRentals = this.rentals.slice(start, end);
    
    return this.mockRequest({
      results: paginatedRentals,
      next: end < this.rentals.length ? page + 1 : null,
      previous: page > 1 ? page - 1 : null,
      count: this.rentals.length
    });
  }

  async getRental(id) {
    const rental = this.rentals.find(r => r.id === id);
    if (!rental) {
      return this.mockRequest(null, 'Rental not found', 300);
    }
    return this.mockRequest(rental);
  }

  // Метод для получения статистики пользователя
  async getUserStats() {
    // Подсчитываем статистику на основе истории аренды
    const totalRentals = this.rentals.length;
    const totalDurationHours = this.rentals.reduce((sum, rental) => sum + rental.duration, 0);
    const avgDurationHours = totalDurationHours / totalRentals;
    const totalDistance = this.rentals.reduce((sum, rental) => sum + rental.distance, 0);
    const totalSpent = this.rentals.reduce((sum, rental) => sum + rental.cost, 0);
    const totalPenalties = this.rentals.reduce((sum, rental) => sum + (rental.penalty || 0), 0);

    return this.mockRequest({
      total_rentals: totalRentals,
      avg_duration_hours: avgDurationHours,
      total_distance: totalDistance,
      total_spent: totalSpent,
      total_penalties: totalPenalties
    });
  }
}

// Создаем и экспортируем единственный экземпляр
export const mockApi = new MockApi();

// Функция для получения правильного API в зависимости от флага USE_MOCK
export const getApi = () => {
  if (USE_MOCK) {
    return mockApi;
  }
  // Здесь будет возвращаться реальный API клиент
  throw new Error('Real API client is not implemented yet');
};

export default getApi; 