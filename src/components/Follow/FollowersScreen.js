import React, { useState, useEffect } from "react";
import { useGetFollowersQuery } from "../../app/services/followers";
import { useParams } from "react-router-dom";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import Loading from "../Loading/Loading";
import "./Follow.css";
import FollowButton from "./FollowButton/FollowButton";

const FollowersScreen = () => {
  const { userId } = useParams();
  const { data, error, isLoading, isSuccess, isError, refetch } =
    useGetFollowersQuery(userId);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (data) {
      setFollowers(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <p className="follow-title">Seguidores</p>
      <div className="follow-container">
        {isLoading && <Loading />}
        {isError && error.message}
        {followers.length === 0 ? <h2 style={{textAlign: "center"}}>No se encontraron seguidos</h2> : " "}
        {isSuccess &&
          followers &&
          followers.map((follower) => (
            <div className="follow-profile">
              <UserProfileCard
                AvatarSize={80}
                key={follower.followerId}
                user={follower}
                linkId={follower.userid}
                captionSize="medium"
                nickNameSize="medium"
              />
              <div className="otherUsers__folloButton">
                {< FollowButton id={follower.userid} disableIcon={true} fontSize={16} bg1={"#fff"} bg2={"#EC5853"} color1={"#000"} color2={"#fff"} />}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};


export default FollowersScreen;
