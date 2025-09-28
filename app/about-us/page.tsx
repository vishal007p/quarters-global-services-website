import BannerLayout from '@/components/Banner/BannerLayout'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div>
      {/* Banner */}
      <BannerLayout bg="/img.jpg">
        <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center text-[clamp(1.5rem,2.5vw,2.75rem)] leading-snug">
          About Us
        </h4>
      </BannerLayout>

      {/* About Content */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            We are a passionate team dedicated to delivering innovative solutions. 
            Our mission is to combine creativity, technology, and strategy to help 
            businesses grow and succeed in the digital era.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With years of experience across multiple industries, we focus on 
            delivering value through design, development, and customer-centric 
            strategies.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 w-fit">
            Learn More
          </button>
        </div>

        {/* Image / Visual */}
        <div>
          <Image
            src="/img.jpg"
            alt="About illustration"
            className="rounded-2xl shadow-lg"
            width={600}
            height={400}
            priority
          />
        </div>
      </section>
    </div>
  )
}

export default Page
