import React from 'react'
import './UserFoundCard.css'
import Avatar from '@mui/material/Avatar';
import avatarDefault from '../../../../Assets/images/avatar-chef.jpg';

export default function UserFoundCard({ user, captionSize, nickNameSize, AvatarSize}) {

    const { username, nickname, avatar } = user;
    return (
        <div className="profile">
            <Avatar
                sx={{ width: AvatarSize, height: AvatarSize ,border: '1px solid #b1b1b5'}}
                src={avatar ? avatar : avatarDefault}
                aria-label="recipe" />

            {(nickname || username) && (
                <div className="textContainer">
                    <span className={`nickName nickName-${nickNameSize}`}>{nickname}</span>
                    <span className={`caption caption-${captionSize}`}>{username}</span>
                </div>
            )}
        </div>
    )
}
