// app/blog/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import type { PortableTextBlock } from "@portabletext/types";
import SlugPage from "./slug";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

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
  params: Promise<{ slug: string }>; // ✅ must be Promise here
}

const siteUrl = "https://mipitech.com.ng";

// ✅ Strongly typed excerpt extractor
function extractExcerpt(body?: PortableTextBlock[], length = 150): string {
  if (!body?.length) return "Blog post on Mipitech";

  for (const block of body) {
    if (block._type === "block" && "children" in block) {
      const children = block.children as {
        _type: string;
        text?: string;
      }[];

      const span = children.find(
        (child) => child._type === "span" && typeof child.text === "string"
      );

      if (span?.text) {
        return span.text.slice(0, length);
      }
    }
  }

  return "Blog post on Mipitech";
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
export async function generateMetadata(
  props: BlogPageProps
): Promise<Metadata> {
  const { slug } = await props.params; // 👈 await params

  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });

  if (!post) {
    return { title: "Post not found | Mipitech Blog" };
  }

  const description = post.excerpt || extractExcerpt(post.body);

  const keywords = [
    post.title,
    ...(post.categories?.map((c) => c.title) || []),
  ];

  const imageUrl =
    post.mainImage?.asset?.url || `${siteUrl}/mipitech-logowithbg.jpg`;

  return {
    title: `${post.title} | Mipitech Blog`,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/blog/${encodeURIComponent(slug.toLowerCase())}`,
    },
    openGraph: {
      title: post.title,
      description,
      images: [{ url: imageUrl }],
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

// ✅ Page component
export default async function BlogPostPage(props: BlogPageProps) {
  const { slug } = await props.params; // 👈 await params

  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });

  if (!post) return notFound(); // ✅ show 404 page

  const categoryIds = post.categories?.map((c) => c._id) || [];
  const relatedPosts = await client.fetch<PostDetail[]>(relatedPostsQuery, {
    slug,
    categoryIds,
  });

  const description = post.excerpt || extractExcerpt(post.body);

  const imageUrl =
    post.mainImage?.asset?.url || `${siteUrl}/mipitech-logowithbg.jpg`;

  // ✅ BlogPosting schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: imageUrl,
    url: `${siteUrl}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
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
        url: `${siteUrl}/mipitech-logowithbg.jpg`,
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
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${slug}`,
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
