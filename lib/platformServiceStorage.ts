export interface PlatformService {
  platformServiceId: string;
  platformServiceCategoryId: string;
  platformServiceCategoryPackageId: string;
  platformServiceCategoryPackageAddonsId: string[];
}

/**
 * Save step data for platform service in localStorage
 * @param stepData Partial data of current step
 * @param createNew boolean to push as a new service (default false = merge with last)
 */
export const savePlatformServiceStep = (
  stepData: Partial<PlatformService>,
  createNew: boolean = false
) => {
  const existing = localStorage.getItem("platformServices");
  const platformServices: PlatformService[] = existing ? JSON.parse(existing) : [];

  if (createNew || platformServices.length === 0) {
    // Push new object
    platformServices.push({
      platformServiceId: "",
      platformServiceCategoryId: "",
      platformServiceCategoryPackageId: "",
      platformServiceCategoryPackageAddonsId: [],
      ...stepData,
    });
  } else {
    // Merge with last object
    const lastIndex = platformServices.length - 1;
    platformServices[lastIndex] = {
      ...platformServices[lastIndex],
      ...stepData,
    };
  }

  localStorage.setItem("platformServices", JSON.stringify(platformServices));
};

/**
 * Get all saved platform services from localStorage
 */
export const getPlatformServices = (): PlatformService[] => {
  const existing = localStorage.getItem("platformServices");
  return existing ? JSON.parse(existing) : [];
};

/**
 * Clear all saved platform services
 */
export const clearPlatformServices = () => {
  localStorage.removeItem("platformServices");
};
