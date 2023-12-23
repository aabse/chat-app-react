import { useEffect, useState } from 'react'
import * as roomsService from '../../services/rooms.js'
import './Rooms.css'
import PropTypes from 'prop-types'
import { showError } from '../../utils/errorManager.js'

Rooms.propTypes = {
        updateRoomName: PropTypes.func.isRequired,
        updateRoomSelected: PropTypes.func.isRequired,
}

export default function Rooms({updateRoomName, updateRoomSelected}) {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    roomsService.getRoomsByNames(['general'])
      .then(res => {
        setRooms(res)
      })
      .catch(error => {
        showError(error)
      })
  }, [])

  const getRoom = (room) => {
    roomsService.getRoomById(room._id)
      .then(res => {
        updateRoomName(res.name)
        updateRoomSelected(res)
      })
  }

  return (
    <section className="rooms">
      <ul>
        {rooms.map((room, key) => (
          <li 
            key={key} 
            data-testid={"room-" + key}
            onClick={() => getRoom(room)}
            className="room">{room.name}</li>
        ))}
      </ul>
    </section>
  )
}
