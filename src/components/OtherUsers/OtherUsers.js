import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../../app/services/users";
import FollowButton from "../Follow/FollowButton/FollowButton";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import './OtherUsers.css';
import OtherUsersLoading from "./OtherUsersLoading/OtherUsersLoading";
import { useGetFollowingQuery } from "../../app/services/followers";

export default function OtherUsers({ quantity }) {
  let location = useLocation();
  const otherUsersLocation = location.pathname === "/suggestions" ? true : false;

  const { data, error, isLoading, isSuccess, isError } = useGetUsersQuery()
  const [suggestedUser, setSuggestedUser] = useState([]);
  const { user: userIdLogin } = useSelector((state) => state.authUsers);
  const { data:followData,  isLoading:followLoading } =
  useGetFollowingQuery(userIdLogin);

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
    if (data && followData && !followLoading) {
      const users = data.filter(user => user.id !== userIdLogin || user.id !== followData.some(user => user.followerId === userIdLogin)).slice(0, quantity || data.length);
      const randomUsersArray = randomUsers(users)
      setSuggestedUser(randomUsersArray)
    }
  }, [data, userIdLogin, quantity, followLoading, followData]);

  return (
    <div className="sugestedUsers">
      <div className="sugestedUsers__header">
        <h2 className="otherUsersTitle">Recomendados</h2>
        {otherUsersLocation ? " " : <Link to="/suggestions"><h2 className="otherUsersAll">Todos</h2></Link>}
      </div>

      <div>
        {isLoading && <OtherUsersLoading />}
        {isError &&  <p>{error}</p>}
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
              <div className="otherUsers__folloButton">
                {< FollowButton id={user.id} disableIcon={true} fontSize={16} bg1={"#fff"} bg2={"#EC5853"} color1={"#000"} color2={"#fff"} />}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}