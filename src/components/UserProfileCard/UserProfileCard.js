import React from 'react'
import './UserProfileCard.css'
import Avatar from '@mui/material/Avatar';
import avatarDefault from '../../Assets/images/avatar-chef.jpg';
import { useNavigate } from 'react-router-dom';

/*
props: 
    user: data user 
    captionSize: small, medium, large 
    nickNameSize: small, medium, large
    AvatarSize: number // example AvatarSize={50}
*/

export default function UserProfileCard({ user, captionSize, nickNameSize, AvatarSize, linkId }) {
    const navigate = useNavigate();
    const { username, nickname, avatar } = user;
    return (
        <div className="profile">
            <Avatar
                onClick={() => navigate(`/profile/${user.id}`)}
                sx={{ width: AvatarSize, height: AvatarSize, border: '1px solid #b1b1b5' }}
                src={avatar ? avatar : avatarDefault}
                aria-label="recipe" />

            {(nickname || username) && (
                <div className="textContainer">
                    <span onClick={() => navigate(`/profile/${user.id}`)}
                        className={`nickName nickName-${nickNameSize}`}>{nickname}</span>
                    <span onClick={() => navigate(`/profile/${user.id}`)} className={`caption caption-${captionSize}`}>{username}</span>
                </div>
            )}
        </div>
    )
}
