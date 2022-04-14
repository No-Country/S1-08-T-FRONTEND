import React from "react";
import "./Register.module.css";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/users";
import fontbg from "../../Assets/images/cena.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [register] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await register({
      email,
      password,
      username,
      nickname,
    });

    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //testing  console.log(regexEmail.test(email))

    if (email !== "" && !regexEmail.test(email)) {
      console.log("Debes escribir un correo electrónico válido");
    }

    if (email === "" || password === "" || repassword === "") {
      console.log("Los campos no pueden estar vacios");
    }

    if (password !== repassword) {
      console.log("Los campos deben coincidir");
    }

    if (username === "" || nickname === "") {
      console.log("Los campos no pueden estar vacios");
    }

    if (!response) {
      console.log("Ocurrió un error");
    } else {
      console.log(`Bienvenido ${email}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "repassword") {
      setRepassword(value);
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-img">
          <img src={fontbg} />
        </div>
        <div className="login-div">
          <p className="login-title">Sobre vos</p>
          <form className="login-form">
            <div className="login-form-control">
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="login-form-control">
              <input
                type="text"
                placeholder="Nombre"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="login-form-control">
              <input
                type="text"
                placeholder="Apellido"
                name="nickname"
                onChange={handleChange}
              />
            </div>
            <div className="login-form-control">
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="login-form-control">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                name="repassword"
                onChange={handleChange}
              />
            </div>
            <button
              className="login-button"
              type="submit"
              onClick={handleSubmit}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
