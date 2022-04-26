import React from "react";
import { Link } from "react-router-dom";
import avatarDefault from '../../Assets/images/avatar-chef.jpg';
import FormatDate from "../../utils/formatDate";
import "./CommentCard.css";
export const CommentCard = ({ avatar, username, comment, created_at }) => {
  return (
    <div className="user_comment">
      <img src={avatar ? avatar : avatarDefault} alt="avatar" className="avatar_comment" />
      <div className="comment_detail">
        <p>
          <Link to="">{username}</Link> {comment}
        </p>
        <div className="comment_extrainfo">
          <p>{FormatDate(created_at)}</p>
          <button>Me gusta</button>
        </div>
      </div>
    </div>
  );
};
