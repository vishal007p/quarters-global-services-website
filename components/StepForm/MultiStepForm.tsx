"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Image from "next/image";
import { getPlatformServices } from "@/lib/platformServiceStorage";

const steps = [
  { id: 1, label: "Traveler Info" },
  { id: 2, label: "Shipping/Billing" },
  { id: 3, label: "Order Confirmation" },
  { id: 4, label: "Thank You" },
];

const MultiStepForm = () => {
  const [step] = useState(1);

  // ✅ Dynamic values
  const [prices, setPrices] = useState<number[]>([]);
  const [currency, setCurrency] = useState<string>("USD");
  const [total, setTotal] = useState<number>(0);

  // ✅ Static fixed fees
  const CONSULAR_FEE = 798.42;
  const MONEY_ORDER_FEE = 5.0;
  const SERVICE_FEE = 10.0;
  const VFS_FEE = 150.0;
  
  useEffect(() => {
    const stored = getPlatformServices();

    if (stored && stored.length > 0) {
      // 🧹 Filter out invalid or zero-price services
      const validServices = stored.filter((s) => Number(s.price) > 0);

      // ✅ Extract only valid prices
      const allPrices = validServices.map((s) => Number(s.price));
      const curr = validServices[0]?.currency || "USD";

      setPrices(allPrices);
      setCurrency(curr);

      // ✅ Loop to add all dynamic prices
      const totalDynamic = allPrices.reduce((sum, p) => sum + p, 0);

      // ✅ Add static fixed fees once
      const totalValue =
        totalDynamic + CONSULAR_FEE + MONEY_ORDER_FEE + SERVICE_FEE + VFS_FEE;

      setTotal(totalValue);
    } else {
      // ✅ Fallback total (no dynamic services)
      const totalValue =
        CONSULAR_FEE + MONEY_ORDER_FEE + SERVICE_FEE + VFS_FEE;
      setTotal(totalValue);
    }
  }, []);


  return (
    <div className="w-full mx-auto">
      {/* Step Indicator */}
      <div className="bg-[#96C6FF] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white text-center mb-10">
            Checkout
          </h1>

          <div className="relative flex items-center justify-between">
            {/* Animated Connector */}
            <div className="absolute top-5 left-1/12 w-[80%] h-1 bg-[#00408D] rounded-full overflow-hidden">
              <div
                className="h-1 bg-red-600 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 150}%` }}
              ></div>
            </div>

            {/* Step Circles */}
            {steps.slice(0, 3).map((s) => {
              const isActive = step === s.id;
              const isCompleted = step > s.id;

              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center relative z-10"
                  style={{ width: "20.333%" }}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold transition-all duration-300
                    ${isActive
                        ? "bg-red-600 text-white scale-110 shadow-lg"
                        : isCompleted
                          ? "bg-white border-2 border-red-600 text-red-600"
                          : "bg-white border-2 border-[#00408D] text-[#00408D]"
                      }`}
                  >
                    {s.id}
                  </div>
                  <div
                    className={`mt-3 text-center font-medium text-sm transition-colors duration-300
                    ${isActive
                        ? "text-white"
                        : isCompleted
                          ? "text-red-600"
                          : "text-[#00408D]"
                      }`}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conditional Layout */}
      {step === 4 ? (
        <div className="max-w-3xl mx-auto text-center bg-white p-12 rounded-lg shadow-lg relative">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Thank you for your order!
          </h2>
          <p className="text-gray-700">
            Your order has been successfully processed. A confirmation email has
            been sent to you.
          </p>
        </div>
      ) : (
        <div className="flex gap-8 justify-between mt-6">
          {/* Form Steps */}
          <div className={`${step === 3 ? "w-full" : "w-1/2 ml-4"}`}>
            {step === 1 && <Step1 />}
            {step === 3 && <Step3 />}
          </div>

          {/* Sticky Order Summary */}
          {(step === 1 || step === 2) && (
            <div className="w-1/4">
              <div className="sticky top-20 pr-3">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-[#00408D] text-white p-4">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                  </div>

                  <div className="p-6 space-y-4 text-sm">
                    {/* ✅ Loop all dynamic services */}
                    {prices.filter((p) => p > 0).length > 0 ? (
                      prices
                        .filter((p) => p > 0)
                        .map((p, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center py-2 border-b last:border-none"
                          >
                            <span className="font-medium text-gray-700 flex items-center gap-2">
                              <Image
                                width={150}
                                height={150}
                                src="/flag.png"
                                alt="India Flag"
                                className="w-4 h-4 rounded-full"
                              />
                              Service #{idx + 1}
                            </span>
                            <span className="text-gray-900 font-semibold">
                              {currency} {p.toFixed(2)}
                            </span>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-500 text-center py-3">
                        No service selected yet.
                      </p>
                    )}


                    {/* ✅ Static Fees */}
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700">
                        Consular Fee
                      </span>
                      <span className="text-gray-900">
                        ${CONSULAR_FEE.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700">
                        Money Order Fee
                      </span>
                      <span className="text-gray-900">
                        ${MONEY_ORDER_FEE.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700">
                        Service Fee
                      </span>
                      <span className="text-gray-900">
                        ${SERVICE_FEE.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700">
                        VFS Mandatory Service Fee
                      </span>
                      <span className="text-gray-900">
                        ${VFS_FEE.toFixed(2)}
                      </span>
                    </div>

                    {/* ✅ Total */}
                    <div className="flex justify-between items-center border-t pt-4 font-bold text-base">
                      <span>Total</span>
                      <span>
                        {currency} {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="mt-6 space-y-3">
                  <button className="w-full border border-dashed border-black text-black text-xs py-2 rounded">
                    Add New Visa Service
                  </button>
                  <button className="w-full border border-dashed border-black text-black text-xs py-2 rounded">
                    Passport Services
                  </button>
                  <button className="w-full border border-dashed border-black text-black text-xs py-2 rounded">
                    Document Services
                  </button>
                  <button className="w-full border border-dashed border-black text-black text-xs py-2 rounded">
                    Consultancy Service
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
