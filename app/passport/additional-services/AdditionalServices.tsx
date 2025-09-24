"use client"
import { Addon } from '@/app/visa/additional-services/AdditionalServices'
import BannerLayout from '@/components/Banner/BannerLayout'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import AdditionalServiceSkeleton from '@/components/Skeletons/AdditionalServiceSkeleton'
import TestimonialSlider from '@/components/TestimonialSlider '
import { Checkbox } from '@/components/ui/checkbox'
import { savePlatformServiceStep } from '@/lib/platformServiceStorage'
import { useGetPlatformServiceCategoryPackageAddonQuery } from '@/services/platformServiceAddonApi'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const AdditionalServices = () => {

    const [selected, setSelected] = useState<string[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    const country = searchParams.get("toCountrySlug") || "";
    const packageSlug = searchParams.get("slug") || ""; // ← this is the actual package slug

    const { data,isLoading } = useGetPlatformServiceCategoryPackageAddonQuery({
        platformServiceCategoryPackageSlug: packageSlug, // ← use slug param
        toCountrySlug: country, // ← must not be empty
    });
    const additional = data?.data?.data

    const toggleSelection = (id: string) => {
        setSelected((prev) => {
            let updated: string[];

            if (prev.includes(id)) {
                // Deselect
                updated = prev.filter((item) => item !== id);
            } else {
                // Select
                updated = [...prev, id];
            }

            // Save updated addons to localStorage
            savePlatformServiceStep({
                platformServiceCategoryPackageAddonsId: updated,
            });

            return updated;
        });
    };


    const handleContinue = () => {
        router.push(`/checkout`);
    };
    return (
        <>
            <BannerLayout bg='/home.png' >
                <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
                    Fast, Hassle-Free  Visa Services
                </h4>
                <h1 className="text-4xl font-bold mb-4">
                    We help U.S. citizens apply for tourist, business, student, and<br />
                    work visas—accurately, securely, and on time.
                </h1>
            </BannerLayout>


            <div className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Select Services</h2>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                    {
                        isLoading ? <>
                            <AdditionalServiceSkeleton />
                            <AdditionalServiceSkeleton />
                            <AdditionalServiceSkeleton />
                        </> : <>
                            {additional?.map((service: Addon) => (
                                <div
                                    key={service._id}
                                    className={`border p-5 rounded-lg shadow-sm transition-all duration-300 ${selected.includes(String(service._id))} ? "border-blue-600 bg-blue-50"
                                : "border-gray-300 bg-white"
                                }`}
                                >
                                    <label className="flex items-start gap-3 cursor-pointer">

                                        <div>
                                            <Checkbox
                                                checked={selected.includes(String(service._id))}
                                                onCheckedChange={() => toggleSelection(String(service._id))}
                                                className="w-5 h-5"
                                            />
                                            <h3 className="font-semibold text-lg mb-1 mt-2">
                                                {service.name}
                                            </h3>
                                            <p className="text-sm text-gray-700 mb-2">
                                                {service.description}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-1">
                                                <strong>Timeline:</strong> {service.timeline}
                                            </p>
                                            <p className="text-sm font-semibold">
                                                {service.price} {service.currency}
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </>
                    }
                </div>

                <div className="mt-8 text-center">
                    <button onClick={handleContinue}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                        Continue
                    </button>
                </div>
            </div>

            <CommitmentSection />


            <div className="max-w-7xl mx-auto px-10 py-12  ">
                <SectionTitle
                    subtitle="Our Testimonials"
                    title="Real Stories. Real Success."
                    highlight="Quartus"
                    align="center"
                />
                <TestimonialSlider />
            </div>
        </>
    )
}

export default AdditionalServices