import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

// Ленивая загрузка компонентов
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SkateListPage = lazy(() => import('./pages/SkateListPage'));
const SkateDetailPage = lazy(() => import('./pages/SkateDetailPage'));

// Компонент загрузки
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    <CircularProgress />
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/skates" element={<SkateListPage />} />
          <Route path="/skates/:id" element={<SkateDetailPage />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
