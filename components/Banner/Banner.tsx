import React from "react";

export const Banner = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden mb-4">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/passport-bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center h-full text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Don’t Let Damage Derail Your Travel Plans
        </h1>
        <p className="text-sm md:text-lg max-w-2xl mb-8">
          Torn, smudged, or soaked? A damaged passport can’t be used at border
          control. Our rapid replacement service gets you a valid, clean
          passport—ready for your next trip.
        </p>

        {/* Application Form */}
        <div className="flex items-center gap-2">
          <select className="bg-white text-black px-4 py-2 rounded shadow">
            <option>Damaged Passport</option>
            <option>Lost Passport</option>
            <option>Renewal</option>
            <option>New Passport</option>
          </select>
          <button className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition">
            Go
          </button>
        </div>
      </div>
    </div>
  );
};
