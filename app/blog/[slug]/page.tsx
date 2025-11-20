import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";

const blogPosts = {
  "getting-started-with-nextjs": {
    title: "Getting Started with Next.js 15",
    date: "2024-03-15",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development"],
    content: `
# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements that make building web applications even better. In this guide, we'll explore the latest additions and how to get started.

## What's New in Next.js 15

Next.js 15 introduces several groundbreaking features:

- **Improved Performance**: Faster build times and optimized runtime performance
- **Enhanced Developer Experience**: Better error messages and debugging tools
- **New App Router Features**: Additional capabilities for the App Router

## Setting Up Your First Project

Getting started with Next.js is straightforward:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Concepts

### Server Components

Server Components are a game-changer for performance. They allow you to render components on the server, reducing the JavaScript sent to the client.

### Route Handlers

The new route handlers provide a simple way to create API endpoints directly in your Next.js application.

## Conclusion

Next.js 15 continues to push the boundaries of what's possible with React. Whether you're building a small project or a large-scale application, Next.js provides the tools you need to succeed.
    `,
  },
  "typescript-tips-tricks": {
    title: "TypeScript Tips and Tricks for Better Code",
    date: "2024-03-10",
    readTime: "6 min read",
    tags: ["TypeScript", "JavaScript", "Programming"],
    content: `
# TypeScript Tips and Tricks for Better Code

TypeScript has become an essential tool for modern JavaScript development. Here are some advanced tips to help you write better, more maintainable code.

## Tip 1: Use Const Assertions

Const assertions allow you to create readonly types from values:

\`\`\`typescript
const routes = ['home', 'about', 'contact'] as const;
type Route = typeof routes[number]; // 'home' | 'about' | 'contact'
\`\`\`

## Tip 2: Leverage Utility Types

TypeScript provides powerful utility types:

\`\`\`typescript
type User = {
  id: string;
  name: string;
  email: string;
};

type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
\`\`\`

## Tip 3: Use Discriminated Unions

Discriminated unions help create type-safe state machines:

\`\`\`typescript
type State =
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };
\`\`\`

## Conclusion

These tips will help you write more type-safe and maintainable TypeScript code. Keep exploring and learning!
    `,
  },
  "building-scalable-apis": {
    title: "Building Scalable REST APIs with Node.js",
    date: "2024-03-05",
    readTime: "10 min read",
    tags: ["Node.js", "API", "Backend"],
    content: `
# Building Scalable REST APIs with Node.js

Creating scalable APIs is crucial for modern applications. Let's explore best practices for building robust REST APIs with Node.js.

## Architecture Principles

### Layered Architecture

Separate your application into distinct layers:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Manage data access

## Best Practices

### 1. Use Proper HTTP Status Codes

Always return appropriate status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

### 2. Implement Rate Limiting

Protect your API from abuse with rate limiting:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
\`\`\`

### 3. Validate Input Data

Always validate incoming data to prevent security issues and bugs.

## Conclusion

Building scalable APIs requires careful planning and adherence to best practices. Follow these guidelines to create robust backend services.
    `,
  },
  "state-management-react": {
    title: "Modern State Management in React",
    date: "2024-02-28",
    readTime: "7 min read",
    tags: ["React", "State Management", "Frontend"],
    content: `
# Modern State Management in React

State management is a crucial aspect of React applications. Let's explore different approaches and when to use each.

## Context API

The built-in Context API is perfect for simple global state:

\`\`\`jsx
const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <YourApp />
    </ThemeContext.Provider>
  );
}
\`\`\`

## Zustand

For more complex state, Zustand provides a simple API:

\`\`\`javascript
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
\`\`\`

## When to Use What

- **useState**: Component-local state
- **Context API**: Simple global state
- **Zustand/Redux**: Complex global state with many actions

## Conclusion

Choose the right tool for your needs. Don't over-engineer with complex state management when simple solutions suffice.
    `,
  },
};

type BlogPostKey = keyof typeof blogPosts;

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as BlogPostKey];

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
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
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
                    if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
                    if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
                    if (line.startsWith('```')) return line.replace('```', '<pre><code>').replace('```', '</code></pre>');
                    if (line.trim() === '') return '<br />';
                    return `<p>${line}</p>`;
                  })
                  .join('\n')
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
