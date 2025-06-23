import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Paper
} from '@mui/material';
import api from '../services/api';
import SkateMap from '../components/SkateMap';
import logger from '../services/logger';

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
    navigate(`/skateboards/${skate.id}`);
    logger.info('Выбран скейтборд', {
      skateId: skate.id,
      status: skate.status,
      batteryLevel: skate.battery_level
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Доступные скейтборды
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              label="Статус"
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="Доступен">Доступен</MenuItem>
              <MenuItem value="Арендован">Арендован</MenuItem>
              <MenuItem value="На обслуживании">На обслуживании</MenuItem>
              <MenuItem value="Сломан">Сломан</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ width: 300 }}>
            <Typography gutterBottom>
              Заряд батареи
            </Typography>
            <Slider
              value={batteryFilter}
              onChange={handleBatteryChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>
        </Box>
      </Paper>

      {loading ? (
        <Typography>Загрузка...</Typography>
      ) : (
        <SkateMap 
          skateboards={filteredSkateboards}
          onSkateSelect={handleSkateSelect}
        />
      )}

      <Typography sx={{ mt: 2 }}>
        Найдено скейтбордов: {filteredSkateboards.length}
      </Typography>
    </Box>
  );
};

export default SkateListPage; 