"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { PortableTextReactComponents } from "@portabletext/react";
import {
  Calendar,
  Facebook,
  User,
  Tag,
  Clock,
  ExternalLink,
} from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import Advertisement from "@/components/Advertisement";
import {
  SiX,
  SiFacebook,
  SiLinkedin,
  SiInstagram,
  SiYoutube,
  SiTiktok,
  SiWhatsapp,
  SiGmail,
} from "react-icons/si";

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
      <div className="my-6">
        <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
        <h1 className="text-4xl font-bold">{children}</h1>
      </div>
    ),

    h2: ({ children }) => (
      <div className="my-5">
        <div className="w-full h-[1px] bg-gray-300 mb-2"></div>
        <h2 className="text-3xl font-semibold">{children}</h2>
        <div className="w-12 h-[3px] bg-blue-600 mt-2"></div>
      </div>
    ),

    h3: ({ children }) => (
      <div className="my-4">
        <div className="w-full h-[1px] bg-gray-300 mb-2"></div>
        <h3 className="text-2xl font-semibold">{children}</h3>
      </div>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="my-4 space-y-2">{children}</ul>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2 pl-4">
        {/* use • for all items */}
        <span className="text-black">•</span>
        <span>{children}</span>
      </li>
    ),
  },

  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const blank = value?.blank ?? false;
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
};

export default function SlugPage({ post, relatedPosts }: SlugPageProps) {
  const [page, setPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(relatedPosts.length / postsPerPage);

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

  const paginatedPosts = relatedPosts
    .filter((related) => related._id !== post._id) // ✅ exclude current
    .slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10 grid lg:grid-cols-[3fr_1fr] gap-10">
      {/* Left Content */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
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
          {/* Author */}
          {post.author?.name && (
            <div className="flex items-center gap-1">
              <User size={16} className="text-blue-700" />
              <span className="text-black">{post.author.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-blue-700" />
            {new Date(post.publishedAt || "").toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-blue-700" />
            {readingTime} min read
          </div>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag size={16} className="text-blue-700" />
              <span className="text-black">
                {post.categories.map((cat) => cat.title).join(", ")}
              </span>
            </div>
          )}
        </div>

        {/* Blog Content */}
        {post.body && (
          <article className="prose prose-lg max-w-none mb-10">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </article>
        )}

        {/* Share Post */}
        <div className="my-10 border-t pt-6">
          <h3 className="text-lg font-semibold mb-3">Share this post:</h3>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl
              )}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-black text-white rounded hover:bg-blue-600 transition"
            >
              <SiX size={16} /> X(Twitter)
            </a>

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

            <a
              href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                currentUrl
              )}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
            >
              <SiLinkedin size={16} /> LinkedIn
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                post.title + " - " + currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              <SiWhatsapp size={16} /> WhatsApp
            </a>

            {/* Instagram (will just open Instagram homepage with profile link or sharing prompt) */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              <SiInstagram size={16} /> Instagram
            </a>

            {/* Email */}
            <a
              href={`mailto:?subject=${encodeURIComponent(
                post.title
              )}&body=${encodeURIComponent(post.title + " - " + currentUrl)}`}
              className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              <SiGmail size={16} /> Email
            </a>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-8">
        {/* Follow Us */}
        <div className="p-6 bg-gray-100 rounded-xl shadow-sm text-center">
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex justify-center gap-4">
            <a
              href="https://x.com/mipitech"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
            >
              <SiX className="w-6 h-6 text-black hover:scale-110 transition" />
            </a>
            <a
              href="https://facebook.com/mipitech"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <SiFacebook className="w-6 h-6 text-blue-700 hover:scale-110 transition" />
            </a>
            <a
              href="https://linkedin.com/company/mipitech"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="w-6 h-6 text-blue-600 hover:scale-110 transition" />
            </a>
            <a
              href="https://instagram.com/mipitech_"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <SiInstagram className="w-6 h-6 text-pink-500 hover:scale-110 transition" />
            </a>
            <a
              href="https://youtube.com/@mipitech"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <SiYoutube className="w-6 h-6 text-red-600 hover:scale-110 transition" />
            </a>
            <a
              href="https://tiktok.com/@mipitech"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <SiTiktok className="w-6 h-6 text-black hover:scale-110 transition" />
            </a>
            <a
              href="https://wa.me/2348032648367"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <SiWhatsapp className="w-6 h-6 text-green-500 hover:scale-110 transition" />
            </a>
          </div>
        </div>

        {/* Related Posts */}
        <div className="p-6 bg-gray-100 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-3">Related Posts</h3>
          <ul className="space-y-3">
            {relatedPosts
              ?.filter((r) => r._id !== post._id) // ✅ fixed
              .sort(
                (a, b) =>
                  new Date(b.publishedAt || "").getTime() -
                  new Date(a.publishedAt || "").getTime()
              )
              .slice(0, 3)
              .map((related) => (
                <li key={related._id}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="flex items-center gap-3 hover:text-blue-600 transition"
                  >
                    {related.mainImage?.asset?.url && (
                      <Image
                        src={related.mainImage.asset.url}
                        alt={related.title}
                        width={60}
                        height={40}
                        className="w-16 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium line-clamp-2">
                        {related.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(
                          related.publishedAt || ""
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Newsletter */}
        <NewsletterForm />

        {/* Advertisement */}
        <Advertisement />
      </aside>
    </main>
  );
}
