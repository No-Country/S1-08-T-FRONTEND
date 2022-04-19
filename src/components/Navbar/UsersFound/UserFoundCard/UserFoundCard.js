import React from 'react'
import './UserFoundCard.css'
import Avatar from '@mui/material/Avatar';
import avatarDefault from '../../../../Assets/images/avatar-chef.jpg';

export default function UserFoundCard({ user, captionSize }) {

    const { username, nickname, avatar } = user;
    return (
        <div className="profile">
            <Avatar
                sx={{ width: 50, height: 50 ,border: '1px solid #b1b1b5'}}
                src={avatar ? avatar : avatarDefault}
                aria-label="recipe" />

            {(nickname || username) && (
                <div className="textContainer">
                    <span className="nickName">{nickname}</span>
                    <span className={`caption ${captionSize}`}>{username}</span>
                </div>
            )}
        </div>
    )
}
