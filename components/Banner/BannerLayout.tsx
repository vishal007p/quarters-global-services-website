"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface BannerLayoutProps {
  bg?: string;
  videoSrc?: string;
  children: React.ReactNode;
}

const bannerOrder = [
  { key: "e-visa", image: "/services/e-visa.png" },
  { key: "visa", image: "/services/visa.png" },
  { key: "indian-visa", image: "/services/visa.png" },
  { key: "passport", image: "/services/passport.png" },
  { key: "apostille", image: "/services/apostille.png" },
];

const defaultBanner = "/services/default-banner.jpg"; // fallback banner

const BannerLayout: React.FC<BannerLayoutProps> = ({ bg, videoSrc, children }) => {
  const searchParams = useSearchParams();
  const fromCountrySlug = (searchParams.get("Slug") || searchParams.get("fromCountrySlug") || "").toLowerCase();

  //  Choose correct background based on slug keyword (in order)
  const autoBackground = useMemo(() => {
    if (bg) return bg; // manual override first

    for (const item of bannerOrder) {
      if (fromCountrySlug.includes(item.key)) {
        return item.image;
      }
    }

    return defaultBanner;
  }, [bg, fromCountrySlug]);

  const isImage = autoBackground?.startsWith("http") || autoBackground?.startsWith("/");
  const isTailwindClass = autoBackground && !isImage;

  return (
    <section className="relative w-full h-[600px] px-4 flex items-center justify-center text-white overflow-hidden">
      {/* 🖼 Background Image */}
      {isImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-700"
          style={{ backgroundImage: `url(${autoBackground})` }}
        />
      )}

      {/*  Tailwind Background */}
      {isTailwindClass && <div className={`${autoBackground} absolute inset-0 z-0`} />}

      {/*  Video Background */}
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

      {/*  Gradient Overlay */}
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
