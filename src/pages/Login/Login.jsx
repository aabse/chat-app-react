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
            <input type="text" name="email" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='form__input'>
            <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type="submit">Signin</button>
      </form>
    </section>
  )
}
