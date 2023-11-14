import React, { useEffect, useState } from 'react'
import * as roomsService from '../../services/rooms.js'

export default function Rooms() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    roomsService.getRoomsByNames(['general'])
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <section className="rooms">
      <ul>
        {rooms.map((room, key) => (
          <li key={key}>{room.name}</li>
        ))}
      </ul>
    </section>
  )
}
