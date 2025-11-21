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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { title, slug, description, content, tags, published } = await request.json();

    const blog = await prisma.blogPost.update({
      where: { id },
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
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}
