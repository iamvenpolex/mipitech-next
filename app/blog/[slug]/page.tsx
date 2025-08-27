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

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

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

// ✅ Static params for SSG
export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(
    `*[_type == "post" && defined(slug.current) && publishedAt < now()]{
      "slug": slug.current
    }`
  );
  return posts.map((post) => ({ slug: post.slug }));
}

// ✅ Metadata
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });

  if (!post) {
    return { title: "Post not found | Mipitech Blog" };
  }

  const description = extractExcerpt(post.body);

  // ✅ Dynamic keywords → categories + title
  const keywords = [
    post.title,
    ...(post.categories?.map((c) => c.title) || []),
  ];

  return {
    title: `${post.title} | Mipitech Blog`,
    description,
    keywords,
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

// ✅ Page component
export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

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

  // ✅ BlogPosting schema
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
        url: "/mipitech-logowithbg.jpg",
      },
    },
    datePublished: post.publishedAt ?? "",
    dateModified: post.publishedAt ?? "",
    description,
  };

  // ✅ Breadcrumb schema
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mipitech.com.ng/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://mipitech.com.ng/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://mipitech.com.ng/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id="blogpost-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SlugPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
