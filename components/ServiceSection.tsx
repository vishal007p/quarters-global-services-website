import Image from "next/image";


interface ServiceSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  imageSrc: string;
  imagePosition: "left" | "right";
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  description,
  buttonText,
  imagePosition,
}) => {
  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image on left, text on right */}
        {imagePosition === "left" && (
          <>
            <div className="lg:w-1/2 w-full">
              <Image
                width={150}
                height={150}
                src={"/service.jpg"}
                alt={title}
                className="w-full h-auto rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">{title}</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{description}</p>
              {buttonText && (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                  {buttonText}
                </button>
              )}
            </div>
          </>
        )}

        {/* Image on right, text on left */}
        {imagePosition === "right" && (
          <>
            <div className="lg:w-1/2 w-full order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">{title}</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{description}</p>
              {buttonText && (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                  {buttonText}
                </button>
              )}
            </div>
            <div className="lg:w-1/2 w-full order-1 lg:order-2">
              <Image
                width={150}
                height={150}
                src={"/service.jpg"}
                alt={title}
                className="w-full h-auto rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceSection