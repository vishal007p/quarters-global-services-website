"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import Button from '@/components/Buttons/Button';
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection';
import FAQSection from '@/components/FAQSection';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import TestimonialSlider from '@/components/TestimonialSlider ';
import React from 'react'

const categories = [
  {
    title: "Personal Documents",
    items: [
      "Birth Certificates",
      "Marriage/Divorce Certificates",
      "FBI Background Checks",
      "Power of Attorney",
      "Affidavits",
    ],
  },
  {
    title: "Academic Documents",
    items: [
      "Diplomas & Degrees",
      "Transcripts",
      "Enrollment Verification",
    ],
  },
  {
    title: "Corporate Documents",
    items: [
      "Articles of Incorporation",
      "Board Resolutions",
      "Contracts & Invoices",
      "Certificates of Good Standing",
    ],
  },
];


const ApostilleAndLegalization = () => {
  return (
    <>
      <BannerLayout bg="/services/apostille.png">
        {/* Overlay Heading */}
        <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center text-[clamp(1.5rem,2.5vw,2.75rem)] leading-snug">
          Fast, Secure Apostille & <br className="hidden sm:inline" />
          Document Legalization Services
        </h4>

        {/* Main Heading */}
        <h1 className="font-bold mb-6 text-center text-[clamp(1.75rem,3.5vw,3rem)] sm:text-[clamp(2rem,4vw,3.5rem)] md:text-[clamp(2.25rem,4vw,3.75rem)] leading-snug">
          We legalize your U.S. documents for international use with complete handling—<br className="hidden sm:inline" />
          no stress, no delays.
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center py-6">
          <Button
            iconPosition="right"
            name={"Start Legalization Process"}
            link='/apostille-and-legalization/checkout'
            icon={
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12.5" r="12" fill="#D31021" />
                <path
                  d="M7.33325 12.5H16.6666M16.6666 12.5L12.6666 8.5M16.6666 12.5L12.6666 16.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />


        </div>
      </BannerLayout>


      <section className="py-16 bg-white px-4 sm:px-8 lg:px-16">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
          Documents We Can Apostille for International Use
        </h2>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="bg-blue-900 text-white text-sm font-semibold px-4 py-2 rounded-md inline-block mb-4">
                {cat.title}
              </h3>
              <ul className="space-y-2 text-gray-700">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start">
                    <span className="text-blue-900 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
        <TestimonialSlider />
      </div>


      <FAQSection />

    </>
  )
}
export default ApostilleAndLegalization