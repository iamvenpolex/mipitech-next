import type { Metadata } from "next";
import Contact from "./contact";

export const metadata: Metadata = {
  title: "Contact Us | Mipitech",
  description:
    "Get in touch with Mipitech for web development, mobile apps, SEO, and more. We’re here to help your business grow.",
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
