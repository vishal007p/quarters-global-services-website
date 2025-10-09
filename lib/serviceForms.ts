import { z } from "zod";
import { FieldConfig } from "@/components/DynamicForm/DynamicForm";

// ---------- Common Applicant Fields ----------
export const commonApplicantSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  countryCode: z.string(),
  phone: z.string(),
  status: z.string(),
});

export const commonApplicantFields: FieldConfig[] = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "status", label: "Status", type: "text" },
];

// ---------- OCI ----------
export const ociSchema = z.object({
  serviceType: z.string(),
  applicationType: z.string(),
  maritalStatus: z.string().optional(),
  nationality: z.string(),
  passportNumber: z.string(),
  placeOfIssue: z.string(),
  issueDate: z.string(),
  expiryDate: z.string(),
  currentResidentialAddress: z.string(),
  relativeName: z.string(),
  relativeDob: z.string(),
  relativeGender: z.string(),
  relationship: z.string(),
  referenceAddress: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    contactNumber: z.string(),
  }),
  appliedEarlier: z.boolean(),
  surrenderedEarlier: z.boolean(),
  citizenPakistanBangladesh: z.boolean(),
  parentsFromPakistanBangladesh: z.boolean(),
  workedInForces: z.boolean(),
  acquisitionNationality: z.string(),
  asylum: z.boolean(),
  convicted: z.boolean(),
  refusedEntry: z.boolean(),
  associatedWithNGO: z.boolean(),
  humanTraffickingFraud: z.boolean(),
  cybercrimeTerrorism: z.boolean(),
  glorifiedTerrorism: z.boolean(),
  criminalProceedingsPending: z.boolean(),
});

