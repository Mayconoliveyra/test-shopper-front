import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/context/ThemeContext';
import { GlobalStyles } from './shared/themes/globalStyles';

export const App = () => {
  return (
    <BrowserRouter>
      <AppThemeProvider>
        <GlobalStyles />

        <AppRoutes />
      </AppThemeProvider>
    </BrowserRouter>
  );
};
