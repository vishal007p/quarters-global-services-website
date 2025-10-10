"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function TrackApplicationPage() {
  const [applicationId, setApplicationId] = useState("");
  const [contact, setContact] = useState("");

  const steps = [
    { id: 1, label: "Submitted", status: "completed" },
    { id: 2, label: "In Review with Embassy", status: "completed" },
    { id: 3, label: "Approved", status: "active" },
    { id: 4, label: "Dispatched", status: "pending" },
    { id: 5, label: "Delivered", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Track Application
      </h2>

      {/* Search Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-3xl">
        <input
          type="text"
          placeholder="Application ID"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Phone/Email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
          GO
        </button>
      </div>

      {/* Details Section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>

        {/* Progress Bar */}
        <div className="bg-blue-50 rounded-md p-6">
          <div className="relative flex justify-between items-center">
            <div className="absolute left-[10%] right-[10%] top-1/1 h-[2px] bg-green-200 z-0" />

            {steps.map((step, index) => (
              <div key={index} className="relative z-10 text-center w-1/5">
                {step.status === "completed" ? (
                  <CheckCircle className="mx-auto text-green-500" />
                ) : (
                  <Circle
                    className={`mx-auto ${
                      step.status === "active"
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                )}
                <p
                  className={`text-sm mt-2 ${
                    step.status === "completed" || step.status === "active"
                      ? "text-gray-800 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white border rounded-md mt-6 p-4">
          <h4 className="font-semibold text-gray-700 mb-4">Service Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Service Category
              </label>
              <input
                type="text"
                value="Visa"
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Application Type
              </label>
              <input
                type="text"
                value="Renewal"
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <div className="fixed bottom-5 right-5">
        <button className="bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="Chat"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}
