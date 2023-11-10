import React, { useContext, useEffect, useState } from 'react'
import Chat from '../../components/Chat/Chat'
import Contacts from '../../components/Contacts/Contacts'
import { SocketContext } from '../../context/socketContext'
import './Home.css'

export default function Home() {

  const [roomSelected, setRoomSelected] = useState('')
  const socket = useContext(SocketContext)

  const updateRoomSelected = (roomId) => {
    socket.emit('leave room', roomSelected)
    socket.emit('join room', roomId)
    setRoomSelected(roomId)
  }

  return (
    <section className='home'>
      <div className="home__header"></div>
      <div className="home__body">
        <Contacts updateRoomSelected={updateRoomSelected} />
        <Chat roomId={roomSelected} />
      </div>
      <div className="home__footer"></div>
    </section>
  )
}
