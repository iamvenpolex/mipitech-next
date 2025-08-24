"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Code,
  Globe,
  Smartphone,
  ShoppingCart,
  Server,
  Megaphone,
  ChevronUp,
} from "lucide-react";

// Lazy-loaded components
const TechStack = lazy(() => import("@/components/TechStack"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const FAQCTASection = lazy(() => import("@/components/FaqCtaSection"));

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "We build blazing-fast, SEO-friendly websites using the latest technologies like Next.js, React, and Node.js to help your business dominate online.",
  },
  {
    icon: Globe,
    title: "SEO & Digital Marketing",
    description:
      "Boost your visibility and rank higher on search engines with our proven SEO strategies and targeted digital marketing campaigns.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "From idea to launch, we design and develop mobile apps that deliver seamless performance on iOS and Android devices.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "We create custom online stores that convert, using Shopify, WooCommerce, and other top-tier e-commerce platforms.",
  },
  {
    icon: Server,
    title: "Web Hosting & Maintenance",
    description:
      "Your website is safe with us — we provide reliable hosting and ongoing maintenance to ensure maximum uptime and security.",
  },
  {
    icon: Megaphone,
    title: "Branding & Strategy",
    description:
      "We help brands stand out with powerful storytelling, unique visual identity, and growth-focused business strategies.",
  },
];

export default function Services() {
  const [showScroll, setShowScroll] = useState(false);

  // Scroll-to-top logic
  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <Image
          src="/mipitech-servicebg.webp"
          alt="Mipitech Services Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 capitalize"
          >
            <span className="text-blue-400">MIPITECH</span> SERVICES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-2xl text-gray-200"
          >
            Learn More About Who We Are, Our Mission, And How We Deliver
            Innovative Solutions To Help Your Business Thrive.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg  transition-all duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Curved Shape */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg
            className="relative block w-full h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 100"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,0 C960,160 960,-60 1920,0 L1920,100 L0,100 Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-4xl font-bold mb-4">
              What We Can{" "}
              <span className="relative text-blue-600">Do for You</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              At <strong className="text-blue-600">Mipitech</strong>, we deliver
              high-performance digital solutions that help businesses grow
              faster, reach more customers, and achieve sustainable success.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Whether you need a fast-loading website, mobile app, SEO strategy,
              or e-commerce store — we have the expertise to make it happen.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white  font-semibold rounded-lg shadow-lg  transition-all duration-300"
            >
              Let’s Work Together
            </Link>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/mipitch-servicesbg.jpg"
              alt="Mipitech Services"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <service.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHSTACK SECTION (Lazy Loaded) ===== */}
      <Suspense
        fallback={<div className="text-center py-10">Loading TechStack...</div>}
      >
        <TechStack />
      </Suspense>

      {/* ===== PORTFOLIO SECTION (Lazy Loaded) ===== */}
      <section id="portfolio">
        <Suspense
          fallback={
            <div className="text-center py-10">Loading Portfolio...</div>
          }
        >
          <PortfolioSection />
        </Suspense>
      </section>

      {/* ===== FAQ + CTA SECTION (Lazy Loaded) ===== */}
      <Suspense
        fallback={<div className="text-center py-10">Loading FAQ...</div>}
      >
        <FAQCTASection />
      </Suspense>

      {/* ===== WhatsApp Floating Button ===== */}
      <Link
        href="https://wa.me/2348032648367"
        target="_blank"
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg animate-bounce z-50"
      >
        <Image src="/WhatsApp.svg.webp" alt="WhatsApp" width={30} height={30} />
      </Link>

      {/* ===== Scroll-to-Top Button ===== */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
