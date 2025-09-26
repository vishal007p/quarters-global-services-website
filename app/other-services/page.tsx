
"use client";


import BannerLayout from "@/components/Banner/BannerLayout";
import ServiceSection from "@/components/ServiceSection";
import { useState, useEffect } from "react";



// Array of service data
const services = [
    {
        title: "Courier & Document Delivery",
        description:
            "We provide secure and timely courier services for your documents and packages. Track your shipments easily and ensure prompt delivery with our reliable service.",
        buttonText: "Learn More",
        imageSrc: "/images/courier.jpg",
        
    },
    {
        title: "Vehicle Booking",
        description:
            "Book vehicles for personal or corporate travel. Our fleet includes a range of cars and vans for short or long-term rentals, ensuring comfort and safety.",
        buttonText: "Book Now",
        imageSrc: "/images/vehicle.jpg",
    },
    {
        title: "Flight Charter Services",
        description:
            "Experience personalized air travel with our flight charter services. Enjoy flexibility, convenience, and premium service tailored to your schedule.",
        buttonText: "Book Flight",
        imageSrc: "/images/flight.jpg",
    },
    {
        title: "Concert, Wedding, Private Tour, Corporate Ground Transport",
        description:
            "We provide luxury ground transport for events, weddings, corporate tours, and private travel. Arrive in style and comfort with our professional drivers.",
        buttonText: "Learn More",
        imageSrc: "/images/ground-transport.jpg",
    },
    {
        title: "Travel Insurance",
        description:
            "Protect your trips with our comprehensive travel insurance plans. Enjoy peace of mind knowing you're covered for medical emergencies, cancellations, and lost luggage.",
        buttonText: "Get Insured",
        imageSrc: "/images/travel-insurance.jpg",
    },
    {
        title: "Consultancy Service",
        description:
            "Professional consultancy services to help you navigate complex processes. Receive expert advice and solutions tailored to your business or personal needs.",
        buttonText: "Consult Now",
        imageSrc: "/images/consultancy.jpg",
    },
    {
        title: "IDP (International Driving License)",
        description:
            "Obtain your International Driving Permit quickly and easily. Drive legally and safely across multiple countries with our hassle-free process.",
        buttonText: "Apply Now",
        imageSrc: "/images/idp.jpg",
    },
    {
        title: "Indian PAN Card",
        description:
            "Apply for your PAN card with ease. Essential for tax filing, banking, and financial transactions in India.",
        buttonText: "Apply Now",
        imageSrc: "/images/pan-card.jpg",
    },
    {
        title: "Fast Track Immigration (FIT-ITP)",
        description:
            "Skip long queues with our fast track immigration services. Efficient, reliable, and designed to save you time.",
        buttonText: "Learn More",
        imageSrc: "/images/fast-track.jpg",
    },
];

const ServicesPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <BannerLayout bg="/service.jpg">
                <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4">
                    Other Services
                </h4>
            </BannerLayout>

            <div className="bg-gradient-to-b from-[#DEEBFF] to-[#FFE3E3] py-10 w-full">
                <div className="flex justify-center gap-24 w-full">

                    {/* Passports */}
                    <div className="flex flex-col items-center">
                        <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7.17188" y="1.66669" width="46.6667" height="56.6667" rx="4" fill="white" />
                            <path d="M41.0371 39.85H19.9531C19.5553 39.85 19.1738 40.008 18.8925 40.2893C18.6112 40.5706 18.4531 40.9522 18.4531 41.35C18.4531 41.7478 18.6112 42.1293 18.8925 42.4106C19.1738 42.6919 19.5553 42.85 19.9531 42.85H41.0371C41.4349 42.85 41.8165 42.6919 42.0978 42.4106C42.3791 42.1293 42.5371 41.7478 42.5371 41.35C42.5371 40.9522 42.3791 40.5706 42.0978 40.2893C41.8165 40.008 41.4349 39.85 41.0371 39.85Z" fill="#022146" />
                            <path d="M37.2376 47.474H23.7656C23.3678 47.474 22.9863 47.632 22.705 47.9133C22.4237 48.1946 22.2656 48.5762 22.2656 48.974C22.2656 49.3718 22.4237 49.7534 22.705 50.0347C22.9863 50.316 23.3678 50.474 23.7656 50.474H37.2376C37.6354 50.474 38.017 50.316 38.2983 50.0347C38.5796 49.7534 38.7376 49.3718 38.7376 48.974C38.7376 48.5762 38.5796 48.1946 38.2983 47.9133C38.017 47.632 37.6354 47.474 37.2376 47.474Z" fill="#022146" />
                            <path d="M30.5 9.526C27.9284 9.526 25.4146 10.2887 23.2765 11.7176C21.1385 13.1465 19.4723 15.1774 18.4886 17.5534C17.505 19.9295 17.2481 22.5438 17.7505 25.0659C18.2529 27.5879 19.4921 29.9042 21.3112 31.7219C23.1302 33.5396 25.4476 34.777 27.97 35.2774C30.4924 35.7779 33.1066 35.519 35.4818 34.5336C37.8571 33.5481 39.8867 31.8803 41.314 29.7411C42.7412 27.602 43.502 25.0876 43.5 22.516C43.4974 19.0699 42.1265 15.7659 39.6889 13.3301C37.2512 10.8943 33.9461 9.526 30.5 9.526ZM40.34 21.016H36.046C35.7514 18.225 34.9079 15.5198 33.564 13.056C35.32 13.6248 36.8835 14.6703 38.08 16.0758C39.2764 17.4814 40.0589 19.1917 40.34 21.016ZM27.97 24.016H33.03C32.692 26.5892 31.831 29.066 30.5 31.294C29.169 29.066 28.308 26.5892 27.97 24.016ZM27.97 21.016C28.308 18.4428 29.169 15.966 30.5 13.738C31.831 15.966 32.692 18.4428 33.03 21.016H27.97ZM27.438 13.056C26.0935 15.5197 25.2493 18.2249 24.954 21.016H20.66C20.9411 19.1914 21.7237 17.4808 22.9206 16.0752C24.1175 14.6696 25.6815 13.6243 27.438 13.056ZM20.66 24.016H24.954C25.2493 26.8071 26.0935 29.5123 27.438 31.976C25.6815 31.4077 24.1175 30.3624 22.9206 28.9568C21.7237 27.5512 20.9411 25.8406 20.66 24.016ZM33.564 31.976C34.9079 29.5122 35.7514 26.807 36.046 24.016H40.34C40.0589 25.8403 39.2764 27.5506 38.08 28.9562C36.8835 30.3617 35.32 31.4072 33.564 31.976Z" fill="#D31021" />
                            <path d="M54.1803 50V10C54.1771 7.48142 53.1752 5.0669 51.3943 3.28599C49.6134 1.50508 47.1989 0.503175 44.6803 0.5H16.3203C13.8017 0.503175 11.3872 1.50508 9.6063 3.28599C7.8254 5.0669 6.82349 7.48142 6.82031 10V50C6.82349 52.5186 7.8254 54.9331 9.6063 56.714C11.3872 58.4949 13.8017 59.4968 16.3203 59.5H44.6803C47.1989 59.4968 49.6134 58.4949 51.3943 56.714C53.1752 54.9331 54.1771 52.5186 54.1803 50ZM51.1803 50C51.1782 51.7233 50.4927 53.3753 49.2742 54.5939C48.0556 55.8124 46.4036 56.4979 44.6803 56.5H16.3203C14.5971 56.4979 12.945 55.8124 11.7265 54.5939C10.5079 53.3753 9.82243 51.7233 9.82031 50V10C9.82243 8.27674 10.5079 6.62467 11.7265 5.40614C12.945 4.18762 14.5971 3.50212 16.3203 3.5H44.6803C46.4036 3.50212 48.0556 4.18762 49.2742 5.40614C50.4927 6.62467 51.1782 8.27674 51.1803 10V50Z" fill="#022146" />
                        </svg>


                        <span className="mt-2 font-medium">Passports</span>
                    </div>

                    {/* Visas */}
                    <div className="flex flex-col items-center">
                        <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10.7031" y="15" width="40" height="40" rx="3" fill="white" />
                            <rect x="10.7031" y="15" width="40" height="40" rx="3" fill="white" />
                            <path d="M10.7031 13.4169C10.7031 11.9319 11.7895 10.6704 13.2581 10.4501L41.1078 6.27261C42.7314 6.02908 44.2491 7.13577 44.5136 8.75602L50.1344 43.1833C50.4325 45.0089 49.0234 46.6666 47.1736 46.6666H13.7031C12.0463 46.6666 10.7031 45.3235 10.7031 43.6666V13.4169Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M30.7031 23.1251C25.5255 23.1251 21.3281 27.3225 21.3281 32.5C21.3281 37.6778 25.5255 41.875 30.7031 41.875C35.8809 41.875 40.0781 37.6778 40.0781 32.5C40.0781 27.3225 35.8809 23.1251 30.7031 23.1251ZM25.0781 32.5C25.0781 29.3935 27.5966 26.875 30.7031 26.875C33.8096 26.875 36.3281 29.3935 36.3281 32.5C36.3281 35.6068 33.8096 38.125 30.7031 38.125C27.5966 38.125 25.0781 35.6068 25.0781 32.5Z" fill="#D31021" />
                            <path d="M25.7031 45.625C24.6676 45.625 23.8281 46.4645 23.8281 47.5C23.8281 48.5355 24.6676 49.375 25.7031 49.375H35.7031C36.7386 49.375 37.5781 48.5355 37.5781 47.5C37.5781 46.4645 36.7386 45.625 35.7031 45.625H25.7031Z" fill="#D31021" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M39.7309 3.95924C43.8726 3.36757 47.5781 6.58137 47.5781 10.7651V14.2063C50.5519 15.7782 52.5781 18.9025 52.5781 22.5V47.5C52.5781 52.6777 48.3809 56.875 43.2031 56.875H18.2031C13.0254 56.875 8.82812 52.6777 8.82812 47.5V12.5H8.83152C8.82927 12.4411 8.82812 12.3819 8.82812 12.3224C8.82812 10.0568 10.4941 8.13592 12.7369 7.81552L39.7309 3.95924ZM13.3808 16.8751L13.3592 16.875H12.5781V47.5C12.5781 50.6067 15.0965 53.125 18.2031 53.125H43.2031C46.3096 53.125 48.8281 50.6067 48.8281 47.5V22.5C48.8281 19.4014 46.3226 16.888 43.2271 16.8751H13.3808ZM43.8281 13.1251H43.2344L43.2031 13.125H13.3716C12.9325 13.1201 12.5781 12.7627 12.5781 12.3224C12.5781 11.923 12.8718 11.5843 13.2673 11.5278L40.2611 7.67154C42.1439 7.40259 43.8281 8.86342 43.8281 10.7651V13.1251Z" fill="#022146" />
                        </svg>

                        <span className="mt-2 font-medium">Visas</span>
                    </div>

                    {/* OCI Card */}
                    <div className="flex flex-col items-center">
                        <svg width="39" height="50" viewBox="0 0 39 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.898438 10V40C0.898438 45.5 5.39844 50 10.8984 50H28.3984C33.8984 50 38.3984 45.5 38.3984 40V10C38.3984 4.5 33.8984 0 28.3984 0H10.8984C5.39844 0 0.898438 4.5 0.898438 10ZM3.89844 10C3.89844 7.25 8.14844 3 10.8984 3H28.3984C31.1484 3 35.3984 7.25 35.3984 10V40C35.3984 42.75 31.1484 47 28.3984 47H10.8984C8.14844 47 3.89844 42.75 3.89844 40V10Z" fill="#00214A" />
                            <path d="M9.89473 38.75L10.3947 39C11.6447 39.75 12.1447 40 13.6447 40C16.1447 40 18.3947 39 20.1447 37.25L29.1447 28.25C30.1447 27.25 31.1447 26.75 30.1447 25.75C29.1447 24.75 27.6447 24.75 26.6447 25.75L22.8947 29.5L13.8947 27.5C12.6447 27.25 11.1447 28 10.8947 29.5C10.6447 30.75 11.3947 32.25 12.8947 32.5L18.6447 33.75L17.6447 34.75C16.3947 36 14.3947 36.25 12.6447 35.5L11.8947 35.25C10.6447 34.75 9.14473 35.25 8.64473 36.25C8.14473 37.5 8.64473 38 9.89473 38.75Z" fill="#D31021" />
                            <path d="M13.327 17H25.4699C26.927 17 27.8984 16.2 27.8984 15C27.8984 13.8 26.927 13 25.4699 13H13.327C11.8699 13 10.8984 13.8 10.8984 15C10.8984 16.2 11.8699 17 13.327 17Z" fill="#00214A" />
                        </svg>

                        <span className="mt-2 font-medium">OCI Card</span>
                    </div>

                    {/* Surrender of Indian passport */}
                    <div className="flex flex-col items-center text-center">
                        <svg width="38" height="50" viewBox="0 0 38 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.101562 10V40C0.101562 45.5 4.60156 50 10.1016 50H27.6016C33.1016 50 37.6016 45.5 37.6016 40V10C37.6016 4.5 33.1016 0 27.6016 0H10.1016C4.60156 0 0.101562 4.5 0.101562 10ZM3.10156 10C3.10156 7.25 7.35156 3 10.1016 3H27.6016C30.3516 3 34.6016 7.25 34.6016 10V40C34.6016 42.75 30.3516 47 27.6016 47H10.1016C7.35156 47 3.10156 42.75 3.10156 40V10Z" fill="#00214A" />
                            <path d="M9.09785 38.75L9.59785 39C10.8479 39.75 11.3479 40 12.8479 40C15.3479 40 17.5979 39 19.3479 37.25L28.3479 28.25C29.3479 27.25 30.3479 26.75 29.3479 25.75C28.3479 24.75 26.8479 24.75 25.8479 25.75L22.0979 29.5L13.0979 27.5C11.8479 27.25 10.3479 28 10.0979 29.5C9.84785 30.75 10.5979 32.25 12.0979 32.5L17.8479 33.75L16.8479 34.75C15.5979 36 13.5979 36.25 11.8479 35.5L11.0979 35.25C9.84785 34.75 8.34785 35.25 7.84785 36.25C7.34785 37.5 7.84785 38 9.09785 38.75Z" fill="#D31021" />
                            <path d="M12.5301 17H24.673C26.1301 17 27.1016 16.2 27.1016 15C27.1016 13.8 26.1301 13 24.673 13H12.5301C11.073 13 10.1016 13.8 10.1016 15C10.1016 16.2 11.073 17 12.5301 17Z" fill="#00214A" />
                        </svg>


                        <span className="mt-2 font-medium">Surrender of<br />Indian passport</span>
                    </div>

                    {/* E-Visas */}
                    <div className="flex flex-col items-center">
                        <svg width="36" height="50" viewBox="0 0 36 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.5469 49.84H7.04688C5.38927 49.84 3.79956 49.1815 2.62746 48.0094C1.45536 46.8373 0.796875 45.2476 0.796875 43.59V6.40997C0.796875 4.75237 1.45536 3.16266 2.62746 1.99056C3.79956 0.818453 5.38927 0.159973 7.04688 0.159973H29.5469C31.2045 0.159973 32.7942 0.818453 33.9663 1.99056C35.1384 3.16266 35.7969 4.75237 35.7969 6.40997V43.59C35.7969 45.2476 35.1384 46.8373 33.9663 48.0094C32.7942 49.1815 31.2045 49.84 29.5469 49.84ZM7.04688 2.65997C6.05231 2.65997 5.09849 3.05506 4.39522 3.75832C3.69196 4.46158 3.29688 5.41541 3.29688 6.40997V43.59C3.29688 44.5845 3.69196 45.5384 4.39522 46.2416C5.09849 46.9449 6.05231 47.34 7.04688 47.34H29.5469C30.5414 47.34 31.4953 46.9449 32.1985 46.2416C32.9018 45.5384 33.2969 44.5845 33.2969 43.59V6.40997C33.2969 5.41541 32.9018 4.46158 32.1985 3.75832C31.4953 3.05506 30.5414 2.65997 29.5469 2.65997H7.04688Z" fill="#00214A" />
                            <path d="M18.2969 26.4075C16.5663 26.4075 14.8746 25.8943 13.4356 24.9328C11.9967 23.9714 10.8752 22.6048 10.2129 21.006C9.55067 19.4071 9.37739 17.6478 9.71501 15.9504C10.0526 14.2531 10.886 12.694 12.1097 11.4703C13.3334 10.2466 14.8925 9.41322 16.5898 9.0756C18.2872 8.73798 20.0465 8.91126 21.6454 9.57353C23.2442 10.2358 24.6108 11.3573 25.5722 12.7962C26.5337 14.2352 27.0469 15.9269 27.0469 17.6575C27.0469 19.9781 26.125 22.2037 24.4841 23.8447C22.8431 25.4856 20.6175 26.4075 18.2969 26.4075ZM18.2969 11.4075C17.0607 11.4075 15.8524 11.774 14.8246 12.4608C13.7968 13.1475 12.9957 14.1237 12.5226 15.2657C12.0496 16.4077 11.9258 17.6644 12.167 18.8768C12.4081 20.0892 13.0034 21.2028 13.8775 22.0769C14.7515 22.951 15.8652 23.5462 17.0776 23.7874C18.2899 24.0285 19.5466 23.9048 20.6887 23.4317C21.8307 22.9587 22.8068 22.1576 23.4936 21.1298C24.1803 20.102 24.5469 18.8936 24.5469 17.6575C24.5469 15.9999 23.8884 14.4102 22.7163 13.2381C21.5442 12.066 19.9545 11.4075 18.2969 11.4075Z" fill="#D20F21" />
                            <path d="M25.7969 41.095H10.7969C10.4654 41.095 10.1474 40.9633 9.91299 40.7289C9.67857 40.4944 9.54688 40.1765 9.54688 39.845C9.54688 39.5135 9.67857 39.1955 9.91299 38.9611C10.1474 38.7267 10.4654 38.595 10.7969 38.595H25.7969C26.1284 38.595 26.4463 38.7267 26.6808 38.9611C26.9152 39.1955 27.0469 39.5135 27.0469 39.845C27.0469 40.1765 26.9152 40.4944 26.6808 40.7289C26.4463 40.9633 26.1284 41.095 25.7969 41.095Z" fill="#00214A" />
                        </svg>

                        <span className="mt-2 font-medium">E-Visas</span>
                    </div>

                    {/* Document Legalization */}
                    <div className="flex flex-col items-center text-center">
                        <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_762_3342)">
                                <path d="M28.5362 2.10466C29.7553 1.41888 31.2442 1.41978 32.4625 2.10705L56.4019 15.6113C59.9731 17.6258 58.562 23.0692 54.462 23.0952L5.96928 23.4021C1.83967 23.4282 0.38356 17.9405 3.9829 15.9159L28.5362 2.10466Z" fill="white" />
                                <path d="M56.75 54.375C56.75 52.3041 55.0709 50.625 53 50.625H51.125V23.4375H56.75C58.4328 23.4375 59.9084 22.3181 60.3613 20.6981C60.815 19.0781 60.1344 17.355 58.6972 16.4822L32.4472 0.544687C31.8491 0.180937 31.1741 0 30.5 0C29.8259 0 29.1519 0.180937 28.5537 0.544687L2.30375 16.4822C0.866563 17.355 0.185 19.0791 0.639688 20.6981C1.0925 22.3181 2.56906 23.4375 4.25 23.4375H9.875V50.625H8C5.92906 50.625 4.25 52.3041 4.25 54.375C2.17906 54.375 0.5 56.0541 0.5 58.125V60H60.5V58.125C60.5 56.0541 58.8209 54.375 56.75 54.375ZM49.25 50.625H45.5V23.4375H49.25V50.625ZM17.375 23.4375H21.125V50.625H17.375V23.4375ZM23 23.4375H26.75V50.625H23V23.4375ZM28.625 23.4375H32.375V50.625H28.625V23.4375ZM34.25 23.4375H38V50.625H34.25V23.4375ZM39.875 23.4375H43.625V50.625H39.875V23.4375ZM4.25 21.5625C3.41281 21.5625 2.67031 20.9991 2.44437 20.1919C2.21844 19.3866 2.56062 18.5194 3.27688 18.0853L29.5269 2.14687C29.8203 1.96875 30.1578 1.875 30.5 1.875C30.8441 1.875 31.1797 1.96875 31.4741 2.14781L57.7241 18.0853C58.4403 18.5194 58.7825 19.3866 58.5556 20.1928C58.3306 20.9991 57.5872 21.5625 56.75 21.5625H4.25ZM11.75 23.4375H15.5V50.625H11.75V23.4375ZM8 52.5H53C54.0359 52.5 54.875 53.34 54.875 54.375H6.125C6.125 53.34 6.965 52.5 8 52.5ZM2.375 58.125C2.375 57.09 3.215 56.25 4.25 56.25H56.75C57.7859 56.25 58.625 57.09 58.625 58.125H2.375Z" fill="#00214A" />
                            </g>
                            <defs>
                                <clipPath id="clip0_762_3342">
                                    <rect width="60" height="60" fill="white" transform="translate(0.5)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <span className="mt-2 font-medium">Document<br />Legalization</span>
                    </div>

                </div>
            </div>

            {/* Services List */}
            <div className="py-12 px-4 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <ServiceSection
                                    title={service.title}
                                    description={service.description}
                                    buttonText={service.buttonText}
                                    imageSrc={"/service.png"}
                                    imagePosition={index % 2 === 0 ? "left" : "right"}
                                />
                             </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 py-16 px-4 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
                        Contact us today to learn more about our services and how we can help you with your specific needs.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition-colors duration-300">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;