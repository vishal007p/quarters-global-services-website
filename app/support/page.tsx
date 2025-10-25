"use client";
import React from "react";
import { Mail, Phone, ShieldCheck, FileText, BookOpen } from "lucide-react";

const SupportPage = () => {
  const sections = [
    {
      id: 1,
      title: "Help Center",
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      desc: "Find quick answers to common questions and guides on how to use our services efficiently.",
      link: "/help",
      color: "from-blue-50 to-blue-100",
    },
    {
      id: 2,
      title: "Support",
      icon: <Phone className="w-8 h-8 text-green-600" />,
      desc: "Need assistance? Our support team is here to help you resolve any issues or inquiries.",
      link: "/contact",
      color: "from-green-50 to-green-100",
    },
    {
      id: 3,
      title: "Legal",
      icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
      desc: "Review our legal terms, disclaimers, and agreements that outline your rights and responsibilities.",
      link: "/legal",
      color: "from-purple-50 to-purple-100",
    },
    {
      id: 4,
      title: "Policies",
      icon: <FileText className="w-8 h-8 text-orange-600" />,
      desc: "Understand how we handle privacy, data, and compliance through our comprehensive policies.",
      link: "/privacy-policy",
      color: "from-orange-50 to-orange-100",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-20">
      <section className="max-w-6xl mx-auto text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
          Support & Information Center
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Explore resources, policies, and legal information — all in one place.
        </p>
      </section>

      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <a
            key={section.id}
            href={section.link}
            className={`group rounded-2xl bg-gradient-to-b ${section.color} p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              {section.icon}
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                {section.title}
              </h2>
              <p className="text-sm text-gray-600">{section.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};

export default SupportPage;
