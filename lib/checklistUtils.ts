// utils/checklistUtils.ts
import { CHECKLISTS } from "@/app/data/checklists";

export const detectChecklistType = (application: any) => {
  if (!application?.name) return null;

  // Convert name → normalized slug: "OCI Minor Application Checklist" → "oci-minor-application-checklist"
  const nameSlug = application.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""); // remove special chars

  // We assume all checklists belong under 'india' for now
  const countryKey: keyof typeof CHECKLISTS = "india";

  // We'll search in all services (oci, passport, etc.)
  const services = CHECKLISTS[countryKey];

  for (const serviceKey of Object.keys(services)) {
    const serviceList = services[serviceKey as keyof typeof services];

    // Try to find checklist where id exists in the slug
    const found = serviceList.find((item) => nameSlug.includes(item.id));
    if (found) {
      return {
        countryKey,
        serviceKey,
        checklist: found,
      };
    }
  }

  // If not found
  console.warn("⚠️ No matching checklist found for:", nameSlug);
  return null;
};
