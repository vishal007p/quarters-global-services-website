"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdGTranslate, MdMenu, MdClose, MdShoppingCart } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GoogleTranslate from "@/components/GoogleTranslate";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useGetNavbarServicesQuery } from "@/services/platformNavbarApi";

const Header = () => {
  const { data, isError, isLoading } = useGetNavbarServicesQuery();

  const [showTranslate, setShowTranslate] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();
  const currentPath = usePathname();

  const services = data?.data?.data;

  // ✅ Fetch cart count from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("applications");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed.applications)) {
          const validApps = parsed.applications.filter(
            (app: any) =>
              typeof app?.platformServiceCategoryId === "string" &&
              app.platformServiceCategoryId.trim() !== ""
          );

          setCartCount(validApps.length);
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    }
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-[85%] gap-4 mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Quartus Logo"
            width={120}
            height={40}
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-800">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} width={100} height={20} />
            ))}

          {isError && (
            <span className="text-red-500">Error loading services</span>
          )}

          {!isLoading && !isError && (
            <>
              {services
                ?.filter(
                  (service: any) =>
                    service.name !== "OCI Card" &&
                    service.name !== "Indian PAN"
                )
                .map((service: any) => (
                  <button
                    key={service._id}
                    onClick={() => router.push(`/${service.slug}`)}
                    className={`${
                      currentPath === `/${service.slug}`
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-600"
                    } transition cursor-pointer`}
                  >
                    {service.name}
                  </button>
                ))}

              {/* Add E-Visa */}
              <button
                onClick={() => router.push("/e-visa")}
                className={`${
                  currentPath === "/e-visa"
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                } transition cursor-pointer`}
              >
                E-Visa
              </button>

              {/* Static Pages */}
              <button
                onClick={() => router.push("/about-us")}
                className={`${
                  currentPath === "/about-us"
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                } transition cursor-pointer`}
              >
                About Us
              </button>

              <button
                onClick={() => router.push("/contact-us")}
                className={`${
                  currentPath === "/contact-us"
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                } transition cursor-pointer`}
              >
                Contact Us
              </button>
            </>
          )}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/checkout")}
          >
            <MdShoppingCart className="text-2xl text-gray-800 hover:text-blue-600 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Translate */}
          <div className="relative">
            <button
              onClick={() => setShowTranslate(!showTranslate)}
              className="flex items-center gap-[6px] w-[123px] h-[30px] px-[6px] py-[3px] text-xs border border-[#BFBFBF] text-center rounded-[6px] bg-white hover:bg-gray-100 transition"
            >
              <MdGTranslate className="text-base" />
              Translate
            </button>

            {showTranslate && (
              <div className="absolute z-50 mt-2">
                <GoogleTranslate />
              </div>
            )}

            <span className="text-xs text-gray-400 block mt-1">
              Powered by Google Translate
            </span>
          </div>

          {/* Login */}
          <button className="w-[113px] h-[47px] px-[16px] py-[10px] text-xs font-semibold border border-[#00408D] bg-[#00408D] text-white rounded-[12px] hover:bg-blue-50 hover:text-[#00408D] transition">
            Login
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl"
          >
            {mobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width={`100%`} height={20} className="mb-2" />
            ))}

          {isError && (
            <span className="text-red-500">Error loading services</span>
          )}

          {!isLoading && !isError && (
            <>
              {services
                ?.filter(
                  (service: any) =>
                    service.name !== "OCI Card" &&
                    service.name !== "Indian PAN"
                )
                .map((service: any) => (
                  <button
                    key={service._id}
                    onClick={() => {
                      router.push(`/${service.slug}`);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 ${
                      currentPath === `/${service.slug}`
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-600"
                    }`}
                  >
                    {service.name}
                  </button>
                ))}

              {/* Add E-Visa */}
              <button
                onClick={() => {
                  router.push("/e-visa");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 ${
                  currentPath === "/e-visa"
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`}
              >
                E-Visa
              </button>

              {/* Mobile Cart */}
              <div
                className="flex items-center gap-2 mt-4 cursor-pointer"
                onClick={() => {
                  router.push("/cart");
                  setMobileMenuOpen(false);
                }}
              >
                <MdShoppingCart className="text-xl text-gray-800" />
                <span className="text-sm">Cart ({cartCount})</span>
              </div>

              {/* Translate */}
              <div className="mt-4">
                <button
                  onClick={() => setShowTranslate(!showTranslate)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-xs border border-[#BFBFBF] rounded-md bg-white hover:bg-gray-100"
                >
                  <MdGTranslate />
                  Translate
                </button>

                {showTranslate && (
                  <div className="mt-2">
                    <GoogleTranslate />
                  </div>
                )}
              </div>

              {/* Login */}
              <button className="w-full mt-4 px-4 py-3 text-xs font-semibold border border-[#00408D] bg-[#00408D] text-white rounded-[12px] hover:bg-blue-50 hover:text-[#00408D] transition">
                Login
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
