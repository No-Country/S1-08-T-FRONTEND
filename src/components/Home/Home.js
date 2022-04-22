import React, {useState, useEffect} from 'react';
import Footer from '../Footer/Footer';
import Feed from '../Feed/Feed';
import OtherUsers from '../OtherUsers/OtherUsers';
import './Home.css';
import CategoryList from '../CategoryList/CategoryList';
import Profile from './Profile/Profile';

export default function Home () {
  
  return (
    <div className='home'>
      <div className='leftSection'>
        <Feed />
      </div>
      <div className='rightSection'>
        <div className='rightSection__scroll'>
        <Profile />
        <OtherUsers />
        <CategoryList />
        <Footer />
        </div>
      </div>
    </div>
  )
}
