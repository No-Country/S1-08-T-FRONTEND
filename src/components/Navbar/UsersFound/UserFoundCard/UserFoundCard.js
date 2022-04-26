import React from 'react'
import './UserFoundCard.css'
import Avatar from '@mui/material/Avatar';
import avatarDefault from '../../../../Assets/images/avatar-chef.jpg';
import { useNavigate } from 'react-router-dom';

export default function UserFoundCard({ user, captionSize, nickNameSize, AvatarSize,linkId}) {
    const navigate = useNavigate();

    const { username, nickname, avatar } = user;
    return (
        <div className="profile">
            <Avatar
                sx={{ width: AvatarSize, height: AvatarSize ,border: '1px solid #6c6a6a'}}
                src={avatar ? avatar : avatarDefault}
                aria-label="recipe" />

            {(nickname || username) && (
                <div className="textContainer">
                    <span onClick={() => navigate(`/profile/${linkId}`)} 
                    className={`nickName nickName-${nickNameSize}`}>{nickname}</span>
                    <span onClick={() => navigate(`/profile/${linkId}`)} className={`caption caption-${captionSize}`}>{username}</span>
                </div>
            )}
        </div>
    )
}
