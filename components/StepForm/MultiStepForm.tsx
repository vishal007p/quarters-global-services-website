"use client";

import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const steps = [
  { id: 1, label: "Traveler Info" },
  { id: 2, label: "Shipping/Billing" },
  { id: 3, label: "Order Confirmation" },
  { id: 4, label: "Thank You" }, // New step
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const next = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  return (
    <div className="w-[80%] mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>

      {/* Steps Indicator: Hidden in Thank You step */}
      {step < 4 && (
        <div className="flex justify-between items-center mb-12 bg-[#96C6FF] py-8 px-6 rounded-lg">
          {steps.slice(0, 3).map((s) => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;

            return (
              <div key={s.id} className="flex flex-col items-center w-full relative">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full z-10
                    ${isActive ? "bg-red-600 text-white font-bold" : "border-2 border-red-600 text-red-600"}
                  `}
                >
                  {s.id}
                </div>
                <div
                  className={`mt-2 text-sm text-center 
                    ${isActive ? "text-red-600 font-bold" : isCompleted ? "text-gray-500" : "text-gray-400"}
                  `}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Conditional Layout */}
      {step === 4 ? (
        // Thank You / Final Step
        <div className="max-w-3xl mx-auto text-center bg-white p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Thank you for your order!</h2>
          <p className="text-gray-700">
            Your order has been successfully processed. A confirmation email has been sent to you.
          </p>
        </div>
      ) : (
        <div className="flex gap-8">
          <div className={`${step === 3 ? "w-full" : "w-1/2"}`}>
            {step === 1 && <Step1 onNext={next} />}
            {step === 2 && <Step2 onNext={next} onBack={back} />}
            {step === 3 && <Step3 data={formData} />}
          </div>

          {
            step !== 3 && <div className="w-1/3">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#00408D] text-white p-4">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                </div>
                <div className="p-6">
                  {Object.keys(formData).length === 0 ? (
                    <p className="text-gray-500">No information provided yet</p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center border-b py-2">
                          <span className="font-medium text-gray-700 capitalize">{key}</span>
                          <span className="text-gray-900">
                            {value !== undefined && value !== null ? value.toString() : "-"}
                          </span>                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          }

        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
