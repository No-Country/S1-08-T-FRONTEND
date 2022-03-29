//Se divide entre rutas publicas y las privadas
import React from "react";

import FeedCard from './components/feedCard/FeedCard';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import { purple, lightBlue, red } from '@mui/material/colors';

import { BrowserRouter as Router, BrowserRouter, Route, Routes } from "react-router-dom";

//redux
/*import { Provider } from 'react-redux';
import store from './store';
*/

import Navbar from './components/navbar/Navbar';

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



export const AppRouter = () => {
    return <ThemeProvider theme={theme}>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FeedCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  </ThemeProvider>
}
