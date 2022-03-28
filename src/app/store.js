import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { usersApi } from "./services/users";
import { postApi } from "./services/posts";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    usersApi: usersApi.reducer,
    postApi: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      postApi.middleware
    ),
});
