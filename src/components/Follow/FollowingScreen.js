
import React, { useState, useEffect } from "react";
import {useGetFollowingQuery} from "../../app/services/followers";
import {useParams} from "react-router-dom";
import CardFollow from "./CardFollow";

const FollowingScreen = () => {
  const {id} = useParams();
  const {data} = useGetFollowingQuery(id);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (data) {
      setFollowers(data);
    }
  }, [data]);

  return (
    <div>
      <h2 style={{margin: "1rem 0 0 2rem", color: "#EC5853"}}>Seguidos</h2>
      {followers.map((follower) => (
        <CardFollow
          key={follower.followerID}
          follower={follower}
          linkId={follower.userid}
        />
      ))}
    </div>
  )
}

export default FollowingScreen;
