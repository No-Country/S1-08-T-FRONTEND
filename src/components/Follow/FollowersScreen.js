import React, { useState, useEffect } from "react";
import {useGetFollowersQuery} from "../../app/services/followers";
import {useParams} from "react-router-dom";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import Loading from "../Loading/Loading";
import "./Follow.css";

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
  }, []);

  return (
    <>
      <p className="follow-title">Seguidores</p>
      <div className="follow-container">
      {isLoading && <Loading />}
      {isError && error.message}
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
            </div>      
        ))} 
        </div>       
    </>
  );
};


export default FollowersScreen;
