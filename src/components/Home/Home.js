import React, {useState, useEffect} from 'react';
import Footer from '../Footer/Footer';
import Feed from '../Feed/Feed';
import OtherUsers from '../OtherUsers/OtherUsers';
import './Home.css';
import CategoryList from '../CategoryList/CategoryList';
import Profile from './Profile/Profile';
import Loading from "../Loading/Loading";

export default function Home () {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  })
  return (
    <div className='home'>
      <div className='leftSection'>
        {isLoading==true?
          <Loading/>:
          <Feed />
        }
      </div>
      <div className='rightSection'>
        <Profile />
        <OtherUsers />
        <CategoryList />
        <Footer />
      </div>
    </div>
  )
}
