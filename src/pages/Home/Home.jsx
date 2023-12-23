import { useContext, useEffect, useState } from 'react'
import Chat from '../../components/Chat/Chat'
import Contacts from '../../components/Contacts/Contacts'
import Rooms from '../../components/Rooms/Rooms'
import { SocketContext } from '../../context/socketContext'
import { UserContext } from '../../context/userContext'
import './Home.css'

export default function Home() {

  const [roomSelected, setRoomSelected] = useState(undefined)
  const [roomName, setRoomName] = useState('')
  const [chatActive, setChatActive] = useState(false)
  const socket = useContext(SocketContext)
  const user = useContext(UserContext)

  useEffect(() => {
    const userData = window.localStorage.getItem('userData')
    user.setData(JSON.parse(userData))
  }, [])

  const updateRoomSelected = (room) => {
    socket.emit('leave room', roomSelected?._id)
    socket.emit('join room', room._id)
    setRoomSelected(room)
    setChatActive(true)
  }

  const updateRoomName = (name) => {
    setRoomName(name)
  }

  const updateChatActive = (statusChat) => {
    setChatActive(statusChat)
  }

  return (
    <section className='home'>
      <div className="home__header"></div>
      <div className="home__body">
        <div className={'rooms-section ' + (chatActive? 'inactive':'active') }>
          <Rooms updateRoomName={updateRoomName} updateRoomSelected={updateRoomSelected} />
          <Contacts updateRoomName={updateRoomName} updateRoomSelected={updateRoomSelected} />
        </div>
        { roomSelected && <Chat room={roomSelected} roomName={roomName} active={chatActive} updateChatActive={updateChatActive} />}
      </div>
      <div className="home__footer"></div>
    </section>
  )
}
