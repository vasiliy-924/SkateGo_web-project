import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

const defaultValues = {
  model: '',
  battery_level: 100,
  status: 'Доступен',
  location: {
    lat: 0,
    lng: 0
  }
};

const SkateForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.model.trim()) {
      newErrors.model = 'Укажите модель скейтборда';
    }
    
    if (formData.battery_level < 0 || formData.battery_level > 100) {
      newErrors.battery_level = 'Заряд должен быть от 0 до 100';
    }
    
    if (!formData.status) {
      newErrors.status = 'Выберите статус';
    }
    
    if (formData.location.lat < -90 || formData.location.lat > 90) {
      newErrors.lat = 'Широта должна быть от -90 до 90';
    }
    
    if (formData.location.lng < -180 || formData.location.lng > 180) {
      newErrors.lng = 'Долгота должна быть от -180 до 180';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    if (field === 'lat' || field === 'lng') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: parseFloat(value) || 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: field === 'battery_level' ? parseInt(value) || 0 : value
      }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Модель"
            value={formData.model}
            onChange={handleChange('model')}
            error={!!errors.model}
            helperText={errors.model}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Заряд батареи (%)"
            value={formData.battery_level}
            onChange={handleChange('battery_level')}
            error={!!errors.battery_level}
            helperText={errors.battery_level}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              value={formData.status}
              onChange={handleChange('status')}
              error={!!errors.status}
            >
              <MenuItem value="Доступен">Доступен</MenuItem>
              <MenuItem value="На обслуживании">На обслуживании</MenuItem>
              <MenuItem value="Сломан">Сломан</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Широта"
            value={formData.location.lat}
            onChange={handleChange('lat')}
            error={!!errors.lat}
            helperText={errors.lat}
            InputProps={{ inputProps: { step: 'any' } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Долгота"
            value={formData.location.lng}
            onChange={handleChange('lng')}
            error={!!errors.lng}
            helperText={errors.lng}
            InputProps={{ inputProps: { step: 'any' } }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onCancel}>
              Отмена
            </Button>
            <Button variant="contained" type="submit" color="primary">
              {initialValues ? 'Сохранить' : 'Добавить'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkateForm;
