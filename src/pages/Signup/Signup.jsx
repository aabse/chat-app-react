import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitSignup = () => {
    navigate('/home')
  }

  return (
    <section className='signup'>
      <form onSubmit={submitSignup}>
        <div className='form__inputs'>
          <div className='form__input'>
            <input type="text" name="email" id="email" placeholder='Email' onChange={setEmail} value={email} />
          </div>
          <div className='form__input'>
            <input type="password" name="password" id="password" placeholder='Password' onChange={setPassword} value={password} />
          </div>
          <div className='form__input'>
            <input type="password" name="password-confirm" id="password-confirm" placeholder='Password Confirmation' onChange={setConfirmPassword} value={confirmPassword} />
          </div>
        </div>
        <button type="submit">Signup</button>
      </form>
    </section>
  )
}
