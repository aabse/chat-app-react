import React, { useEffect, useState } from 'react'
import * as roomsService from '../../services/rooms.js'
import './Rooms.css'

export default function Rooms({updateRoomName, updateRoomSelected}) {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    roomsService.getRoomsByNames(['general'])
      .then(res => {
        console.log(res)
        setRooms(res)
      })
      .catch(error => {
        console.log(error)
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
            onClick={() => getRoom(room)}
            className="room">{room.name}</li>
        ))}
      </ul>
    </section>
  )
}
