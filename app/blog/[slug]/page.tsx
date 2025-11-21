import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

// Site configuration - update with your domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteName = "Harsena Argretya";

export const revalidate = 60;

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const ogImage = `${siteUrl}/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteName }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [siteName],
      tags: post.tags,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: siteName,
      url: siteUrl,
    },
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
    publisher: {
      "@type": "Person",
      name: siteName,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative">
        <div className="absolute inset-0 grid-background opacity-50" />

        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <article>
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  <span className="gradient-text">{post.title}</span>
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.read_time}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>

              <div
                className="prose prose-neutral dark:prose-invert max-w-none
                [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4
                [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3
                [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-4 [&>h3]:mb-2
                [&>p]:mb-4 [&>p]:leading-7
                [&>ul]:list-disc [&>ul]:list-outside [&>ul]:ml-6 [&>ul]:mb-4 [&>ul]:space-y-2
                [&>ol]:list-decimal [&>ol]:list-outside [&>ol]:ml-6 [&>ol]:mb-4 [&>ol]:space-y-2
                [&>li]:leading-7
                [&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-4
                [&>code]:bg-muted [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                [&>blockquote]:border-l-4 [&>blockquote]:border-border [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4
                [&>a]:text-foreground [&>a]:underline hover:[&>a]:text-foreground/80
                [&>strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
