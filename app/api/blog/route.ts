import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        tags: true,
        readTime: true,
        createdAt: true,
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
