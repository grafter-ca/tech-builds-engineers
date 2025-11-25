"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We provide CAD design, mechanical engineering coaching, web development, and embedded systems training.",
  },
  {
    question: "Do you offer 1:1 coaching?",
    answer:
      "Yes, we provide personalized 1-on-1 coaching sessions for CAD, programming, and engineering courses.",
  },
  {
    question: "Can I book a project consultation?",
    answer:
      "Absolutely! You can book a project consultation for mechanical design, prototyping, or software development.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full px-6 lg:px-20 py-12">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">
        Frequently Asked Questions
      </h2>

      <div className="max-w-[900px] w-full space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <details
              key={index}
              open={isOpen}
              className="group border  border-gray-200 rounded-xl p-5 cursor-pointer"
              onClick={(e) => {
                e.preventDefault(); // prevent auto-toggle
                setOpenIndex(isOpen ? null : index);
              }}
            >
              {/* Summary */}
              <summary className="flex items-center justify-between font-semibold text-lg list-none">
                {faq.question}

                <span className="transition-transform duration-300">
                  {isOpen ? (
                    <Minus className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-blue-600" />
                  )}
                </span>
              </summary>

              {/* Answer */}
              <p className="mt-4 text-gray-600 transition-all duration-300">
                {faq.answer}
              </p>
            </details>
          );
        })}
      </div>
    </section>
  );
}
