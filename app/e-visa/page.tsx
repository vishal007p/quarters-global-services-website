"use client"

import BannerLayout from '@/components/Banner/BannerLayout'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection'
import DropdownForm from '@/components/DropdownForm/DropdownForm'
import TestimonialSlider from '@/components/TestimonialSlider '
import WhyChoose from '@/components/WhyChoose/WhyChoose'
import React, { useState } from 'react'

const Page = () => {
  const [activeTab, setActiveTab] = useState<"visa" | "passport" | "apostille">("visa");
  return (
    <div>
      <BannerLayout bg="/services/e-visa.png">
        {/* Overlay Heading */}
        <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center text-[clamp(1.5rem,2.5vw,2.75rem)] leading-snug">
          Fast, Secure & Hassle-Free e-Visa Services
        </h4>

        {/* Paragraph */}
        <p className="text-center text-gray-900 text-[clamp(0.9rem,2vw,1.25rem)] sm:text-[clamp(1rem,2vw,1.25rem)] md:text-[clamp(1.05rem,2vw,1.25rem)] mb-6 leading-relaxed">
          Apply for your visa online without submitting your passport—quick, safe, <br className="hidden sm:inline" />
          and entirely digital.
        </p>

        {/* Dropdown Form */}
        <div className="px-4 sm:px-6 md:px-8">
          <DropdownForm setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
      </BannerLayout>

      <WhyChoose />
      <CommitmentSection />
      <TestimonialSlider />
    </div>
  )
}
export default Page