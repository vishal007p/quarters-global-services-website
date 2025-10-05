// platformServiceStorage.ts

export interface PlatformService {
  platformServiceId: string;
  platformServiceCategoryId: string;
  platformServiceCategoryPackageId: string;
  platformServiceCategoryPackageAddonsId: string[];
  price?: number;
  currency?: string;
}

/**
 * ✅ Save or add platform service to localStorage
 * If createNew=true OR item is unique, adds a new entry instead of replacing
 */
export const savePlatformServiceStep = (
  stepData: Partial<PlatformService>,
  createNew: boolean = false
) => {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem("platformServices");
  const platformServices: PlatformService[] = existing ? JSON.parse(existing) : [];

  // ✅ Always push a new record for new selection
  platformServices.push({
    platformServiceId: stepData.platformServiceId || "",
    platformServiceCategoryId: stepData.platformServiceCategoryId || "",
    platformServiceCategoryPackageId: stepData.platformServiceCategoryPackageId || "",
    platformServiceCategoryPackageAddonsId:
      stepData.platformServiceCategoryPackageAddonsId || [],
    price: stepData.price || 0,
    currency: stepData.currency || "USD",
  });

  localStorage.setItem("platformServices", JSON.stringify(platformServices));
};

/**
 * ✅ Get all saved platform services
 */
export const getPlatformServices = (): PlatformService[] => {
  if (typeof window === "undefined") return [];
  const existing = localStorage.getItem("platformServices");
  return existing ? JSON.parse(existing) : [];
};

/**
 * ✅ Clear all
 */
export const clearPlatformServices = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("platformServices");
};

/**
 * ✅ Calculate total of all added prices
 */
export const getTotalPrice = (): number => {
  if (typeof window === "undefined") return 0;
  const existing = localStorage.getItem("platformServices");
  if (!existing) return 0;
  const platformServices: PlatformService[] = JSON.parse(existing);
  return platformServices.reduce((sum, s) => sum + (s.price || 0), 0);
};
