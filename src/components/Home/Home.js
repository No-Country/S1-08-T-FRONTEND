import React, { useState, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Feed from '../Feed/Feed'
import OtherUsers from '../OtherUsers/OtherUsers'
import './Home.css'

export default function Home () {
  return (
    <div className='home'>
      <div className='leftSection'>
        <Feed />
      </div>
      <div className='rightSection'>
        <OtherUsers />
        <Footer />
      </div>
    </div>
  )
}
