"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

 

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQProps {
  items: FAQItem[];
}

export default function FAQSection({ items }: FAQProps) {
  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-b from-blue-50 to-pink-50 rounded-lg shadow">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        <span className="text-blue-600">Most</span> Asked Questions
      </h2>

      <Accordion type="single" collapsible className="w-[60%] m-auto space-y-2">
        {items.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border rounded-md px-4 bg-white"
          >
            <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
