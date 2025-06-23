import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from '../components/UI';
import { cardVariants } from '../theme/animations';
import './SkateDetailPage.css';

// Временные моковые данные
const MOCK_SKATEBOARD = {
  id: 2,
  name: "Электроскейт Pro X2",
  status: "Доступен",
  battery_level: 85,
  location: { lat: 55.7587, lng: 37.6200 },
  specs: {
    maxSpeed: "25 км/ч",
    range: "20 км",
    motor: "500W",
    weight: "7 кг",
    maxLoad: "100 кг",
    chargingTime: "2 часа"
  },
  rating: 4.8,
  reviews: 124,
  pricePerHour: 299,
  description: "Профессиональный электрический скейтборд с мощным мотором и длительным временем работы. Идеально подходит для городского передвижения и активного отдыха.",
  features: [
    "Влагозащита IP54",
    "LED подсветка",
    "Bluetooth подключение",
    "Регенеративное торможение",
    "Сменная батарея"
  ]
};

const SkateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skateboard, setSkateboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('specs');

  useEffect(() => {
    // В будущем здесь будет API запрос
    setTimeout(() => {
      setSkateboard(MOCK_SKATEBOARD);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Доступен':
        return 'success';
      case 'Арендован':
        return 'warning';
      case 'На обслуживании':
        return 'info';
      default:
        return 'error';
    }
  };

  const handleRent = () => {
    // В будущем здесь будет логика аренды
    console.log('Начало аренды скейтборда:', id);
  };

  if (loading) {
    return (
      <div className="skateboard-detail-page loading">
        <div className="skeleton-loader"></div>
      </div>
    );
  }

  return (
    <div className="skateboard-detail-page">
      <motion.div 
        className="detail-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button 
          variant="secondary" 
          onClick={() => navigate('/skates')}
          className="back-button"
        >
          ← Назад к списку
        </Button>
        <Badge variant={getStatusColor(skateboard.status)}>
          {skateboard.status}
        </Badge>
      </motion.div>

      <div className="detail-content">
        <motion.div 
          className="main-info"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <Card className="preview-card">
            <div className="skateboard-preview">
              <div className="preview-image">
                {/* В будущем здесь будет изображение скейтборда */}
              </div>
              <div className="battery-status">
                <div className="battery-icon">
                  <div 
                    className="battery-level" 
                    style={{ width: `${skateboard.battery_level}%` }}
                  ></div>
                </div>
                <span>{skateboard.battery_level}%</span>
              </div>
            </div>
          </Card>

          <Card className="info-card">
            <h1>{skateboard.name}</h1>
            <p className="description">{skateboard.description}</p>
            
            <div className="rating-price">
              <div className="rating">
                <div className="stars">
                  {'★'.repeat(Math.floor(skateboard.rating))}
                  {'☆'.repeat(5 - Math.floor(skateboard.rating))}
                </div>
                <span>{skateboard.rating} ({skateboard.reviews} отзывов)</span>
              </div>
              <div className="price">
                <span className="amount">{skateboard.pricePerHour} ₽</span>
                <span className="period">/час</span>
              </div>
            </div>

            <Button 
              variant="primary" 
              onClick={handleRent}
              className="rent-button"
            >
              Арендовать сейчас
            </Button>
          </Card>
        </motion.div>

        <motion.div 
          className="details-tabs"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <div className="tabs-header">
            <button 
              className={`tab-button ${selectedTab === 'specs' ? 'active' : ''}`}
              onClick={() => setSelectedTab('specs')}
            >
              Характеристики
            </button>
            <button 
              className={`tab-button ${selectedTab === 'features' ? 'active' : ''}`}
              onClick={() => setSelectedTab('features')}
            >
              Особенности
            </button>
          </div>

          <Card className="tab-content">
            {selectedTab === 'specs' ? (
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Макс. скорость</span>
                  <span className="spec-value">{skateboard.specs.maxSpeed}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Запас хода</span>
                  <span className="spec-value">{skateboard.specs.range}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Мощность</span>
                  <span className="spec-value">{skateboard.specs.motor}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Вес</span>
                  <span className="spec-value">{skateboard.specs.weight}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Макс. нагрузка</span>
                  <span className="spec-value">{skateboard.specs.maxLoad}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Время зарядки</span>
                  <span className="spec-value">{skateboard.specs.chargingTime}</span>
                </div>
              </div>
            ) : (
              <ul className="features-list">
                {skateboard.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SkateDetailPage; 