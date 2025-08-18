import { groq } from "next-sanity";

export const allPostsQuery = groq`
  *[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage{ asset->{ url } },
    "author": author->{name},
    // return both title and ref for categories
    "categories": categories[]->{ _id, title },
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    body,
    "slug": slug.current,
    mainImage{ asset->{ url } },
    "author": author->{name},
    // return both title and ref for categories
    "categories": categories[]->{ _id, title },
    publishedAt
  }
`;

export const relatedPostsQuery = groq`
  *[
    _type == "post" &&
    slug.current != $slug &&
    count(categories[@._ref in $categoryIds]) > 0
  ] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    mainImage{ asset->{ url } },
    publishedAt,
    "categories": categories[]->{ _id, title }
  }
`;
