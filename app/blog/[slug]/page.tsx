// app/blog/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import type { PortableTextBlock } from "@portabletext/types";
import SlugPage from "./slug";
import type { Metadata } from "next";
import Script from "next/script";

interface Category {
  _id: string;
  title: string;
}

interface PostDetail {
  _id: string;
  title: string;
  body?: PortableTextBlock[];
  slug: string;
  mainImage?: { asset?: { url: string } };
  author?: { name: string };
  categories?: Category[];
  publishedAt?: string;
  excerpt?: string;
}

// ✅ Correct typing for params (Promise-based)
type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

function extractExcerpt(body?: PortableTextBlock[], length = 150): string {
  if (!body?.length) return "Blog post on Mipitech";

  const firstBlock = body.find(
    (block): block is PortableTextBlock & { children: { text: string }[] } =>
      "children" in block &&
      Array.isArray((block as { children?: { text?: string }[] }).children)
  );

  const firstChild = (
    firstBlock?.children as { text: string }[] | undefined
  )?.[0];
  const text = firstChild?.text ?? "";

  return text.slice(0, length) || "Blog post on Mipitech";
}

// ✅ generateMetadata now awaits params
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params; // 👈 Await here
  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });

  if (!post) {
    return { title: "Post not found | Mipitech Blog" };
  }

  const description = extractExcerpt(post.body);

  return {
    title: `${post.title} | Mipitech Blog`,
    description,
    alternates: {
      canonical: `https://mipitech.com.ng/blog/${encodeURIComponent(
        slug.toLowerCase()
      )}`,
    },
    openGraph: {
      title: post.title,
      description,
      images: post.mainImage?.asset?.url
        ? [{ url: post.mainImage.asset.url }]
        : [],
      url: `https://mipitech.com.ng/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : [],
    },
  };
}

// ✅ Blog page now also awaits params
export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params; // 👈 Await here

  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });

  if (!post) {
    return <p className="p-6 text-center text-gray-500">Post not found</p>;
  }

  const categoryIds = post.categories?.map((c) => c._id) || [];
  const relatedPosts = await client.fetch<PostDetail[]>(relatedPostsQuery, {
    slug,
    categoryIds,
  });

  const description = extractExcerpt(post.body);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.mainImage?.asset?.url ?? "",
    url: `https://mipitech.com.ng/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mipitech.com.ng/blog/${slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Unknown Author",
    },
    publisher: {
      "@type": "Organization",
      name: "Mipitech",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    datePublished: post.publishedAt ?? "",
    dateModified: post.publishedAt ?? "",
    description,
  };

  return (
    <>
      <Script
        id="blogpost-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SlugPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
