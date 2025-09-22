"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FileEdit } from "lucide-react";
import { step1Schema, Step1Data } from "@/lib/validationSchemas";
import { useCreateApplicationMutation } from "@/services/applicationApi";
import { clearPlatformServices, getPlatformServices } from "@/lib/platformServiceStorage";
import { useDispatch } from "react-redux";
import { setFormData } from "@/store/slices/applicationSlice";
import { store } from "@/store/store";

// --- Types for API ---
interface Address {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

interface Application {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    departureDate?: string;
    physicalAddress?: Address;
    currentLegalAddress?: Address;
    platformServices?: any[];
}

// --- Map API response to form values ---
const mapApiToForm = (app: Application): Step1Data => ({
    firstName: app.firstName || "",
    lastName: app.lastName || "",
    email: app.email || "",
    phone: app.phone || "",
    company: app.company || "",
    departureDate: app.departureDate?.split("T")[0] || "",
    physicalAddress: {
        addressLine1: app.physicalAddress?.addressLine1 || "",
        addressLine2: app.physicalAddress?.addressLine2 || "",
        city: app.physicalAddress?.city || "",
        state: app.physicalAddress?.state || "",
        zipCode: app.physicalAddress?.zipCode || "",
        country: app.physicalAddress?.country || "",
    },
    currentLegalAddress: {
        addressLine1: app.currentLegalAddress?.addressLine1 || "",
        addressLine2: app.currentLegalAddress?.addressLine2 || "",
        city: app.currentLegalAddress?.city || "",
        state: app.currentLegalAddress?.state || "",
        zipCode: app.currentLegalAddress?.zipCode || "",
        country: app.currentLegalAddress?.country || "",
    },

});

type Props = {
    onNext: (data: Step1Data) => void;
};

export default function Step1({ onNext }: Props) {
    const [createApplication, { data, isLoading }] = useCreateApplicationMutation();
    const dispatch = useDispatch();
    const form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            departureDate: "",
            physicalAddress: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
            },
            currentLegalAddress: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
            },
        },
    });

    // Prefill form when API response arrives
    useEffect(() => {
        if (data?.applications?.[0]) {
            form.reset(mapApiToForm(data.applications[0]));
        }
    }, [data, form]);

    // Prefill form from local storage (previous step)
    useEffect(() => {
        const savedStep = localStorage.getItem("step1Data");
        if (savedStep) {
            form.reset(JSON.parse(savedStep));
        }
    }, [form]);

    const onSubmit = async (values: Step1Data) => {
        try {
            const platformServices = getPlatformServices() || [];

            // Split phone input if it includes country code
            let countryCode = "+1"; // default fallback
            let phone = values.phone || "";

            if (phone.startsWith("+")) {
                const parts = phone.split(" ");
                if (parts.length === 2) {
                    countryCode = parts[0];
                    phone = parts[1];
                } else {
                    // If no space, take first 3 characters as country code (adjust as needed)
                    countryCode = phone.slice(0, 3);
                    phone = phone.slice(3);
                }
            }

            const payload = {
                applications: [
                    {
                        ...values,
                        phone,
                        countryCode,
                        platformServices,
                        status: "Draft",
                        "serviceFields": {
                            "serviceType": "CourierDelivery",
                            "senderAddress": "123 Main St, New York",
                            "stateSender": "NY",
                            "recipientName": "Alice Smith",
                            "recipientAddress": "789 Pine St, Los Angeles",
                            "stateRecipient": "CA",
                            "deliveryType": "Express",
                            "phoneSender": "1234567890",
                            "citySender": "New York",
                            "countrySender": "USA",
                            "phoneRecipient": "9876543210",
                            "cityRecipient": "Los Angeles",
                            "countryRecipient": "USA",
                            "noOfPagesOrEnvelopes": 5
                        }
                    },
                ],
            };

            // Get the current active application ID from Redux
            const activeId = store.getState().application.activeId;

            if (activeId) {
                dispatch(
                    setFormData({
                        id: activeId,
                        form: payload, // save payload in Redux
                    })
                );
            } else {
                console.warn("No active application ID found");
            }

            // @ts-expect-error: API unwrap typing mismatch with RTK Query
            const response = await createApplication(payload).unwrap();

            if (response?.status && response.data?.redirectURL) {
                clearPlatformServices();
                window.location.href = response.data.redirectURL;
            } else {
                console.error("Application created but no redirect URL returned");
            }
        } catch (error) {
            console.error("Error creating application:", error);
        }

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
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <FileEdit className="w-4 h-4" /> Edit
                    </Button>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Your Information</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
                                    <Input placeholder="+91 9876543210" {...field} />
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
                                    <Input placeholder="you@example.com" {...field} />
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
                                    <Input placeholder="ABC Corp." {...field} />
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

                    {/* --- Physical Address --- */}
                    <h4 className="font-semibold mt-4">Physical Address</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="physicalAddress.addressLine1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="123 Main St" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.addressLine2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 2</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Apt 4B" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="New York" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="NY" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="10001" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="USA" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* --- Legal Address --- */}
                    <h4 className="font-semibold mt-4">Current Legal Address</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.addressLine1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="456 Elm St" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.addressLine2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 2</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Brooklyn" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="NY" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="11201" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="USA" />
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
