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
    "tools",
    "resources",
    "Mipitech blog",
  ],
  openGraph: {
    title: "Blog - Mipitech",
    description: "Latest articles on tech, coding, and tools.",
    type: "website",
    url: "https://mipitech.com.ng/blog",
  },
};

export default function Page() {
  return <BlogPage />;
}
