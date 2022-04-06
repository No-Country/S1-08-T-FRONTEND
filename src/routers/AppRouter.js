//Se divide entre rutas publicas y las privadas

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { purple, lightBlue, red } from '@mui/material/colors'
import { Navbar } from '../components/navbar/Navbar'
import Feed from '../components/feed/Feed'
import TestAuth from '../app/slices/users/TestAuth'
import Login from '../components/login/Login'
import Register from '../components/register/Register'

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'karma'].join(',')
  },
  palette: {
    primary: {
      main: lightBlue[500]
    },
    alert: {
      main: purple[400]
    },
    secondary: {
      main: red[400]
    }
  }
})

export const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar />
        <Routes>
          <Route path='/signin' element={<TestAuth />} />
          <Route path='/login' element={<Login />} />

<<<<<<< HEAD
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Feed />} />
=======
          <Route path="/signin" element={<TestAuth />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" />
          <Route path="/" element={<Feed />} />


>>>>>>> 1054ce9fa827bb32775660ee67caa67f14e118ea
        </Routes>
      </>
    </ThemeProvider>
  )
}
