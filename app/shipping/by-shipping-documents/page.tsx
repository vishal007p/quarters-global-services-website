"use client";

import React from "react";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CHECKLISTS } from "@/app/data/checklists";

const formSchema = z.object({
  documents: z.array(z.string()).nonempty("Select at least one document"),
});

type FormValues = z.infer<typeof formSchema>;



interface ChecklistPageProps {
  country: keyof typeof CHECKLISTS;
  service: keyof typeof CHECKLISTS["india"];
  subServiceId: string;
}

const ChecklistPage = ({ country, service, subServiceId }: ChecklistPageProps) => {
  const router = useRouter();
  const serviceData = CHECKLISTS[country]?.[service]?.find(
    (item: any) => item.id === subServiceId
  );


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: [],
    },
  });

  const onSubmit = () => router.push("/shipping/summary");
  if (!serviceData)
    return <p className="text-center text-gray-500">Checklist not found.</p>;
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">{serviceData.title}</h2>

      {/* Document Checklist */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="documents"
            render={() => (
              <FormItem>
                {serviceData.documents.map((doc: any) => (
                  <FormField
                    key={doc}
                    control={form.control}
                    name="documents"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(doc)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, doc])
                                : field.onChange(field.value?.filter((v) => v !== doc));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{doc}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-700 hover:bg-blue-800 mt-4">
            Next
          </Button>
        </form>
      </Form>

      {/* Fees */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Fees</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {serviceData.fees.map((f: any, i: number) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      {/* FAQ */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">FAQ / Notes</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {serviceData.faq.map((f: any, i: number) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChecklistPage;
