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
      listMessages.forEach(msg => {
        console.log(msg)
        let t = timeMessage(msg.createdAt)
        console.log(t)
      })
    })

        
    return () => {
      socket.off('chat message')
    }
  }, [])

  useEffect(() => {
    console.log(room?.messages)
    const initialMessages = room?.messages || []
    setListMessages([...initialMessages])
  }, [room])

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
    <div className='wrapper-chat'>
    <section className="chat">
      <div className='chat__header'>{roomName}</div>
      <div className='chat__messages'>
        <ul>
          {listMessages.map((msg,key) => (
            <li key={key} className={(msg.user === user.data.id)? 'send':'receive'}>
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
