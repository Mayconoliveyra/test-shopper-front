import { Routes, Route, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/formacao-precos"
        element={<p>Página Formação de Preços.</p>}
      />

      <Route path="*" element={<Navigate to="/formacao-precos" />} />
    </Routes>
  );
};
