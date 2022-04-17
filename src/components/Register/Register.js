import React from 'react'
import './Register.css'
import { useState } from 'react'
import { useRegisterMutation } from '../../app/services/users'
import fontbg from '../../Assets/images/pizzaA.jpg'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

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
      nickname
    })

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

  // mauri debes hacer las validaciones necesarias del formulario

  if (password !== repassword) {
    console.log('Los campos deben coincidir')
  }

  return (
    <>
      <div className="register-container">
        <div className="register-img">
          <img alt='' src={fontbg} />

        </div>
        <div className='register-div'>
          <p className='register-title'>Registrate</p>
          <form className='register-form'>
            <div className='register-form-control'>
              <input
                type='email'
                placeholder='Email'
                name='email'
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-form-control'>
              <input
                type='text'
                placeholder='Nombre'
                name='username'
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-form-control'>
              <input
                type='text'
                placeholder='Apellido'
                name='nickname'
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-form-control'>
              <input
                type='password'
                placeholder='Contraseña'
                name='password'
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-form-control'>
              <input
                type='password'
                placeholder='Confirmar contraseña'
                name='repassword'
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-form-control'>
              <input
                type='password'
                placeholder='Confirmar contraseña'
                name='repassword'
                onChange={handleChange}
                required
              />
            </div>
            <div className='register-button-container'>
            <button
              className='register-button'
              type='submit'
              onClick={handleSubmit}
              disabled={loading}
            >
              Registrarse
            </button>
            </div>

            <div className='register-form-control'>
              <h6>
                ¿ Ya tienes cuenta ?<Link to='/login'> Iniciar sesion</Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
