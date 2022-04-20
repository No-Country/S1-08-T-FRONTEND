import React, { useState, useEffect } from "react";
import "./Feed.css";
import FeedCard from "../FeedCard/FeedCard";
import { useGetPostsQuery } from "../../app/services/posts";

export default function Feed() {
  //importar la data
  const { data, error, isLoading, isSuccess, isError, refetch } =
    useGetPostsQuery();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      setPosts([]);
      data.forEach((post) => {
        setPosts((prev) => [post, ...prev]);
      });
    }
  }, [data]); // eslint-disable-line

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  return (
    <div className="feedContainer">
      <div className="containerPosts">
        {isLoading && "cargando..."}

        {isError && error.message}

        {isSuccess &&
          posts &&
          posts.map((post) => (
            <div className="feedCardContainer" key={post.id}>
              <FeedCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
}