import * as React from 'react';
import './OtherUserCard.css';

import open from './open.png';
import avatarDefault from './avatar-chef.jpg';

export default function OtherUsersCard({
  post:{id, userid, username, avatar, description, image}}) {
  return (
    <div className='otherUsers'>
        <div className='otherAvatar'>
            <img alt='avatar' src={avatarDefault} />
        </div>
      <div className='infoAndSign'>
        <div className='userInfo'>
            <h4 className='otherName'>{username}</h4>
            <p className='otherSubtitle'>{description}</p>    
        </div>
        <img alt='open' className='openSign' src={open}/>
    </div>
    </div>
  );
}
