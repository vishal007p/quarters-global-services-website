"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection';
import DropdownWrapper from '@/components/DropdownForm/DropdownWrapper'
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import TestimonialSlider from '@/components/TestimonialSlider ';
import { useRouter } from 'nextjs-toploader/app';
import React, { useState } from 'react'

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

const testimonials = [
  {
    name: "Devon Lane",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "Excellent service for OCI application. Their team is responsive, and the portal makes everything easy and secure.",
  },
  {
    name: "Kathryn Murphy",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    text: "The process was super smooth and fast. I applied for my US tourist visa, uploaded my documents, and tracked everything online. Highly recommend Quartus!",
  },
  {
    name: "Annette Black",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "Needed my documents apostilled quickly—Quartus handled it end-to-end with real-time updates. Very reliable.",
  },
  {
    name: "Annette Black",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "Needed my documents apostilled quickly—Quartus handled it end-to-end with real-time updates. Very reliable.",
  },
];

const GoButton = ({ handleGo }: any) => (
  <div className="w-full md:w-auto flex items-center mt-4 md:mt-0">
    <button
      onClick={handleGo}
      className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition"
    >
      Go
    </button>
  </div>
);

const page = () => {

  const citizenships = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "MX", name: "Mexico" },
  ];

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "MX", name: "Mexico" },
  ];


  const router = useRouter()

  const [citizenship, setCitizenship] = useState("");
  const [citizenshipSearch, setCitizenshipSearch] = useState("");

  const [country, setCountry] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [errors, setErrors] = useState({
    citizenship: "",
    country: "",

  });

  const filteredCountries = countries.filter((option) =>
    option.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  const filteredCitizenships = citizenships.filter((option) =>
    option.name.toLowerCase().includes(citizenshipSearch.toLowerCase())
  );

  const validate = () => {
    let newErrors = { ...errors };

    newErrors = {
      citizenship: citizenship ? "" : "Please select citizenship",
      country: country ? "" : "Please select country",

    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };
  const handleGo = () => {
    if (validate()) {

      router.push(`/e-visa/e-visa-plan?citizenship=${citizenship}&country=${country}`);

    }
  };
  return (
    <div>
      <BannerLayout bg="/e-visa.jpg">
        <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
          Fast, Secure & Hassle-Free e-Visa Services        </h4>

        <p>Apply for your visa online without submitting your passport—quick, safe, <br /> and entirely digital.</p>


        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4  justify-center">
          {/* Citizenship */}
          <DropdownWrapper
            value={citizenship}
            setValue={setCitizenship}
            search={citizenshipSearch}
            setSearch={setCitizenshipSearch}
            filteredOptions={filteredCitizenships}
            errors={errors.citizenship}
            placeholder="Select Citizenship"
            type="flag"
          />

          {/* Country */}
          <DropdownWrapper
            value={country}
            setValue={setCountry}
            search={countrySearch}
            setSearch={setCountrySearch}
            filteredOptions={filteredCountries}
            errors={errors.country}
            placeholder="Select Country"
            type="flag"
          />

          <GoButton handleGo={handleGo} />
        </div>
      </BannerLayout>
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
                <img
                  src={"/home.png"}
                  alt={feature.title}
                  className="w-full h-40 object-cover"
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
      <CommitmentSection />
      <TestimonialSlider testimonials={testimonials} />
    </div>
  )
}
export default page