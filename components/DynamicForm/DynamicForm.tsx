"use client";

import React from "react";
import { useForm,  Path, DefaultValues } from "react-hook-form";
import { z, ZodObject } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ---------- TYPES ----------
export type FieldType = "text" | "number" | "select" | "email" | "textarea";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[]; // only for select
}

export interface DynamicFormProps<TSchema extends ZodObject<any>> {
  schema: TSchema;
  fields: FieldConfig[];
  onSubmit: (values: z.infer<TSchema>) => void;
}

// ---------- COMPONENT ----------
export function DynamicForm<TSchema extends ZodObject<any>>({
  schema,
  fields,
  onSubmit,
}: DynamicFormProps<TSchema>) {
  type FormValues = z.input<TSchema>;
  type InputValues = z.input<TSchema>;   // raw form values
  type OutputValues = z.output<TSchema>; // parsed values

  const form = useForm<InputValues>({
    resolver: zodResolver(schema) as any, // cast to avoid TS mismatch
    defaultValues: Object.fromEntries(
      fields.map(f => [f.name, ""])
    ) as DefaultValues<InputValues>,
  });


  const handleSubmit = (values: InputValues) => {
    // zodResolver guarantees values are already parsed to OutputValues
    onSubmit(values as unknown as OutputValues);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {fields.map((field) => (
            <FormField<FormValues>  // <-- add generic here
              key={field.name}
              control={form.control}
              name={field.name as unknown as Path<FormValues>}
              render={({ field: f }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-semibold text-gray-700 mb-1">
                    {field.label}
                  </FormLabel>
                  <FormControl>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={f.onChange}
                        value={f.value as string}
                      >
                        <SelectTrigger className="border rounded-lg p-2 w-full">
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "textarea" ? (
                      <Textarea
                        placeholder={field.placeholder}
                        {...f}
                        value={f.value as unknown as string} // ✅ cast value to string
                        className="border rounded-lg p-2 w-full min-h-[80px]"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...f}
                        value={f.value as unknown as string} // ✅ cast value to string
                        className="border rounded-lg p-2 w-full"
                      />
                    )}
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
          ))}

          <div className="col-span-2 flex justify-end mt-6">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
