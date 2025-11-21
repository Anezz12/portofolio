"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useSession, signIn } from "@/lib/auth-client";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    image: string | null;
  };
}

export default function BlogDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetch(`/api/blog/${params.slug}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data.blog);
          setComments(data.comments || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.slug]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !blog) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${params.slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      
      if (res.ok) {
        const comment = await res.json();
        setComments([...comments, comment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to post comment");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Blog not found</p>
          <Button asChild className="mt-4">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <article>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              <span className="gradient-text">{blog.title}</span>
            </h1>

            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </article>

          {/* Comments Section */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <h2 className="text-2xl font-bold mb-8">Comments ({comments.length})</h2>

            {/* Comment Form */}
            {session ? (
              <Card className="mb-8 border-border/50">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.user.image || ""} />
                      <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="mb-4"
                      />
                      <Button onClick={handleSubmitComment} disabled={submitting || !newComment.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        {submitting ? "Posting..." : "Post Comment"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-8 border-border/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">Sign in to leave a comment</p>
                  <Button onClick={() => signIn.social({ provider: "google" })}>
                    Sign in with Google
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.user.image || ""} />
                        <AvatarFallback>{comment.user.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{comment.user.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}

              {comments.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
