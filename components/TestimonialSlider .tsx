"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
 
interface Testimonial {
  name: string;
  text: string;
  image: string;
}

 

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

// Install modules
SwiperCore.use([Navigation, Pagination]);

const TestimonialSlider: React.FC = ( ) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-10 py-12 h-[400px] relative">
      
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-md rounded-xl p-6 h-full flex flex-col justify-between text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full border-4 border-yellow-300"
                />
              </div>
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{item.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom navigation + slide number */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button className="swiper-button-prev-custom bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          &#8592;
        </button>
        <span className="font-semibold">
          {currentSlide}/{testimonials.length}
        </span>
        <button className="swiper-button-next-custom bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
