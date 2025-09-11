"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import VisaServiceCard from '@/components/Cards/VisaServiceCard'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection';
import FAQSection from '@/components/FAQSection';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import TestimonialSlider from '@/components/TestimonialSlider ';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const visaServices = [
    {
        title: "New Passport Application",
        description: "For first-time applicants or children under 16",
        iconColor: "#96C6FF",
        icon: (
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#96C6FF" />
                {/* Add the inner icon paths here */}
            </svg>
        ),
        link: "#",
    },
    {
        title: "Passport Renewal",
        description: "For expired or expiring passports (adult renewals)",
        iconColor: "#FFB6B6",
        icon: (
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#FFB6B6" />
                {/* Add the inner icon paths here */}
            </svg>
        ),
        link: "#",
    },
    {
        title: "Lost Passport",
        description: "Secure replacement with identity safeguards",
        iconColor: "#96C6FF",
        icon: (
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#96C6FF" />
                {/* Add the inner icon paths here */}
            </svg>
        ),
        link: "#",
    },
    {
        title: "Child Passport",
        description: "Expert handling for minors under 16",
        iconColor: "#FFB6B6",
        icon: (
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#FFB6B6" />
                {/* Add the inner icon paths here */}
            </svg>
        ),
        link: "#",
    },
    {
        title: "Second Passport",
        description: "Hassle-free application or reissue process",
        iconColor: "#FFB6B6",
        icon: (
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#FFB6B6" />
                {/* Add the inner icon paths here */}
            </svg>
        ),
        link: "#",
    },
    {
        title: "Name Change",
        description: "Make your documents valid internationally",
        iconColor: "#96C6FF",
        icon: (
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#96C6FF" />
                {/* Add the inner icon paths here */}
            </svg>
        ),
        link: "#",
    },
    {
        title: "Damaged Passport",
        description: "Make your documents valid internationally",
        iconColor: "#FFB6B6",
        icon: (
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#FFB6B6" />
                {/* Add the inner icon paths here */}
            </svg>
        ),
        link: "#",
    },
    {
        title: "Stolen Passport",
        description: "Make your documents valid internationally",
        iconColor: "#96C6FF",
        icon: (
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#96C6FF" />
                {/* Add the inner icon paths here */}
            </svg>
        ),
        link: "#",
    },
];

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


const features = [
    {
        title: 'End-to-End Digital Process',
        description:
            'Skip paperwork by processing your documents in a hassle-free, secure, and intuitive environment.',
        image: '/images/feature1.jpg',
    },
    {
        title: 'Real-Time Application Tracking',
        description:
            'Stay informed at every stage. Get real-time updates as your application moves forward.',
        image: '/images/feature2.jpg',
    },
    {
        title: 'Expert Guidance & Support',
        description:
            'Access professional advisors for questions and clarifications — timely, informed, and efficient support.',
        image: '/images/feature3.jpg',
    },
    {
        title: 'Data Security You Can Trust',
        description:
            'We use bank-level encryption to protect your personal data and document uploads.',
        image: '/images/feature4.jpg',
    },
    {
        title: 'Seamless Access: 20+ Countries',
        description:
            'Apply for services across 20+ countries through one single portal, no matter where you are.',
        image: '/images/feature5.jpg',
    },
    {
        title: 'One Portal. All Services.',
        description:
            'Apply, upload, track, and get support — all through one central dashboard.',
        image: '/images/feature6.jpg',
    },
];

