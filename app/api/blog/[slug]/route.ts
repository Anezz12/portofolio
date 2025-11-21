import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const comments = await prisma.comment.findMany({
      where: { blogId: blog.id },
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });

    return NextResponse.json({ blog, comments });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
