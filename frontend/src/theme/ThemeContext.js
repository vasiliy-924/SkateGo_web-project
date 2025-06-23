import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Получаем сохраненную тему из localStorage или системных настроек
  const getInitialMode = () => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      return savedMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const initialMode = getInitialMode();
  const [mode, setMode] = useState(initialMode);
  const [theme, setTheme] = useState(() => createTheme(initialMode === 'dark' ? darkTheme : lightTheme));

  // Применяем CSS-переменные
  const applyCssVariables = (variables) => {
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  // Обновляем тему и CSS-переменные при изменении режима
  useEffect(() => {
    const newTheme = createTheme(mode === 'dark' ? darkTheme : lightTheme);
    setTheme(newTheme);
    localStorage.setItem('themeMode', mode);
    
    // Применяем CSS-переменные
    const variables = mode === 'dark' ? darkTheme.cssVariables : lightTheme.cssVariables;
    applyCssVariables(variables);
  }, [mode]);

  // Слушаем изменения системной темы
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Применяем начальные CSS-переменные
  useEffect(() => {
    const variables = initialMode === 'dark' ? darkTheme.cssVariables : lightTheme.cssVariables;
    applyCssVariables(variables);
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = {
    mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 