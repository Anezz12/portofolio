"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, LogOut, Globe, EyeOff } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !isPending &&
      (!session || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)
    ) {
      router.push("/");
      return;
    }

    if (session) {
      fetch("/api/admin/blog")
        .then((res) => res.json())
        .then((data) => {
          setBlogs(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session, isPending, router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Failed to delete blog");
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/blog/${id}/toggle-publish`, {
        method: "PATCH",
      });
      if (res.ok) {
        setBlogs(blogs.map((b) =>
          b.id === id ? { ...b, published: !currentStatus } : b
        ));
      }
    } catch (error) {
      console.error("Failed to toggle publish status");
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              <span className="gradient-text">Manage Blogs</span>
            </h1>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Blog
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {blogs.map((blog) => (
              <Card key={blog.id} className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{blog.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={blog.published ? "default" : "secondary"}>
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleTogglePublish(blog.id, blog.published)}
                        title={blog.published ? "Unpublish" : "Publish"}>
                        {blog.published ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Globe className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/blog/${blog.slug}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/blog/edit/${blog.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(blog.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}

            {blogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No blog posts yet</p>
                <Button asChild>
                  <Link href="/admin/blog/new">Create your first blog</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
