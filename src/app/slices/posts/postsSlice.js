import { createSlice } from "@reduxjs/toolkit";
import { postApi } from "../../services/posts";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {
    getPosts: (state, action) => {
      state.posts.data = action.payload;
    },
    setLoading: (state, action) => {
      state.posts.loading = action.payload;
    },
    setError: (state, action) => {
      state.posts.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(postApi.endpoints.getPosts.matchPending, (state, actions) => {
        state.loading = true;
      })
      .addMatcher(postApi.endpoints.getPosts.matchFulfilled, (state, action) => {
        const response = action.payload.data;
        state.data = response;
        state.loading = false;
      })
      .addMatcher(postApi.endpoints.getPosts.matchRejected, (state, action) => {
        state.error = action;
      });
  },
});

export const { getPosts } = postsSlice.actions;

export default postsSlice.reducer;
