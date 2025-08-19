"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";
import TechStack from "@/components/TechStack";
import { motion } from "framer-motion";
import {
  Users,
  Rocket,
  Award,
  Headphones,
  Clock,
  Shield,
  Briefcase,
  ShoppingCart,
  Search,
  Smartphone,
  Wrench,
  Code,
} from "lucide-react";

// Lazy-loaded components for performance
const FAQCTASection = dynamic(() => import("@/components/FaqCtaSection"), {
  ssr: false,
});
const WhatClientsSay = dynamic(() => import("@/components/WhatClientsSay"), {
  ssr: false,
});
const PortfolioSection = dynamic(
  () => import("@/components/PortfolioSection"),
  { ssr: false }
);
const LatestArticles = dynamic(() => import("@/components/LatestArticles"), {
  ssr: false,
});

export default function HomePage() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="relative">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/mipitech-homeherobg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 capitalize"
          >
            WELCOME TO <span className="text-blue-400">MIPITECH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl capitalize"
          >
            Your One-Stop Solution For Web Design, SEO, App Development & More.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 flex justify-center"
          >
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-20">
          <svg
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            className="w-full h-24 md:h-32 animate-[wave_8s_linear_infinite]"
          >
            <path
              d="M0,50 C150,150 350,-50 600,50 C850,150 1050,-50 1200,50 L1200,150 L0,150 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 animate-gradient">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h2 className="text-3xl font-bold">
              <span className="text-black">About</span>{" "}
              <span className="text-blue-600 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-black after:to-blue-500 after:mt-1">
                Mipitech
              </span>
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl">
              At Mipitech, we provide modern solutions for web design, mobile
              apps, SEO, and digital growth. We help businesses thrive online
              through tailored strategies and tech expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 fade-in">
            {[Headphones, Users, Clock, Shield].map((Icon, i) => {
              const titles = [
                "24/7 Support",
                "200+ Clients",
                "Quick Turnaround",
                "Secure & Reliable",
              ];
              const descs = [
                "We’re always here to assist.",
                "Trusted by people worldwide.",
                "Projects delivered fast.",
                "Top security practices.",
              ];
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white p-4 rounded-lg shadow cursor-pointer transition hover:scale-105"
                >
                  <Icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-lg">{titles[i]}</h4>
                    <p className="text-sm text-gray-600">{descs[i]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center px-4 fade-in">
          {[Briefcase, Rocket, Award].map((Icon, i) => {
            const titles = ["Our Key Service", "Our Mission", "Our Vision"];
            const descs = [
              "Delivering tailored tech solutions for every business type.",
              "Empowering businesses with modern, fast, and efficient web & app solutions.",
              "To be the go-to tech partner for small and medium businesses across Africa.",
            ];
            return (
              <div key={i} className="bg-white rounded-xl shadow-md p-6">
                <Icon className="w-10 h-10 mx-auto text-blue-600 mb-2" />
                <h4 className="text-xl font-semibold mb-2 text-blue-600">
                  {titles[i]}
                </h4>
                <p className="text-gray-600 text-sm">{descs[i]}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/about"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition inline-block"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* ===== TECHSTACK SECTION ===== */}
      <TechStack />

      {/* ===== WHAT WE CAN DO FOR YOU SECTION ===== */}
      <section className="py-20 bg-white text-center fade-in">
        <h2 className="text-3xl font-bold mb-10">
          <span className="text-blue-600 underline underline-offset-4">
            What
          </span>{" "}
          We Can Do For You
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 max-w-6xl mx-auto">
          {[ShoppingCart, Search, Smartphone, Wrench, Users, Code].map(
            (Icon, i) => {
              const titles = [
                "Ecommerce Web Design",
                "SEO Optimization",
                "Mobile App Development",
                "Website Maintenance",
                "Social Media Management",
                "Custom Web Solutions",
              ];
              const descs = [
                "Online stores that are fast, secure, and easy to manage.",
                "Get found on Google and grow your website traffic.",
                "iOS and Android apps built for performance and usability.",
                "Keep your site updated, secure, and running smoothly.",
                "Grow your brand and audience with content that converts.",
                "Web platforms tailored to your business needs.",
              ];
              return (
                <div
                  key={i}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  <Icon className="text-blue-600 mb-4" size={36} />
                  <h3 className="font-semibold text-lg mb-2">{titles[i]}</h3>
                  <p className="text-gray-600">{descs[i]}</p>
                </div>
              );
            }
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition inline-block"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* ===== DYNAMIC SECTIONS ===== */}
      <WhatClientsSay />
      <section id="portfolio">
        <PortfolioSection />
      </section>
      <LatestArticles />
      <section id="faq">
        <FAQCTASection />
      </section>

      {/* ===== WhatsApp Floating Button ===== */}
      <Link
        href="https://wa.me/2348032648367"
        target="_blank"
        rel="noopener noreferrer"
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
    </main>
  );
}
