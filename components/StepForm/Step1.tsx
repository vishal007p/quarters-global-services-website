"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import EmailVerifyDialog from "./EmailVerifyDialog";

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


export default function Step1() {
    const [createApplication, { data, isLoading }] =
        useCreateApplicationMutation();
    const dispatch = useDispatch();
    const router = useRouter()
    const [applications, setApplications] = useState<Application[]>([]);
    console.log(applications, "applications")
    const [activeIndex, setActiveIndex] = useState(0);

    const form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: mapApiToForm({}),
    });


    // --- Prefill from API ---
    useEffect(() => {
        if (data?.applications?.length) {
            setApplications(data.applications);
            form.reset(mapApiToForm(data.applications[0]));
            setActiveIndex(0);
        }
    }, [data, form]);

    // --- Prefill from localStorage ---
    useEffect(() => {
        const saved = localStorage.getItem("applications");

        if (!saved) return;

        try {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed.applications)) {
                // ✅ Keep only apps where platformServiceCategoryId is a non-empty string
                const validApps = parsed.applications.filter(
                    (app: any) =>
                        typeof app?.platformServiceCategoryId === "string" &&
                        app.platformServiceCategoryId.trim() !== ""
                );

                if (validApps.length > 0) {
                    setApplications(validApps);

                    const firstFormData = validApps[0]?.form?.applications?.[0] || {};
                    form.reset(mapApiToForm(firstFormData));
                } else {
                    setApplications([]);
                    form.reset(mapApiToForm({}));
                }
            }
        } catch (e) {
            console.error("Failed to parse applications from localStorage", e);
            setApplications([]);
            form.reset(mapApiToForm({}));
        }
    }, [form]);

    const onSubmit = async (values: Step1Data) => {
        try {
            const platformServices = getPlatformServices() || [];

            let countryCode = "+1";
            let phone = values.phone || "";

            // 📱 Normalize phone number and country code
            if (phone.startsWith("+")) {
                const parts = phone.split(" ");
                if (parts.length === 2) {
                    countryCode = parts[0];
                    phone = parts[1];
                } else {
                    countryCode = phone.slice(0, 3);
                    phone = phone.slice(3);
                }
            }

            // ✅ Build payload in the new format
            const payload = {
                applications: [
                    {
                        ...values,
                        phone,
                        countryCode,
                        platformServices: platformServices.map((s:any) => ({
                            platformServiceId: s.platformServiceId || s.id,
                            platformServiceCategoryId: s.platformServiceCategoryId,
                            platformServiceCategoryPackageId: s.platformServiceCategoryPackageId,
                            platformServiceCategoryPackageAddonsId:
                                s.platformServiceCategoryPackageAddonsId || s.addons || [],
                        })),
                        status: "Draft",         // must match your backend enum
                        // supportingDocs: [
                        //     {
                        //         name: "passport.pdf",
                        //         type: "application/pdf",
                        //         size: 204800,
                        //         url: "https://example.com/docs/passport.pdf",
                        //     },
                        // ],
                        serviceFields: {
                            someServiceSpecificField: "example value",
                        },
                    },
                ],
            };

            // 🔄 Save form in redux store (if editing existing app)
            const activeId = store.getState().application.activeId;
            if (activeId) {
                dispatch(
                    setFormData({
                        id: activeId,
                        form: payload,
                    })
                );
            }

            // 🚀 Send to backend
            // @ts-expect-error mismatch RTK
            const response = await createApplication(payload).unwrap();
            console.log(response, "responsess");

            if (response?.status && response.data?.redirectURL) {
                clearPlatformServices();
                localStorage.removeItem("applications");      
                window.location.href = response.data.redirectURL;
            } else {
                toast.error("Application created but no redirect URL returned");
            }
        } catch (error: any) {
            console.error("Error creating application:", error);

            if (error?.data?.message) {
                toast.error(error.data.message);
            } else {
                toast.error("Something went wrong while creating application");
            }
        }
    };

// if(true){

//     return  <EmailVerifyDialog/>
// }



    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            {/* Header */}
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 px-2 sm:px-4 md:px-2">
                    {applications.map((app: any, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setActiveIndex(index);
                                // Each card has its own form.applications[0]

                                const formData = app.form?.applications?.[activeIndex];
                            

                                if (formData) {
                                    form.reset(mapApiToForm(formData));
                                }
                            }}
                            className={`min-w-[220px] sm:min-w-[250px] md:min-w-[280px] rounded-2xl shadow-lg p-4 sm:p-5 flex-shrink-0 cursor-pointer transition-transform duration-300 
              ${activeIndex === index
                                    ? "bg-blue-800 scale-105"
                                    : "bg-[#00408D] hover:scale-105"
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                                    {app.firstName || "New"} {app.type || "Traveller"} <br />
                                    <span className="text-xs sm:text-sm font-medium text-white/80">
                                        {app.email || "No email"}
                                    </span>
                                </h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 sm:gap-2 text-black border-black hover:bg-white hover:text-[#00408D] transition"
                                >
                                    <FileEdit className="w-4 h-4" /> Edit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            <h3 className="text-xl font-semibold mb-4 mt-4">Your Information</h3>

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

                        <Button type="button" variant="outline" onClick={() => router.push("/")} >
                            Add Another Traveller
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
