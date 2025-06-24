import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      {/* Декоративные элементы */}
      <div className="decoration decoration-1"></div>
      <div className="decoration decoration-2"></div>

      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Страница не найдена</h2>
        <p className="not-found-text">
          Похоже, что страница, которую вы ищете, не существует или была перемещена.
          Не волнуйтесь, вы всегда можете вернуться на главную страницу.
        </p>
        <Link to="/" className="home-button">
          <span>🏠</span> Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 