"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export interface NewsletterFormProps {
  endpoint?: string; // Optional: allows overriding the Formspree endpoint
  title?: string; // Optional: custom title for reusability
  description?: string; // Optional: custom description text
}

export default function NewsletterForm({
  endpoint = "https://formspree.io/f/mzzapppq",
  title = "Subscribe",
  description = "Get notified instantly when new posts, tips, or updates go live.",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="p-6 bg-blue-50 rounded-xl shadow-sm text-center">
      <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-sm mx-auto"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {status === "success" && (
        <p className="text-green-600 mt-3">🎉 Thanks for subscribing!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-3">⚠️ Something went wrong. Try again.</p>
      )}
    </div>
  );
}
