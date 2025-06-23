describe('Rental Process', () => {
  beforeEach(() => {
    // Авторизуемся перед каждым тестом
    cy.login('testuser@example.com', 'password123');
  });

  it('completes successful rental process', () => {
    // Переходим на страницу списка скейтов
    cy.visit('/skates');
    
    // Выбираем первый доступный скейт
    cy.get('[data-testid="skate-card"]').first().click();
    
    // Выбираем тариф
    cy.get('[data-testid="tariff-selector"]').click();
    cy.get('[data-testid="tariff-option-hourly"]').click();
    
    // Подтверждаем аренду
    cy.get('[data-testid="rent-button"]').click();
    
    // Проверяем, что аренда началась
    cy.get('[data-testid="rental-status"]').should('contain', 'Активная аренда');
  });

  it('handles rental return with penalty', () => {
    // Начинаем с активной арендой
    cy.visit('/profile');
    
    // Нажимаем кнопку возврата
    cy.get('[data-testid="return-button"]').click();
    
    // Эмулируем нахождение в запрещенной зоне
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .callsFake((cb) => {
          cb({
            coords: {
              latitude: 55.7558, // Координаты запрещенной зоны
              longitude: 37.6173
            }
          });
        });
    });
    
    // Сканируем QR-код (эмуляция)
    cy.get('[data-testid="qr-scanner"]').trigger('scan', { code: 'SKATE123' });
    
    // Проверяем наличие штрафа
    cy.get('[data-testid="penalty-amount"]').should('be.visible');
    cy.get('[data-testid="confirm-return"]').click();
  });

  it('successfully adds review after rental', () => {
    // Переходим на страницу завершенных аренд
    cy.visit('/profile/history');
    
    // Находим последнюю аренду и нажимаем "Оставить отзыв"
    cy.get('[data-testid="add-review-button"]').first().click();
    
    // Заполняем форму отзыва
    cy.get('[data-testid="rating-input"]').type('5');
    cy.get('[data-testid="review-comment"]')
      .type('Отличный сервис, скейт в хорошем состоянии!');
    
    // Отправляем отзыв
    cy.get('[data-testid="submit-review"]').click();
    
    // Проверяем, что отзыв добавлен
    cy.get('[data-testid="review-success-message"]').should('be.visible');
  });
}); 