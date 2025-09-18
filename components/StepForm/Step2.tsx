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
import { useCreateApplicationMutation } from "@/services/applicationApi";

type Props = {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
};

export default function Step2({ onNext, onBack }: Props) {
  const [createApplication, { data, isLoading, isSuccess, isError, error }] =
    useCreateApplicationMutation();


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
    // onNext(data);
    const payload = {
      applications: [
        {
          firstName: "Amit",
          lastName: "Sharma",
          email: "amit.sharma@example.com",
          countryCode: "+91",
          phone: "9876543210",
          status: "Draft",
          departureDate: "2025-09-20T10:00:00.000Z",
          physicalAddress: {
            addressLine1: "123 MG Road",
            addressLine2: "Apt 45",
            city: "Bengaluru",
            state: "Karnataka",
            zipCode: "560001",
            country: "India",
          },
          currentLegalAddress: {
            addressLine1: "45 Residency Road",
            city: "Bengaluru",
            state: "Karnataka",
            zipCode: "560025",
            country: "India",
          },
          platformServices: [
            {
              platformServiceId: "66f16c778cf547a24f9e1ab1",
              platformServiceCategoryId: "66f16c778cf547a24f9e1ab2",
              platformServiceCategoryPackageId: "66f16c778cf547a24f9e1ab3",
            },
          ],
          serviceSpecificData: {
            serviceType: "CourierDelivery",
            senderAddress: "123 MG Road, Bengaluru",
            stateSender: "Karnataka",
            recipientName: "Ravi Kumar",
            recipientAddress: "7th Main Road, Hyderabad",
            stateRecipient: "Telangana",
            deliveryType: "Express",
            preferredCourierCompany: "DHL",
            phoneSender: "9876543210",
            citySender: "Bengaluru",
            countrySender: "India",
            phoneRecipient: "9988776655",
            cityRecipient: "Hyderabad",
            countryRecipient: "India",
            noOfPagesOrEnvelopes: 10,
            trackingNumber: "DHL123456789",
          },
        },
      ],
    };

    createApplication(payload);
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
