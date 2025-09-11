import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com/' }),
  endpoints: (builder) => ({
    getImages: builder.query<string[], void>({
      query: () => '/images',
    }),
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetImagesQuery, useUploadImageMutation } = apiSlice;
