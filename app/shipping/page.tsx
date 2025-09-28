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
import { useRouter } from "nextjs-toploader/app";


// ✅ Zod schema
const formSchema = z.object({
  documentMethod: z.string().refine(
    (val) => val === "upload" || val === "shipping",
    { message: "Please select a document submission method" }
  ),
});


type FormValues = z.infer<typeof formSchema>;

const Page = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentMethod: "upload",
    },
  });

  const router = useRouter();
  const onSubmit = (values: FormValues) => {
    console.log(values);
    router.push("/shipping/by-shipping-documents")
  
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-xl font-bold mb-6">Document Process</h2>
      <p className="mb-4 text-gray-600">
        How would you like to send documents to us for further process?
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Radio Group */}
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
                        By Uploading documents
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

          {/* Info Text */}
          {form.watch("documentMethod") === "upload" && (
            <p className="text-gray-600">
              To Upload please log in and upload required documents to complete your process.
            </p>
          )}

          {/* Log in Button */}
          <Button type="submit" className="bg-blue-700 hover:bg-blue-800">
            Log in as a Customer
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
