import { supabase } from "@/lib/supabase";
import { BlogForm } from "@/components/blog-form";
import { notFound } from "next/navigation";

export default async function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return <BlogForm mode="edit" post={post} />;
}
