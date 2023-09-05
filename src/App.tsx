import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({});

export const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};
