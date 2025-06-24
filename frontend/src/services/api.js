import getApi from '../mocks/services/mockApi';

class ApiService {
  constructor() {
    this.api = getApi();
  }

  // Методы для работы со скейтбордами
  async getSkateboards() {
    return this.api.getSkateboards();
  }

  async getSkateboard(id) {
    return this.api.getSkateboard(id);
  }

  async updateSkateboard(id, data) {
    return this.api.updateSkateboard(id, data);
  }

  // Методы для работы с арендой
  async getCurrentRentals() {
    return this.api.getCurrentRentals();
  }

  async getRentalHistory(page = 1) {
    return this.api.getRentalHistory(page);
  }

  async getRental(id) {
    return this.api.getRental(id);
  }

  // Методы для работы с пользователем
  async getUserStats() {
    return this.api.getUserStats();
  }

  // В будущем здесь будут добавляться другие методы для работы с API
}

// Создаем и экспортируем единственный экземпляр сервиса
export const apiService = new ApiService();

export default apiService; 