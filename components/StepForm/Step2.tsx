"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2Data } from "@/lib/validationSchemas";

type Props = {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
};

export default function Step2({ onNext, onBack }: Props) {
  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
      billingAddress: "",
    },
  });

  const onSubmit = (data: Step2Data) => {
    onNext(data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Where should your documents be shipped?</h2>
      <p className="text-gray-700 mb-6">
        An inbound shipping lab 531 Hug 36 Hug is a complimentary part of your Concierge Service for Indian visas. 
        Your completed visa will be returned directly to the residential address listed on your visa application 
        by the Indian Visa Office. The Indian Visa Office's return shipping fee is included in the consular fee.
        Please proceed to the Billing section.
      </p>

      <h3 className="text-xl font-semibold mb-4">Enter Billing Information</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Card Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234 5678 9012 3456" {...field} maxLength={16} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date (MM/YY)</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} maxLength={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} maxLength={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main Street, New York, NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-gray-600 text-sm mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" required className="form-checkbox" /> I acknowledge that I have reviewed and agree with the <a href="#" className="text-blue-600 underline">Terms of Use</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </label>
          </div>

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Place Order
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
}
