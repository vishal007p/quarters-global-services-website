"use client"
import React, { useState, useEffect } from "react";
 import { ImSpinner5 } from "react-icons/im";

const FullScreenLoader = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : "."));
    }, 500); // change dots every 500ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <ImSpinner5 className="text-black animate-spin text-6xl" />

      {/* Loading text with animated dots */}
      <span className="mt-4 text-gray-700 text-xl font-semibold">
        Loading{dots}
      </span>
    </div>
  );
};

export default FullScreenLoader;
