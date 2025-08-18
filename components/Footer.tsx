"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiX } from "react-icons/si"; // <-- X logo
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const socialLinks = [
    {
      icon: <FaFacebookF color="#1877F2" />,
      href: "https://facebook.com/mipitech",
    },
    {
      icon: <SiX color="#000000" />,
      href: "https://twitter.com/mipitech",
    },
    {
      icon: <FaInstagram color="#C13584" />,
      href: "https://instagram.com/mipitech_",
    },
    {
      icon: <FaTiktok color="#000000" />,
      href: "https://tiktok.com/@mipitech",
    },
    {
      icon: <FaWhatsapp color="#25D366" />,
      href: "https://wa.me/2348032648367",
    },
    {
      icon: <FaYoutube color="#FF0000" />,
      href: "https://youtube.com/@mipitech",
    },
  ];

  const quickLinks = ["About", "Services", "Portfolio", "Blog", "Contact"];

  // Handle smooth scroll after page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "portfolio") {
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    }
  }, [pathname]);

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      const el = document.getElementById("portfolio");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#portfolio");
    }
  };

  return (
    <footer className="bg-white text-gray-800 py-10 px-6 md:px-20 border-t border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Motto */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Image
              src="/mipitech-logo.png"
              alt="Mipitech Logo"
              width={120}
              height={40}
            />
          </Link>
          <p className="text-sm italic text-gray-600">
            Your One-Stop Solution For Web Design, SEO, App Development &
            More...
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-blue-600 text-lg font-semibold mb-2 border-b-2 w-fit border-gradient-to-r from-black to-blue-500">
            Quick Links
          </h4>
          <ul className="space-y-1">
            {quickLinks.map((item) => (
              <li key={item}>
                {item === "Portfolio" ? (
                  <a
                    href="#portfolio"
                    onClick={handlePortfolioClick}
                    className="hover:text-blue-600 transition-all duration-300 relative inline-block group"
                  >
                    {item}
                    <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </a>
                ) : (
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-blue-600 transition-all duration-300 relative inline-block group"
                  >
                    {item}
                    <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-blue-600 text-lg font-semibold mb-2 border-b-2 w-fit border-gradient-to-r from-black to-blue-500">
            Legal
          </h4>
          <ul className="space-y-1">
            {["Privacy Policy", "Terms and Conditions", "Disclaimer"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-blue-600 transition-all duration-300 relative inline-block group"
                  >
                    {item}
                    <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-blue-600 text-lg font-semibold mb-2 border-b-2 w-fit border-gradient-to-r from-black to-blue-500">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-600" />
              24, Red Block street, Behind University of Ibadan, Ibadan. Oyo
              State. Nigeria
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" />
              +234 803 264 8367
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-600" />
              support@mipitech.com.ng
            </li>
          </ul>
        </div>
      </div>

      {/* Socials */}
      <div className="mt-8 flex gap-4 justify-center">
        {socialLinks.map(({ icon, href }, i) => (
          <motion.a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl p-2 rounded-full hover:scale-110 transition-all duration-300"
            whileHover={{ scale: 1.2 }}
          >
            {icon}
          </motion.a>
        ))}
      </div>

      {/* Legal Bottom */}
      <div className="text-center text-sm mt-8 pt-6 border-t border-gray-200">
        © {year}{" "}
        <Link
          href="/"
          className="text-blue-600 font-bold uppercase hover:underline"
        >
          Mipitech
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
}
