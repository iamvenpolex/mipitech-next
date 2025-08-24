import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - Mipitech | Best Web Designers in Nigeria",
  description:
    "Read Mipitech's Disclaimer to understand our limitations of liability and professional advice policy.",
  keywords: [
    "Mipitech Disclaimer",
    "Web Design Nigeria",
    "Liability Statement",
    "Mipitech Legal",
  ],
  openGraph: {
    title: "Disclaimer - Mipitech",
    description:
      "Important disclaimer about Mipitech's liability and professional advice when offering our world-class web design services.",
    url: "https://mipitech.com.ng/disclaimer",
    siteName: "Mipitech",
    locale: "en_NG",
    type: "article",
  },
};

export default function Disclaimer() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          <span className="text-blue-600 ">Disclaimer</span>
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Effective Date: August 11, 2025
        </p>
      </div>

      {/* Intro */}
      <p className="mb-6 leading-relaxed">
        The information provided by{" "}
        <strong className="text-blue-600">Mipitech</strong> on{" "}
        <a
          href="https://mipitech.com.ng"
          className="text-blue-600 hover:underline"
        >
          mipitech.com.ng
        </a>{" "}
        is for general informational purposes only. All information is provided
        in good faith; however, we make no representation or warranty regarding
        the accuracy, adequacy, validity, reliability, or completeness of any
        information.
      </p>

      {/* Sections */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">External Links</h2>
        <p className="leading-relaxed">
          Our website may contain links to third-party websites. We are not
          responsible for the content, accuracy, or policies of these external
          sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Professional Advice</h2>
        <p className="leading-relaxed">
          Any advice provided on our website is for general information only and
          should not be taken as professional, financial, or legal advice. You
          should consult with a qualified professional before taking any action.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
        <p className="leading-relaxed">
          Under no circumstances shall Mipitech be liable for any damages
          arising from your use of the website or reliance on any information
          provided.
        </p>
      </section>

      {/* Contact Info */}
      <section className="bg-gray-50 p-6 rounded-lg shadow mt-12">
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions about this Disclaimer, please contact us:
        </p>
        <p className="mt-3">
          <strong> Email:</strong>{" "}
          <a
            href="mailto:support@mipitech.com.ng"
            className="text-blue-600 hover:underline"
          >
            support@mipitech.com.ng
          </a>
          <br />
          <strong> Address:</strong> 24, Red Block street, Behind University of
          Ibadan, Ibadan. Oyo State. Nigeria.
        </p>
      </section>
    </main>
  );
}
