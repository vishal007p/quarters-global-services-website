
"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import PlanCard, { VisaPlan } from '@/components/Cards/PlanCard'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection';
import FAQSection from '@/components/FAQSection';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import PlanCardSkeleton from '@/components/Skeletons/PlanCardSkeletons';
import TestimonialSlider from '@/components/TestimonialSlider ';
import { useGetPlatformServiceCategoryPackagesQuery } from '@/services/platformCategoryPackageApi';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const PlanSection = () => {
    const searchParams = useSearchParams();
    const fromCountrySlug = searchParams.get("fromCountrySlug") || "united-states";
    const country = searchParams.get("toCountrySlug") || "";
    const platformServiceCategorySlug = searchParams.get("platformServiceCategorySlug") || "";

    const { data, error, isLoading } = useGetPlatformServiceCategoryPackagesQuery({
        platformServiceCategorySlug: platformServiceCategorySlug,
        toCountrySlug: country,
    });
    const packages = data?.data?.data;

    if (error) return <p>Something went wrong</p>;

    return (
        <>
            <BannerLayout videoSrc="/homeBg.mp4">
                <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
                    Fast, Hassle-Free  Visa Services
                </h4>
                <h1 className="text-4xl font-bold mb-4">
                    We help U.S. citizens apply for tourist, business, student, and<br />
                    work visas—accurately, securely, and on time.
                </h1>
            </BannerLayout>


            <div className="max-w-6xl mx-auto my-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Visa Processing Plans</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {isLoading ? (
                        <>
                            <PlanCardSkeleton />
                            <PlanCardSkeleton />
                            <PlanCardSkeleton />
                        </>
                    ) : packages && packages.length > 0 ? (
                        <>
                            {packages.map((plan: VisaPlan) => (
                                <PlanCard key={plan._id} plan={plan} type="passport" />
                            ))}
                        </>
                    ) : (
                        <div className="col-span-1 md:col-span-3 text-center py-10 text-gray-500 text-lg">
                            No Plans Available
                        </div>
                    )}
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

            <FAQSection />
        </>
    )
}

export default PlanSection