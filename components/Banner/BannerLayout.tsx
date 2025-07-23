"use client";

import React from "react";

interface BannerLayoutProps {
  bg?: string; // background class or image URL
  videoSrc?: string; // optional background video
  children: React.ReactNode;
}

const BannerLayout: React.FC<BannerLayoutProps> = ({ bg, videoSrc, children }) => {
  const isImage = bg?.startsWith("http") || bg?.startsWith("/");
  const isTailwindClass = bg && !isImage;

  return (
    <section className="relative w-full h-[800px]  px-4 flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      {isImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${bg})` }}
        />
      )}

      {/* Tailwind Background Color */}
      {isTailwindClass && (
        <div className={`${bg} absolute inset-0 z-0`} />
      )}

      {/* Video Background */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Black Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.7) 100%)",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-screen-xl w-full text-center">
        {children}
      </div>
    </section>
  );
};

export default BannerLayout;
