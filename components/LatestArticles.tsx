"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImageSource;
  publishedAt: string;
}

export default function LatestArticles() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"] | order(publishedAt desc)[0..2]{
        _id,
        title,
        slug,
        mainImage,
        publishedAt
      }`;
      const data: BlogPost[] = await client.fetch(query);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-10 relative inline-block"
        >
          From <span className="text-blue-600 relative">the Blog</span>
        </motion.h2>

        {/* Blog cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(600).url()}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-4">{post.title}</h3>

                {/* Always stick Read More at bottom */}
                <div className="mt-auto">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="mt-4 inline-block bg-blue-600 text-white w-35 px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All button */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold  transition"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
