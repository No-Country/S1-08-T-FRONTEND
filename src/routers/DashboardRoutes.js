import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import { purple, lightBlue, red } from '@mui/material/colors';

import { BrowserRouter as Router, BrowserRouter, Route, Routes } from "react-router-dom";

//redux
/*import { Provider } from 'react-redux';
import store from './store';
*/

import Feed from '../components/Feed/Feed'
import Navbar from '../components/Navbar/Navbar';
import FeedCard from '../components/FeedCard/FeedCard';

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

function DashboardRouters() {

  // va abajo de return <Provider store={store}>
  return <ThemeProvider theme={theme}>
  

        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
        </Routes>
   

  </ThemeProvider>
   // </Provider>
  
}

export default DashboardRouters;
