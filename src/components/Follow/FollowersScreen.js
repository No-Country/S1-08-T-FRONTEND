
import React, { useState, useEffect } from "react";
import {useGetFollowersQuery} from "../../app/services/followers";
import {useParams} from "react-router-dom";
import CardFollow from "./CardFollow";

 const FollowersScreen = () => {
  const {id} = useParams();
  const {data} = useGetFollowersQuery(id);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if(data) {
      setFollowers(data);
    }
  },[data]);

  return (
    <>
     <h2 style={{margin: "1rem 0 0 2rem", color: "#EC5853"}}>Seguidores</h2>
       {followers.map((follower) => (
        <CardFollow
          key={follower.followerID}
          follower={follower}
          linkId={follower.followerID}
        />
      ))}       
    </>
  )
}

export default FollowersScreen;
