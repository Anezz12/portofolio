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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const blog = await prisma.blogPost.findUnique({
      where: { id },
      select: { published: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: { published: !blog.published },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle publish status" }, { status: 500 });
  }
}
