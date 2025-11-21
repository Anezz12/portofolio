import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function isAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user?.email === process.env.ADMIN_EMAIL;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        createdAt: true,
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, slug, description, content, tags, published } = await request.json();

    const blog = await prisma.blogPost.create({
      data: {
        title,
        slug,
        description,
        content,
        tags: tags ? tags.split(",").map((t: string) => t.trim()) : [],
        published,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
