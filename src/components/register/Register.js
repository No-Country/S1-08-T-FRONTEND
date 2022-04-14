<<<<<<< HEAD:src/components/register/Register.js
import React from "react";
import "./Register.css";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/users";
import fontbg from "../../Assets/images/cena.jpg";
=======
import React from 'react'
import './Register.css'
import { useState } from 'react'
import { useRegisterMutation } from '../../app/services/users'
import fontbg from '../../Assets/images/pizzaA.jpg'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
>>>>>>> fee81b9690f76b8f95ea023b2dca63d4fd322a85:src/components/Register/Register.js

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [register] = useRegisterMutation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const registerToast = toast.loading('Registrando...')
    setLoading(true)

    const response = await register({
      email,
      password,
      username,
<<<<<<< HEAD:src/components/register/Register.js
      nickname,
    });

    // eslint-disable-next-line no-useless-escape
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    //testing  console.log(regexEmail.test(email))

    if (email !== "" && !regexEmail.test(email)) {
      console.log("Debes escribir un correo electrónico válido");
    }

    if (email === "" || password === "" || repassword === "") {
      console.log("Los campos no pueden estar vacios");
    }
=======
      nickname
    })
>>>>>>> fee81b9690f76b8f95ea023b2dca63d4fd322a85:src/components/Register/Register.js

    setLoading(false)
    toast.dismiss(registerToast)
    if (response.error) {
      toast.error(response.error.data.msg)
    } else {
      toast.success('Registro exitoso')
      navigate('/login')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'repassword') {
      setRepassword(value)
    } else if (name === 'username') {
      setUsername(value)
    } else if (name === 'nickname') {
      setNickname(value)
    }
  }

  return (
    <>
<<<<<<< HEAD:src/components/register/Register.js
      <div className="login-container">
        <div className="login-img">
        <img alt='' src={fontbg} />
=======
      <div className='login-container'>
        <div className='login-img'>
          <img src={fontbg} />
>>>>>>> fee81b9690f76b8f95ea023b2dca63d4fd322a85:src/components/Register/Register.js
        </div>
        <div className='login-div'>
          <p className='login-title'>Registrate</p>
          <form className='login-form'>
            <div className='login-form-control'>
              <input
                type='email'
                placeholder='Email'
                name='email'
                onChange={handleChange}
              />
            </div>
            <div className='login-form-control'>
              <input
                type='text'
                placeholder='Nombre'
                name='username'
                onChange={handleChange}
              />
            </div>
            <div className='login-form-control'>
              <input
                type='text'
                placeholder='Apellido'
                name='nickname'
                onChange={handleChange}
              />
            </div>
            <div className='login-form-control'>
              <input
                type='password'
                placeholder='Contraseña'
                name='password'
                onChange={handleChange}
              />
            </div>
            <div className='login-form-control'>
              <input
                type='password'
                placeholder='Confirmar contraseña'
                name='repassword'
                onChange={handleChange}
              />
            </div>
            <button
              className='login-button'
              type='submit'
              onClick={handleSubmit}
              disabled={loading}
            >
              Registrarse
            </button>
            <div className='login-form-control'>
              <h4>
                ¿ Ya tienes cuenta ?<Link to='/login'> Iniciar sesion</Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
