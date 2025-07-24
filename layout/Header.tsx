"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import GoogleTranslate from "@/components/GoogleTranslate";

const navItems = [
  "Visa",
  "Passport",
  "OCI Card",
  "Apostille & Legalization",
  "Services",
  "About Us",
  "Countries",
];

const Header = () => {
  const [showTranslate, setShowTranslate] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Quartus Logo" width={120} height={40} />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
          {navItems.map((item) => (
            <div key={item} className="relative group">
              <button className="flex items-center gap-1 hover:text-blue-600 transition">
                {item}
                <FaChevronDown className="text-xs" />
              </button>
              {/* Dropdown Placeholder */}
              <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white border rounded-md shadow-lg p-3 min-w-[160px] z-50">
                <p className="text-sm text-gray-600">Dropdown Item</p>
              </div>
            </div>
          ))}
        </nav>

        {/* Right Section - Last Login, Translate, Login */}
        <div className="flex items-center gap-4 text-sm text-gray-700">


          {/* Translate Button */}

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
            <span className="text-xs text-gray-400 block mt-1">Powered by Google Translate</span>
          </div>


          {/* Login Button with Dropdown */}
          <div className="relative group">
            <button
              className="w-[113px] h-[47px] px-[16px] py-[10px] text-xs font-semibold border border-[#00408D] bg-[#00408D] text-white rounded-[12px] hover:bg-blue-50 hover:text-[#00408D] transition"
            >
              Login
            </button>

            {/* Hover Dropdown */}
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white rounded-xl shadow-lg w-56 p-2 z-50">
              {/* Customer Portal */}
              <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <span className="text-sm font-medium text-gray-800">Customer Portal</span>
                <div className="w-7 h-7 flex items-center justify-center bg-red-600 rounded-full">
                  <FaArrowRight className="text-white text-sm" />
                </div>
              </div>

              {/* Agent Portal */}
              <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <span className="text-sm font-medium text-gray-800">Agent Portal</span>
                <div className="w-7 h-7 flex items-center justify-center bg-red-600 rounded-full">
                  <FaArrowRight className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
