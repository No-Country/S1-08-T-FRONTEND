import React, { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../app/services/users";
// import FollowButton from "../Follow/FollowButton/FollowButton";
import Spinner from "../Spinner/Spinner";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import './OtherUsers.css';

export default function OtherUsers() {
  const { data, error, isLoading, isSuccess, isError } = useGetUsersQuery()
  const [suggestedUser, setsUggestedUser] = useState([]);

  console.log(suggestedUser)
  useEffect(() => {
    if (data) {
      setsUggestedUser(data);
    }
  }, [data]);

  return (
    <div className="sugestedUsers">
      <h2 className="otherUsersTitle">Recomendados</h2>

      <div>
        {isLoading && <Spinner />}
        {isError && <p>{error}</p>}
        {
          isSuccess && suggestedUser && suggestedUser.slice(0, 6).map(user => (
            <div className="otherUsers">
            <UserProfileCard
              key={user.id}
              user={user}
              captionSize="small"
              nickNameSize="small"
              AvatarSize={50}
              LinkId={user.id}
            />
        {/* {< FollowButton id = { user.id } sizeWidth = { 60} sizeHeight = { 30} disableIcon = { true} fontSize = { 12} />} */}
        </div>
        ))
        }
      </div>
    </div>
  );
}