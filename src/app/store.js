import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./services/users";
import { postApi } from "./services/posts";

export const store = configureStore({
  reducer: {
    usersApi: usersApi.reducer,
    postApi: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      postApi.middleware
    ),
});
