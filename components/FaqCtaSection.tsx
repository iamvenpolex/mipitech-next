// components/FAQCTASection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "Project duration depends on the scope, but typical websites take 2–4 weeks. We'll give you a detailed timeline after our first contact.",
  },
  {
    question: "Do you offer website maintenance?",
    answer:
      "Yes! We offer ongoing support, content updates, backups, and security patches  to keep your site secure, updated, and fast.",
  },
  {
    question: "Can I update the site myself?",
    answer:
      "Absolutely. We use user-friendly platforms that allow you to edit content without code, and we can train you on how to manage your content.",
  },
  {
    question: "Do you build mobile apps too?",
    answer:
      "Yes, we develop fast and user-friendly mobile apps for iOS and Android using modern frameworks like React Native.",
  },
  {
    question: "What is the pricing for your web development services?",
    answer:
      "Pricing varies depending on the complexity of the project. Contact us for a free quote tailored to your needs.",
  },
  {
    question: "What types of websites do you create?",
    answer:
      "We build various types of websites including VTU portals, ecommerce stores, blogs, educational platforms, portfolios, and service-based business sites.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "We’ll need your business goals, preferred design style, content (text/images), and any examples or references you like. We’ll discuss everything during onboarding.",
  },
];

export default function FAQCTASection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          <span className="text-blue-600">Frequently</span> Asked Questions
        </h2>
        <p className="text-gray-600 mt-2">Your questions answered clearly.</p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-sm text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white mt-16 py-12 px-4 rounded-xl shadow-lg text-center">
        <h3 className="text-2xl font-semibold mb-3">Still have questions?</h3>
        <p className="mb-6">Let's chat about your goals and how we can help.</p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-300"
        >
          Contact Us
        </motion.a>
      </div>
    </section>
  );
}
