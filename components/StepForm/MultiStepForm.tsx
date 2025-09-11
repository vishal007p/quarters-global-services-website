"use client";

import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const steps = [
  { id: 1, label: "Traveler Info" },
  { id: 2, label: "Shipping/Billing" },
  { id: 3, label: "Order Confirmation" },
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
    <div className=" mx-auto  ">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">Checkout</h1>
      </div>
      <div className="flex justify-between items-center mb-16 bg-[#96C6FF] py-16">
        
        {steps.map((s, index) => {
          const isActive = step === s.id;
          const isCompleted = step > s.id;

          return (
            <div key={s.id} className="flex flex-col items-center w-full relative">
              {/* Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full z-10
                  ${isActive ? "bg-red-600 text-white font-bold" : "border-2 border-red-600 text-red-600"}
                `}
              >
                {s.id}
              </div>

              {/* Label */}
              <div
                className={`mt-2 text-sm text-center 
                  ${isActive ? "text-red-600 font-bold" : isCompleted ? "text-gray-500" : "text-gray-400"}
                `}
              >
                {s.label}
              </div>

              {/* Connector Line (horizontal) */}
              {/* {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-1 
                    ${step > s.id ? "bg-red-600" : "bg-gray-300"}
                  `}
                  style={{ transform: "translateX(50%)" }}
                ></div>
              )} */}
            </div>
          );
        })}
      </div>

      {/* Step Components */}
      {step === 1 && <Step1 onNext={next} />}
      {step === 2 && <Step2 onNext={next} onBack={back} />}
      {step === 3 && <Step3 data={formData} />}
    </div>
  );
};

export default MultiStepForm;
