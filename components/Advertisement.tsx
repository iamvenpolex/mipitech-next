// components/Advertisement.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface Ad {
  href: string;
  src: string;
  alt: string;
}

const ads: Ad[] = [
  {
    href: "/contact",
    src: "/ads1.jpg",
    alt: "Advertisement 1",
  },
  {
    href: "/",
    src: "/ads2.jpg",
    alt: "Advertisement 2",
  },
];

export default function Advertisement() {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
      <p className="text-gray-500 text-sm mb-3">Advertisement</p>

      <div className="flex flex-col gap-4">
        {ads.map((ad, index) => (
          <Link
            key={index}
            href={ad.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg shadow group"
          >
            <Image
              src={ad.src}
              alt={ad.alt}
              width={540}
              height={675}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
