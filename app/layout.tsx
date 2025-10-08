import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://mipitech.com.ng"),
  title: "MIPITECH - Best Website Designer in Nigeria",
  description:
    "MIPITECH is Nigeria’s leading web design, SEO, and app development company. We deliver high-quality, fast, and scalable digital solutions.",
  keywords: [
    "web design Nigeria",
    "best web developers in Nigeria",
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
        url: "/mipitech-logowithbg.jpg",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T86LYK9DQG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T86LYK9DQG');
          `}
        </Script>

        {/* ✅ Google AdSense Snippet */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8225791861413366"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
