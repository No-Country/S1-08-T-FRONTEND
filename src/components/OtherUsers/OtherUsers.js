import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../../app/services/users";
import FollowButton from "../Follow/FollowButton/FollowButton";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import './OtherUsers.css';
import OtherUsersLoading from "./OtherUsersLoading/OtherUsersLoading";

export default function OtherUsers() {
  const { data, error, isLoading, isSuccess, isError } = useGetUsersQuery()
  const [suggestedUser, setsUggestedUser] = useState([]);
  const {user:userIdLogin} = useSelector((state) => state.authUsers);


  const randomUsers = (array) => {
    let m = array.length,
      t, i;

    // While there remain elements to shuffle...
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  

  console.log(suggestedUser)
  useEffect(() => {
    if (data) {
      const users = data.slice(0, 6).filter(user => user.id !== userIdLogin )
      const randomUsersArray = randomUsers(users)
      setsUggestedUser(randomUsersArray)
    }
  }, [data, userIdLogin]);

  return (
    <div className="sugestedUsers">
      <h2 className="otherUsersTitle">Recomendados</h2>

      <div>
        {isLoading && <OtherUsersLoading />}
        {isError && <p>{error}</p>}
        {
          isSuccess && suggestedUser && suggestedUser.map(user => (
            <div className="otherUsers">
              <UserProfileCard
                key={user.id}
                user={user}
                captionSize="small"
                nickNameSize="small"
                AvatarSize={50}
                LinkId={user.id}
              />
              {< FollowButton id = { user.id } sizeWidth = { 60} sizeHeight = { 30} disableIcon = { true} fontSize = { 12} />}
            </div>
          ))
        }
      </div>
    </div>
  );
}