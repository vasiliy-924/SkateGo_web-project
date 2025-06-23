import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from './theme/ThemeContext';
import ThemeToggle from './components/UI/ThemeToggle';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import logger from './services/logger';

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
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/skateboards" element={<SkateListPage />} />
              <Route path="/skateboards/:id" element={<SkateDetailPage />} />
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <ThemeToggle />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
