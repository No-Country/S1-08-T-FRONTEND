//Se divide entre rutas publicas y las privadas

import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardRouters from "./DashboardRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <DashboardRouters/>
        }
      />
    </Routes>
  );
};