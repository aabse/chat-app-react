import React, { useEffect, useState } from 'react'
import { usersService } from '../../services/users'
import './Contacts.css'

export default function Contacts() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService()
    .then(res => {
      setUsers(res)
    })
  }, [])

  return (
    <section className='contacts'>
      <ul>
        {users.map((user, key) => (
          <li key={key} className='contact'>{user.email}</li>
        ))}
      </ul>
    </section>
  )
}
