"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Info,
  Zap,
  Smartphone,
  Globe,
  Search,
  Target,
  Eye,
  Briefcase,
  ChevronUp,
} from "lucide-react";

// Lazy-loaded components
const TechStack = lazy(() => import("@/components/TechStack"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const FAQCTASection = lazy(() => import("@/components/FaqCtaSection"));

export default function AboutHero() {
  const [showScroll, setShowScroll] = useState(false);

  // Scroll listener for Scroll-to-Top button
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
          src="/mipitech-abouthero.jpg"
          alt="About Mipitech"
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
            ABOUT <span className="text-blue-500">MIPITECH</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200"
          >
            Learn more about who we are, our mission, and how we deliver
            innovative solutions to help your business thrive.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
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

      {/* ABOUT US SECTION */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Info className="text-blue-600 w-8 h-8" />
              <h2 className="text-3xl font-bold">
                <span className="text-black">About</span>{" "}
                <span className="text-blue-600 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-black after:to-blue-500 after:mt-1">
                  Mipitech
                </span>
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              At <span className="font-semibold text-blue-600">Mipitech</span>,
              we pride ourselves on being the{" "}
              <strong>leading web solutions provider in Nigeria</strong>. Our
              team of creative minds and technical experts is committed to
              building digital experiences that look stunning and perform
              flawlessly.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              From concept to deployment, we focus on delivering excellence with
              every project. We blend modern design, fast performance, and smart
              marketing strategies to help our clients succeed in an
              ever-evolving digital world. Whether you&apos;re a small business
              or a large corporation, we have the skills and passion to take
              your brand to the next level.
            </p>
          </div>

          <div className="relative w-full h-80 md:h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/mipitech-herobg.webp"
              alt="Our Team at Work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, staggerChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-center"
        >
          {[
            { icon: Zap, title: "Fast-Loading Designs" },
            { icon: Smartphone, title: "Mobile-Friendly" },
            { icon: Search, title: "SEO Optimized" },
            { icon: Globe, title: "Global Reach" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center"
            >
              <feature.icon className="text-blue-600 w-10 h-10 mb-3" />
              <h4 className="font-semibold text-gray-800">{feature.title}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MISSION, VISION, KEY SERVICES */}
      <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower businesses with high-performing digital solutions that
              drive growth, increase visibility, and deliver measurable results.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be the most trusted and innovative digital solutions provider
              in Nigeria and beyond, shaping the future of online experiences.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Our Key Services</h3>
            <p className="text-gray-600">
              We specialize in web development, UI/UX design, SEO, and digital
              marketing — delivering world-class solutions for brands of all
              sizes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 py-16 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Our expert team is here to build fast, mobile-friendly, and
            SEO-optimized solutions that will help your brand stand out online.
          </p>
          <Link
            href="/services"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            View Our Services
          </Link>
        </motion.div>

        <div className="absolute top-0 left-0 w-full h-full bg-[url('/cta-bg-pattern.svg')] bg-cover opacity-10"></div>
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
