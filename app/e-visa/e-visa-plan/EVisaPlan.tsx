"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BannerLayout from "@/components/Banner/BannerLayout";
import VisaServiceCard from "@/components/Cards/VisaServiceCard";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import FAQSection from "@/components/FAQSection";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import TestimonialSlider from "@/components/TestimonialSlider ";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import { getPlatformServices, PlatformService, savePlatformServiceStep } from "@/lib/platformServiceStorage";


const eVisaServices = [
  { title: "Tourist E-Visa", description: "Travel with ease for vacations, family visits, and leisure.", link: "/e-visa/plan-section?type=Tourist&id=1" },
  { title: "Business E-Visa", description: "For international meetings, events, and business travel.", link: "/e-visa/plan-section?type=Business&id=2" },
  { title: "Medical E-Visa", description: "Get specialized treatment abroad with our assistance.", link: "/e-visa/plan-section?type=Medical&id=3" },
  { title: "Student E-Visa", description: "Hassle-free application for study programs worldwide.", link: "/e-visa/plan-section?type=Student&id=4" },
  { title: "Transit E-Visa", description: "Quick approvals for short layovers and connecting flights.", link: "/e-visa/plan-section?type=Transit&id=5" },
];

const EVisaPlan = () => {
  const searchParams = useSearchParams();
  const citizenship = searchParams.get("citizenship") || "Indian";

  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [servicesSaved, setServicesSaved] = useState<PlatformService[]>([]);
  console.log(servicesSaved)

  useEffect(() => {
    setServicesSaved(getPlatformServices());
  }, []);

  const toggleSelection = (index: number) => {
    setSelectedServices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleContinue = () => {
    selectedServices.forEach(index => {
      toggleSelection(index)
      savePlatformServiceStep({
        platformServiceId: `service-${index}`,
        platformServiceCategoryId: `category-${index}`,
        platformServiceCategoryPackageId: `package-${index}`,
        platformServiceCategoryPackageAddonsId: [],
      }, true);
    });

  };

  return (
    <>
      <BannerLayout videoSrc="/homeBg.mp4">
        <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
          Fast & Secure {citizenship} E-Visa Services
        </h4>
        <h1 className="text-4xl font-bold mb-4">Travel Without Hassle</h1>
      </BannerLayout>

      {/* E-Visa Services */}
      <section className="py-12 px-4 lg:px-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-center">
          {eVisaServices.map((service, index) => (
            <VisaServiceCard

              key={index}
              id={service.title}
              icon={<div className="w-16 h-16 bg-blue-200 rounded-lg"></div>}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </section>

      <WhyChoose />
      <CommitmentSection />

      <div className="max-w-7xl mx-auto px-10 py-12">
        <SectionTitle subtitle="Our Testimonials" title="Traveler Success Stories" highlight="Quartus" align="center" />
        <TestimonialSlider />
      </div>

      <FAQSection />
    </>
  );
};

export default EVisaPlan;
