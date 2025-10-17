// Main schemas index file - exports all schemas and types
import { z } from 'zod';

// Export all schemas and common types
export * from './usa/visa';
export * from './usa/passport';
export * from './india/visa';
export * from './india/passport';
export * from './common';

// Import additional schema functions

// Import all schemas for the discriminated union
import {
  // USA Visa Schemas
  visaUSB1B2Schema,
  visaUSStudentSchema,
  visaUSExchangeVisitorSchema,
  visaUSBusinessSchema,
  visaUSTemporaryWorkerSchema,
  visaUSIntraCompanyTransferSchema,
  visaUSExtraordinaryAbilitySchema,
  visaUSAthleteArtistSchema,
  visaUSReligiousWorkerSchema,
  visaUSNAFTASchema,
  visaUSImmediateRelativeSchema,
  visaUSFamilyPreferenceSchema,
  visaUSEmploymentBasedSchema,
  visaUSDiversityLotterySchema,
  visaUSFianceSchema,
  visaUSSpouseSchema,
  visaUSWitnessInformantSchema,
  visaUSTraffickingVictimsSchema,
  visaUSCrimeVictimsSchema,
} from './usa/visa';

import {
  // USA Passport Schemas
  passportUSANewDS11Schema,
  passportUSARenewalDS82Schema,
  passportUSAChildUnder16Schema,
  passportUSALostStolenDamagedSchema,
  passportUSACardSchema,
  passportUSANameChangeCorrectionSchema,
  passportUSASecondValidSchema,
  passportUSAExpeditedServiceSchema,
  passportUSAEmergencySameDaySchema,
} from './usa/passport';

import {
  // India Visa Schemas
  visaIndiaTouristSchema,
  visaIndiaBusinessSchema,
  visaIndiaStudentSchema,
  visaIndiaMedicalSchema,
  visaIndiaConferenceSchema,
  visaIndiaEmploymentSchema,
  // visaIndiaEVisaTouristSchema,
  // visaIndiaEVisaBusinessSchema,
  // visaIndiaEVisaMedicalSchema,
} from './india/visa';

import {
  // India Passport Schemas
  passportIndiaNewAdultSchema,
  passportIndiaNewMinorSchema,
  passportIndiaRenewalAdultSchema,
  passportIndiaRenewalMinorSchema,
  passportIndiaLostDamagedSchema,
  passportIndiaTatkalSchema,
  passportIndiaNameChangeSchema,
} from './india/passport';
import { emptySchema } from './common';

// ---- Union ----
export const serviceDocumentsSchemas = z.discriminatedUnion('serviceType', [
  emptySchema, // Default empty schema
  // USA Visa Schemas
  visaUSB1B2Schema,
  visaUSStudentSchema,
  visaUSExchangeVisitorSchema,
  visaUSBusinessSchema,
  visaUSTemporaryWorkerSchema,
  visaUSIntraCompanyTransferSchema,
  visaUSExtraordinaryAbilitySchema,
  visaUSAthleteArtistSchema,
  visaUSReligiousWorkerSchema,
  visaUSNAFTASchema,
  visaUSImmediateRelativeSchema,
  visaUSFamilyPreferenceSchema,
  visaUSEmploymentBasedSchema,
  visaUSDiversityLotterySchema,
  visaUSFianceSchema,
  visaUSSpouseSchema,
  visaUSWitnessInformantSchema,
  visaUSTraffickingVictimsSchema,
  visaUSCrimeVictimsSchema,
  // India Visa Schemas
  visaIndiaTouristSchema,
  visaIndiaBusinessSchema,
  visaIndiaStudentSchema,
  visaIndiaMedicalSchema,
  visaIndiaConferenceSchema,
  visaIndiaEmploymentSchema,
  // visaIndiaEVisaTouristSchema,
  // visaIndiaEVisaBusinessSchema,
  // visaIndiaEVisaMedicalSchema,
  // USA Passport Schemas
  passportUSANewDS11Schema,
  passportUSARenewalDS82Schema,
  passportUSAChildUnder16Schema,
  passportUSALostStolenDamagedSchema,
  passportUSACardSchema,
  passportUSANameChangeCorrectionSchema,
  passportUSASecondValidSchema,
  passportUSAExpeditedServiceSchema,
  passportUSAEmergencySameDaySchema,
  // India Passport Schemas
  passportIndiaNewAdultSchema,
  passportIndiaNewMinorSchema,
  passportIndiaRenewalAdultSchema,
  passportIndiaRenewalMinorSchema,
  passportIndiaLostDamagedSchema,
  passportIndiaTatkalSchema,
  passportIndiaNameChangeSchema,
]);

// Base schema for application form
const baseSchema = z.object({
  // Service
  toCountryId: z.string().min(1, 'This field is required'),
  platformServiceId: z.string().min(1, 'This field is required'),
  platformServiceCategoryId: z.string().min(1, 'This field is required'),
  platformServiceSubCategoryId: z.string().min(1, 'This field is required'),
  platformServiceCategoryPackageId: z.string().min(1, 'This field is required'),
  platformServiceCategoryPackageAddonsId: z.array(z.string().min(1, 'This field is required')),

  firstName: z.string().min(1, 'This field is required'),
  lastName: z.string().min(1, 'This field is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'This field is required'),
  country: z.string().min(1, 'This field is required'),
  address: z.string().min(1, 'This field is required'),
  city: z.string().min(1, 'This field is required'),
  state: z.string().min(1, 'This field is required'),
  pincode: z.string().min(1, 'This field is required'),
  notes: z.string().optional(),

  // Additional service fields
  additionalServiceFields: z
    .object({
      paymentMethod: z.string().optional(),
      paymentStatus: z.string().optional(),
      totalAmount: z.string().optional(),
      paidAmount: z.string().optional(),
      paymentId: z.string().optional(),
      courierId: z.string().optional(),
      passportNumber: z.string().optional(),
    })
    .optional(),
});

// Create the application validator

export const createApplicationValidator = baseSchema.extend({
  documents: serviceDocumentsSchemas,
});

export type CreateApplicationType = z.infer<typeof createApplicationValidator>;

// ---- Utility Functions ----

/**
 * Extract field information from a Zod schema for dynamic form generation
 */
export function getSchemaFields(schema: z.ZodTypeAny): Array<{
  name: string;
  type: 'file' | 'text';
  required: boolean;
  label: string;
}> {
  if (!(schema instanceof z.ZodObject)) {
    return [];
  }

  const shape = schema.shape;
  const fields: Array<{
    name: string;
    type: 'file' | 'text';
    required: boolean;
    label: string;
  }> = [];

  for (const [fieldName, fieldSchema] of Object.entries(shape)) {
    // Skip serviceType field as it's handled separately
    if (fieldName === 'serviceType') continue;

    const isOptional =
      fieldSchema instanceof z.ZodOptional || (fieldSchema as any)._def?.typeName === 'ZodOptional';

    const unwrappedSchema: any =
      fieldSchema instanceof z.ZodOptional ? (fieldSchema as any)._def.innerType : fieldSchema;

    // Prefer .description if available
    const fieldType =
      unwrappedSchema.description === 'file' || unwrappedSchema instanceof z.ZodType
        ? unwrappedSchema instanceof z.ZodString
          ? 'text'
          : 'file'
        : 'file';

    // Convert camelCase to Title Case for labels
    const label = fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();

    fields.push({
      name: fieldName,
      type: fieldType,
      required: !isOptional,
      label,
    });
  }

  return fields;
}