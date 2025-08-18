import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://mipitech.com.ng"), // ✅ sets the base domain
  title: "MIPITECH - Best Website Designer in Nigeria",
  description:
    "MIPITECH is Nigeria’s leading web design, SEO, and app development company. We deliver high-quality, fast, and scalable digital solutions.",
  keywords: [
    "web design Nigeria",
    "website development",
    "SEO services Nigeria",
    "app development",
    "MIPITECH",
    "best web designers in Nigeria",
  ],
  openGraph: {
    title: "MIPITECH - Best Website Designer in Nigeria",
    description:
      "Your One-Stop Solution For Web Design, SEO, App Development & More...",
    url: "https://mipitech.com.ng",
    siteName: "MIPITECH",
    images: [
      {
        url: "/mipitech-logowithbg.jpg", // ✅ make sure this is in /public (1200x630 recommended)
        width: 1200,
        height: 630,
        alt: "MIPITECH Web Design Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mipitech",
    title: "MIPITECH - Best Website Designer in Nigeria",
    description:
      "Nigeria’s leading web design, SEO, and app development company.",
    images: ["/mipitech-logowithbg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mipitech.com.ng",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
