import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = () => {
    navigate('/home')
  }

  return (
    <section className='login'>
      <form onSubmit={submitLogin}>
        <div className='form__inputs'>
          <div className='form__input'>
            <input type="text" name="email" id="email" placeholder='Email' onChange={setEmail} value={email} />
          </div>
          <div className='form__input'>
            <input type="password" name="password" id="password" placeholder='Password' onChange={setPassword} value={password} />
          </div>
        </div>
        <button type="submit">Signin</button>
      </form>
    </section>
  )
}
