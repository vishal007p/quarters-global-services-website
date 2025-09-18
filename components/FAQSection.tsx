"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

 const faqData = [
  {
    question: "Can I apply for a passport online through Quartus?",
    answer:
      "Yes! We help you complete your application digitally and guide you through the submission process, including document uploads and form preparation.",
  },
  {
    question: "What documents are required for a new passport?",
    answer: "You will typically need proof of identity, proof of citizenship, and passport-sized photos.",
  },
  {
    question: "What if my passport is damaged or unreadable?",
    answer: "You may need to apply for a replacement with additional documentation.",
  },
  {
    question: "Do I need to send my original passport for renewal or updates?",
    answer: "Yes, original passports are generally required during renewal.",
  },
  {
    question: "How long does passport processing take?",
    answer: "Processing times vary by country but usually take between 2 to 8 weeks.",
  },
];


type FAQItem = {
  question: string;
  answer: string;
};

 

export default function FAQSection( ) {
  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-b from-blue-50 to-pink-50 rounded-lg shadow">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        <span className="text-blue-600">Most</span> Asked Questions
      </h2>

      <Accordion type="single" collapsible className="w-[60%] m-auto space-y-2">
        {faqData.map((faq, idx) => (
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
