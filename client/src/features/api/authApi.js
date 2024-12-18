// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn, userLoggedOut } from "../authSlice";

// const USER_API = "http://localhost:8080/api/v1/user/";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: USER_API,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (inputData) => ({
//         url: "register",
//         method: "POST",
//         body: inputData,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (inputData) => ({
//         url: "login",
//         method: "POST",
//         body: inputData,
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(userLoggedIn({ user: result.data.user }));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//     logoutUser: builder.mutation({
//       query: () => ({
//         url: "logout",
//         method: "GET",
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           dispatch(userLoggedOut({ user: null }));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//     loadUser: builder.query({
//       query: () => ({
//         url: "profile",
//         method: "GET",
//         credentials: "include",
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(userLoggedIn({ user: result.data.user }));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//     updateUser: builder.mutation({
//       query: (formData) => ({
//         url: "update",
//         method: "PUT",
//         body: formData,
//         credentials: "include",
//       }),
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useLoadUserQuery,
//   useUpdateUserMutation, // Add this to your exports
//   useLogoutUserMutation,
// } = authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include", // Ensures cookies are included with the request
    prepareHeaders: (headers) => {
      // Extract token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (token) {
        // Extract the token value and set the Authorization header
        const tokenValue = token.split("=")[1];
        headers.set("Authorization", `Bearer ${tokenValue}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut({ user: null }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "update",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation, // Add this to your exports
  useLogoutUserMutation,
} = authApi;
