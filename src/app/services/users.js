import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-gout-app.herokuapp.com/api/users/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ``,
    }),
    getUser: builder.query({
      query: (id) => `${id}`,
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "googleLogin",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: "profile",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});


export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateMutation,
} = usersApi;

export const { login } = usersApi;
