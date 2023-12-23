import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Signup.css'
import { signup } from '../../services/auth'
import { UserContext } from '../../context/userContext'

export default function Signup() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: {errors, isValid}, watch } = useForm()
  const user = useContext(UserContext)

  const formOptions = {
    email: {
      required: 'Email is required'
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must have at least 6 characters'
      }
    },
    passwordConfirm: {
      required: 'Password Confirm is required',
      validate: (value) => 
        value === watch('password') || 'Passwords must match'
    }
  }

  const submitSignup = handleSubmit((data) => {
    signup(data)
      .then(res => {
        console.log(res)
        user.setData(res)
        window.localStorage.setItem('userData', JSON.stringify(res))
        navigate('/home')
      })
      .catch(error => {
        console.log(error)
      })
  })

  return (
    <section className='signup'>
      <form onSubmit={submitSignup}>
        <div className='form__inputs'>
          <div className='form__input'>
            <label htmlFor="email">Email</label>
            <input type="email" data-testid="signup-email-input" className={errors.email? 'error-input':''} 
              {...register('email', formOptions.email)} />
            {
              errors.email && <span data-testid="signup-email-error" className='error-message'>{errors.email.message}</span>
            }
          </div>
          <div className='form__input'>
            <label htmlFor="password">Password</label>
            <input type="password" data-testid="signup-password-input" className={errors.password && 'error-input'}
              {...register('password', formOptions.password)} />
            {
              errors.password && <span data-testid="signup-password-error" className='error-message'>{errors.password.message}</span>
            }
          </div>
          <div className='form__input'>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" data-testid="signup-passwordConfirm-input" className={errors.passwordConfirm && 'error-input'}
              {...register('passwordConfirm', formOptions.passwordConfirm)} />
            {
              errors.passwordConfirm && <span data-testid="signup-passwordConfirm-error" className='error-message'>{errors.passwordConfirm.message}</span>
            }

          </div>
        </div>
        <div className='form__buttons'>  
          <button type="submit" data-testid="signup-submit" className='button-submit'>Signup</button>
          <a href="/login" className='button-link'>Go to Login</a>
        </div>
      </form>
      <div>
      </div>
    </section>
  )
}
