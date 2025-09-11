import * as z from "zod";

export const step1Schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),
  company: z.string().min(1, "Company is required"),
  departureDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/,
      "Date must be in MM-DD-YYYY format"
    ),
  physicalAddress: z.string().min(1, "Physical Address is required"),
  legalAddress: z.string().min(1, "Current Legal Address is required"),
  zipCode: z.string().regex(/^\d{5}$/, "ZIP code must be exactly 5 digits"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

export const step2Schema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card Number must be 16 digits")
    .max(16, "Card Number must be 16 digits")
    .regex(/^\d+$/, "Card Number must contain only digits"),
  expiry: z
    .string()
    .min(5, "Expiry must be in MM/YY format")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: z
    .string()
    .min(3, "CVV must be 3 digits")
    .max(4, "CVV must be 3 or 4 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
  billingAddress: z.string().min(1, "Billing Address is required"),
});



export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
