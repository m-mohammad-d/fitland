"use client";

import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQList = ({ faqData }: { faqData: FAQItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqData.map((item, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <button className="flex w-full items-center justify-between px-6 py-4 text-right focus:outline-none" onClick={() => toggleAccordion(index)}>
            <span className="text-lg font-medium text-gray-900">{item.question}</span>
            <FaAngleDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${openIndex === index ? "rotate-180 transform" : ""}`} />
          </button>
          <div className={`overflow-hidden px-6 transition-all duration-200 ${openIndex === index ? "max-h-96 pb-4" : "max-h-0"}`}>
            <p className="leading-relaxed text-gray-600">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQList;
