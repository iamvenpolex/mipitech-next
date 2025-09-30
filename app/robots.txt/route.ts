// app/robots.txt/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    `User-agent: *
Allow: /
Sitemap: https://mipitech.com.ng/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
