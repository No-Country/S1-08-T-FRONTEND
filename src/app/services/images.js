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

export const uploadVideo = async (video) => {
  const data = new FormData();
  data.append("file", video);
  data.append("upload_preset", "goutst08t");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/goutst08t/video/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const file = await res.json();
  return new Promise((resolve, reject) => {
    if (file.secure_url) {
      resolve(file.secure_url);
    } else {
      reject(file.error);
    }
  });
};

export const uploadImage = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "goutst08t");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/goutst08t/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const file = await res.json();
  return new Promise((resolve, reject) => {
    if (file.secure_url) {
      resolve(file.secure_url);
    } else {
      reject(file.error);
    }
  });
};
