import { Routes, Route, Navigate } from "react-router-dom";

import { Pricing } from "../pages/Pricing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Pricing />} />

      <Route path="*" element={<Navigate to="/formacao-precos" />} />
    </Routes>
  );
};
