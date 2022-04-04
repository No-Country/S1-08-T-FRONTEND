import React from "react";
import {  useSelector } from "react-redux";

import { useLoginMutation } from "../../services/users";
import { Navigate, useLocation } from "react-router-dom";


export default function TestAuth() {
  let location = useLocation();
  const from = location.state ? location.state.from : "/";

  const { user, isAuthenticated } = useSelector((state) => state.authUsers);
  console.log(user)
  const [login, { loading, error }] = useLoginMutation();




  if (isAuthenticated) {
    return <Navigate to={from} />;
  }


  return (
    <div style={{ color: "black", margin: "auto", marginTop: "200px", width: "100px", height: "100px" }}>

      <p style={{ textAlign: "center" }}>{user?.username}</p>
      <button onClick={() => login({ email: "prueba@gmail.com", password: "123456789" })} style={{ fontSize: "30px", cursor: "pointer", margin: "10px" }}>Login</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}


    </div>


  );
}
