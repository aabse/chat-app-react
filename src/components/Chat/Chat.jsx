import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import * as messagesService from '../../services/messages.js'
import { SocketContext } from '../../context/socketContext'

export default function Chat({roomId}) {

  const [listMessages, setListMessages] = useState([])
  const [message, setMessage] = useState('')
  const socket = useContext(SocketContext)

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

  const sendMessage = (event) => {
    event.preventDefault()
    messagesService.newMessage(roomId,message)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <section className="chat">
      <div className='chat__header'>{roomId}</div>
      <div className='chat__messages'>
        <ul>
          {listMessages.map(msg => (
            <li>
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
