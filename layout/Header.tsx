"use client";

import React from "react";
import Image from "next/image";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";

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
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
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
              {/* Example Dropdown Placeholder */}
              <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white border rounded-md shadow-lg p-3 min-w-[160px] z-50">
                <p className="text-sm text-gray-600">Dropdown Item</p>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
