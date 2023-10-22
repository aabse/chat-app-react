import React from 'react'
import Chat from '../../components/Chat/Chat'
import './Home.css'

export default function Home() {
  return (
    <section className='home'>
      <div className="home__header"></div>
      <div className="home__body">
        <Chat />
      </div>
      <div className="home__footer"></div>
    </section>
  )
}
