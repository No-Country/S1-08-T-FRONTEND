import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
} from "../../app/services/followers";
import { useGetUserQuery } from "../../app/services/users";

import "./AboutMe.css";
const AboutMe = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetUserQuery(userId);
  const {
    data: follData,
    isLoading: follLoading,
    refetch: follRefetch,
  } = useGetFollowersQuery(userId);
  const {
    data: follingData,
    isLoading: follingLoading,
    refetch: follingRefetch,
  } = useGetFollowingQuery(userId);
  if (isLoading) {
    return "Cargando ...";
  }
  if (follLoading) {
    return "Cargando ...";
  }
  if (follingLoading) {
    return "Cargando ...";
  }
  return (
    <div className="userInfoDetail">
      <p>Username : {data.username}</p>
      <p>Email : {data.emial}</p>
      <p>Nickname: {data.nickname}</p>
      <p>Seguidores: {follData.length} </p>
      <p>Siguiendo a: {follingData.length} </p>
    </div>
  );
};
export default AboutMe;
