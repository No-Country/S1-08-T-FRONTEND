import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostByUserQuery } from "../../app/services/posts";
import FeedCard from "../FeedCard/FeedCard";
const Post = () => {
  const { userId: userid } = useParams();
  const { data, isLoading } = useGetPostByUserQuery(userid);
  if (isLoading) {
    return "Cargando...";
  }
  if (data.length === 0) {
    return "El usuario aun no tien post creados";
  } else {
  }
  return (
    <div>
      {data.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
      {/* {JSON.stringify(data)} */}
    </div>
  );
};
export default Post;
