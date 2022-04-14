import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-gout.herokuapp.com/api/uploads/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authUsers.token;
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "multipart/form-data");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation({
      query: (file) => ({
        url: "avatar",
        method: "POST",
        body: file,
      }),
    }),
    uploadBG: builder.mutation({
      query: (file) => ({
        url: "backgroundImage",
        method: "POST",
        body: file,
      }),
    }),
    uploadPostsImage: builder.mutation({
      query: (file) => ({
        url: "postsImage",
        method: "POST",
        body: file,
      }),
    }),

    uploadPostsVideo: builder.mutation({
      query: (file) => ({
        url: "postsVideo",
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const {
  useUploadAvatarMutation,
  useUploadBGMutation,
  useUploadPostsImageMutation,
  useUploadPostsVideoMutation,
} = imageApi;


