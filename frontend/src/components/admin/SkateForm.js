import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import { SKATEBOARD_STATUSES, TECHNICAL_PARAMS } from '../../mocks/types';

const defaultValues = {
  model: {
    name: '',
    description: '',
    max_speed: 25,
    battery_capacity_from_factory_ah: 10.0,
    max_battery_voltage_v: 42.0,
    min_battery_voltage_v: 33.0,
    max_range: 20,
    is_active: true
  },
  skateboard: {
    serial_number: '',
    current_battery_capacity_ah: 10.0,
    current_battery_voltage_v: 36.0,
    total_distance: 0,
    battery_health: 100,
    status: SKATEBOARD_STATUSES.AVAILABLE,
    location: {
      lat: 55.751244,
      lng: 37.618423,
      address: ''
    }
  }
};

const SkateForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isNewModel, setIsNewModel] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const validateForm = () => {
    const newErrors = {};
    const { model, skateboard } = formData;
    
    // Валидация модели
    if (isNewModel) {
      if (!model.name.trim()) {
        newErrors.modelName = 'Укажите название модели';
      } else if (model.name.length > 100) {
        newErrors.modelName = 'Название модели не должно превышать 100 символов';
      }

      if (model.max_speed < 1 || model.max_speed > 200) {
        newErrors.maxSpeed = 'Скорость должна быть от 1 до 200 км/ч';
      }

      if (model.battery_capacity_from_factory_ah < 0 || model.battery_capacity_from_factory_ah > 120) {
        newErrors.batteryCapacity = 'Емкость батареи должна быть от 0 до 120 Ач';
      }

      if (model.max_battery_voltage_v < 1 || model.max_battery_voltage_v > 120) {
        newErrors.maxVoltage = 'Верхний предел напряжения должен быть от 1 до 120 В';
      }

      if (model.min_battery_voltage_v < 0 || model.min_battery_voltage_v > 120) {
        newErrors.minVoltage = 'Нижний предел напряжения должен быть от 0 до 120 В';
      }

      if (model.min_battery_voltage_v >= model.max_battery_voltage_v) {
        newErrors.voltageRange = 'Нижний предел напряжения должен быть меньше верхнего';
      }

      if (model.max_range < 1 || model.max_range > 200) {
        newErrors.maxRange = 'Запас хода должен быть от 1 до 200 км';
      }
    }
    
    // Валидация скейтборда
    if (!skateboard.serial_number.trim()) {
      newErrors.serialNumber = 'Укажите серийный номер';
    } else if (skateboard.serial_number.length > 50) {
      newErrors.serialNumber = 'Серийный номер не должен превышать 50 символов';
    }

    if (skateboard.current_battery_capacity_ah < 0 || skateboard.current_battery_capacity_ah > 120) {
      newErrors.currentBatteryCapacity = 'Текущая емкость батареи должна быть от 0 до 120 Ач';
    }

    if (skateboard.current_battery_voltage_v < 0 || skateboard.current_battery_voltage_v > 120) {
      newErrors.currentVoltage = 'Текущее напряжение должно быть от 0 до 120 В';
    }

    if (skateboard.total_distance < 0) {
      newErrors.totalDistance = 'Общий пробег не может быть отрицательным';
    }

    if (skateboard.battery_health < 0 || skateboard.battery_health > 100) {
      newErrors.batteryHealth = 'Здоровье батареи должно быть от 0 до 100%';
    }

    if (skateboard.location.lat < -90 || skateboard.location.lat > 90) {
      newErrors.latitude = 'Широта должна быть от -90 до 90';
    }

    if (skateboard.location.lng < -180 || skateboard.location.lng > 180) {
      newErrors.longitude = 'Долгота должна быть от -180 до 180';
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

  const handleModelChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      model: {
        ...prev.model,
        [field]: field.includes('voltage') || field.includes('capacity') || field.includes('speed') || field.includes('range')
          ? parseFloat(value) || 0
          : value
      }
    }));
  };

  const handleSkateboardChange = (field) => (event) => {
    const value = event.target.value;
    if (field === 'lat' || field === 'lng') {
      setFormData(prev => ({
        ...prev,
        skateboard: {
          ...prev.skateboard,
          location: {
            ...prev.skateboard.location,
            [field]: parseFloat(value) || 0
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        skateboard: {
          ...prev.skateboard,
          [field]: field === 'serial_number' ? value : parseFloat(value) || 0
        }
      }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={isNewModel}
            onChange={(e) => setIsNewModel(e.target.checked)}
            name="isNewModel"
          />
        }
        label="Создать новую модель"
      />

      {isNewModel && (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Характеристики модели</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Название модели"
                value={formData.model.name}
                onChange={handleModelChange('name')}
                error={!!errors.modelName}
                helperText={errors.modelName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Описание"
                value={formData.model.description}
                onChange={handleModelChange('description')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Максимальная скорость (км/ч)"
                value={formData.model.max_speed}
                onChange={handleModelChange('max_speed')}
                error={!!errors.maxSpeed}
                helperText={errors.maxSpeed}
                InputProps={{ inputProps: { min: 1, max: 200 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Запас хода (км)"
                value={formData.model.max_range}
                onChange={handleModelChange('max_range')}
                error={!!errors.maxRange}
                helperText={errors.maxRange}
                InputProps={{ inputProps: { min: 1, max: 200 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Емкость батареи (Ач)"
                value={formData.model.battery_capacity_from_factory_ah}
                onChange={handleModelChange('battery_capacity_from_factory_ah')}
                error={!!errors.batteryCapacity}
                helperText={errors.batteryCapacity}
                InputProps={{ inputProps: { min: 0, max: 120, step: 0.1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Макс. напряжение (В)"
                value={formData.model.max_battery_voltage_v}
                onChange={handleModelChange('max_battery_voltage_v')}
                error={!!errors.maxVoltage}
                helperText={errors.maxVoltage}
                InputProps={{ inputProps: { min: 1, max: 120, step: 0.1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Мин. напряжение (В)"
                value={formData.model.min_battery_voltage_v}
                onChange={handleModelChange('min_battery_voltage_v')}
                error={!!errors.minVoltage || !!errors.voltageRange}
                helperText={errors.minVoltage || errors.voltageRange}
                InputProps={{ inputProps: { min: 0, max: 120, step: 0.1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.model.is_active}
                    onChange={handleModelChange('is_active')}
                    name="isActive"
                  />
                }
                label="Модель активна"
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
        </>
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>Параметры скейтборда</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Серийный номер"
            value={formData.skateboard.serial_number}
            onChange={handleSkateboardChange('serial_number')}
            error={!!errors.serialNumber}
            helperText={errors.serialNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              value={formData.skateboard.status}
              onChange={handleSkateboardChange('status')}
              error={!!errors.status}
            >
              {Object.entries(SKATEBOARD_STATUSES).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Текущая емкость батареи (Ач)"
            value={formData.skateboard.current_battery_capacity_ah}
            onChange={handleSkateboardChange('current_battery_capacity_ah')}
            error={!!errors.currentBatteryCapacity}
            helperText={errors.currentBatteryCapacity}
            InputProps={{ inputProps: { min: 0, max: 120, step: 0.1 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Текущее напряжение (В)"
            value={formData.skateboard.current_battery_voltage_v}
            onChange={handleSkateboardChange('current_battery_voltage_v')}
            error={!!errors.currentVoltage}
            helperText={errors.currentVoltage}
            InputProps={{ inputProps: { min: 0, max: 120, step: 0.1 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Общий пробег (км)"
            value={formData.skateboard.total_distance}
            onChange={handleSkateboardChange('total_distance')}
            error={!!errors.totalDistance}
            helperText={errors.totalDistance}
            InputProps={{ inputProps: { min: 0, step: 0.1 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Здоровье батареи (%)"
            value={formData.skateboard.battery_health}
            onChange={handleSkateboardChange('battery_health')}
            error={!!errors.batteryHealth}
            helperText={errors.batteryHealth}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Широта"
            value={formData.skateboard.location.lat}
            onChange={handleSkateboardChange('lat')}
            error={!!errors.latitude}
            helperText={errors.latitude}
            InputProps={{ inputProps: { min: -90, max: 90, step: 'any' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Долгота"
            value={formData.skateboard.location.lng}
            onChange={handleSkateboardChange('lng')}
            error={!!errors.longitude}
            helperText={errors.longitude}
            InputProps={{ inputProps: { min: -180, max: 180, step: 'any' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Адрес"
            value={formData.skateboard.location.address}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              skateboard: {
                ...prev.skateboard,
                location: {
                  ...prev.skateboard.location,
                  address: e.target.value
                }
              }
            }))}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onCancel}>
          Отмена
        </Button>
        <Button variant="contained" type="submit" color="primary">
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};

export default SkateForm;
