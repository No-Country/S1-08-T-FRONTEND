import React from 'react'
import './Register.css'
import { useState } from 'react'
import { useRegisterMutation } from '../../app/services/users'
import fontbg from '../../Assets/images/pizzaA.jpg'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Input } from '@material-ui/core'

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
      <Formik
        initialValues={{
          username: '',
          nickname: '',
          repassword: '',
          email: '',
          password: ''
        }}
        validate={value => {
          const errors = {}
          if (!value.username) {
            errors.username = 'Nombre requerido'
          }
          if (!value.nickname) {
            errors.nickname = 'Apellido requerido'
          }
          if (!value.repassword) {
            errors.repassword = 'Confirmar contraseña'
          }
          if (!value.email) {
            errors.email = 'Email requerido'
          } else {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
              errors.email = 'email invalido'
            }
          }
          if (!value.password) {
            errors.password = 'Contraseña requerida'
          }
          return errors
        }}
        handleChange={handleChange}
      >
        <div className='register-container'>
          <div className='register-img'>
            <img alt='' src={fontbg} />
          </div>
          <div className='register-div'>
            <p className='register-title'>Registrate</p>
            <Form className='register-form'>
              <div className='register-form-control'>
                <Field
                  type='text'
                  name='email'
                  placeholder='Email'
                  //onChange={handleChange}
                  required
                />
                <ErrorMessage
                  className='errorMessage'
                  name='email'
                  component='div'
                />
              </div>
              <div className='register-form-control'>
                <Field
                  type='text'
                  placeholder='Nombre'
                  name='username'
                  //onChange={handleChange}
                  required
                />
                <ErrorMessage
                  className='errorMessage'
                  name='username'
                  component='div'
                />
              </div>
              <div className='register-form-control'>
                <Field
                  type='text'
                  placeholder='Apellido'
                  name='nickname'
                  //onChange={handleChange}
                  required
                />
                <ErrorMessage
                  className='errorMessage'
                  name='nickname'
                  component='div'
                />
              </div>
              <div className='register-form-control'>
                <Field
                  type='password'
                  placeholder='Contraseña'
                  name='password'
                  //onChange={handleChange}
                  required
                />
                <ErrorMessage
                  className='errorMessage'
                  name='password'
                  component='div'
                />
              </div>
              <div className='register-form-control'>
                <Field
                  type='password'
                  placeholder='Confirmar contraseña'
                  name='repassword'
                  //onChange={handleChange}
                  required
                />
                <ErrorMessage
                  className='errorMessage'
                  name='repassword'
                  component='div'
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
            </Form>
          </div>
        </div>
      </Formik>
    </>
  )
}

export default Register
