import React from "react";

interface VisaServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
}

const VisaServiceCard: React.FC<VisaServiceCardProps> = ({
    icon,
    title,
    description,
    link,
}) => {
    return (
        <div className="max-w-sm p-4 rounded-xl border border-gray-200   hover:shadow-md transition-shadow  ">
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
                <a
                    href={link}
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                >
                    Learn More <span className="text-xs">↗</span>
                </a>
            </div>
        </div>
    );
};

export default VisaServiceCard;
