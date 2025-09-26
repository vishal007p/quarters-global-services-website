"use client";

import React from "react";
import { z } from "zod";
import { DynamicForm, FieldConfig } from "@/components/DynamicForm/DynamicForm";

// ---------- Zod Schema ----------
const courierSchema = z.object({
  senderName: z.string().min(3, "Sender name must be at least 3 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Country is required"),
  message: z.string().max(200, "Message too long"),
});

// ---------- Field Configuration ----------
const fieldConfig: FieldConfig[] = [
  { name: "senderName", label: "Sender Name", type: "text", placeholder: "Enter sender name" },
  { name: "phone", label: "Phone", type: "number", placeholder: "Enter phone number" },
  { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
  {
    name: "country",
    label: "Country",
    type: "select",
    placeholder: "Select country",
    options: [
      { label: "India", value: "india" },
      { label: "USA", value: "usa" },
      { label: "UK", value: "uk" },
    ],
  },
  { name: "message", label: "Message", type: "textarea", placeholder: "Enter message" },
];

export default function Page() {
  const handleSubmit = (values: z.infer<typeof courierSchema>) => {
    console.log("Form Values:", values);
  };

  return <DynamicForm schema={courierSchema} fields={fieldConfig} onSubmit={handleSubmit} />;
}
