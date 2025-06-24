import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from './theme/ThemeContext';
import ThemeToggle from './components/UI/ThemeToggle';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import logger from './services/logger';
import { AnimatePresence, motion } from 'framer-motion';
import { pageVariants } from './theme/animations';
import './App.css';

// Import pages
import SkateListPage from './pages/SkateListPage';
import SkateDetailPage from './pages/SkateDetailPage';
import ProfilePage from './pages/ProfilePage';

// Lazy load admin components
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const ReportsPage = lazy(() => import('./pages/admin/ReportsPage'));
const SkateboardsPage = lazy(() => import('./pages/admin/SkateboardsPage'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));
const ZonesPage = lazy(() => import('./pages/admin/ZonesPage'));

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

// Компонент обработки ошибок
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('Необработанная ошибка в приложении', {
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px',
          textAlign: 'center',
          marginTop: '50px'
        }}>
          <h1>Что-то пошло не так</h1>
          <p>Произошла ошибка. Мы уже работаем над её устранением.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Перезагрузить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Анимированный контейнер страницы
const PageContainer = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="page-container"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    // Логируем запуск приложения
    logger.info('Приложение запущено', {
      version: process.env.REACT_APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV
    });

    // Глобальный обработчик необработанных ошибок
    const handleUnhandledError = (event) => {
      logger.error('Необработанная ошибка', {
        message: event.error?.message,
        stack: event.error?.stack
      });
    };

    // Глобальный обработчик ошибок в промисах
    const handleUnhandledRejection = (event) => {
      logger.error('Необработанная ошибка в промисе', {
        reason: event.reason
      });
    };

    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <div className="app">
            <main className="main-content">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<PageContainer><HomePage /></PageContainer>} />
                <Route path="/skates" element={<PageContainer><SkateListPage /></PageContainer>} />
                <Route path="/skates/:id" element={<PageContainer><SkateDetailPage /></PageContainer>} />
                <Route path="/profile" element={<PageContainer><ProfilePage /></PageContainer>} />
                <Route path="/auth" element={<PageContainer><AuthPage /></PageContainer>} />

                {/* Admin routes */}
                <Route
                  path="/admin/*"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <AdminLayout />
                    </Suspense>
                  }
                />

                {/* 404 route */}
                <Route path="*" element={<PageContainer><NotFoundPage /></PageContainer>} />
              </Routes>
            </main>
          </div>
          <ThemeToggle />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
