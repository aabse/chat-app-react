import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import * as messagesService from '../../services/messages.js'
import { SocketContext } from '../../context/socketContext'
import { UserContext } from '../../context/userContext'

export default function Chat({room, roomName, active, updateChatActive}) {

  const [listMessages, setListMessages] = useState([])
  const [message, setMessage] = useState('')
  const socket = useContext(SocketContext)
  const user = useContext(UserContext)
  const elemMessages = document.getElementById('chat-messages')
  
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
    if (elemMessages) elemMessages.scrollTop = elemMessages.scrollHeight
  }, [listMessages])

  useEffect(() => {
    console.log(room?.messages)
    const initialMessages = room?.messages || []
    setListMessages([...initialMessages])
  }, [room])

  const handleBackButton = () => {
    updateChatActive(false)
  }

  const sendMessage = (event) => {
    event.preventDefault()
    messagesService.newMessage(room?._id,message)
      .then(res => {
        console.log(res)
        setMessage('')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const timeMessage = (dateStr) => {
    let date = new Date(dateStr)
    const offset = date?.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    let time = date.toISOString().split('T')[1]
    return time.split(':').slice(0,2).join(':')
  }

  return (
    <div className={'wrapper-chat ' + (active? 'active':'inactive')}>
    <section className="chat">
      <div className='chat__header'>
          <div className='back-button' onClick={handleBackButton}>
            {'<'}
          </div>
          <div>
            {roomName}
          </div>
      </div>
      <div className='chat__messages' id='chat-messages'>
        <ul>
          {listMessages.map((msg,key) => (
            <li key={key} className={(msg.user === user.data.id)? 'send':'receive'}>
              <small className='username'>{msg.name}</small>
              <div>{msg.message}</div>
              <small className='time'>{timeMessage(msg.createdAt)}</small>
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
    </div>
  )
}
