import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Mipitech | Best Web Designers in Nigeria",
  description:
    "Read Mipitech's Terms & Conditions for using our website and web design services in Nigeria and globally.",
  keywords: [
    "Mipitech Terms and Conditions",
    "Web Design Nigeria",
    "Service Agreement",
    "Mipitech Legal",
  ],
  openGraph: {
    title: "Terms & Conditions - Mipitech",
    description:
      "Guidelines and conditions for using Mipitech's website and world-class web design services.",
    url: "https://mipitech.com.ng/terms-and-conditions",
    siteName: "Mipitech",
    locale: "en_NG",
    type: "article",
  },
};

export default function TermsAndConditions() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Terms &{" "}
          <span className="text-blue-600 underline decoration-blue-600">
            Conditions
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Effective Date: August 11, 2025
        </p>
      </div>

      {/* Intro */}
      <p className="mb-6 leading-relaxed">
        Welcome to <strong className="text-black">Mipitech</strong>. By using
        our website{" "}
        <a
          href="https://mipitech.com.ng"
          className="text-blue-600 hover:underline"
        >
          mipitech.com.ng
        </a>
        , you agree to comply with and be bound by these Terms and Conditions.
        Please read them carefully before using our services.
      </p>

      {/* Sections */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Use of Our Website</h2>
        <p className="leading-relaxed">
          You agree to use our website only for lawful purposes and in a way
          that does not infringe the rights of, restrict, or inhibit anyone
          else&apos;s use.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
        <p className="leading-relaxed">
          All content on this website, including text, graphics, logos, and
          images, is the property of Mipitech and is protected by copyright
          laws. You may not reproduce or distribute our content without written
          permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
        <p className="leading-relaxed">
          We are not liable for any direct, indirect, or consequential loss
          arising from the use of our website or services. All services are
          provided &quot;as is&quot; without any warranties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
        <p className="leading-relaxed">
          We reserve the right to update or modify these terms at any time.
          Changes will be effective immediately upon posting on this page.
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
          <strong> Address:</strong> 123 Mipitech Street, Lagos, Nigeria
        </p>
      </section>
    </main>
  );
}
