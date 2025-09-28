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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";

const formSchema = z.object({
  documents: z.array(z.string()).nonempty("Select at least one document"),
});

type FormValues = z.infer<typeof formSchema>;

const DOCUMENT_LIST = [
  "Passport",
  "Photograph",
  "DS-160 Form",
  "Proof of residence",
  "Proof of financial capability",
  "Proof of employment/business",
  "Travel itinerary",
  "Invitation letter from U.S. company (for B1 Business Visa)",
];

const ShippingPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: DOCUMENT_LIST, // pre-checked
    },
  });
  const router = useRouter();

  const onSubmit = (values: FormValues) => {
    console.log("Selected documents:", values.documents);
    router.push("/shipping/summary");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-xl font-bold mb-6">Document Process</h2>
      <p className="mb-4 text-gray-600">
        How would you like to send documents to us for further process?
      </p>

      {/* Fake radio (read-only, since this is shipping page) */}
      <div className="flex gap-8 border-b border-dashed pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <input title="ss" type="radio" checked={false} readOnly />
          <label className="text-gray-600">By Uploading documents</label>
        </div>
        <div className="flex items-center space-x-2">
          <input title="ss" type="radio" checked readOnly />
          <label className="font-semibold">By Shipping Documents</label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 border-b border-dashed pb-6 mb-6">
        {/* Left Side - Checklist */}
        <div>
          <p className="mb-4 font-medium text-gray-700">
            For Visa Shipment process you need to Ship these documents on below
            address to complete Process
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="documents"
                render={() => (
                  <FormItem>
                    {DOCUMENT_LIST.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="documents"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex items-center space-x-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                        field.value?.filter((v) => v !== item)
                                      );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 mt-4"
              >
                Next
              </Button>
            </form>
          </Form>
        </div>

        {/* Right Side - Address */}
        <div className="bg-blue-200 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">
            Ship your document to below address.
          </h3>
          <p>Carlos Sebastian</p>
          <p>47 W, 13th Street,</p>
          <p>New York, NY 10011</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
