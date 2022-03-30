import React from "react";
import { Route, Routes } from "react-router-dom";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import { purple, lightBlue, red } from '@mui/material/colors';
import { Navbar } from "../components/navbar/Navbar";
import Home from "../components/Home";


const theme = createTheme({
  typography: {
    fontFamily: [

      'Roboto',
      'karma',
    ].join(','),
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

export const DashboardRouters = () => {

  return <ThemeProvider theme={theme}>
    <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </>
  </ThemeProvider>
  
}

