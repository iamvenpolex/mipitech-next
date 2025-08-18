"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  PenLine,
  Folder,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = {
  name: string;
  path: string;
  icon: ReactNode;
  sectionId?: string;
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks: NavLink[] = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <User size={18} /> },
    { name: "Services", path: "/services", icon: <Briefcase size={18} /> },
    {
      name: "Portfolio",
      path: "/",
      sectionId: "portfolio",
      icon: <Folder size={18} />,
    },
    { name: "Blog", path: "/blog", icon: <PenLine size={18} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      // Already on homepage, scroll to portfolio section
      const el = document.getElementById("portfolio");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage with hash
      router.push("/#portfolio");
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ${
        scrolled ? "h-16" : "h-20"
      } flex items-center`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto w-full px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/mipitech-logo.png"
            alt="Mipitech Logo"
            width={scrolled ? 100 : 120}
            height={scrolled ? 100 : 120}
          />
        </Link>

        <div className="flex space-x-8">
          {navLinks.map((link) =>
            link.name === "Portfolio" ? (
              <a
                key={link.name}
                href="#portfolio"
                onClick={handlePortfolioClick}
                className={`uppercase font-semibold relative group transition-all duration-300 ${
                  scrolled ? "text-sm" : "text-base"
                } text-gray-800 hover:text-blue-500`}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all"></span>
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.path}
                className={`uppercase font-semibold relative group transition-all duration-300 ${
                  scrolled ? "text-sm" : "text-base"
                } ${
                  pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-800 hover:text-blue-500"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-blue-500 transition-all ${
                    pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            )
          )}
        </div>

        <div className="w-10"></div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 w-full">
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6 text-gray-800" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/mipitech-logo.png"
            alt="Mipitech Logo"
            width={scrolled ? 80 : 80}
            height={scrolled ? 80 : 80}
          />
        </Link>

        <div className="w-6 h-6"></div>
      </div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-blue-600">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.name === "Portfolio" ? (
                  <a
                    key={link.name}
                    href="#portfolio"
                    onClick={handlePortfolioClick}
                    className="flex items-center gap-3 text-base text-gray-800 hover:text-blue-500"
                  >
                    {link.icon}
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 text-base ${
                      pathname === link.path
                        ? "text-blue-600 font-bold"
                        : "text-gray-800 hover:text-blue-500"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
