import type { Metadata } from "next";
import AboutHero from "@/app/about/About";

export const metadata: Metadata = {
  title: "About Mipitech | Best Web Design Company in Nigeria",
  description:
    "Learn more about Mipitech, Nigeria's top website design and development company. Discover our mission, values, and commitment to delivering high-quality web solutions.",
  keywords: [
    "about Mipitech",
    "web design company Nigeria",
    "website developers Lagos",
    "SEO experts Nigeria",
    "best website designers in Nigeria",
    "best web developer in Nigeria",
    "website designers Nigeria",
  ],
  openGraph: {
    title: "About Mipitech | Best Web Design Company in Nigeria",
    description:
      "Mipitech is Nigeria's top website design and development company. Learn about our journey, mission, and values.",
    url: "https://mipitech.com.ng/about",
    siteName: "Mipitech",
    images: [
      {
        url: "/mipitech-logowithbg.jpg",
        width: 1200,
        height: 630,
        alt: "Mipitech Team and Office",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
    </>
  );
}
