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
      <BannerLayout bg="/e-visa.jpg">
        <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
          Fast, Secure & Hassle-Free e-Visa Services        </h4>
        <p>Apply for your visa online without submitting your passport—quick, safe, <br /> and entirely digital.</p>

        <DropdownForm setActiveTab={setActiveTab} activeTab={activeTab} />
      </BannerLayout>
      <WhyChoose />
      <CommitmentSection />
      <TestimonialSlider />
    </div>
  )
}
export default Page