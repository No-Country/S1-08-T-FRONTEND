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
    getPostsState: (state, action) => {
      state.posts.data = action.payload;
    },
    setLoading: (state, action) => {
      state.posts.loading = action.payload;
    },
    setError: (state, action) => {
      state.posts.error = action.payload;
    },
    deletePost: (state, action) => {
      state.posts.data = state.value.filter((data) => data.id !== action.payload.id);
    },
    updatePost: (state, action) => {
            
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(postApi.endpoints.getPostsState.matchPending, (state, actions) => {
        state.posts.loading = true;
      })
      .addMatcher(postApi.endpoints.getPostsState.matchFulfilled, (state, action) => {
        const response = action.payload;
        state.posts.data = response;
        state.posts.loading = false;
      })
      .addMatcher(postApi.endpoints.getPostsState.matchRejected, (state, action) => {
        state.posts.error = action;
      });
  },
});

export const { getPostsState, deletePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
