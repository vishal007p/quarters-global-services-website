"use client";

import React from "react";
import Image from "next/image";
import { FaChevronDown, FaUserCircle, FaArrowRight } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";

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
  const lastLoginTime = "July 23, 2025, 10:30 AM"; // Example

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
          <button className="flex items-center gap-1 px-3 py-1 text-xs border rounded-md hover:bg-gray-100 transition">
            <MdGTranslate className="text-base" />
            Translate
          </button>

          {/* Login Button with Dropdown */}
          <div className="relative group">
            <button className="px-4 py-1 text-xs font-semibold border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
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
