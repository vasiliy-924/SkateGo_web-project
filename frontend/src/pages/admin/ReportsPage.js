import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  StatusDistributionChart,
  RentalsDynamicsChart,
  TopModelsChart
} from '../../components/admin/Charts';
import { mockApi } from '../../mocks/services/mockApi';

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [statusData, setStatusData] = useState([]);
  const [rentalsData, setRentalsData] = useState([]);
  const [topModelsData, setTopModelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReportData();
  }, [timeRange]);

  const loadReportData = async () => {
    try {
      setLoading(true);
      const [statusStats, rentalsStats, modelsStats] = await Promise.all([
        mockApi.getSkateboardStatusStats(),
        mockApi.getRentalStats(timeRange),
        mockApi.getTopModelsStats(timeRange)
      ]);

      setStatusData(statusStats);
      setRentalsData(rentalsStats);
      setTopModelsData(modelsStats);
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Отчеты
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Период</InputLabel>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            label="Период"
          >
            <MenuItem value="week">Неделя</MenuItem>
            <MenuItem value="month">Месяц</MenuItem>
            <MenuItem value="year">Год</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StatusDistributionChart data={statusData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopModelsChart data={topModelsData} />
        </Grid>
        <Grid item xs={12}>
          <RentalsDynamicsChart data={rentalsData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage;
