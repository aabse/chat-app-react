import React, { useEffect, useState } from 'react'
import './Chat.css'
import { socket } from '../../socket.js'

export default function Chat() {

  const [listMessages, setListMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.on('chat message', msg => {
      console.log(msg)
      setListMessages(prevListMessages => [...prevListMessages, msg])
    })

    return () => {
      socket.off('chat message')
    }
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()
    socket.emit('chat message', message)
    console.log(listMessages)
  }

  return (
    <section className="chat">
      <div className='chat__header'>chat header</div>
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
