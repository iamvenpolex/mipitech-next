import { Metadata } from "next";
import BlogPage from "./BlogPage";

export const metadata: Metadata = {
  title: "Blog - Mipitech",
  description:
    "Read our latest posts on web development, tech tutorials, beginner guides, and tools & resources.",
  keywords: [
    "web development",
    "tech tutorials",
    "beginner guides",
    "tools for coding",
    "web developers",
    "software developer",
    "resources",
    "Mipitech blog",
    "SEO experts in Nigeria",
    "best web developers in nigeria",
    "best web developer in Lagos",
    "best web designers in nigeria",
  ],
  openGraph: {
    title: "Blog - Mipitech",
    description: "Latest articles on tech, coding, and tools.",
    type: "website",
    url: "https://mipitech.com.ng/blog",
  },
  alternates: {
    canonical: "https://mipitech.com.ng/blog", // ✅ Fix canonical
  },
};

export default function Page() {
  return <BlogPage />;
}
