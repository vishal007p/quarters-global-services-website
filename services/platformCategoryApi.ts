// rtk/platformCategoryApi.ts

import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const platformCategoryApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getPlatformServiceCategories: build.query<any, { platformServiceId: string; page: number; limit: number; parentCategoryId: string }>({
            query: ({ platformServiceId, page, limit, parentCategoryId }) =>
                `/platform-service-category/get-platform-service-category?platformServiceId=${platformServiceId}&page=${page}&limit=${limit}&parentCategoryId=${parentCategoryId}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetPlatformServiceCategoriesQuery } = platformCategoryApi;
