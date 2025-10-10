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

  // ✅ Find the first non-empty identifier from stepData
  const currentId =
    stepData.platformServiceCategoryPackageId ||
    stepData.platformServiceCategoryId ||
    stepData.platformServiceId ||
    "";

  // ✅ Find the first non-empty identifier in each stored item
  const index = platformServices.findIndex((s) => {
    const storedId =
      s.platformServiceCategoryPackageId ||
      s.platformServiceCategoryId ||
      s.platformServiceId ||
      "";
    return storedId === currentId;
  });

  if (remove) {
    if (index !== -1) platformServices.splice(index, 1);
  } else {
    const record: PlatformService = {
      platformServiceId: stepData.platformServiceId || "",
      platformServiceCategoryId: stepData.platformServiceCategoryId || "",
      platformServiceCategoryPackageId: stepData.platformServiceCategoryPackageId || "",
      platformServiceCategoryPackageAddonsId:
        stepData.platformServiceCategoryPackageAddonsId || [],
      price: stepData.price ?? stepData.additionService_price ?? 0,
      currency: stepData.currency || "USD",
      Price_name: stepData.Price_name ?? stepData.additionService_name ?? "",
      additionService: stepData.additionService ?? false,
      additionService_price: stepData.additionService_price ?? 0,
      additionService_name: stepData.additionService_name ?? "",
    };

    if (index !== -1) {
      // ✅ Update existing
      platformServices[index] = { ...platformServices[index], ...record };
    } else {
      // ✅ Add new only if not found
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

 
export const isPlatformServiceSaved = (id: string): boolean => {
  if (typeof window === "undefined") return false;
  const existing = localStorage.getItem("platformServices");
  if (!existing) return false;

  const platformServices: PlatformService[] = JSON.parse(existing);
  return platformServices.some(
    (s) =>
      s.platformServiceId === id ||
      s.platformServiceCategoryId === id ||
      s.platformServiceCategoryPackageId === id
  );
};

export const removeFromPlatformServices = (id: string) => {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem("applications");
  if (!existing) return;

  const data = JSON.parse(existing);

  // ✅ Ensure structure integrity
  if (!Array.isArray(data.applications)) {
    console.warn("Invalid structure: expected applications array");
    return;
  }

  // ✅ Filter out the record that matches the ID or its service keys
  const filteredApps = data.applications.filter(
    (s: any) =>
      s.id !== id &&
      s.platformServiceId !== id &&
      s.platformServiceCategoryId !== id &&
      s.platformServiceCategoryPackageId !== id
  );

  // ✅ Save back the cleaned structure (keeping activeId intact)
  const updated = {
    ...data,
    applications: filteredApps,
  };

  localStorage.setItem("applications", JSON.stringify(updated));
  console.log("✅ Removed from localStorage:", id);
};
