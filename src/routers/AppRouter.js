//Se divide entre rutas publicas y las privadas

import React from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { purple, lightBlue, red } from "@mui/material/colors";
import Navbar from "../components/Navbar/Navbar";
import TestAuth from "../app/slices/users/TestAuth";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Home from "../components/Home/Home";
import Detail from "../components/DetailPost/Detail";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto", "karma"].join(","),
  },
  palette: {
    primary: {
      main: lightBlue[500],
    },
    alert: {
      main: purple[400],
    },
    secondary: {
      main: red[400],
    },
  },
});

export const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="body-container">
        <Navbar />
        <main>
        <Routes>
          <Route path="/signin" element={<TestAuth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};
