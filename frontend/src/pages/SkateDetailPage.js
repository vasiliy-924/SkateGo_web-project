import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from '../components/UI';
import { cardVariants } from '../theme/animations';
import { TECHNICAL_PARAMS, TARIFFS } from '../mocks/types';
import './SkateDetailPage.css';

const SkateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skateboard, setSkateboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('specs');

  useEffect(() => {
    // В будущем здесь будет API запрос
    setTimeout(() => {
      setSkateboard({
        id: 2,
        model_id: 1,
        serial_number: "BTX-2023-001",
        name: "Электроскейт Pro X2",
        status: "available",
        current_battery_capacity_ah: 10.5,
        current_battery_voltage_v: 36.5,
        battery_health: 85,
        total_distance: 1250.5,
        location: { 
          lat: 55.7587, 
          lng: 37.6200,
          address: "ул. Тверская, 15",
          timestamp: "2024-03-20T14:30:00Z"
        },
        model: {
          name: "Pro X2",
          description: "Профессиональный электрический скейтборд с мощным мотором",
          max_speed: 45,
          battery_capacity_from_factory_ah: 12.0,
          max_battery_voltage_v: 42.0,
          min_battery_voltage_v: 33.0,
          max_range: 35
        },
        price_per_hour: TARIFFS.BASE_RATE,
        price_per_minute: Math.round(TARIFFS.BASE_RATE / 60),
        features: [
          "Влагозащита IP54",
          "LED подсветка",
          "Bluetooth подключение",
          "Регенеративное торможение",
          "Сменная батарея"
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const getBatteryHealthColor = (health) => {
    if (health >= 90) return 'success';
    if (health >= TECHNICAL_PARAMS.CRITICAL_HEALTH) return 'warning';
    return 'error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'rented':
        return 'warning';
      case 'maintenance':
        return 'info';
      default:
        return 'error';
    }
  };

  const formatBatteryPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  if (loading) {
    return (
      <div className="skateboard-detail-page loading">
        <div className="skeleton-loader"></div>
      </div>
    );
  }

  const batteryPercentage = formatBatteryPercentage(
    skateboard.current_battery_capacity_ah,
    skateboard.model.battery_capacity_from_factory_ah
  );

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
                <img src={`/images/skateboards/${skateboard.model.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={skateboard.model.name} />
              </div>
              <div className="battery-info">
                <div className="battery-status">
                  <div className="battery-icon">
                    <div 
                      className="battery-level" 
                      style={{ width: `${batteryPercentage}%` }}
                    ></div>
                  </div>
                  <span>{batteryPercentage}%</span>
                </div>
                <div className="battery-health">
                  <Badge variant={getBatteryHealthColor(skateboard.battery_health)}>
                    Здоровье батареи: {skateboard.battery_health}%
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="info-card">
            <h2>{skateboard.model.name}</h2>
            <p className="model-description">{skateboard.model.description}</p>
            <div className="price-info">
              <div className="main-price">{skateboard.price_per_hour}₽/час</div>
              <div className="sub-price">({skateboard.price_per_minute}₽/мин)</div>
            </div>
            <div className="location-info">
              <h3>Текущее местоположение</h3>
              <p>{skateboard.location.address}</p>
              <p className="location-timestamp">
                Обновлено: {new Date(skateboard.location.timestamp).toLocaleString()}
              </p>
            </div>
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
              className={`tab-button ${selectedTab === 'technical' ? 'active' : ''}`}
              onClick={() => setSelectedTab('technical')}
            >
              Технические данные
            </button>
            <button 
              className={`tab-button ${selectedTab === 'features' ? 'active' : ''}`}
              onClick={() => setSelectedTab('features')}
            >
              Особенности
            </button>
          </div>

          <Card className="tab-content">
            {selectedTab === 'specs' && (
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Макс. скорость</span>
                  <span className="spec-value">{skateboard.model.max_speed} км/ч</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Запас хода</span>
                  <span className="spec-value">{skateboard.model.max_range} км</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Серийный номер</span>
                  <span className="spec-value">{skateboard.serial_number}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Общий пробег</span>
                  <span className="spec-value">{skateboard.total_distance.toFixed(1)} км</span>
                </div>
              </div>
            )}
            {selectedTab === 'technical' && (
              <div className="technical-grid">
                <div className="spec-item">
                  <span className="spec-label">Емкость батареи (завод.)</span>
                  <span className="spec-value">{skateboard.model.battery_capacity_from_factory_ah} Ач</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Текущая емкость</span>
                  <span className="spec-value">{skateboard.current_battery_capacity_ah} Ач</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Текущее напряжение</span>
                  <span className="spec-value">{skateboard.current_battery_voltage_v} В</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Диапазон напряжений</span>
                  <span className="spec-value">
                    {skateboard.model.min_battery_voltage_v}В - {skateboard.model.max_battery_voltage_v}В
                  </span>
                </div>
              </div>
            )}
            {selectedTab === 'features' && (
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