import React from "react";
import ServiceButton from "../Buttons/ServiceButton";

interface VisaServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    link?: string;
}

const VisaServiceCard: React.FC<VisaServiceCardProps> = ({
    icon,
    title,
    description,
    link,
}) => {
    return (
        <div className="max-w-sm p-4 rounded-xl border border-gray-200 h-[320px]  hover:shadow-md transition-shadow  flex items-center">
            <div className="flex flex-col items-start gap-3">
                {/* Icon box */}
                <div  >
                    {icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-600">{description}</p>

                {/* Link */}
                <ServiceButton name="Apply Now"
                    rightIcon={<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.63672 18.864L18.3646 6.13611M18.3646 6.13611H11.2939M18.3646 6.13611L18.3643 13.2072" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>}
                    onClick={() => alert("Button clicked")} />
            </div>
        </div>
    );
};

export default VisaServiceCard;
