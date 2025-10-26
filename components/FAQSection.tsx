"use client";

import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useEffect, useState } from "react";
import { FaqsDatas } from "@/app/data/FaqsDatas";

type FAQItem = {
  title: string;
  description: string;
};

interface FAQSectionProps {
  items?: FAQItem[];
}

const formatCountryName = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const normalize = (str: string) => str.toLowerCase().replace(/[\s\/]+/g, "-");

export default function FAQSection({ items = [] }: FAQSectionProps) {
  const searchParams = useSearchParams();
  const toCountrySlug = searchParams.get("toCountrySlug") || "";
  const categorySlug = searchParams.get("Slug") || "";
  const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>(items);

  useEffect(() => {
    if (!toCountrySlug || !FaqsDatas) return;

    const serviceType =
      (typeof window !== "undefined"
        ? sessionStorage.getItem("main_service_type")
        : "visa"
      )?.toLowerCase() || "visa";

    const mainType = (
      serviceType in FaqsDatas ? serviceType : "visa"
    ) as keyof typeof FaqsDatas;

    const countryKey = Object.keys(FaqsDatas[mainType] || {}).find(
      (key) => normalize(key) === normalize(toCountrySlug)
    );

    if (!countryKey) {
      setFilteredFaqs(items);
      return;
    }

    const countryData =
      FaqsDatas[mainType][
        countryKey as keyof (typeof FaqsDatas)[typeof mainType]
      ];
    const categoryKey = categorySlug
      ? Object.keys(countryData || {}).find(
          (key) => normalize(key) === normalize(categorySlug)
        )
      : null;

    let faqsData: FAQItem[] = [];
    if (countryData) {
      faqsData = categoryKey
        ? (countryData[categoryKey as keyof typeof countryData] as FAQItem[])
        : (Object.values(countryData).flat() as FAQItem[]);
    }

    setFilteredFaqs(faqsData);
  }, [toCountrySlug, categorySlug, items]);

  const countryName = toCountrySlug ? formatCountryName(toCountrySlug) : "";

  return (
    <div className="w-full mx-auto p-4 sm:p-6 md:p-8 bg-gradient-to-b from-blue-50 to-pink-50 rounded-lg shadow">
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        <span className="text-blue-600">
          Most Asked Questions
          {countryName && ` for ${countryName}`}
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full sm:w-[80%] md:w-[60%] m-auto space-y-2"
      >
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border rounded-md px-3 sm:px-4 py-2 bg-white"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline text-sm sm:text-base">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm sm:text-base">
                {faq.description}
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p className="text-center text-gray-500">No FAQs found.</p>
        )}
      </Accordion>
    </div>
  );
}
