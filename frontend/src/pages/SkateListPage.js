import React, { useState, useEffect } from 'react';
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

const SkateListPage = () => {
  const navigate = useNavigate();
  const [skateboards, setSkateboards] = useState([]);
  const [filteredSkateboards, setFilteredSkateboards] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [batteryFilter, setBatteryFilter] = useState([0, 100]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkateboards();
  }, []);

  useEffect(() => {
    filterSkateboards();
  }, [skateboards, statusFilter, batteryFilter]);

  const fetchSkateboards = async () => {
    try {
      setLoading(true);
      const response = await api.get('/skateboards/');
      setSkateboards(response.data);
    } catch (error) {
      console.error('Error fetching skateboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSkateboards = () => {
    let filtered = [...skateboards];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(skate => skate.status === statusFilter);
    }

    filtered = filtered.filter(skate => 
      skate.battery_level >= batteryFilter[0] && 
      skate.battery_level <= batteryFilter[1]
    );

    setFilteredSkateboards(filtered);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleBatteryChange = (event, newValue) => {
    setBatteryFilter(newValue);
  };

  const handleSkateSelect = (skate) => {
    navigate(`/skateboards/${skate.id}`);
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