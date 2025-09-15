// rtk/platformApi.ts

import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const platformApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getPlatformServices: build.query<any, { page: number; limit: number; category: number }>({
            query: ({ page, limit, category }) =>
                `/platform-service/get-platform-service?page=${page}&limit=${limit}&category=${category}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetPlatformServicesQuery } = platformApi;
