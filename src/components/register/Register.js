import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './register.module.css'

export default function Register () {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      history.push('/')
    } catch {
      setError('Fallo al crear la cuenta')
    }

    setLoading(false)
  }

  return (
    <div>
      <section className={styles.login}>
        <div className={styles.loginContainer}>
          <h1>Registrate</h1>
          {error && <h1>{error}</h1>}
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              autoFocus
              placeholder='Email'
              required
              ref={emailRef}
            />

            <input
              type='password'
              placeholder='Password'
              required
              ref={passwordRef}
            />
            <div className='btnContainer'>
              <button type='submit' disabled={loading}>
                Registrate
              </button>
              <br /> <br />
              <p>
                Ya tienes cuenta?{' '}
                <Link to='/login'>
                  <span>Inicia Sesión</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
