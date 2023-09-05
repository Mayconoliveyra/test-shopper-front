import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { CssBaseline } from "@mui/material";

export const App = () => {
  return (
    <BrowserRouter>
      {/* Remove os estilos que vem por padrão no html/body. */}
      <CssBaseline />
      <AppRoutes />
    </BrowserRouter>
  );
};
