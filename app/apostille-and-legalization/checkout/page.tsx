"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function GetStartedSection() {
  const [country, setCountry] = useState("");
  const [scannedCopy, setScannedCopy] = useState("Yes");
  const [translation, setTranslation] = useState("Yes");

  const countries = ["USA", "Canada", "UK", "Australia", "India"];
  const languages = ["Spanish", "French", "German", "Hindi", "Arabic"];
  const pageTypes = ["1-5 pages", "6-10 pages", "11-20 pages"];

  return (
    <section className="bg-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE FORM */}
        <div>
          <h2 className="text-blue-700 font-semibold mb-4">Get Started</h2>

          {/* Question 1 */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">
              1. Which country are the documents intended for?
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Question 2 */}
          <div className="mb-6">
            <p className="text-gray-800 font-medium mb-2">
              2. Are you interested in obtaining a scanned copy of your
              authenticated documents before we return them to you? The cost for
              this service is <span className="font-semibold">$20</span>.
            </p>
            <div className="flex gap-6 mt-2">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="scannedCopy"
                    checked={scannedCopy === val}
                    onChange={() => setScannedCopy(val)}
                    className="accent-blue-600"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="mb-6">
            <p className="text-gray-800 font-medium mb-2">
              3. Do you need your documents translated?
            </p>
            <div className="flex gap-6 mt-2">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="translation"
                    checked={translation === val}
                    onChange={() => setTranslation(val)}
                    className="accent-blue-600"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Translation Fields */}
          {translation === "Yes" && (
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-800 mb-2 text-sm">
                  What Language?
                </label>
                <select className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-800 mb-2 text-sm">
                  How many Pages
                </label>
                <select className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500">
                  <option value="">Type</option>
                  {pageTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all font-medium">
            Continue <FaArrowRight className="text-sm" />
          </button>
        </div>

        {/* RIGHT SIDE INFO CARD */}
        <div className="bg-white border rounded-2xl shadow-md p-8">
          <div className="w-16 h-16 mx-auto lg:mx-0 mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2h6v2m-6-4v-4h6v4m3-6H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            What is <span className="text-gray-700">Document Authentication?</span>
          </h3>

          <p className="text-gray-600 leading-relaxed mb-3">
            Document authentication is a crucial process ensuring the validity and
            acceptance of your legal documents in foreign countries.
          </p>

          <p className="text-gray-600 leading-relaxed">
            This process involves obtaining an{" "}
            <span className="font-semibold">apostille</span> or certification,
            often referred to as legalization, from the appropriate government
            authority.
          </p>
        </div>
      </div>
    </section>
  );
}
