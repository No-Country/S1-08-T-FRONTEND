import React from 'react';
import "./Login.css";
import { Navbar } from '../navbar/Navbar';

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="login-container">
        <p className="login-title">Iniciar sesión</p>
        <form className="login-form">
          <div className="login-form-control">
            <input type="text" placeholder="Usuario" name="user" />
          </div>
          <div className="login-form-control">
            <input type="password" placeholder="Contraseña" name="password" />
          </div>
          <div className="login-form-control">
            <input type="password" placeholder="Confirmar contraseña" name="repassword" />
          </div>
          <button className="login-button" type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
}

export default Login;
