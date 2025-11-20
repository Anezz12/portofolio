import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

const blogPosts = [
  {
    id: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15",
    description: "A comprehensive guide to building modern web applications with Next.js 15, covering the latest features and best practices.",
    date: "2024-03-15",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    id: "typescript-tips-tricks",
    title: "TypeScript Tips and Tricks for Better Code",
    description: "Learn advanced TypeScript patterns and techniques that will help you write more maintainable and type-safe code.",
    date: "2024-03-10",
    readTime: "6 min read",
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
  {
    id: "building-scalable-apis",
    title: "Building Scalable REST APIs with Node.js",
    description: "Best practices for designing and implementing scalable REST APIs using Node.js and Express.",
    date: "2024-03-05",
    readTime: "10 min read",
    tags: ["Node.js", "API", "Backend"],
  },
  {
    id: "state-management-react",
    title: "Modern State Management in React",
    description: "Exploring different state management solutions in React, from Context API to Zustand and beyond.",
    date: "2024-02-28",
    readTime: "7 min read",
    tags: ["React", "State Management", "Frontend"],
  },
];

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, tutorials, and insights on web development
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button variant="ghost" asChild>
                  <Link href={`/blog/${post.id}`}>
                    Read More →
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