const page = () => {
    const searchParams = useSearchParams();
    const citizenship = searchParams.get("citizenship") || "U.S."; // fallback
    return (
        <>
            <BannerLayout videoSrc="/homeBg.mp4">
                <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
                    Fast, Secure {citizenship} Passport Services
                </h4>
                <h1 className="text-4xl font-bold mb-4">
                    We Handle Everything
                </h1>
            </BannerLayout>

            <section className="py-12 px-4 lg:px-28  ">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-center">
                    {/* Left: Text and Image */}
                    {visaServices.map((service, index) => (
                        <VisaServiceCard
                            key={index}
                            icon={<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="74" height="74" rx="16" fill="#96C6FF" />
                                <rect x="23" y="20" width="28" height="34" rx="4" fill="white" />
                                <path d="M43.3253 42.91H30.6749C30.4362 42.91 30.2073 43.0049 30.0385 43.1736C29.8697 43.3424 29.7749 43.5713 29.7749 43.81C29.7749 44.0487 29.8697 44.2776 30.0385 44.4464C30.2073 44.6152 30.4362 44.71 30.6749 44.71H43.3253C43.564 44.71 43.7929 44.6152 43.9617 44.4464C44.1305 44.2776 44.2253 44.0487 44.2253 43.81C44.2253 43.5713 44.1305 43.3424 43.9617 43.1736C43.7929 43.0049 43.564 42.91 43.3253 42.91Z" fill="#022146" />
                                <path d="M41.0418 47.4844H32.9586C32.7199 47.4844 32.491 47.5792 32.3222 47.748C32.1534 47.9168 32.0586 48.1457 32.0586 48.3844C32.0586 48.6231 32.1534 48.852 32.3222 49.0208C32.491 49.1896 32.7199 49.2844 32.9586 49.2844H41.0418C41.2805 49.2844 41.5094 49.1896 41.6782 49.0208C41.847 48.852 41.9418 48.6231 41.9418 48.3844C41.9418 48.1457 41.847 47.9168 41.6782 47.748C41.5094 47.5792 41.2805 47.4844 41.0418 47.4844Z" fill="#022146" />
                                <path d="M37.0002 24.7156C35.4572 24.7156 33.949 25.1732 32.6661 26.0305C31.3833 26.8879 30.3836 28.1064 29.7934 29.532C29.2032 30.9576 29.0491 32.5263 29.3505 34.0395C29.652 35.5527 30.3954 36.9425 31.4869 38.0331C32.5783 39.1237 33.9687 39.8661 35.4822 40.1664C36.9956 40.4667 38.5641 40.3114 39.9893 39.7201C41.4144 39.1288 42.6322 38.1281 43.4886 36.8447C44.3449 35.5612 44.8014 34.0525 44.8002 32.5096C44.7986 30.4419 43.9761 28.4595 42.5135 26.998C41.0509 25.5365 39.0678 24.7156 37.0002 24.7156ZM42.9042 31.6096H40.3278C40.151 29.935 39.6449 28.3119 38.8386 26.8336C39.8922 27.1749 40.8303 27.8021 41.5482 28.6455C42.2661 29.4888 42.7355 30.515 42.9042 31.6096ZM35.4822 33.4096H38.5182C38.3154 34.9535 37.7988 36.4396 37.0002 37.7764C36.2016 36.4396 35.685 34.9535 35.4822 33.4096ZM35.4822 31.6096C35.685 30.0657 36.2016 28.5796 37.0002 27.2428C37.7988 28.5796 38.3154 30.0657 38.5182 31.6096H35.4822ZM35.163 26.8336C34.3563 28.3118 33.8498 29.9349 33.6726 31.6096H31.0962C31.2648 30.5148 31.7344 29.4884 32.4526 28.6451C33.1707 27.8017 34.1091 27.1745 35.163 26.8336ZM31.0962 33.4096H33.6726C33.8498 35.0842 34.3563 36.7074 35.163 38.1856C34.1091 37.8446 33.1707 37.2174 32.4526 36.3741C31.7344 35.5307 31.2648 34.5043 31.0962 33.4096ZM38.8386 38.1856C39.6449 36.7073 40.151 35.0842 40.3278 33.4096H42.9042C42.7355 34.5042 42.2661 35.5304 41.5482 36.3737C40.8303 37.217 39.8922 37.8443 38.8386 38.1856Z" fill="#D31021" />
                                <path d="M51.208 49V25C51.2061 23.4889 50.6049 22.0402 49.5364 20.9716C48.4679 19.9031 47.0191 19.302 45.508 19.3H28.492C26.9808 19.302 25.5321 19.9031 24.4636 20.9716C23.395 22.0402 22.7939 23.4889 22.792 25V49C22.7939 50.5112 23.395 51.9599 24.4636 53.0285C25.5321 54.097 26.9808 54.6981 28.492 54.7001H45.508C47.0191 54.6981 48.4679 54.097 49.5364 53.0285C50.6049 51.9599 51.2061 50.5112 51.208 49ZM49.408 49C49.4067 50.034 48.9954 51.0252 48.2643 51.7564C47.5332 52.4875 46.5419 52.8988 45.508 52.9001H28.492C27.458 52.8988 26.4668 52.4875 25.7357 51.7564C25.0046 51.0252 24.5933 50.034 24.592 49V25C24.5933 23.9661 25.0046 22.9749 25.7357 22.2437C26.4668 21.5126 27.458 21.1013 28.492 21.1H45.508C46.5419 21.1013 47.5332 21.5126 48.2643 22.2437C48.9954 22.9749 49.4067 23.9661 49.408 25V49Z" fill="#022146" />
                            </svg>
                            }
                            title={service.title}
                            description={service.description}
                        />
                    ))}

                </div>
            </section>

            <section className="bg-[linear-gradient(180deg,_#DEEBFF_0%,_#FFE3E3_100%)]  p-20 flex items-center flex-col justify-center">
                <SectionTitle
                    subtitle="Our services"
                    title="Why Choose Quartus Global Service"
                    highlight="Quartus"
                    align="center"
                />

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg"
                            >
                                <img
                                    src={"/home.png"}
                                    alt={feature.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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