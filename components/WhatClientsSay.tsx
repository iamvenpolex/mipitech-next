"use client";

import { useState, useEffect } from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Adeola Akinyemi",
    country: "Nigeria",
    review:
      "Mipitech transformed our outdated website into a modern, responsive platform. Excellent service!",
    rating: 5,
  },
  {
    name: "Grace Johnson",
    country: "USA",
    review:
      "Professional team with great attention to detail. SEO results have been amazing.",
    rating: 4,
  },
  {
    name: "Chinedu Balogun",
    country: "Nigeria",
    review:
      "Fast delivery and a very sleek mobile app. I highly recommend them.",
    rating: 5,
  },
  {
    name: "Emily Clark",
    country: "UK",
    review:
      "They provided continuous support even after launching the project. Loved it!",
    rating: 5,
  },
  {
    name: "Olamide Adesina",
    country: "Nigeria",
    review:
      "The social media campaigns they ran for us really boosted our brand engagement.",
    rating: 4,
  },
];

export default function ClientTestimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="py-16 px-4 md:px-20 bg-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          What <span className="text-blue-600">Clients say</span>
        </h2>
        <p className="mt-4 text-gray-600 text-sm md:text-base">
          Hear from our happy clients across the globe.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl transition duration-500">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-700 text-lg italic mb-4">
            &ldquo;{testimonials[index].review}&rdquo;
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-blue-600">
                {testimonials[index].name}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[index].country}
              </p>
              <div className="flex mt-2 text-yellow-400">
                {Array(testimonials[index].rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg shadow-md transition-all duration-300 "
              onClick={handleNext}
            >
              Next <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
