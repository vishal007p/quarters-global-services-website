export interface PlatformService {
  platformServiceId: string;
  platformServiceCategoryId: string;
  platformServiceCategoryPackageId: string;
  platformServiceCategoryPackageAddonsId: string[];
}

export const savePlatformServiceStep = (
  stepData: Partial<PlatformService>,
  createNew: boolean = false
) => {
  if (typeof window === "undefined") return; // ❌ Skip on server

  const existing = localStorage.getItem("platformServices");
  const platformServices: PlatformService[] = existing ? JSON.parse(existing) : [];

  if (createNew || platformServices.length === 0) {
    platformServices.push({
      platformServiceId: "",
      platformServiceCategoryId: "",
      platformServiceCategoryPackageId: "",
      platformServiceCategoryPackageAddonsId: [],
      ...stepData,
    });
  } else {
    const lastIndex = platformServices.length - 1;
    platformServices[lastIndex] = {
      ...platformServices[lastIndex],
      ...stepData,
    };
  }

  localStorage.setItem("platformServices", JSON.stringify(platformServices));
};

export const getPlatformServices = (): PlatformService[] => {
  if (typeof window === "undefined") return []; // ❌ Skip on server
  const existing = localStorage.getItem("platformServices");
  return existing ? JSON.parse(existing) : [];
};

export const clearPlatformServices = () => {
  if (typeof window === "undefined") return; // ❌ Skip on server
  localStorage.removeItem("platformServices");
};
