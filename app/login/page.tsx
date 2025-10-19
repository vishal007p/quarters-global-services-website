"use client";

import React from "react";
import LoginForm from "@/components/form/LoginForm";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* 🏠 Floating Back to Home Button */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white text-red-600 border border-red-200 shadow-lg rounded-full px-4 py-2 text-sm font-medium hover:bg-red-50 hover:shadow-xl  transition-all duration-200"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </button>

      {/* Left Side — Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 sm:px-10 py-10 bg-white">
        <div className="w-full max-w-md text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Welcome back to Quartus
          </h1>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Please sign in to continue
          </p>
          <LoginForm />
        </div>
      </div>

      {/* Right Side — Image Section */}
      <div className="w-full md:w-1/2 h-64 md:h-auto bg-[url('/logion.jpg')] bg-cover bg-center" />
    </div>
  );
};

export default LoginPage;
