"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import Button from '@/components/Buttons/Button'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection'
import FAQSection from '@/components/FAQSection'
import TestimonialSlider from '@/components/TestimonialSlider '
import WhyChoose from '@/components/WhyChoose/WhyChoose'
import { useParams } from 'next/navigation'
import React from 'react'

const Details = () => {
    const params = useParams();
    let slug = "";

    if (params.slug) {
        // If it's an array (catch-all), join with "/"
        if (Array.isArray(params.slug)) {
            slug = decodeURIComponent(params.slug.join("/"));
        } else {
            slug = decodeURIComponent(params.slug);
        }
    }
    return (
        <div>

            <BannerLayout bg="/service.jpg">
                <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4 capitalize">
                    {slug}
                </h4>
                <Button
                    iconPosition="right"
                    link={`/other-services/checkout?type=${params.slug}`}
                    name={"Book Now"}
                    icon={
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12.5" r="12" fill="#D31021" />
                            <path d="M7.33325 12.5H16.6666M16.6666 12.5L12.6666 8.5M16.6666 12.5L12.6666 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                />
            </BannerLayout>
            <WhyChoose />
            <CommitmentSection />
            <FAQSection />
            <TestimonialSlider />
        </div>
    )
}

export default Details