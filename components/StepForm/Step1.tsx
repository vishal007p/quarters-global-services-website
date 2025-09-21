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
import { step1Schema, Step1Data } from "@/lib/validationSchemas";
import { FileEdit } from "lucide-react";
import { useCreateApplicationMutation } from "@/services/applicationApi";
import { useEffect } from "react";
import { clearPlatformServices, getPlatformServices } from "@/lib/platformServiceStorage";

// --- Utility to map API response → form fields
const mapApiToForm = (app: any): Step1Data => {
    return {
        firstName: app.firstName || "",
        lastName: app.lastName || "",
        phone: app.phone || "",
        email: app.email || "",
        company: app.company || "",
        departureDate: app.departureDate?.split("T")[0] || "",
        physicalAddress: app.physicalAddress?.addressLine1 || "",
        legalAddress: app.currentLegalAddress?.addressLine1 || "",
        zipCode: app.physicalAddress?.zipCode || "",
        city: app.physicalAddress?.city || "",
        state: app.physicalAddress?.state || "",
    };
};

type Props = {
    onNext: (data: Step1Data) => void;
};

export default function Step1({ onNext }: Props) {
    const [createApplication, { data, isLoading, isSuccess }] =
        useCreateApplicationMutation();

    const form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            company: "",
            departureDate: "",
            physicalAddress: "",
            legalAddress: "",
            zipCode: "",
            city: "",
            state: "",
        },
    });

    // when API response arrives, reset form values
    useEffect(() => {
        if (data?.applications?.[0]) {
            const app = data.applications[0];
            form.reset(mapApiToForm(app));
        }
    }, [data, form]);

    const onSubmit = async (values: Step1Data) => {
        try {
            // Get stored platform services from localStorage
            const platformServices = getPlatformServices();

            // Prepare payload
            const payload = {
                applications: [
                    {
                        ...values,
                        platformServices, // include all stored IDs
                        status: "Draft",
                    },
                ],
            };

            // Call your API
            //@ts-ignore
            const response = await createApplication(payload);
            //@ts-ignore
            if (response?.status && response.data?.redirectURL) {
                // Clear stored platform services if you no longer need them
                clearPlatformServices();

                // Redirect to the URL from API
                window.location.href = response.data.redirectURL;
            } else {
                console.error("Application created but no redirect URL returned");
            }
        } catch (error) {
            console.error("Error creating application:", error);
        }

        // Call next step if you have a wizard
        onNext(values);
    };


    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-[#00408D] rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                        Visa: Business India <br />
                        <span className="text-sm font-medium text-white">
                            (Expedited - 20 Processing Days)
                        </span>
                    </h2>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <FileEdit className="w-4 h-4" />
                        Edit
                    </Button>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Your Information</h3>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-6"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+91 9876543210"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="you@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ABC Corp."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="departureDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Departure Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="physicalAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Physical Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="123 Main Street"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="legalAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Legal Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="456 Legal St."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="New York" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="NY" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Place Order"}
                        </Button>

                        <Button type="button" variant="outline">
                            Add Another Traveller
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
