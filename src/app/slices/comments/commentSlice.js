import { createSlice } from "@reduxjs/toolkit";
import { commentsApi } from "../../services/comments";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {
    setComments: (state, action) => {
      state.comment.data = action.payload;
    },
    setLoading: (state, action) => {
      state.post.loading = action.payload;
    },
    setError: (state, action) => {
      state.post.error = action.payload;
    },
  },
  extraReducers: (builder) => {},
});
