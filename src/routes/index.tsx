import { Routes, Route, Navigate } from "react-router-dom";

import { PriceManager } from "../pages/PriceManager";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PriceManager />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
