"use client";
import BannerLayout from "@/components/Banner/BannerLayout";
import VisaServiceCard from "@/components/Cards/VisaServiceCard";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import DropdownForm from "@/components/DropdownForm/DropdownForm";
import FAQSection from "@/components/FAQSection";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import VisaServiceCardSkeletons from "@/components/Skeletons/VisaServiceCardSkeletons";
import TestimonialSlider from "@/components/TestimonialSlider ";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import { useGetPlatformServiceCategoriesQuery } from "@/services/platformCategoryApi";
import { startApplication } from "@/store/slices/applicationSlice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface services {
  _id: string;
  code: string;
  name: string;
  slug: string;
}

const Visa = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("toCountrySlug") || "united-states";
  const [activeTab, setActiveTab] = useState<"visa" | "passport" | "apostille">(
    "visa"
  );
  const { data, isLoading } = useGetPlatformServiceCategoriesQuery({
    platformServiceSlug: "visa",
    toCountrySlug: country,
  });
  const dispatch = useDispatch();
  const visaService = data?.data?.data;

  useEffect(() => {
    dispatch(startApplication({ type: "visa" }));
  }, [dispatch]);

  return (
    <>
   <BannerLayout bg="/services/visa.png">
  {/* Overlay Heading */}
  <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center 
                 text-[clamp(1rem,1.8vw,2rem)]">
    Fast, Hassle-Free {country} Visa Services
  </h4>

  {/* Main Heading */}
  <h1 className="font-bold mb-6 text-center 
                 text-[clamp(1.5rem,2.5vw,2.75rem)] 
                 sm:text-[clamp(1.75rem,2.5vw,3rem)] 
                 md:text-[clamp(2rem,2.2vw,3.25rem)] 
                 leading-snug">
    We help U.S. citizens apply for tourist, business, student, and 
    <br className="hidden sm:inline" />
    work visas—accurately, securely, and on time.
  </h1>

  {/* Dropdown Form */}
  <div className="px-4 sm:px-6 md:px-8">
    <DropdownForm setActiveTab={setActiveTab} activeTab={activeTab} />
  </div>
</BannerLayout>



      <section className="py-12 px-4 lg:px-28  ">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-center">
          {/* Left: Text and Image */}

          {isLoading ? (
            <>
              <VisaServiceCardSkeletons />
              <VisaServiceCardSkeletons />
              <VisaServiceCardSkeletons />
            </>
          ) : visaService && visaService.length > 0 ? (
            <>
              {visaService.map((service: services, index: number) => (
                <div
                  key={index}
                  className={`transform transition-transform duration-500 ${index % 2 === 0 ? "translate-y-0" : "translate-y-8"
                    }`}
                >
                  <VisaServiceCard
                    id={service._id}
                    link={`/visa/plan-selection?toCountrySlug=${country}&&platformServiceCategorySlug=${service.slug}`}
                    icon={
                      <svg
                        width="74"
                        height="74"
                        viewBox="0 0 74 74"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Your SVG content */}
                      </svg>
                    }
                    title={service.name}
                    description={service.name}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-10 text-gray-500 text-lg">
              No Service Available
            </div>
          )}

        </div>
      </section>

      <WhyChoose />

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
  );
};
export default Visa;
