import React, { useContext, useEffect, useState } from 'react'
import Chat from '../../components/Chat/Chat'
import Contacts from '../../components/Contacts/Contacts'
import Rooms from '../../components/Rooms/Rooms'
import { SocketContext } from '../../context/socketContext'
import { UserContext } from '../../context/userContext'
import './Home.css'

export default function Home() {

  const [roomSelected, setRoomSelected] = useState()
  const [roomName, setRoomName] = useState('')
  const socket = useContext(SocketContext)
  const user = useContext(UserContext)

  useEffect(() => {
    const userData = window.localStorage.getItem('userData')
    console.log(userData)
    user.setData(JSON.parse(userData))
  }, [])

  const updateRoomSelected = (room) => {
    socket.emit('leave room', roomSelected?._id)
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
        <div>
          <Rooms updateRoomName={updateRoomName} updateRoomSelected={updateRoomSelected} />
          <Contacts updateRoomName={updateRoomName} updateRoomSelected={updateRoomSelected} />
        </div>
        <Chat room={roomSelected} roomName={roomName} />
      </div>
      <div className="home__footer"></div>
    </section>
  )
}
