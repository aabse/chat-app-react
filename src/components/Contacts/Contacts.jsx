import { useContext, useEffect, useState } from 'react'
import * as usersService from '../../services/users.js'
import * as roomsService from '../../services/rooms.js'
import './Contacts.css'
import { UserContext } from '../../context/userContext'
import PropTypes from 'prop-types'
import { showError } from '../../utils/errorManager'

Contacts.propTypes = {
        updateRoomName: PropTypes.func.isRequired,
        updateRoomSelected: PropTypes.func.isRequired
}

export default function Contacts({updateRoomName,updateRoomSelected}) {
  const [users, setUsers] = useState([])
  const currentUser = useContext(UserContext)

  useEffect(() => {
    usersService.users()
    .then(res => {
      const contacts = res.filter(user => user.email !== currentUser.email)
      setUsers(contacts)
    })
    .catch(error => {
        showError(error)
      })
  }, [currentUser])

  const getRoom = (user) => {
    roomsService.getRoomByUserId(user._id)
      .then(res => {
        updateRoomSelected(res)
        updateRoomName(user.email)
      })
  }

  return (
    <section className='contacts'>
      <ul>
        {users.map((user, key) => (
          <li data-testid={'contact-user-' + key} key={key} onClick={() => getRoom(user)} className='contact'>{user.email}</li>
        ))}
      </ul>
    </section>
  )
}
