import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Divider,
  Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  DirectionsBike as SkateboardIcon,
  People as UsersIcon,
  Room as ZonesIcon,
  Assessment as ReportsIcon,
  BugReport as LogsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

const menuItems = [
  { path: '/admin/skateboards', icon: <SkateboardIcon />, text: 'Скейтборды' },
  { path: '/admin/users', icon: <UsersIcon />, text: 'Пользователи' },
  { path: '/admin/zones', icon: <ZonesIcon />, text: 'Зоны' },
  { path: '/admin/reports', icon: <ReportsIcon />, text: 'Отчеты' },
  { path: '/admin/logs', icon: <LogsIcon />, text: 'Логи' }
];

const AdminNav = () => {
  const location = useLocation();
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1a237e',
          color: 'white',
          position: 'fixed'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component={Link} to="/admin" sx={{ color: 'white', textDecoration: 'none' }}>
          SkateGo Admin
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
      
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(255,255,255,0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.12)'
                }
              },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.04)'
              },
              color: 'white',
              textDecoration: 'none'
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
        <List>
          <ListItem
            component={Link}
            to="/auth"
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.04)'
              },
              textDecoration: 'none'
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выход" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminNav;
