import React, { useContext, useEffect, useState } from 'react'
import { usersService } from '../../services/users'
import * as roomsService from '../../services/rooms.js'
import './Contacts.css'
import { UserContext } from '../../context/userContext'

export default function Contacts({updateRoomName,updateRoomSelected}) {
  const [users, setUsers] = useState([])
  const currentUser = useContext(UserContext)

  useEffect(() => {
    usersService()
    .then(res => {
      const contacts = res.filter(user => user.email !== currentUser.email)
      setUsers(contacts)
    })
  }, [])

  const getRoom = (user) => {
    console.log(user)
    roomsService.getRoom(user._id)
      .then(res => {
        updateRoomSelected(res)
        updateRoomName(user.email)
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
