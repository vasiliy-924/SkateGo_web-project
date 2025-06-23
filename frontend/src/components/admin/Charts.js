import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { Box, Paper, Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const StatusDistributionChart = ({ data }) => (
  <Paper sx={{ p: 2, height: 300 }}>
    <Typography variant="h6" gutterBottom>
      Распределение статусов скейтов
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Paper>
);

export const RentalsDynamicsChart = ({ data }) => (
  <Paper sx={{ p: 2, height: 300 }}>
    <Typography variant="h6" gutterBottom>
      Динамика аренд по дням
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rentals" fill="#8884d8" name="Количество аренд" />
      </BarChart>
    </ResponsiveContainer>
  </Paper>
);

export const TopModelsChart = ({ data }) => (
  <Paper sx={{ p: 2, height: 300 }}>
    <Typography variant="h6" gutterBottom>
      Топ-5 популярных моделей
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="model" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="rentals" fill="#82ca9d" name="Количество аренд" />
      </BarChart>
    </ResponsiveContainer>
  </Paper>
);
