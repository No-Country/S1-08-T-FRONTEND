import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginFromLS } from './app/slices/users/authUsersSlice'
import { AppRouter } from './routers/AppRouter'
import { Toaster } from 'react-hot-toast'
import LoadingApp from './components/Loading/LoadingApp/LoadingApp'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, [])


  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    if (token && user) {
      dispatch(loginFromLS({ token, user }))
    }
  }, [dispatch])
  return (
    <>
      {isLoading ? (
        <LoadingApp/>
      ) : (
        <>
      <AppRouter />
      <Toaster />
      </>
      )}
    </>
  );
}

export default App;

