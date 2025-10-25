"use client";
import BannerLayout from "@/components/Banner/BannerLayout";
import PlanCard, { VisaPlan } from "@/components/Cards/PlanCard";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import FAQSection from "@/components/FAQSection";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import PlanCardSkeleton from "@/components/Skeletons/PlanCardSkeletons";
import StepFlow from "@/components/StepFlow";
import TestimonialSlider from "@/components/TestimonialSlider ";
import { useGetPlatformServiceCategoryPackagesQuery } from "@/services/platformCategoryPackageApi";
import { useSearchParams } from "next/navigation";
import React from "react";

const PlanSelection = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("toCountrySlug") || "";
  const platformServiceCategorySlug =
    searchParams.get("Slug") || "";
  const { data, error, isLoading } = useGetPlatformServiceCategoryPackagesQuery(
    {
      platformServiceCategorySlug: platformServiceCategorySlug,
      toCountrySlug: country,
    }
  );
  const packages = data?.data?.data;
  console.log(packages,"sdss")
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <BannerLayout bg="/services/visa.png">
        {/* Overlay Heading */}
        <h4
          className="bg-black/40 py-2 px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] 
               m-auto rounded-lg font-bold mb-4 text-center text-white 
               text-[clamp(1rem,1.8vw,2rem)] capitalize"
        >
          Fast, Hassle-Free {platformServiceCategorySlug} Services
        </h4>

        {/* Main Heading */}
        <h1
          className="font-bold mb-6 text-center text-white 
               text-[clamp(1.5rem,2.5vw,3rem)] leading-snug capitalize"
        >
          We help U.S. citizens apply for tourist, business, student, and
          <br className="hidden sm:inline" />
          work visas—accurately, securely, and on time.
        </h1>
      </BannerLayout>

      <div className="max-w-6xl mx-auto my-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {
            isLoading ? <>
              <PlanCardSkeleton />
              <PlanCardSkeleton />
              <PlanCardSkeleton />
            </> : <>
              {packages.map((plan: VisaPlan, index: number) => (
                <div
                  key={index}
                  className={`${index % 2 === 1 ? "mt-4" : "mt-0"}`} // Apply 16px margin-top to odd-indexed cards
                >
                  <PlanCard plan={plan} type="visa" />
                </div>
              ))}</>
          }
        </div>
      </div>
      <CommitmentSection />
      <StepFlow/>
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

export default PlanSelection;
