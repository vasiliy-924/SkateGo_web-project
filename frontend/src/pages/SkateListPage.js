import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import SkateMap from '../components/SkateMap';
import logger from '../services/logger';
import { Card, Button, Skeleton } from '../components/UI';
import { cardVariants, listItemVariants, filterVariants } from '../theme/animations';
import { SKATEBOARD_STATUSES } from '../mocks/types';
import './SkateListPage.css';

const SkateListPage = () => {
  const navigate = useNavigate();
  const [skateboards, setSkateboards] = useState([]);
  const [filteredSkateboards, setFilteredSkateboards] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [maxBatteryLevel, setMaxBatteryLevel] = useState(100);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case SKATEBOARD_STATUSES.AVAILABLE:
        return 'success';
      case SKATEBOARD_STATUSES.RENTED:
        return 'warning';
      case SKATEBOARD_STATUSES.MAINTENANCE:
        return 'info';
      case SKATEBOARD_STATUSES.CHARGING:
        return 'warning';
      case SKATEBOARD_STATUSES.RESERVED:
        return 'info';
      case SKATEBOARD_STATUSES.OFFLINE:
        return 'error';
      default:
        return 'error';
    }
  };

  const filterSkateboards = useCallback(() => {
    try {
      let filtered = [...skateboards];

      if (statusFilter !== 'all') {
        filtered = filtered.filter(skate => skate.status === statusFilter);
      }

      filtered = filtered.filter(skate => skate.battery_level <= maxBatteryLevel);

      setFilteredSkateboards(filtered);
      
      logger.debug('Скейтборды отфильтрованы', {
        totalCount: skateboards.length,
        filteredCount: filtered.length,
        filters: {
          status: statusFilter,
          maxBatteryLevel
        }
      });
    } catch (error) {
      logger.error('Ошибка при фильтрации скейтбордов', error);
    }
  }, [skateboards, statusFilter, maxBatteryLevel]);

  const fetchSkateboards = async () => {
    try {
      setLoading(true);
      const response = await api.getSkateboards();
      setSkateboards(response);
      logger.info('Скейтборды успешно загружены', {
        count: response.length
      });
    } catch (error) {
      logger.error('Ошибка при загрузке скейтбордов', error);
      console.error('Error fetching skateboards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkateboards();
  }, []);

  useEffect(() => {
    filterSkateboards();
  }, [statusFilter, maxBatteryLevel, skateboards, filterSkateboards]);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    logger.debug('Изменен фильтр статуса', {
      newValue: event.target.value
    });
  };

  const handleBatteryChange = (event) => {
    setMaxBatteryLevel(parseInt(event.target.value));
    logger.debug('Изменен максимальный уровень заряда', {
      newValue: parseInt(event.target.value)
    });
  };

  const handleSkateSelect = (skate) => {
    navigate(`/skates/${skate.id}`);
    logger.info('Выбран скейтборд', {
      skateId: skate.id,
      status: skate.status,
      batteryLevel: skate.battery_level
    });
  };

  const renderSkeletons = () => (
    Array(4).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`}>
        <div className="skateboard-card-skeleton">
          <Skeleton height="200px" />
          <Skeleton height="24px" width="60%" style={{ marginTop: '16px' }} />
          <Skeleton height="20px" width="40%" style={{ marginTop: '8px' }} />
          <Skeleton height="20px" width="30%" style={{ marginTop: '8px' }} />
        </div>
      </Card>
    ))
  );

  return (
    <div className="skatelist-page">
      <motion.div 
        className="hero-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <h1>Исследуй город на скейте</h1>
          <p>Найди ближайший скейтборд и начни свое приключение</p>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{filteredSkateboards.length}</span>
            <span className="stat-label">Доступно</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.8</span>
            <span className="stat-label">Рейтинг</span>
          </div>
        </div>
      </motion.div>

      <div className="bento-grid">
        <motion.div 
          className="filters-section"
          variants={filterVariants}
          initial="initial"
          animate="animate"
        >
          <Card className="filter-card">
            <h3>Фильтры</h3>
            <div className="filter-content">
              <div className="filter-group">
                <label>Статус</label>
                <select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="filter-select"
                >
                  <option value="all">Все статусы</option>
                  <option value={SKATEBOARD_STATUSES.AVAILABLE}>Доступен</option>
                  <option value={SKATEBOARD_STATUSES.RENTED}>Арендован</option>
                  <option value={SKATEBOARD_STATUSES.MAINTENANCE}>На обслуживании</option>
                  <option value={SKATEBOARD_STATUSES.CHARGING}>На зарядке</option>
                  <option value={SKATEBOARD_STATUSES.RESERVED}>Зарезервирован</option>
                  <option value={SKATEBOARD_STATUSES.OFFLINE}>Не доступен</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Показать с зарядом до: {maxBatteryLevel}%</label>
                <div className="battery-slider">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={maxBatteryLevel}
                    onChange={handleBatteryChange}
                    className="battery-range-input"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          className="map-section"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <Card className="map-card">
            <div className="map-header">
              <h3>Карта скейтбордов</h3>
              <Button
                variant="secondary"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? 'Показать список' : 'Развернуть карту'}
              </Button>
            </div>
            <div className={`map-container ${showMap ? 'expanded' : ''}`}>
              <SkateMap 
                skateboards={filteredSkateboards}
                onSkateSelect={handleSkateSelect}
                selectedZone={selectedZone}
                onZoneSelect={setSelectedZone}
              />
            </div>
          </Card>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            className="skateboards-grid"
            variants={listItemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {loading ? renderSkeletons() : (
              filteredSkateboards.map((skate, index) => (
                <motion.div
                  key={skate.id}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSkateSelect(skate)}
                >
                  <Card className="skateboard-card">
                    <div className="skateboard-card__image">
                      <img 
                        src={skate.image_url} 
                        alt={skate.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('no-image');
                        }}
                      />
                    </div>
                    <div className="skateboard-card__content">
                      <h3>{skate.name}</h3>
                      <div className={`status-badge status-badge--${getStatusColor(skate.status)}`}>
                        {skate.status}
                      </div>
                      <div className="battery-indicator">
                        <div 
                          className="battery-indicator__level"
                          style={{ width: `${skate.battery_level}%` }}
                        />
                        <span>{skate.battery_level}%</span>
                      </div>
                      <div className="skateboard-card__specs">
                        <div className="spec-item">
                          <span className="spec-label">Макс. скорость:</span>
                          <span className="spec-value">{skate.specs.max_speed} км/ч</span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-label">Запас хода:</span>
                          <span className="spec-value">{skate.specs.max_range} км</span>
                        </div>
                      </div>
                      <div className="skateboard-card__price">
                        <span>{skate.price_per_hour}₽/час</span>
                        <span className="price-minute">({skate.price_per_minute}₽/мин)</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkateListPage; 