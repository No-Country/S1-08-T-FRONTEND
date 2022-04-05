import React from 'react';
import "./Login.css";
import { useState } from 'react';
import { useLoginMutation } from "../../app/services/users";
import fontbg from "../../Assets/images/font-bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login({
      email,
      password,
    }) 

    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //testing  console.log(regexEmail.test(email))

     if(email !== "" && !regexEmail.test(email)){
       console.log("Debes escribir un correo electrónico válido")
     }
   
    if(email === "" || password === "" || repassword === ""){
      console.log("Los campos no pueden estar vacios")
    }

    if(password !== repassword) {
      console.log("Los campos deben coincidir")
    }

    if(!response) {
      console.log("Ocurrió un error")
    } else {
      console.log(`Bienvenido ${email}`);
    }
   }

   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "repassword"){
      setRepassword(value)
    }
  };
  
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
              <input type="text" placeholder="Email" name="email" onChange={handleChange} />
            </div>
            <div className="login-form-control">
              <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
            </div>
            <div className="login-form-control">
              <input type="password" placeholder="Confirmar contraseña" name="repassword" onChange={handleChange} />
            </div>
            <button className="login-button" type="submit" onClick={handleSubmit}>Entrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
