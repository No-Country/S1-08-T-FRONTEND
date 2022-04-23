import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../services/users";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {
    getUsers: (state, action) => {
      state.users.data = action.payload;
    },
    setLoading: (state, action) => {
      state.users.loading = action.payload;
    },
    setError: (state, action) => {
      state.users.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.getUsers.matchPending, (state, actions) => {
        state.loading = true;
      })
      .addMatcher(usersApi.endpoints.getUsers.matchFulfilled, (state, action) => {
        const response = action.payload.data;
        state.data = response;
        state.loading = false;
      })
      .addMatcher(usersApi.endpoints.getUsers.matchRejected, (state, action) => {
        state.error = action;
      });
  },
});
export const { getUsers } = userSlice.actions;


export default userSlice.reducer;
