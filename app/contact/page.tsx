import type { Metadata } from "next";
import Contact from "./contact";

export const metadata: Metadata = {
  title: "Contact Us | Mipitech",
  description:
    "Get in touch with Mipitech for web development, mobile apps, SEO, and more. We are here to help your business grow.",
  keywords: [
    "web development",
    "tech tutorials",
    "beginner guides",
    "tools for coding",
    "contact mipitech",
    "best software developer in nigeria",
    "nigeria best web developer",
    "resources",
    "Mipitech contact",
    "SEO experts in Nigeria",
    "best web developers in nigeria",
    "best web developer in Lagos",
    "best web designers in nigeria",
  ],
  openGraph: {
    title: "Contact Us | Mipitech",
    description:
      "Reach out to Mipitech today for expert digital solutions tailored to your business.",
    url: "https://mipitech.com.ng/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://mipitech.com.ng/contact", // ✅ Add this
  },
};

export default function ContactPage() {
  return <Contact />;
}
