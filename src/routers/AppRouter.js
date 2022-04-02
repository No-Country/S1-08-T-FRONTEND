//Se divide entre rutas publicas y las privadas
// import { Login } from "@mui/icons-material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardRouters } from "./DashboardRoutes";
import Login from "../components/login/Login";

export const AppRouter = () => {
  return (
      <Routes>
        <Route path="/*" element={<DashboardRouters/>}/>
         <Route path="/signin" element={<Login/>}/>
      </Routes>
    );
};
