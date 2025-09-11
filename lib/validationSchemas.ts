import * as z from "zod";

export const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().regex(/^\d{5}$/, "ZIP code must be exactly 5 digits"),
});

export type Step1Data = z.infer<typeof step1Schema>;

 
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

export type Step2Data = z.infer<typeof step2Schema>;
