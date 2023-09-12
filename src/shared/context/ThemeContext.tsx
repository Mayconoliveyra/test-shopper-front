import React, { createContext, useState, useCallback, useMemo, useContext, useEffect } from 'react';

import { setCustomCookie, parserCustomCookie } from '../utils/nookies';

import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { dark } from '../themes/dark';
import { light } from '../themes/light';

type ThemeContextProps = {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
};

type AppThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext({} as ThemeContextProps);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => {
      const newThemeName = oldThemeName === 'light' ? 'dark' : 'light';
      setCustomCookie('themeName', newThemeName, { maxAge: 60 * 60 * 24 * 365, path: '/' });

      return newThemeName;
    });
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return light;

    return dark;
  }, [themeName]);

  useEffect(() => {
    if (parserCustomCookie('themeName') === 'dark') {
      setThemeName('dark');
    } else {
      setThemeName('light');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box flex={1} display="flex" flexDirection="column" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
