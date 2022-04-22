import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardFollow.css";
import Avatar from '@mui/material/Avatar';
import avatarDefault from '../../Assets/images/avatar-chef.jpg';

const CardFollow = ({follower, linkId, AvatarSize }) => {

  const { username, nickname, avatar } = follower;
  const navigate = useNavigate();

  return (
    <>
      <ul className="card_wrapper">
        <li className="card_body">

          <Avatar
                sx={{ width: AvatarSize, height: AvatarSize, border: '1px solid #b1b1b5' }}
                src={avatar ? avatar : avatarDefault}
                aria-label="recipe" />
          <p className="card_name"
            onClick={() => navigate(`/user/${linkId}`)}>
            {username}
          </p>
        </li>
      </ul>
    </>
  );
};

export default CardFollow;
