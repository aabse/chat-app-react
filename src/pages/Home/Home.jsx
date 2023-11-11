import React, { useContext, useEffect, useState } from 'react'
import Chat from '../../components/Chat/Chat'
import Contacts from '../../components/Contacts/Contacts'
import { SocketContext } from '../../context/socketContext'
import './Home.css'

export default function Home() {

  const [roomSelected, setRoomSelected] = useState()
  const [roomName, setRoomName] = useState('')
  const socket = useContext(SocketContext)

  const updateRoomSelected = (room) => {
    socket.emit('leave room', roomSelected)
    socket.emit('join room', room._id)
    setRoomSelected(room)
  }

  const updateRoomName = (name) => {
    setRoomName(name)
  }

  return (
    <section className='home'>
      <div className="home__header"></div>
      <div className="home__body">
        <Contacts updateRoomName={updateRoomName} updateRoomSelected={updateRoomSelected} />
        <Chat room={roomSelected} roomName={roomName} />
      </div>
      <div className="home__footer"></div>
    </section>
  )
}
