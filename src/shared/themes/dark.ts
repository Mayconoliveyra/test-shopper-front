import { createTheme } from '@mui/material/styles';

import { spacing, breakpoints } from './shared';

declare module '@mui/material/styles' {
  interface Theme {
    border: {
      primary: string;
    };
  }
  interface ThemeOptions {
    border: {
      primary: string;
    };
  }
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }
  interface TypeBackground {
    myPaper?: string;
  }
}

export const dark = createTheme({
  spacing: spacing,
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#3EA6FF',
    },
    background: {
      myPaper: '#212121',
    },
  },
  breakpoints: {
    values: breakpoints,
  },
  border: {
    primary: '1px solid #212121',
  },
});
