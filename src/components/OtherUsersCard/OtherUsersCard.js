import * as React from 'react';
import './otherUserCard.css';

import open from './open.png';
import usuario from './usuario.png';

export default function OtherUsersCard() {
  return (
    <div className='otherUsers'>
        <div className='otherAvatar'>
            <img src={usuario} />
        </div>
        <div className='userInfo'>
            <h4 className='otherName'>Carlos Gomez</h4>
            <p className='otherSubtitle'>El chef viajero</p>    
        </div>
        <img className='opensign' src={open}/>
    </div>
  );
}
