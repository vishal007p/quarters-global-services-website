import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const countryApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getCountries: build.query<any[], void>({
            query: () => '/country/get-country',
        }),
    }),
    overrideExisting: false,
});

export const { useGetCountriesQuery } = countryApi;
