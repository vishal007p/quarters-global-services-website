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
      platformServiceCategoryPackageId: string;
    }[];
    serviceFields: {
      serviceType: string;
    };
  }[];
};
