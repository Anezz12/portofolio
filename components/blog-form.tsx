"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, type BlogPost, type CreateBlogPost } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { WysiwygEditor } from "@/components/wysiwyg-editor";

interface BlogFormProps {
  post?: BlogPost;
  mode: "create" | "edit";
}

export function BlogForm({ post, mode }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    description: post?.description || "",
    content: post?.content || "",
    tags: post?.tags?.join(", ") || "",
    read_time: post?.read_time || "5 min read",
    published: post?.published || false,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: mode === "create" ? generateSlug(title) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const postData: CreateBlogPost = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        content: formData.content,
        tags: tagsArray,
        read_time: formData.read_time,
        published: formData.published,
      };

      if (mode === "create") {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", post!.id);

        if (error) throw error;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving post:", error);
      alert(error.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 grid-background opacity-50" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/admin/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">
                {mode === "create" ? "Create New Post" : "Edit Post"}
              </span>
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>
                  {mode === "create"
                    ? "Fill in the details for your new blog post"
                    : "Update the details of your blog post"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">
                    Slug * <span className="text-xs text-muted-foreground">(URL-friendly version)</span>
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="post-url-slug"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    URL: /blog/{formData.slug || "your-post-slug"}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of your post"
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">
                    Content * <span className="text-xs text-muted-foreground">(WYSIWYG Editor)</span>
                  </Label>
                  <WysiwygEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">
                    Tags <span className="text-xs text-muted-foreground">(comma-separated)</span>
                  </Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, Next.js, TypeScript"
                  />
                </div>

                {/* Read Time */}
                <div className="space-y-2">
                  <Label htmlFor="read_time">Reading Time</Label>
                  <Input
                    id="read_time"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="5 min read"
                  />
                </div>

                {/* Published Status */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <Label htmlFor="published" className="cursor-pointer">
                    Publish immediately
                  </Label>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-foreground text-background hover:shadow-lg"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : mode === "create" ? "Create Post" : "Update Post"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/blog">Cancel</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
