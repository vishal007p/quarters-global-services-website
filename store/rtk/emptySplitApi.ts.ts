import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quartus-api.zyberzing.com/api/v1",  // Global base URL from .env
  }),
  endpoints: () => ({}),  // Start empty
});
