import BannerLayout from '@/components/Banner/BannerLayout'
import PlanCard, { VisaPlan } from '@/components/Cards/PlanCard'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection';
import FAQSection from '@/components/FAQSection';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import TestimonialSlider from '@/components/TestimonialSlider ';
import React from 'react'

const testimonials = [
    {
        name: "Devon Lane",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        text: "Excellent service for OCI application. Their team is responsive, and the portal makes everything easy and secure.",
    },
    {
        name: "Kathryn Murphy",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        text: "The process was super smooth and fast. I applied for my US tourist visa, uploaded my documents, and tracked everything online. Highly recommend Quartus!",
    },
    {
        name: "Annette Black",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        text: "Needed my documents apostilled quickly—Quartus handled it end-to-end with real-time updates. Very reliable.",
    },
    {
        name: "Annette Black",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        text: "Needed my documents apostilled quickly—Quartus handled it end-to-end with real-time updates. Very reliable.",
    },
];

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

const faqData = [
    {
        question: "Can I apply for a passport online through Quartus?",
        answer:
            "Yes! We help you complete your application digitally and guide you through the submission process, including document uploads and form preparation.",
    },
    {
        question: "What documents are required for a new passport?",
        answer: "You will typically need proof of identity, proof of citizenship, and passport-sized photos.",
    },
    {
        question: "What if my passport is damaged or unreadable?",
        answer: "You may need to apply for a replacement with additional documentation.",
    },
    {
        question: "Do I need to send my original passport for renewal or updates?",
        answer: "Yes, original passports are generally required during renewal.",
    },
    {
        question: "How long does passport processing take?",
        answer: "Processing times vary by country but usually take between 2 to 8 weeks.",
    },
];


const page = () => {
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
                    {visaPlans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} />
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
                <TestimonialSlider testimonials={testimonials} />
            </div>

            <FAQSection items={faqData} />
        </>
    )
}

export default page