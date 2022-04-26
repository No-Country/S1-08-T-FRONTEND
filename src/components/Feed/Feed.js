import React, { useState, useEffect } from "react";
import "./Feed.css";
import FeedCard from "../FeedCard/FeedCard";
import { useGetPostsStateMutation } from "../../app/services/posts";
import FeedLoading from "./FeedLoading/FeedLoading";
import { useSelector } from "react-redux";

export default function Feed() {
 
  //importar la data
  const { data, loading: isLoading , error} = useSelector((state) => state.posts.posts);
  const [getGetPostsState] = useGetPostsStateMutation();
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
    getGetPostsState();
  }, []); // eslint-disable-line

  return (
    <div className="feedContainer">
      <div className="containerPosts">
        {isLoading && <FeedLoading />}

        {error && error.message}

        {!isLoading &&
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