import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Mipitech | Best Web Designers in Nigeria",
  description:
    "Read Mipitech's Privacy Policy to learn how we protect your personal data while delivering high-quality web design services in Nigeria and globally.",
  keywords: [
    "Mipitech Privacy Policy",
    "Web Design Nigeria",
    "Data Protection",
    "Privacy Mipitech",
  ],
  openGraph: {
    title: "Privacy Policy - Mipitech",
    description:
      "How Mipitech protects your privacy and personal data while offering top-tier web design services in Nigeria and beyond.",
    url: "https://mipitech.com.ng/privacy-policy",
    siteName: "Mipitech",
    locale: "en_NG",
    type: "article",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Privacy <span className="text-blue-600 ">Policy</span>
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Effective Date: August 11, 2025
        </p>
      </div>

      {/* Intro */}
      <p className="mb-6 leading-relaxed">
        This Privacy Policy describes how{" "}
        <strong className="text-blue-600">Mipitech</strong> (“we,” “our,” or
        “us”) collects, uses, and protects your personal information when you
        visit or interact with our website{" "}
        <a
          href="https://mipitech.com.ng"
          className="text-blue-600 hover:underline"
        >
          mipitech.com.ng
        </a>
        .
      </p>

      {/* Sections */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
        <p className="leading-relaxed">
          We may collect personal information such as your name, email address,
          phone number, and any details you submit through contact forms. We
          also collect non-personal information such as browser type, device
          information, and pages visited using cookies and analytics tools.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 leading-relaxed">
          <li>To respond to inquiries and provide services</li>
          <li>To improve our website and user experience</li>
          <li>To send updates, promotions, and relevant information</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
        <p className="leading-relaxed">
          We use cookies to enhance your browsing experience and analyze site
          traffic. You can disable cookies in your browser settings, but some
          features may not function properly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Third-Party Services</h2>
        <p className="leading-relaxed">
          We may use third-party tools like Google Analytics and Google AdSense,
          which may collect data in accordance with their own privacy policies.
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
