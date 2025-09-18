 import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export interface ApplicationPayload {
  applications: {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phone: string;
    status: string;
    departureDate: string;
    physicalAddress: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    currentLegalAddress: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    platformServices: {
      platformServiceId: string;
      platformServiceCategoryId: string;
      platformServiceCategoryPackageId: string;
    }[];
    serviceSpecificData: Record<string, any>; // 👈 flexible key-values
  }[];
}

export const applicationApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    createApplication: build.mutation<any, ApplicationPayload>({
      query: (payload) => ({
        url: "/application/create-application",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateApplicationMutation } = applicationApi;
