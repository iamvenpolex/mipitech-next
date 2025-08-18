"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { PortableTextReactComponents } from "@portabletext/react";
import {
  User,
  Calendar,
  Tag,
  Twitter,
  Facebook,
  Linkedin,
  Clock,
  Mail,
  MessageSquare,
  Instagram,
  ExternalLink,
} from "lucide-react";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface PostDetail {
  _id: string;
  title: string;
  body?: PortableTextBlock[];
  slug: string;
  mainImage?: { asset?: { url: string } };
  author?: { name: string };
  categories?: { title: string }[];
  publishedAt?: string;
}

interface SlugPageProps {
  post: PostDetail;
  relatedPosts: PostDetail[];
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({
      value,
    }: {
      value: { asset: SanityImageSource; alt?: string };
    }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).url();
      return (
        <div className="my-6 flex justify-center">
          <Image
            src={src || ""}
            alt={value.alt || "Blog image"}
            width={600}
            height={300}
            className="rounded-lg w-[600px] h-[300px] object-cover"
          />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="my-3">{children}</p>,
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold my-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold my-3">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold my-2">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-semibold my-2">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = value.href ?? "#";
      const blank = value.blank ?? false;
      return (
        <a
          href={href}
          target={blank ? "_blank" : "_self"}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-blue-600 underline hover:text-blue-800 flex items-center gap-1"
        >
          {children} {blank && <ExternalLink size={12} />}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-3">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-3">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
};

export default function SlugPage({ post, relatedPosts }: SlugPageProps) {
  // ✅ SEO-safe URL
  const currentUrl = `https://mipitech.com.ng/blog/${encodeURIComponent(
    post.slug
  )}`;

  const plainText =
    post.body
      ?.map((block) =>
        "children" in block
          ? (block.children as { text: string }[])
              .map((child) => child.text)
              .join(" ")
          : ""
      )
      .join(" ") || "";

  const wordsPerMinute = 200;
  const readingTime = Math.ceil(plainText.split(/\s+/).length / wordsPerMinute);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-3 mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-blue-700 font-medium">{post.title}</li>
        </ol>
      </nav>

      {/* Featured image */}
      {post.mainImage?.asset?.url && (
        <Image
          src={post.mainImage.asset.url}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover rounded-xl shadow mb-6"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6">
        <div className="flex items-center gap-1">
          <User size={16} className="text-blue-600" />
          <span className="font-medium text-gray-700">{post.author?.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-blue-600" />
          {new Date(post.publishedAt || "").toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        {post.categories?.length ? (
          <div className="flex items-center gap-1">
            <Tag size={16} className="text-blue-600" />
            {post.categories.map((cat) => cat.title).join(", ")}
          </div>
        ) : null}
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-blue-600" />
          {readingTime} min read
        </div>
      </div>

      {/* Blog Content */}
      {post.body && (
        <article className="prose prose-lg max-w-none mb-10">
          <PortableText value={post.body} components={portableTextComponents} />
        </article>
      )}

      {/* Share Post Section */}
      <div className="my-10 border-t pt-6">
        <h3 className="text-lg font-semibold mb-3">Share this post:</h3>
        <div className="flex flex-wrap items-center gap-4">
          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            <Twitter size={16} /> Twitter
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition"
          >
            <Facebook size={16} /> Facebook
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
              currentUrl
            )}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
          >
            <Linkedin size={16} /> LinkedIn
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              post.title + " - " + currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <MessageSquare size={16} /> WhatsApp
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/mipitech_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            <Instagram size={16} /> Instagram
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${encodeURIComponent(
              post.title
            )}&body=${encodeURIComponent(currentUrl)}`}
            className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            <Mail size={16} /> Email
          </a>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-100 p-6 rounded-xl mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Mail className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold">Be the First to Know</h3>
        </div>
        <p className="mb-4 text-gray-600">
          Get notified instantly when new posts, tips, or updates go live. Stay
          ahead, don’t miss out!
        </p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Notify Me
          </button>
        </form>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related._id}
                href={`/blog/${related.slug}`}
                className="block p-4 border rounded-lg hover:shadow-md transition"
              >
                {related.mainImage?.asset?.url && (
                  <Image
                    src={related.mainImage.asset.url}
                    alt={related.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-bold">{related.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(related.publishedAt || "").toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
