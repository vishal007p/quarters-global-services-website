"use client";
import BannerLayout from "@/components/Banner/BannerLayout";
import PlanCard, { VisaPlan } from "@/components/Cards/PlanCard";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import FAQSection from "@/components/FAQSection";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import PlanCardSkeleton from "@/components/Skeletons/PlanCardSkeletons";
import TestimonialSlider from "@/components/TestimonialSlider ";
import { useGetPlatformServiceCategoryPackagesQuery } from "@/services/platformCategoryPackageApi";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("toCountrySlug") || "";
  const platformServiceCategorySlug =
    searchParams.get("platformServiceCategorySlug") || "";
  const { data, error, isLoading } = useGetPlatformServiceCategoryPackagesQuery(
    {
      platformServiceCategorySlug: platformServiceCategorySlug,
      toCountrySlug: country,
    }
  );
  const packages = data?.data?.data;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <BannerLayout videoSrc="/homeBg.mp4">
        <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
          Fast, Hassle-Free Visa Services
        </h4>
        <h1 className="text-4xl font-bold mb-4">
          We help OCI CARD citizens apply for tourist, business, student, and
          <br />
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

export default Page;
