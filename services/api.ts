import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your API
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => "/posts", // GET /posts
    }),
  }),
});

// Export hooks for usage in components
export const { useGetPostsQuery } = api;
