import { createTheme } from '@mui/material/styles';

// Paleta de cores minimalista
const colors = {
  primary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  dark: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  accent: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  }
};

// Tema base compartilhado
const baseTheme = {
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
};

// Tema Light
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[900],
      light: colors.primary[700],
      dark: colors.primary[900],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.accent[600],
      light: colors.accent[400],
      dark: colors.accent[800],
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: 'transparent',
    },
    text: {
      primary: colors.primary[900],
      secondary: colors.primary[600],
      disabled: colors.primary[400],
    },
    divider: colors.primary[200],
    grey: colors.primary,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#ffffff',
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: colors.primary[900],
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.primary[200]}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: `1px solid ${colors.primary[200]}`,
          borderRadius: 12,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: colors.primary[300],
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: colors.primary[900],
          color: '#ffffff',
          '&:hover': {
            backgroundColor: colors.primary[800],
          },
        },
        outlined: {
          borderColor: colors.primary[300],
          color: colors.primary[700],
          '&:hover': {
            borderColor: colors.primary[400],
            backgroundColor: colors.primary[50],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'transparent',
            borderRadius: 8,
            '& fieldset': {
              borderColor: colors.primary[300],
            },
            '&:hover fieldset': {
              borderColor: colors.primary[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary[600],
              borderWidth: 1,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
        outlined: {
          borderColor: colors.primary[300],
        },
      },
    },
  },
});

// Tema Dark
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: colors.dark[200],
      dark: colors.dark[100],
      contrastText: colors.dark[950],
    },
    secondary: {
      main: colors.accent[400],
      light: colors.accent[300],
      dark: colors.accent[600],
      contrastText: colors.dark[950],
    },
    background: {
      default: colors.dark[950],
      paper: 'transparent',
    },
    text: {
      primary: '#ffffff',
      secondary: colors.dark[300],
      disabled: colors.dark[500],
    },
    divider: colors.dark[800],
    grey: {
      ...colors.dark,
      50: colors.dark[900],
      100: colors.dark[800],
      200: colors.dark[700],
      300: colors.dark[600],
      400: colors.dark[500],
      500: colors.dark[400],
      600: colors.dark[300],
      700: colors.dark[200],
      800: colors.dark[100],
      900: colors.dark[50],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.dark[950],
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark[950],
          color: '#ffffff',
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.dark[800]}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: `1px solid ${colors.dark[800]}`,
          borderRadius: 12,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: colors.dark[700],
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#ffffff',
          color: colors.dark[950],
          '&:hover': {
            backgroundColor: colors.dark[100],
          },
        },
        outlined: {
          borderColor: colors.dark[700],
          color: colors.dark[200],
          '&:hover': {
            borderColor: colors.dark[600],
            backgroundColor: colors.dark[900],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'transparent',
            borderRadius: 8,
            '& fieldset': {
              borderColor: colors.dark[700],
            },
            '&:hover fieldset': {
              borderColor: colors.dark[600],
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.dark[500],
              borderWidth: 1,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.dark[400],
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          backgroundColor: 'transparent',
          color: colors.dark[200],
          border: `1px solid ${colors.dark[700]}`,
        },
        outlined: {
          borderColor: colors.dark[700],
          backgroundColor: 'transparent',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.dark[700]}`,
        },
      },
    },
  },
});

export default { lightTheme, darkTheme };