export const ociFields: FieldConfig[] = [
  { name: "applicationType", label: "Application Type", type: "text" },
  { name: "maritalStatus", label: "Marital Status", type: "text" },
  { name: "nationality", label: "Nationality", type: "text" },
  { name: "passportNumber", label: "Passport Number", type: "text" },
  { name: "placeOfIssue", label: "Place of Issue", type: "text" },
  { name: "issueDate", label: "Issue Date", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
  { name: "currentResidentialAddress", label: "Current Residential Address", type: "text" },
  { name: "relativeName", label: "Relative Name", type: "text" },
  { name: "relativeDob", label: "Relative Date of Birth", type: "date" },
  { name: "relativeGender", label: "Relative Gender", type: "text" },
  { name: "relationship", label: "Relationship", type: "text" },
  { name: "referenceAddress.address", label: "Reference Address", type: "text" },
  { name: "referenceAddress.city", label: "Reference City", type: "text" },
  { name: "referenceAddress.state", label: "Reference State", type: "text" },
  { name: "referenceAddress.contactNumber", label: "Reference Contact Number", type: "text" },
  { name: "appliedEarlier", label: "Applied Earlier", type: "checkbox" },
  { name: "surrenderedEarlier", label: "Surrendered Earlier", type: "checkbox" },
  { name: "citizenPakistanBangladesh", label: "Citizen of Pakistan/Bangladesh", type: "checkbox" },
  { name: "parentsFromPakistanBangladesh", label: "Parents from Pakistan/Bangladesh", type: "checkbox" },
  { name: "workedInForces", label: "Worked in Forces", type: "checkbox" },
  { name: "acquisitionNationality", label: "Acquisition of Nationality", type: "text" },
  { name: "asylum", label: "Asylum", type: "checkbox" },
  { name: "convicted", label: "Convicted", type: "checkbox" },
  { name: "refusedEntry", label: "Refused Entry", type: "checkbox" },
  { name: "associatedWithNGO", label: "Associated with NGO", type: "checkbox" },
  { name: "humanTraffickingFraud", label: "Human Trafficking/Fraud", type: "checkbox" },
  { name: "cybercrimeTerrorism", label: "Cybercrime/Terrorism", type: "checkbox" },
  { name: "glorifiedTerrorism", label: "Glorified Terrorism", type: "checkbox" },
  { name: "criminalProceedingsPending", label: "Criminal Proceedings Pending", type: "checkbox" },
];

export const ociSchemaWithCommon = commonApplicantSchema.merge(ociSchema);
export const ociFieldsWithCommon = [...commonApplicantFields, ...ociFields];

// ---------- Visa ----------
export const visaSchema = z.object({
  serviceType: z.string(),  supportingDocs: z.array(z.string()),
  company: z.string().optional(),
});
export const visaFields: FieldConfig[] = [
  { name: "supportingDocs", label: "Supporting Docs (comma separated)", type: "text" },
  { name: "company", label: "Company", type: "text" },
];

export const visaSchemaWithCommon = commonApplicantSchema.merge(visaSchema);
export const visaFieldsWithCommon = [...commonApplicantFields, ...visaFields];

// ---------- Apostille ----------
export const apostilleSchema = z.object({
    serviceType: z.string(),
  destinationCountry: z.string(),
  documentCount: z.string(),
});
export const apostilleFields: FieldConfig[] = [
  { name: "destinationCountry", label: "Destination Country", type: "text" },
  { name: "documentCount", label: "Document Count", type: "text" },
];
export const apostilleSchemaWithCommon = commonApplicantSchema.merge(apostilleSchema);
export const apostilleFieldsWithCommon = [...commonApplicantFields, ...apostilleFields];

// ---------- Courier ----------
export const courierSchema = z.object({
  serviceType: z.string(),
  senderAddress: z.string(),
  stateSender: z.string(),
  citySender: z.string(),
  countrySender: z.string(),
  recipientName: z.string(),
  recipientAddress: z.string(),
  stateRecipient: z.string(),
  cityRecipient: z.string(),
  countryRecipient: z.string(),
  phoneSender: z.string(),
  phoneRecipient: z.string(),
  deliveryType: z.string(),
  preferredCourierCompany: z.string(),
  noOfPagesOrEnvelopes: z.string(),
  trackingNumber: z.string(),
});
export const courierFields: FieldConfig[] = [
  { name: "senderAddress", label: "Sender Address", type: "text" },
  { name: "stateSender", label: "Sender State", type: "text" },
  { name: "citySender", label: "Sender City", type: "text" },
  { name: "countrySender", label: "Sender Country", type: "text" },
  { name: "recipientName", label: "Recipient Name", type: "text" },
  { name: "recipientAddress", label: "Recipient Address", type: "text" },
  { name: "stateRecipient", label: "Recipient State", type: "text" },
  { name: "cityRecipient", label: "Recipient City", type: "text" },
  { name: "countryRecipient", label: "Recipient Country", type: "text" },
  { name: "phoneSender", label: "Sender Phone", type: "text" },
  { name: "phoneRecipient", label: "Recipient Phone", type: "text" },
  { name: "deliveryType", label: "Delivery Type", type: "text" },
  { name: "preferredCourierCompany", label: "Preferred Courier Company", type: "text" },
  { name: "noOfPagesOrEnvelopes", label: "No. of Pages/Envelopes", type: "number" },
  { name: "trackingNumber", label: "Tracking Number", type: "text" },
];
export const courierSchemaWithCommon = commonApplicantSchema.merge(courierSchema);
export const courierFieldsWithCommon = [...commonApplicantFields, ...courierFields];

// ---------- Vehicle ----------
export const vehicleSchema = z.object({
  serviceType: z.string(),
  vehicleType: z.string(),
  pickupDate: z.string(),
  dropDate: z.string(),
  pickupLocation: z.string(),
  dropLocation: z.string(),
  numberOfPassengers: z.string(),
  purpose: z.string(),
  preferredDriver: z.string(),
});
export const vehicleFields: FieldConfig[] = [
  { name: "vehicleType", label: "Vehicle Type", type: "text" },
  { name: "pickupDate", label: "Pickup Date", type: "text" },
  { name: "dropDate", label: "Drop Date", type: "text" },
  { name: "pickupLocation", label: "Pickup Location", type: "text" },
  { name: "dropLocation", label: "Drop Location", type: "text" },
  { name: "numberOfPassengers", label: "Number of Passengers", type: "number" },
  { name: "purpose", label: "Purpose", type: "text" },
  { name: "preferredDriver", label: "Preferred Driver", type: "text" },
];
export const vehicleSchemaWithCommon = commonApplicantSchema.merge(vehicleSchema);
export const vehicleFieldsWithCommon = [...commonApplicantFields, ...vehicleFields];

// ---------- Flight Charter ----------
export const flightCharterSchema = z.object({
    serviceType: z.string(),
  charterType: z.string(),
  numberOfPassengers: z.number(),
  date: z.string(),
  time: z.string(),
  passengerName: z.string(),
  totalPassenger: z.number(),
  specialRequirements: z.string().optional(),
  travelInsurance: z.string(),
  returnTrip: z.string(),
});
export const flightCharterFields: FieldConfig[] = [
  { name: "charterType", label: "Charter Type", type: "text" },
  { name: "numberOfPassengers", label: "Number of Passengers", type: "number" },
  { name: "date", label: "Date", type: "text" },
  { name: "time", label: "Time", type: "text" },
  { name: "passengerName", label: "Passenger Name", type: "text" },
  { name: "totalPassenger", label: "Total Passengers", type: "number" },
  { name: "specialRequirements", label: "Special Requirements", type: "text" },
  { name: "travelInsurance", label: "Travel Insurance", type: "text" },
  { name: "returnTrip", label: "Return Trip", type: "text" },
];
export const flightCharterSchemaWithCommon = commonApplicantSchema.merge(flightCharterSchema);
export const flightCharterFieldsWithCommon = [...commonApplicantFields, ...flightCharterFields];

// ---------- Event ----------
export const eventSchema = z.object({
   serviceType: z.string(),
  eventType: z.string(),
  organizerName: z.string(),
  eventDate: z.string(),
  time: z.string(),
});
export const eventFields: FieldConfig[] = [
  { name: "eventType", label: "Event Type", type: "text" },
  { name: "organizerName", label: "Organizer Name", type: "text" },
  { name: "eventDate", label: "Event Date", type: "text" },
  { name: "time", label: "Time", type: "text" },
];
export const eventSchemaWithCommon = commonApplicantSchema.merge(eventSchema);
export const eventFieldsWithCommon = [...commonApplicantFields, ...eventFields];

// ---------- Consultancy ----------
export const consultancySchema = z.object({
   serviceType: z.string(),
  inquiryType: z.string(),
  purpose: z.string(),
});
export const consultancyFields: FieldConfig[] = [
  { name: "inquiryType", label: "Inquiry Type", type: "text" },
  { name: "purpose", label: "Purpose", type: "text" },
];
export const consultancySchemaWithCommon = commonApplicantSchema.merge(consultancySchema);
export const consultancyFieldsWithCommon = [...commonApplicantFields, ...consultancyFields];

// ---------- Miscellaneous ----------
export const miscellaneousSchema = z.object({
    serviceType: z.string(),
  miscServiceType: z.string(),
  nationality: z.string(),
});
export const miscellaneousFields: FieldConfig[] = [
  { name: "miscServiceType", label: "Misc Service Type", type: "text" },
  { name: "nationality", label: "Nationality", type: "text" },
];
export const miscellaneousSchemaWithCommon = commonApplicantSchema.merge(miscellaneousSchema);
export const miscellaneousFieldsWithCommon = [...commonApplicantFields, ...miscellaneousFields];

// ---------- Driver ----------
export const driverSchema = z.object({
   serviceType: z.string(),
  licenseNumber: z.string(),
  drivingExperienceYears: z.number(),
});
export const driverFields: FieldConfig[] = [
  { name: "licenseNumber", label: "License Number", type: "text" },
  { name: "drivingExperienceYears", label: "Experience (Years)", type: "number" },
];
export const driverSchemaWithCommon = commonApplicantSchema.merge(driverSchema);
export const driverFieldsWithCommon = [...commonApplicantFields, ...driverFields];

// ---------------- Mapping ----------------
export const serviceForms = {
  oci: { schema: ociSchemaWithCommon, fields: ociFieldsWithCommon },
  visa: { schema: visaSchemaWithCommon, fields: visaFieldsWithCommon },
  "apostille-and-legalization": { schema: apostilleSchemaWithCommon, fields: apostilleFieldsWithCommon },
  "courier-and-document-delivery": { schema: courierSchemaWithCommon, fields: courierFieldsWithCommon },
  "vehicle-booking": { schema: vehicleSchemaWithCommon, fields: vehicleFieldsWithCommon },
  "flight-charter": { schema: flightCharterSchemaWithCommon, fields: flightCharterFieldsWithCommon },
  consultancy: { schema: consultancySchemaWithCommon, fields: consultancyFieldsWithCommon },
  driver: { schema: driverSchemaWithCommon, fields: driverFieldsWithCommon },
  miscellaneous: { schema: miscellaneousSchemaWithCommon, fields: miscellaneousFieldsWithCommon },
  event: { schema: eventSchemaWithCommon, fields: eventFieldsWithCommon },
};
