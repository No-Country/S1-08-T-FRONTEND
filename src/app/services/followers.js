import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const followersApi = createApi({
  reducerPath: "followersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-gout.herokuapp.com/api/followers",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authUsers.token;
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllFollowers: builder.query({
      query: () => ``,
    }),
    getFollowing: builder.query({
      query: (userid) => `/followingToUserid/${userid}`,
    }),
    getFollowers: builder.query({
      query: (userid) => `/followersToUserid/${userid}`,
    }),
    getFollowingState: builder.mutation({
      query: (userid) => ({
        url: `/followingToUserid/${userid}`,
        method: "GET",
      })
    }),
    getFollowersState: builder.mutation({
      query: (userid) => ({
        url:`/followersToUserid/${userid}`,
        method: "GET",
      })
    }),
    getAllFollowersState: builder.mutation({
      query: () => ({
        url:"",
        method: "GET",
      })
    }),
    createFollower: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body: body,
      }),
    }),
    deleteFollower: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFollowingQuery,
  useGetFollowersQuery,
  useGetAllFollowersQuery,
  useGetAllFollowersStateMutation,
  useGetFollowingStateMutation,
  useGetFollowersStateMutation,
  useCreateFollowerMutation,
  useDeleteFollowerMutation,
} = followersApi;
