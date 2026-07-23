"use client";

import { useMemo, useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  id?: string;
}

export default function FaqAccordion({ items, title = "Frequently asked questions", id = "faq-accordion" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = useMemo(() => {
    if (!items.length) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <section id={id} className="mb-8 scroll-mt-24 rounded-md border border-navy-800/10 bg-white p-6 shadow-sm">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h2 className="mb-5 font-serif text-xl font-bold text-navy-900">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={`${item.question}-${index}`} className="rounded-md border border-navy-800/10 bg-gray-50">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-navy-900"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="break-words">{item.question}</span>
                <span className="ml-4 text-lg text-gold-500">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen ? <p className="px-4 pb-4 text-sm leading-7 text-gray-700">{item.answer}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
