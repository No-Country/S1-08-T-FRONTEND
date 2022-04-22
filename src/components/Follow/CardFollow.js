import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardFollow.css";

const CardFollow = ({ follower, linkId }) => {
  const avatarDefault = `https://avatars.dicebear.com/api/pixel-art-neutral/${follower.followerID}.svg`;
  const navigate = useNavigate();

  return (
    <>
      <ul className="card_wrapper">
        <li className="card_body">
          <img
            className="card_image"
            src={follower.avatar || avatarDefault}
            alt="avataruser"
          />
          <p
            className="card_name"
            onClick={() => navigate(`/${follower.userid}/me`)}
          >
            {follower.username}
          </p>
        </li>
      </ul>
    </>
  );
};

export default CardFollow;
