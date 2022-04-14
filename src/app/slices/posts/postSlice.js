import { createSlice } from "@reduxjs/toolkit";
import { postApi } from "../../services/posts";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {
    setPostDetail: (state, action) => {
      state.post.data = action.payload;
    },
    setLoading: (state, action) => {
      state.post.loading = action.payload;
    },
    setError: (state, action) => {
      state.post.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(postApi.endpoints.getPost.matchPending, (state, actions) => {
        state.loading = true;
      })
      .addMatcher(postApi.endpoints.getPost.matchFulfilled, (state, action) => {
        const response = action.payload.data;
        state.data = response;
        state.loading = false;
      })
      .addMatcher(postApi.endpoints.getPost.matchRejected, (state, action) => {
        state.error = action;
      });
  },
});

export default postSlice.reducer;
