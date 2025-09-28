import BannerLayout from '@/components/Banner/BannerLayout'
import SectionHeading from '@/components/SectionTitle/SectionHeading'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div>

            <BannerLayout bg="/service.jpg">
                {/* Overlay Heading */}
                <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center text-[clamp(1.5rem,2.5vw,2.75rem)] leading-snug">
                    Contact Us        </h4>
            </BannerLayout>
            <section className="mt-10">
                <SectionHeading
                    label="Contact Us"
                    titleLeft="Need Assistance?"
                    titleRight="Let’s Connect."
                    leftColor="text-gray-400"
                    rightColor="text-black"
                />

                <div className=" w-full md:max-w-7xl mx-auto  flex flex-col lg:flex-row items-center justify-between gap-8 px-6 lg:px-16 py-12 bg-white">
                    {/* Left Form */}

                    <div className="w-full lg:w-1/2 space-y-4">

                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                className="bg-[#F9F9F9] w-full h-[64px] px-[24px] py-[17px] rounded-[7px] opacity-100"
                            />
                        </div>

                        <div className="grid grid-cols-2 space-x-2">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="bg-[#F9F9F9] w-full h-[64px] px-[24px] py-[17px] rounded-[7px] opacity-100"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    title="ss"
                                    className="bg-[#F9F9F9] w-[90px] h-[64px] px-[16px] py-[17px] rounded-[7px] "
                                >
                                    <option value="+1">+1</option>
                                    <option value="+91">+91</option>
                                    <option value="+49">+49</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="bg-[#F9F9F9] w-full flex-1 h-[64px] px-[24px] py-[17px] rounded-[7px] opacity-100"
                                />
                            </div>
                        </div>

                        <div >
                            <select
                                title="aa"
                                className="bg-[#F9F9F9] w-full h-[64px] px-[24px] py-[17px] rounded-[7px] opacity-100 "
                            >
                                <option>How can we help you</option>
                                <option>Support</option>
                                <option>Sales</option>
                            </select>
                        </div>


                        <textarea
                            placeholder="Message"
                            className="bg-[#F9F9F9] w-full h-[120px] px-[24px] py-[17px] rounded-[7px] opacity-100 "
                        />

                        <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition">
                            Send Message →
                        </button>
                    </div>


                    {/* Right Map */}
                    <div className="w-full lg:w-1/2 relative">
                        <Image
                            width={150}
                            height={150}
                            src="/map.png" // Place your uploaded map here
                            alt="World Map"
                            className="w-full rounded"
                        />
                    </div>
                </div>
            </section>

        </div>
    )
}

export default page