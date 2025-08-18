import type { Metadata } from "next";
import Services from "./services";

export const metadata: Metadata = {
  title:
    "Our Services | Mipitech - Web Design, SEO, and App Development in Nigeria",
  description:
    "Mipitech offers professional web design, SEO, e-commerce, and mobile app development services in Nigeria and globally. We create fast, mobile-friendly, and SEO-optimized solutions tailored to your business growth.",
  keywords: [
    "web design Nigeria",
    "SEO services Nigeria",
    "e-commerce development",
    "mobile app development",
    "branding and marketing",
    "best web design company Nigeria",
    "Next.js development Nigeria",
  ],
  openGraph: {
    title: "Our Services | Mipitech - Web Design, SEO, and App Development",
    description:
      "Mipitech provides cutting-edge digital solutions including web design, SEO, e-commerce, mobile apps, and branding for businesses in Nigeria and worldwide.",
    url: "https://mipitech.com.ng/services",
    siteName: "Mipitech",
    images: [
      {
        url: "https://mipitech.com.ng/mipitech-logowithbg.jpg",
        width: 1200,
        height: 630,
        alt: "Mipitech Web Design and Development Services",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
};

export default function ServicesPage() {
  return <Services />;
}
