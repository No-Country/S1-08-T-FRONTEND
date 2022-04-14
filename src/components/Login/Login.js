import React from 'react';
import {  useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import "./Login.css";
import { useState } from 'react';
import { useLoginMutation } from "../../app/services/users";
import fontbg from "../../Assets/images/font-bg.jpg";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();

  let location = useLocation();
  const from = location.state ? location.state.from : "/";
  const { user, isAuthenticated } = useSelector((state) => state.authUsers);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    const response = await login({
      email,
      password,
    }) 
    
    setLoading(false);
    if(response.error) {      
      toast.error(response.error.data.msg, "Ocurrió un error")
    } else {
      toast.success(`Bienvenido ${response.data.username}`);   
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }   
  };
  
  if (isAuthenticated) {
    return <Navigate to={from} />;
  }

  return (
    <>
    <div className="login-container">
    <div className="login-img">
        <img src={fontbg}/>
      </div>     
        <div className="login-div">
          <p className="login-title">Iniciar sesión</p>
          <form className="login-form">
            <div className="login-form-control">
              <input type="text" placeholder="Email" name="email" onChange={handleChange} required />
            </div>
            <div className="login-form-control">
              <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} required/>
            </div>   
            <button className="login-button" type="submit" onClick={handleSubmit} disabled={loading}>Entrar</button>
            <Toaster />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
