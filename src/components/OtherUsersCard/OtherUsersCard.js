import * as React from 'react';
import './OtherUserCard.css';

import open from './open.png';
import usuario from './usuario.png';

export default function OtherUsersCard({
  post:{id, userid, username, avatar, description, image}}) {
  return (
    <div className='otherUsers'>
        <div className='otherAvatar'>
            <img src={usuario} />
        </div>
        <div className='userInfo'>
            <h4 className='otherName'>{username}</h4>
            <p className='otherSubtitle'>{description}</p>    
        </div>
        <img className='opensign' src={open}/>
    </div>
  );
}
