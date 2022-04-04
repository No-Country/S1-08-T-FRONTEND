//Se divide entre rutas publicas y las privadas
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";

export const AppRouter = () => {
  return (
      <Routes>
         <Route path="/login" element={<Login/>}/>
      </Routes>
    );
};
