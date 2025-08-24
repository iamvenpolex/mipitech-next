"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{
    success?: boolean;
    message: string;
  } | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  const [loading, setLoading] = useState(false);

  // Scroll-to-top button handler
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        "service_sx7je2p",
        "template_jl619zh",
        { name: form.name, email: form.email, title: form.message },
        "zE80EUV7W9a19vWl0"
      )
      .then(
        () => {
          setStatus({ success: true, message: "Message sent successfully!" });
          setForm({ name: "", email: "", message: "" });
          setLoading(false);
        },
        () => {
          setStatus({
            success: false,
            message: "Failed to send message. Please try again.",
          });
          setLoading(false);
        }
      );
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative h-[40vh] flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/mipitech-contactbg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 p-6 text-center"
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl z-10 font-extrabold tracking-wide"
          >
            CONTACT <span className="text-blue-400">MIPITECH</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl capitalize"
          >
            Get in Touch with Us
          </motion.p>
        </motion.div>
      </section>

      {/* MAIN HEADING */}
      <section className="py-10 text-center">
        <h2 className="text-3xl font-bold">
          <span className="text-black">Get in </span>
          <span className="text-blue-600 ">Touch</span>
        </h2>
        <p className="mt-2 text-gray-700 max-w-xl mx-auto">
          Contact Mipitech - Best Web Designers in Nigeria via email, call or
          book a consultation. We typically reply within 24hrs.
        </p>
      </section>

      {/* CONTACT FORM & INFO */}
      <section className="grid md:grid-cols-2 gap-8 px-6 md:px-16">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-blue-400 rounded-lg outline-none focus:border-blue-600 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-blue-400 rounded-lg outline-none focus:border-blue-600 transition"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 border border-blue-400 rounded-lg outline-none focus:border-blue-600 transition"
          />
          {status && (
            <p
              className={`text-sm ${status.success ? "text-green-500" : "text-red-500"}`}
            >
              {status.message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg transition flex items-center gap-2 text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </button>
        </form>

        {/* INFO */}
        <div>
          <div className="space-y-4">
            <p className="flex items-center gap-3">
              <MapPin size={20} className="text-blue-500" /> 24, Red Block
              street, Behind University of Ibadan, Ibadan. Oyo State. Nigeria.
            </p>
            <p className="flex items-center gap-3">
              <Phone size={20} className="text-blue-500" /> +234 803 264 8367
            </p>
            <p className="flex items-center gap-3">
              <Mail size={20} className="text-blue-500" />{" "}
              support@mipitech.com.ng
            </p>
          </div>
          <iframe
            className="mt-4 w-full h-64 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.308637208051!2d3.379205!3d6.524379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b1b1d7b7b7b%3A0x3a84f3d6b7e7b6e!2sIbadan!5e0!3m2!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="grid md:grid-cols-4 gap-6 px-6 md:px-16 py-10">
        {/* WhatsApp */}
        <div className="p-6 bg-white border-2 border-green-500 text-green-700 rounded-xl shadow-md flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105">
          <MessageCircle size={28} />
          <span className="font-semibold text-lg">WhatsApp</span>
          <p className="text-sm text-center opacity-80">
            Quick responses via WhatsApp
          </p>
          <a
            href="https://wa.me/2348032648367"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-bold tracking-wide hover:bg-green-600 transition-colors duration-300"
          >
            <MessageCircle size={18} /> CHAT NOW
          </a>
        </div>

        {/* Schedule a Call */}
        <div className="p-6 bg-white border-2 border-purple-500 text-purple-700 rounded-xl shadow-md flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105">
          <Calendar size={28} />
          <span className="font-semibold text-lg">Schedule a Call</span>
          <p className="text-sm text-center opacity-80">
            Book a consultation session
          </p>
          <a
            href="https://wa.me/2348032648367"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg font-bold tracking-wide hover:bg-purple-600 transition-colors duration-300"
          >
            <Calendar size={18} /> BOOK NOW
          </a>
        </div>

        {/* Email Support */}
        <div className="p-6 bg-white border-2 border-red-500 text-red-700 rounded-xl shadow-md flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105">
          <Mail size={28} />
          <span className="font-semibold text-lg">Email Support</span>
          <p className="text-sm text-center opacity-80">
            Get detailed responses via email
          </p>
          <a
            href="mailto:support@mipitech.com.ng"
            className="mt-3 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-bold tracking-wide hover:bg-red-600 transition-colors duration-300"
          >
            <Mail size={18} /> SEND EMAIL
          </a>
        </div>

        {/* Create a Website */}
        <div className="p-6 bg-white border-2 border-blue-500 text-blue-700 rounded-xl shadow-md flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105">
          <Send size={28} />
          <span className="font-semibold text-lg text-center">
            Looking to Create a Website?
          </span>
          <p className="text-sm text-center opacity-80">
            Contact MIIPITECH - Top Web Design Company in Nigeria. We develop
            the best web apps!
          </p>
          <p className="text-xs text-center mt-1 opacity-70">
            Web Design Company in Lagos
          </p>
          <a
            href="/contact"
            className="mt-3 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-bold tracking-wide hover:bg-blue-600 transition-colors duration-300"
          >
            <Send size={18} /> CONTACT US
          </a>
        </div>
      </section>

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
    </div>
  );
}
