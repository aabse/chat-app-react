import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import * as messagesService from '../../services/messages.js'
import { SocketContext } from '../../context/socketContext'
import { UserContext } from '../../context/userContext'

export default function Chat({room, roomName}) {

  const [listMessages, setListMessages] = useState([])
  const [message, setMessage] = useState('')
  const socket = useContext(SocketContext)
  const user = useContext(UserContext)

  useEffect(() => {
    socket.on('chat message', msg => {
      console.log('receving new message')
      console.log(msg)
      setListMessages(prevListMessages => [...prevListMessages, msg])
    })

    return () => {
      socket.off('chat message')
    }
  }, [])

  useEffect(() => {
    console.log(room?.messages)
    const initialMessages = room?.messages.map(msg => msg.message) || []
    setListMessages([...initialMessages])
  }, [room])

  const sendMessage = (event) => {
    event.preventDefault()
    messagesService.newMessage(room?._id,message)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <section className="chat">
      {user.data?.email}
      <div className='chat__header'>{roomName}</div>
      <div className='chat__messages'>
        <ul>
          {listMessages.map((msg,key) => (
            <li key={key}>
              <span>{msg}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='chat__new-message'>
        <form onSubmit={sendMessage}>
          <input type="text" autoComplete='off' name="new-message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  )
}
