import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../services/users";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authUserSlice = createSlice({
  name: "authUsers",
  initialState,
  reducers: {
    loginFromLS: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.login.matchPending, (state, action) => {
        console.log("login pending");
      })
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        const user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.emial,
        };
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(user));
        state.isAuthenticated = true;
        state.user = user;
        state.token = action.payload.token;
      })
      .addMatcher(usersApi.endpoints.login.matchRejected, (state, action) => {
        console.log("login rejected", action);
      })
      .addMatcher(usersApi.endpoints.googleLogin.matchPending, (state, action) => {
        console.log("login pending");
      })
      .addMatcher(usersApi.endpoints.googleLogin.matchFulfilled, (state, action) => {
        const user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.emial,
        };
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(user));
        state.isAuthenticated = true;
        state.user = user;
        state.token = action.payload.token;
      })
      .addMatcher(usersApi.endpoints.googleLogin.matchRejected, (state, action) => {
        console.log("login rejected", action);
      });
  },
});

export const { logout, loginFromLS } = authUserSlice.actions;

export default authUserSlice.reducer;

export const selectIsAuthenticated = (state) => state.authUsers.isAuthenticated;
