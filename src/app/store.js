import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./services/users";
import { postApi } from "./services/posts";
import { imageApi } from "./services/images";
import { commentsApi } from "./services/comments";
import { followersApi } from "./services/followers";
import { categoryApi } from "./services/categories";

import authUsers from "./slices/users/authUsersSlice";
import searcher from "./slices/searcher/searcherSlice";
import posts from "./slices/posts/postsSlice";
import users from "./slices/users/usersSlice";
import followers from "./slices/followers/followersSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [followersApi.reducerPath]: followersApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,

    authUsers,
    searcher,
    users,
    posts,
    followers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      postApi.middleware,
      imageApi.middleware,
      followersApi.middleware,
      commentsApi.middleware,
      categoryApi.middleware
    ),
});

setupListeners(store.dispatch);