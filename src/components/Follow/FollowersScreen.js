import React, { useState, useEffect } from "react";
import { useGetFollowersQuery } from "../../app/services/followers";
import { useParams } from "react-router-dom";
import CardFollow from "./CardFollow";

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
      <h2
        style={{ margin: "4rem 0 0 2rem", color: "#EC5853", fontSize: "2rem" }}
      >
        Seguidores
      </h2>
      {isLoading && <h1 style={{ textAlign: "center" }}>Cargando..</h1>}
      {isError && error.message}
      {isSuccess &&
        followers &&
        followers.map((follower) => (
          <CardFollow
            key={follower.followerID}
            follower={follower}
            linkId={follower.followerID}
          />
        ))}
    </>
  );
};

// return (
//   <>
//    <h2 style={{margin: "1rem 0 0 2rem", color: "#EC5853"}}>Seguidores</h2>

//    {isLoading && "cargando..."}

//    {isError && error.message}

//      {isSuccess &&
//       followers &&
//      followers.map((follower) => (
//       <CardFollow
//         key={follower.followerID}
//         follower={follower}
//         linkId={follower.followerID}
//       />
//     ))}
//   </>
// )
// }

export default FollowersScreen;
