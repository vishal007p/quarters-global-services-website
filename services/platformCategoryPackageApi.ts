// rtk/platformCategoryPackageApi.ts

import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const platformCategoryPackageApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getPlatformServiceCategoryPackages: build.query<any, { platformServiceCategoryId: string; page: number; limit: number; country?: string }>({
            query: ({ platformServiceCategoryId, page, limit, country = '' }) =>
                `/platform-service-category-package/get-platform-service-category-package?platformServiceCategoryId=${platformServiceCategoryId}&page=${page}&limit=${limit}&country=${country}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetPlatformServiceCategoryPackagesQuery } = platformCategoryPackageApi;
