import React, { useEffect } from 'react'
import Chat from '../../components/Chat/Chat'
import Contacts from '../../components/Contacts/Contacts'
import { usersService } from '../../services/users'
import './Home.css'

export default function Home() {


  return (
    <section className='home'>
      <div className="home__header"></div>
      <div className="home__body">
        <Contacts />
        <Chat />
      </div>
      <div className="home__footer"></div>
    </section>
  )
}
