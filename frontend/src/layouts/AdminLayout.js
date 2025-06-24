import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import AdminNav from '../components/admin/AdminNav';
import SkateboardsPage from '../pages/admin/SkateboardsPage';
import UsersPage from '../pages/admin/UsersPage';
import ZonesPage from '../pages/admin/ZonesPage';
import ReportsPage from '../pages/admin/ReportsPage';
import LogViewer from '../components/admin/LogViewer';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f5f5f5',
          marginLeft: '240px', // Соответствует ширине AdminNav
          minHeight: '100vh'
        }}
      >
        <Routes>
          <Route index element={<Navigate to="skateboards" replace />} />
          <Route path="skateboards" element={<SkateboardsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="zones" element={<ZonesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="logs" element={<LogViewer />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminLayout; 