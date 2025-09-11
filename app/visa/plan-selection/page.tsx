import BannerLayout from '@/components/Banner/BannerLayout'
import React from 'react'

const page = () => {
    return (
        <>
            <BannerLayout videoSrc="/homeBg.mp4">
                <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
                    Fast, Hassle-Free  Visa Services
                </h4>
                <h1 className="text-4xl font-bold mb-4">
                    We help U.S. citizens apply for tourist, business, student, and<br />
                    work visas—accurately, securely, and on time.
                </h1>
            </BannerLayout>
        </>
    )
}

export default page