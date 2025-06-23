// Получаем цвета из переменных окружения или используем значения по умолчанию
const primaryColor = process.env.REACT_APP_PRIMARY_COLOR || '#1a237e';
const secondaryColor = process.env.REACT_APP_SECONDARY_COLOR || '#ff6f00';

// CSS переменные для градиентов и цветов
const cssVariables = {
  light: {
    '--bg-gradient-start': '#ffffff',
    '--bg-gradient-end': '#f5f5f5',
    '--text-gradient-start': '#1a237e',
    '--text-gradient-end': '#534bae',
    '--accent-gradient-start': '#1a237e',
    '--accent-gradient-end': '#534bae',
    '--text-primary': 'rgba(0, 0, 0, 0.87)',
    '--text-secondary': 'rgba(0, 0, 0, 0.6)',
    '--text-accent': '#1a237e',
    '--text-on-accent': '#ffffff',
    '--accent-color': '#1a237e',
  },
  dark: {
    '--bg-gradient-start': '#121212',
    '--bg-gradient-end': '#1e1e1e',
    '--text-gradient-start': '#ffffff',
    '--text-gradient-end': '#e0e0e0',
    '--accent-gradient-start': '#534bae',
    '--accent-gradient-end': '#1a237e',
    '--text-primary': '#ffffff',
    '--text-secondary': 'rgba(255, 255, 255, 0.7)',
    '--text-accent': '#534bae',
    '--text-on-accent': '#ffffff',
    '--accent-color': '#534bae',
  },
};

const commonTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
};

export const lightTheme = {
  ...commonTheme,
  cssVariables: cssVariables.light,
  palette: {
    mode: 'light',
    primary: {
      main: primaryColor,
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff',
    },
    secondary: {
      main: secondaryColor,
      light: '#ffa040',
      dark: '#c43e00',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
};

export const darkTheme = {
  ...commonTheme,
  cssVariables: cssVariables.dark,
  palette: {
    mode: 'dark',
    primary: {
      main: primaryColor,
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff',
    },
    secondary: {
      main: secondaryColor,
      light: '#ffa040',
      dark: '#c43e00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
      active: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
}; 