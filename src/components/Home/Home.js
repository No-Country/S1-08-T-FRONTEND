import React from 'react'
import Footer from '../Footer/Footer'
import Feed from '../Feed/Feed'
import OtherUsers from '../OtherUsers/OtherUsers'
import './Home.css'
import CategoryList from '../CategoryList/CategoryList'
import Profile from './Profile/Profile'
import Sticky from 'react-sticky-el'


export default function Home () {
  return (
    <div className='home'>
      <div className='leftSection'>
        <Feed />
      </div>
      <Sticky topOffset={-80}>
      <div className='rightSection'>
        <Profile />
        <OtherUsers />
        <CategoryList />
        <Footer />
        </div>
      </Sticky>

    </div>
  )
}
