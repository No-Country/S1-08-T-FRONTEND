import React from "react";
import posts from "../postsData";
import OtherUsersCard from "../OtherUsersCard/OtherUsersCard";
import './OtherUsers.css';

export default function OtherUsers() {
  return (
    <div className="sugestedUsers">
      <h2 className="otherUsersTitle">Recomendados para ti</h2>
      {/* <OtherUsersCard /> */}

      <div>
        {posts ? (
          posts?.map((post) => (
            <div key={post.id} xs={12} sm={6} md={4} xl={3}>
              <OtherUsersCard post={post} />
            </div>
          ))
        ) : (
          <p>searching</p>
        )}
      </div>
    </div>
  );
}