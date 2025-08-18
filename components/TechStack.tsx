"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Tech = {
  src: string;
  label: string;
};

const techStack: Tech[] = [
  { src: "/html5-logo.png", label: "HTML" },
  { src: "/css3-logo.png", label: "CSS" },
  { src: "/js5-logo.png", label: "JavaScript" },
  { src: "/python-logo.png", label: "Python" },
  { src: "/django-logo.png", label: "Django" },
  { src: "/bootstrap-logo.png", label: "Bootstrap" },
  { src: "/MySQL-Logo.wine.svg", label: "MySQL" },
  { src: "/react-logo.png", label: "React JS" },
  { src: "/nodejs-1-logo.png", label: "Node JS" },
  { src: "/next-js-logo-png_seeklogo-321806.png", label: "Next.js" },
  { src: "/woocommerce-logo-1200x900-cropped.png", label: "WooCommerce" },
  { src: "/wordpress-logo.png", label: "WordPress" },
  { src: "/Shopify-Logo.wine.png", label: "Shopify" },
];

export default function TechStack() {
  return (
    <section className="py-16 bg-white text-center overflow-hidden">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4 inline-block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="text-black">Our</span>{" "}
        <span className="text-blue-500 relative inline-block">
          Tech Stack
          <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-blue-500 to-black rounded"></span>
        </span>
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto mb-10 text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        We work with the most powerful technologies in the industry to deliver
        world-class solutions. From front-end to back-end, we’ve got you
        covered.
      </motion.p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 w-max px-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }}
        >
          {[...techStack, ...techStack].map(({ src, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded shadow-sm hover:shadow-md hover:bg-gray-200 transition-all duration-300 group min-w-[120px] sm:min-w-[100px]"
            >
              <Image
                src={src}
                alt={label}
                width={70}
                height={70}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-medium text-sm text-gray-800">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
