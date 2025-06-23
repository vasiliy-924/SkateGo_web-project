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
  AppBar,
  Toolbar,
  Button,
  Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  DirectionsBike as SkateboardIcon,
  People as UsersIcon,
  Room as ZonesIcon,
  Assessment as ReportsIcon,
  ExitToApp as LogoutIcon,
  BugReport as LogsIcon
} from '@mui/icons-material';

const menuItems = [
  { path: '/admin', icon: <DashboardIcon />, text: 'Дашборд' },
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
          color: 'white'
        }
      }}
    >
      <div style={{ padding: '20px' }}>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          SkateGo Admin
        </Typography>
      </div>
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
              color: 'white'
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)', mt: 'auto' }} />
      <List>
        <ListItem
          component={Link}
          to="/logout"
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.04)'
            }
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminNav;
