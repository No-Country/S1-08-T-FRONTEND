import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFromLS } from './app/slices/users/authUsersSlice';
import { AppRouter } from './routers/AppRouter'
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(loginFromLS({ token, user }));
    }
  }, [dispatch]); 
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;


