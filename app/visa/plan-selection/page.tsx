
"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import PlanCard, { VisaPlan } from '@/components/Cards/PlanCard'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection';
import FAQSection from '@/components/FAQSection';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import TestimonialSlider from '@/components/TestimonialSlider ';
import { useGetPlatformServiceCategoryPackagesQuery } from '@/services/platformCategoryPackageApi';
import { useSearchParams } from 'next/navigation';
import React from 'react'

 
const visaPlans: VisaPlan[] = [
    {
        id: 1,
        title: "Standard Processing",
        processingTime: "15-20 Business Days",
        price: "$420.00",
        serviceFee: "No service fee",
    },
    {
        id: 2,
        title: "Priority",
        processingTime: "8-10 Processing Days",
        price: "$620.00",
        serviceFee: "Includes service fee",
        isPopular: true,
        isPriority: true,
    },
    {
        id: 3,
        title: "Express Processing",
        processingTime: "3-5 Business Days",
        price: "$850.00",
        serviceFee: "Includes premium service fee",
    },
];
 

const page = () => {
    const searchParams = useSearchParams();

    const country = searchParams.get("country") || "";
    const planId = searchParams.get("planId") || "";

   
    const { data, error, isLoading } = useGetPlatformServiceCategoryPackagesQuery({
        platformServiceCategoryId: planId,
        page: 1,
        limit: 10,
        country,
    });

    if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Something went wrong</p>;

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {visaPlans.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`${index % 2 === 1 ? 'mt-4' : 'mt-0'}`} // Apply 16px margin-top to odd-indexed cards
                        >
                            <PlanCard plan={plan} />
                        </div>
                    ))}
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
                <TestimonialSlider   />
            </div>

            <FAQSection   />
        </>
    )
}

export default page