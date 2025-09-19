"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import TestimonialSlider from '@/components/TestimonialSlider '
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

 

export const services = [
    {
        id: 1,
        title: "Super Urgent Appointment",
        description: "Expedited Option offered via India Only. Super Urgent Appointment within 1–3 weeks.",
        timeline: "Within 1–3 weeks",
        priceUSD: "$500.00",
        priceLocal: "₹41893.64",
    },
    {
        id: 2,
        title: "Embassy Legalization",
        description: "Exclusive Concierge service for India Only. Includes an appointment for US visa within 2–4 months.",
        timeline: "Within 2–4 months",
        priceUSD: "$600.00",
        priceLocal: "₹48718.84",
    },
    {
        id: 3,
        title: "Global Concierge Service",
        description: "Our bundled Concierge Service. Receive the ultimate visa handling experience.",
        timeline: "-",
        priceUSD: "$370.00",
        priceLocal: "₹30030.00",
    },
    {
        id: 4,
        title: "Photo Printing",
        description: "Have a pair of passport photos printed in our office, mailed to you, or provided digitally.",
        timeline: "Within 1–3 weeks",
        priceUSD: "$15.00",
        priceLocal: "₹1252.23",
    },
    {
        id: 5,
        title: "Digital Photo Service",
        description: "Email your photos to us. We'll format & size them for official use.",
        timeline: "Within 2–4 months",
        priceUSD: "$25.00",
        priceLocal: "₹2153.77",
    },
    {
        id: 6,
        title: "Passport Protection Plan",
        description: "If your passport is lost, stolen, or damaged, we’ll replace the documents and provide assistance.",
        timeline: "-",
        priceUSD: "$40.00",
        priceLocal: "₹3445.95",
    },
];



const Page = () => {

    const [selected, setSelected] = useState<number[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentQuery = Object.fromEntries(searchParams.entries());

    const toggleSelection = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleContinue = () => {
        const updatedQuery = {
            ...currentQuery,
            services: selected.join(','),  // Pass as CSV string
        };

        const queryString = new URLSearchParams(updatedQuery).toString();

        router.push(`/checkout?${queryString}`);
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
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`border p-4 rounded-lg shadow-sm transition-all duration-300 ${selected.includes(service.id)
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300 bg-white"
                                }`}
                        >
                            <label className="flex items-start gap-3 cursor-pointer">

                                <div>
                                    <Checkbox
                                        checked={selected.includes(service.id)}
                                        onCheckedChange={() => toggleSelection(service.id)}
                                        className='w-5 h-5'
                                    />
                                    <h3 className="font-semibold text-lg mb-1 mt-2">{service.title}</h3>
                                    <p className="text-sm text-gray-700 mb-2">{service.description}</p>
                                    <p className="text-sm text-gray-500 mb-1">
                                        <strong>Timeline:</strong> {service.timeline}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {service.priceUSD} <span className="text-gray-500">({service.priceLocal})</span>
                                    </p>
                                </div>
                            </label>
                        </div>
                    ))}
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

export default Page