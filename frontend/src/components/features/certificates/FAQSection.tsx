'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/certificates';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-sm transition-all hover:border-primary-300"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600">
                Q
              </span>
              <span className="font-semibold text-gray-900">
                {faq.question}
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openIndex === index && (
            <div className="border-t-2 border-gray-100 bg-gray-50 p-6">
              <div className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                  A
                </span>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
