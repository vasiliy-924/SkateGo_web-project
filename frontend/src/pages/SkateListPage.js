import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import SkateMap from '../components/SkateMap';
import logger from '../services/logger';
import { Card, Button, Skeleton } from '../components/UI';
import { cardVariants, listItemVariants, filterVariants } from '../theme/animations';
import './SkateListPage.css';

// Моковые данные для тестирования
const MOCK_SKATEBOARDS = [
  {
    id: 1,
    name: "Скейт #1",
    status: "Доступен",
    battery_level: 100,
    location: { lat: 55.7558, lng: 37.6173 }, // Москва
  },
  {
    id: 2,
    name: "Скейт #2",
    status: "Арендован",
    battery_level: 75,
    location: { lat: 55.7587, lng: 37.6200 },
  },
  {
    id: 3,
    name: "Скейт #3",
    status: "На обслуживании",
    battery_level: 30,
    location: { lat: 55.7527, lng: 37.6222 },
  },
  {
    id: 4,
    name: "Скейт #4",
    status: "Доступен",
    battery_level: 90,
    location: { lat: 55.7539, lng: 37.6150 },
  },
];

const SkateListPage = () => {
  const navigate = useNavigate();
  const [skateboards, setSkateboards] = useState([]);
  const [filteredSkateboards, setFilteredSkateboards] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [batteryFilter, setBatteryFilter] = useState([0, 100]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);

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

  const filterSkateboards = useCallback(() => {
    try {
      let filtered = [...skateboards];

      if (statusFilter !== 'all') {
        filtered = filtered.filter(skate => skate.status === statusFilter);
      }

      filtered = filtered.filter(skate => 
        skate.battery_level >= batteryFilter[0] && 
        skate.battery_level <= batteryFilter[1]
      );

      setFilteredSkateboards(filtered);
      
      logger.debug('Скейтборды отфильтрованы', {
        totalCount: skateboards.length,
        filteredCount: filtered.length,
        filters: {
          status: statusFilter,
          batteryRange: batteryFilter
        }
      });
    } catch (error) {
      logger.error('Ошибка при фильтрации скейтбордов', error);
    }
  }, [skateboards, statusFilter, batteryFilter]);

  const fetchSkateboards = async () => {
    try {
      setLoading(true);
      // Временно используем моковые данные вместо API
      // const response = await api.get('/skateboards/');
      // setSkateboards(response.data);
      setSkateboards(MOCK_SKATEBOARDS);
      logger.info('Скейтборды успешно загружены', {
        count: MOCK_SKATEBOARDS.length
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
  }, [statusFilter, batteryFilter, skateboards, filterSkateboards]);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    logger.debug('Изменен фильтр статуса', {
      newValue: event.target.value
    });
  };

  const handleBatteryChange = (event, newValue) => {
    setBatteryFilter(newValue);
    logger.debug('Изменен фильтр заряда батареи', {
      newValue
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
                  <option value="Доступен">Доступен</option>
                  <option value="Арендован">Арендован</option>
                  <option value="На обслуживании">На обслуживании</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Заряд батареи: {batteryFilter[0]}% - {batteryFilter[1]}%</label>
                <div className="battery-slider">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={batteryFilter[0]}
                    onChange={(e) => handleBatteryChange(e, [parseInt(e.target.value), batteryFilter[1]])}
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={batteryFilter[1]}
                    onChange={(e) => handleBatteryChange(e, [batteryFilter[0], parseInt(e.target.value)])}
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
                      <div className="skateboard-preview" />
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