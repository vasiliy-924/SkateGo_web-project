import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '../components/UI';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Исследуй город на скейте
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Арендуй электрические скейтборды и открывай новые места
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button 
              variant="primary" 
              className="hero-button"
              onClick={() => navigate('/skates')}
            >
              Найти скейт
            </Button>
          </motion.div>
        </div>
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="skateboard-illustration"></div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Почему выбирают нас
        </motion.h2>

        <div className="bento-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="feature-card stats">
              <div className="card-icon">📊</div>
              <h3>Впечатляющая статистика</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Поездок</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Скейтов</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.8</span>
                  <span className="stat-label">Рейтинг</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="feature-card map">
              <div className="card-icon">🗺️</div>
              <h3>Зоны катания</h3>
              <div className="map-preview">
                <div className="map-placeholder">
                  <p>Популярные места:</p>
                  <ul className="popular-places">
                    <li>Парк Горького</li>
                    <li>Музеон</li>
                    <li>Воробьевы горы</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="feature-card how-it-works">
              <div className="card-icon">🎯</div>
              <h3>Как это работает</h3>
              <ol className="steps-list">
                <li>
                  <span className="step-number">1</span>
                  <span className="step-text">Найди ближайший скейт на карте</span>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <span className="step-text">Забронируй и разблокируй</span>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <span className="step-text">Катайся и исследуй город</span>
                </li>
              </ol>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="feature-card promo">
              <div className="card-icon">🎁</div>
              <h3>Специальное предложение</h3>
              <div className="promo-content">
                <p>Первая поездка со скидкой</p>
                <div className="discount-badge">-50%</div>
                <Button 
                  variant="primary" 
                  className="promo-button"
                  onClick={() => navigate('/auth')}
                >
                  Получить скидку
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Card className="cta-card">
          <h2>Готов к приключению?</h2>
          <p>Присоединяйся к сообществу любителей активного отдыха</p>
          <Button 
            variant="primary" 
            className="cta-button"
            onClick={() => navigate('/auth')}
          >
            Начать кататься
          </Button>
        </Card>
      </motion.section>
    </div>
  );
};

export default HomePage; 