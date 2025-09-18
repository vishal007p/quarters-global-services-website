import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import Image from 'next/image';
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

export const WhyChoose = () => {
  return (
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
              <Image
                width={150}
                height={150}
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
  )
}

export default WhyChoose