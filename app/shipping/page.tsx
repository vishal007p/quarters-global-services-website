"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
 import { useRouter } from "nextjs-toploader/app";

// ✅ Document List for Shipping (US Visa)
const DOCUMENT_LIST = [
  "Valid Passport",
  "DS-160 Confirmation",
  "Visa Fee Receipt",
  "Passport Photo (US Visa Spec)",
  "Travel Itinerary",
  "Bank Statements",
  "Invitation Letter (if applicable)",
];

// ✅ Zod schema
const formSchema = z.object({
  documentMethod: z
    .string()
    .refine((val) => val === "upload" || val === "shipping", {
      message: "Please select a document submission method",
    }),
  documents: z.array(z.string()).optional(),
  uploadFiles: z
    .any()
    .optional(), // Will hold uploaded files if "upload" is selected
});

type FormValues = z.infer<typeof formSchema>;

const Page = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentMethod: "upload",
      documents: [],
      uploadFiles: undefined,
    },
  });

  const router = useRouter();

  const onSubmit = (values: FormValues) => {
 
    if (values.documentMethod === "shipping") {
      router.push("/shipping/summary");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-xl font-bold mb-6">Document Process</h2>
      <p className="mb-4 text-gray-600">
        How would you like to send documents to us for further process?
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Choose Method */}
          <FormField
            control={form.control}
            name="documentMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-8"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="upload" />
                      </FormControl>
                      <FormLabel className="font-medium">
                        By Uploading Documents
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="shipping" />
                      </FormControl>
                      <FormLabel className="font-medium">
                        By Shipping Documents
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        

          {/* Step 2B: If shipping → checklist */}
          {form.watch("documentMethod") === "shipping" && (
            <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium mb-2">
                    Select Documents you are Shipping
                  </FormLabel>
                  {DOCUMENT_LIST.map((item) => (
                    <FormItem
                      key={item}
                      className="flex items-center space-x-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={true}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), item])
                              : field.onChange(
                                  field.value?.filter((v) => v !== item)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </FormItem>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 mt-4"
          >
            {
              form.watch("documentMethod") === "shipping" ? "Next" : "Login to Coustomer"
            }
             
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
