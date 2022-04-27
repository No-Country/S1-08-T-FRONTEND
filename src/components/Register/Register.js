import React from 'react'
import './Register.css'
import { useState } from 'react'
import { useRegisterMutation } from '../../app/services/users'
import fontbg from '../../Assets/images/pizzaA.jpg'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const Register = () => {
  const [register] = useRegisterMutation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
        validate={valores => {
          const errors = {}
          if (!valores.username) {
            errors.username = 'Nombre requerido'
          }
          if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)) {
            errors.username = 'Nombre solo puede contener letras y espacios'
          }
          if (valores.username.length < 3) {
            errors.username = 'Nombre debe contener al menos 3 caracteres'
          }
          if (valores.username.length > 13) {
            errors.username = 'Nombre debe contener menos de 13 caracteres'
          }
          if (!valores.nickname) {
            errors.nickname = 'Nombre de cuenta requerido'
          }
          if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nickname)) {
            errors.nickname =
              'Nombre de cuenta solo puede contener letras y espacios'
          }
          if (valores.nickname.length < 3) {
            errors.nickname =
              'Nombre de cuenta debe contener al menos 3 caracteres'
          }
          if (valores.nickname.length > 13) {
            errors.nickname =
              'Nombre de cuenta debe contener menos de 13 caracteres'
          }
          if (!valores.repassword) {
            errors.repassword = 'Confirmar contraseña'
          } else if (valores.password !== valores.repassword) {
            errors.repassword = 'Las contraseñas deben coincidir'
          }
          if (!valores.email) {
            errors.email = 'Email requerido'
          } else {
            if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                valores.email
              )
            ) {
              errors.email = 'email invalido'
            }
          }
          if (!valores.password) {
            errors.password = 'Contraseña requerida'
          }
          if (
            !valores.username ||
            !valores.nickname ||
            !valores.repassword ||
            !valores.email ||
            !valores.password
          ) {
            errors.general = 'Todos los campos son requeridos'
          }
          if (valores.password.length < 6) {
            errors.password = 'Contraseña debe tener al menos 6 caracteres'
          }
          return errors
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm()
          const registerToast = toast.loading('Registrando...')
          setLoading(true)

          const response = register(values)

          setLoading(false)
          toast.dismiss(registerToast)
          if (response.error) {
            toast.error(response.error.data.msg)
          } else {
            toast.success('Registro exitoso')
            navigate('/login')
          }
        }}
      >
        {({ errors }) => (
          <div className='register-container'>
            <div className='register-img'>
              <img alt='' src={fontbg} />
            </div>
            <div className='register-div'>
              <p className='register-title'>Registrate</p>
              <Form className='register-form'>
                <div className='register-form-control'>
                  <Field type='email' name='email' placeholder='Email' />
                  <ErrorMessage
                    name='email'
                    component={() => (
                      <div className='errorMessage'>{errors.email}</div>
                    )}
                  />
                </div>
                <div className='register-form-control'>
                  <Field type='text' placeholder='Nombre' name='username' />
                  <ErrorMessage
                    name='username'
                    component={() => (
                      <div className='errorMessage'>{errors.username}</div>
                    )}
                  />
                </div>
                <div className='register-form-control'>
                  <Field
                    type='text'
                    placeholder='Nombre de Cuenta'
                    name='nickname'
                  />
                  <ErrorMessage
                    name='nickname'
                    component={() => (
                      <div className='errorMessage'>{errors.nickname}</div>
                    )}
                  />
                </div>
                <div className='register-form-control'>
                  <Field
                    type='password'
                    placeholder='Contraseña'
                    name='password'
                  />
                  <ErrorMessage
                    name='password'
                    component={() => (
                      <div className='errorMessage'>{errors.password}</div>
                    )}
                  />
                </div>
                <div className='register-form-control'>
                  <Field
                    type='password'
                    placeholder='Confirmar contraseña'
                    name='repassword'
                  />
                  <ErrorMessage
                    name='repassword'
                    component={() => (
                      <div className='errorMessage'>{errors.repassword}</div>
                    )}
                  />
                </div>
                <div className='register-button-container'>
                  <button
                    className='register-button'
                    type='submit'
                    disabled={loading}
                  >
                    Registrarse
                  </button>
                  {<p className='registerExitoso'>Registro Exitoso</p>}
                </div>

                <div className='register-form-control'>
                  <h6>
                    ¿ Ya tienes cuenta ?<Link to='/login'> Iniciar sesion</Link>
                  </h6>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default Register
