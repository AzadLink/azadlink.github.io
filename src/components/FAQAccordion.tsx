"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`border rounded-xl transition-all ${
              isOpen
                ? "border-brand-400/30 bg-brand-400/5"
                : "border-white/5 bg-surface-800/50 hover:border-white/10"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-start"
            >
              <span
                className={`text-base font-medium transition-colors ${
                  isOpen ? "text-brand-400" : "text-white"
                }`}
              >
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 shrink-0 ms-4 text-neutral-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="px-6 text-sm text-neutral-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
