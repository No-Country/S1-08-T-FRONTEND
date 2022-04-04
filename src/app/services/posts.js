import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-gout-app.herokuapp.com/api/posts/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "",
    }),
    getPost: builder.query({
      query: (id) => `${id}`,
    }),

    createPost: builder.mutation({
      query: (post) => ({
        url: "",
        method: "POST",
        body: post,
      }),
    }),
    updatePost: builder.mutation({
      query: ({post, id}) => ({
        url: `edit/${id}`,
        method: "PUT",
        body: post,
      }),
    }),
    updatePostLikes: builder.mutation({
      query: ({post, id}) => ({
        url: `likes/${id}`,
        method: "PUT",
        body: post,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpdatePostLikesMutation,
} = postApi;
