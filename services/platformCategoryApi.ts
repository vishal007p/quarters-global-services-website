import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

 
export const platformCategoryApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getPlatformServiceCategories: build.query({
      query: ({ platformServiceSlug, toCountrySlug }: { platformServiceSlug: string; toCountrySlug: string }) =>
        `/platform-service-category/get-platform-service-category?platformServiceSlug=${platformServiceSlug}&toCountrySlug=${toCountrySlug}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetPlatformServiceCategoriesQuery } = platformCategoryApi;
