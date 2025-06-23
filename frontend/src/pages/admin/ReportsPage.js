import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import {
  StatusDistributionChart,
  RentalsDynamicsChart,
  TopModelsChart
} from '../../components/admin/Charts';
import api from '../../services/api';

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState([]);
  const [rentalsData, setRentalsData] = useState([]);
  const [topModelsData, setTopModelsData] = useState([]);

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const [statusRes, rentalsRes, topModelsRes] = await Promise.all([
        api.get('/admin/reports/status-distribution/'),
        api.get('/admin/reports/rentals-dynamics/'),
        api.get('/admin/reports/top-models/')
      ]);

      setStatusData(statusRes.data);
      setRentalsData(rentalsRes.data);
      setTopModelsData(topModelsRes.data);
    } catch (error) {
      console.error('Error fetching reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Отчеты и статистика
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StatusDistributionChart data={statusData} />
        </Grid>
        <Grid item xs={12}>
          <RentalsDynamicsChart data={rentalsData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopModelsChart data={topModelsData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage;
