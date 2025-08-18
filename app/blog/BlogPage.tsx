"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: SanityImageSource;
  publishedAt: string;
  categories: { title: string }[];
  excerpt: string;
}

const categories = [
  "All",
  "Web Development",
  "Tech Tutorials",
  "For Beginners",
  "Tools & Resources",
];
const sortOptions = ["Newest", "Oldest", "A–Z"];

// ✅ Helper: truncate excerpt cleanly
function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "…";
}

// ✅ Helper: highlight search term
function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="font-semibold text-blue-600">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [navHeight, setNavHeight] = useState(80);

  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        categories[]->{ title },
        "excerpt": pt::text(body)
      }`;
      const data: BlogPost[] = await client.fetch(query);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavHeight(window.scrollY > 30 ? 64 : 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((post) =>
      selectedCategory === "All"
        ? true
        : post.categories.some((c) => c.title === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOrder === "Newest")
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      if (sortOrder === "Oldest")
        return (
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
      if (sortOrder === "A–Z") return a.title.localeCompare(b.title);
      return 0;
    });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="px-0 md:px-0">
      {/* Sub-Navbar */}
      <div
        className="sticky z-30 border-b bg-white py-5 transition-all duration-300"
        style={{ top: `${navHeight}px` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-8">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1 rounded-full border transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center border rounded-full px-3 py-1 w-full md:w-64">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none px-2 w-full"
            />
          </div>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-3 py-1"
          >
            {sortOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/blog-hero.jpg"
            alt="Mipitech Blog Hero"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-blue-900/40"></div>
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold"
          >
            <span className="text-blue-400">MIPITECH</span> BLOG
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-3 text-lg md:text-xl max-w-2xl"
          >
            Insights, tutorials, and resources for developers, designers, and
            tech enthusiasts.
          </motion.p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4 md:px-8">
        {currentPosts.map((post) => (
          <motion.div
            key={post._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            whileHover={{ y: -2 }}
          >
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).width(600).url()}
                alt={post.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm flex-grow">
                {highlightMatch(truncateText(post.excerpt, 200), search)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500 items-center">
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-blue-600" />
                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {post.categories.map((cat) => (
                  <span key={cat.title} className="flex items-center gap-1">
                    <Tag size={14} className="text-blue-600" /> {cat.title}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug.current}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8 mb-12">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border transition ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
