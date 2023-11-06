import React, { useEffect, useState } from 'react'
import { usersService } from '../../services/users'
import * as roomsService from '../../services/rooms.js'
import './Contacts.css'

export default function Contacts() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService()
    .then(res => {
      setUsers(res)
    })
  }, [])

  const getRoom = (user) => {
    console.log(user)
    roomsService.getRoom(user._id)
      .then(res => {
        console.log(res)
      })
  }

  return (
    <section className='contacts'>
      <ul>
        {users.map((user, key) => (
          <li key={key} onClick={() => getRoom(user)} className='contact'>{user.email}</li>
        ))}
      </ul>
    </section>
  )
}
