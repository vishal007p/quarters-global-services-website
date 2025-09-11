
"use client";


import BannerLayout from "@/components/Banner/BannerLayout";
import ServiceSection from "@/components/ServiceSection";
import { useState, useEffect } from "react";



// Array of service data
const services = [
    {
        title: "Courier & Document Delivery",
        description:
            "We provide secure and timely courier services for your documents and packages. Track your shipments easily and ensure prompt delivery with our reliable service.",
        buttonText: "Learn More",
        imageSrc: "/images/courier.jpg",
    },
    {
        title: "Vehicle Booking",
        description:
            "Book vehicles for personal or corporate travel. Our fleet includes a range of cars and vans for short or long-term rentals, ensuring comfort and safety.",
        buttonText: "Book Now",
        imageSrc: "/images/vehicle.jpg",
    },
    {
        title: "Flight Charter Services",
        description:
            "Experience personalized air travel with our flight charter services. Enjoy flexibility, convenience, and premium service tailored to your schedule.",
        buttonText: "Book Flight",
        imageSrc: "/images/flight.jpg",
    },
    {
        title: "Concert, Wedding, Private Tour, Corporate Ground Transport",
        description:
            "We provide luxury ground transport for events, weddings, corporate tours, and private travel. Arrive in style and comfort with our professional drivers.",
        buttonText: "Learn More",
        imageSrc: "/images/ground-transport.jpg",
    },
    {
        title: "Travel Insurance",
        description:
            "Protect your trips with our comprehensive travel insurance plans. Enjoy peace of mind knowing you're covered for medical emergencies, cancellations, and lost luggage.",
        buttonText: "Get Insured",
        imageSrc: "/images/travel-insurance.jpg",
    },
    {
        title: "Consultancy Service",
        description:
            "Professional consultancy services to help you navigate complex processes. Receive expert advice and solutions tailored to your business or personal needs.",
        buttonText: "Consult Now",
        imageSrc: "/images/consultancy.jpg",
    },
    {
        title: "IDP (International Driving License)",
        description:
            "Obtain your International Driving Permit quickly and easily. Drive legally and safely across multiple countries with our hassle-free process.",
        buttonText: "Apply Now",
        imageSrc: "/images/idp.jpg",
    },
    {
        title: "Indian PAN Card",
        description:
            "Apply for your PAN card with ease. Essential for tax filing, banking, and financial transactions in India.",
        buttonText: "Apply Now",
        imageSrc: "/images/pan-card.jpg",
    },
    {
        title: "Fast Track Immigration (FIT-ITP)",
        description:
            "Skip long queues with our fast track immigration services. Efficient, reliable, and designed to save you time.",
        buttonText: "Learn More",
        imageSrc: "/images/fast-track.jpg",
    },
];

const ServicesPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <BannerLayout bg="/service.jpg">
                <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
                    Other Services
                </h4>
            </BannerLayout>

            {/* Services List */}
            <div className="py-12 px-4 lg:px-8">
                <div className="max-w-7xl mx-auto">


                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <ServiceSection
                                    title={service.title}
                                    description={service.description}
                                    buttonText={service.buttonText}
                                    imageSrc={"/service.png"}
                                    imagePosition={index % 2 === 0 ? "left" : "right"}
                                />
                                {index < services.length - 1 && <hr className="max-w-7xl mx-auto border-gray-200" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 py-16 px-4 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
                        Contact us today to learn more about our services and how we can help you with your specific needs.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition-colors duration-300">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;