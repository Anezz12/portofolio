"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  tags?: string[];
  readTime?: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development
            </p>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-border/50 animate-pulse">
                  <CardHeader className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
                  <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        {blog.readTime && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{blog.readTime}</span>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-base line-clamp-2 mb-4">
                        {blog.description}
                      </CardDescription>

                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                        <span>Read more</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
