import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { login } from '../../services/auth'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useContext(UserContext)

  const submitLogin = (event) => {
    event.preventDefault()
    login({email,password})
    .then(res => {
      console.log(res)
      user.setData(res)
      window.localStorage.setItem('userData', JSON.stringify(res))
      navigate('/home')
    })
    .catch(error => {
      console.log(error)
    })
    //navigate('/home')
  }

  return (
    <section className='login'>
      <form onSubmit={submitLogin}>
        <div className='form__inputs'>
          <div className='form__input'>
            <label for="email">Email</label>
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='form__input'>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  )
}
