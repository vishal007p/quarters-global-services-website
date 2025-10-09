export interface PlatformService {
  platformServiceId: string;
  platformServiceCategoryId: string;
  platformServiceCategoryPackageId: string;
  platformServiceCategoryPackageAddonsId: string[];
  price?: number;
  currency?: string;
  Price_name: string;
  additionService?: boolean; // flag to identify it's an addon
  additionService_price?: number; // ✅ new key
  additionService_name?: string;  // ✅ new key
}

export interface PlatformService {
  platformServiceId: string;
  platformServiceCategoryId: string;
  platformServiceCategoryPackageId: string;
  platformServiceCategoryPackageAddonsId: string[];
  price?: number;
  currency?: string;
  Price_name: string;
  additionService?: boolean;
  additionService_price?: number;
  additionService_name?: string;
}
export const savePlatformServiceStep = (
  stepData: Partial<PlatformService>,
  remove = false
) => {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem("platformServices");
  const platformServices: PlatformService[] = existing ? JSON.parse(existing) : [];

  // ✅ Identify existing record
  const index = platformServices.findIndex(
    (s) =>
      s.platformServiceCategoryPackageId ===
        stepData.platformServiceCategoryPackageId &&
      s.additionService_name === stepData.additionService_name
  );

  if (remove) {
    if (index !== -1) platformServices.splice(index, 1);
  } else {
    // ✅ Prepare full record
    const record: PlatformService = {
      platformServiceId: stepData.platformServiceId || "",
      platformServiceCategoryId: stepData.platformServiceCategoryId || "",
      platformServiceCategoryPackageId:
        stepData.platformServiceCategoryPackageId || "",
      platformServiceCategoryPackageAddonsId:
        stepData.platformServiceCategoryPackageAddonsId || [],
      price:
        stepData.price ??
        stepData.additionService_price ??
        0, // fallback support
      currency: stepData.currency || "USD",
      Price_name:
        stepData.Price_name ??
        stepData.additionService_name ??
        "", // store readable name too
      additionService: stepData.additionService ?? false,
      additionService_price: stepData.additionService_price ?? 0,
      additionService_name: stepData.additionService_name ?? "",
    };

    if (index !== -1) {
      platformServices[index] = { ...platformServices[index], ...record };
    } else {
      platformServices.push(record);
    }
  }

  localStorage.setItem("platformServices", JSON.stringify(platformServices));
};


export const getPlatformServices = (): PlatformService[] => {
  if (typeof window === "undefined") return [];
  const existing = localStorage.getItem("platformServices");
  return existing ? JSON.parse(existing) : [];
};


export const clearPlatformServices = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("platformServices");
};


export const getTotalPrice = (): number => {
  if (typeof window === "undefined") return 0;
  const existing = localStorage.getItem("platformServices");
  if (!existing) return 0;
  const platformServices: PlatformService[] = JSON.parse(existing);
  return platformServices.reduce((sum, s) => sum + (s.price || 0), 0);
};
