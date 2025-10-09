import { ZodIssue } from "zod/v3";

export type ApplicationPayload = {
  applications: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    company: string;
    status: string;
    applicationSource: string;
    address: {
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
    fromCountryId: string;
    toCountryId: string;
    platformServices: {
      platformServiceId: string;
      platformServiceCategoryId: string;
      platformServiceCategoryPackageAddonsId: any[];
      platformServiceCategoryPackageId: string | undefined;
    }[];
    serviceFields: {
      serviceType: string;
    };
  }[];
};


export type UserSession = {
  id: string;
  token: string;
};



export type ErrorInstance = { response: { data: { message: string } } };
export type ErrorInstance2 = {
  data: { message: string; errors: Record<string, string> | ZodIssue[] };
};
export type ErrorInstanceCombine = { message?: string } & ErrorInstance2 & ErrorInstance;