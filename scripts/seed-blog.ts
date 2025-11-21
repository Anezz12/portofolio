import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const blogPosts = [
  {
    title: "Getting Started with Next.js 15",
    slug: "getting-started-with-nextjs-15",
    description:
      "Learn how to build modern web applications with Next.js 15, exploring new features and best practices for React development.",
    content: `
      <h1>Getting Started with Next.js 15</h1>
      <p>Next.js 15 brings exciting new features and improvements that make building web applications even better. In this guide, we'll explore the latest additions and how to get started.</p>

      <h2>What's New in Next.js 15</h2>
      <p>Next.js 15 introduces several groundbreaking features:</p>
      <ul>
        <li><strong>Improved Performance</strong>: Faster build times and optimized runtime performance</li>
        <li><strong>Enhanced Developer Experience</strong>: Better error messages and debugging tools</li>
        <li><strong>New App Router Features</strong>: Additional capabilities for the App Router</li>
      </ul>

      <h2>Setting Up Your First Project</h2>
      <p>Getting started with Next.js is straightforward:</p>
      <pre><code>npx create-next-app@latest my-app
cd my-app
npm run dev</code></pre>

      <h2>Key Concepts</h2>

      <h3>Server Components</h3>
      <p>Server Components are a game-changer for performance. They allow you to render components on the server, reducing the JavaScript sent to the client.</p>

      <h3>Route Handlers</h3>
      <p>The new route handlers provide a simple way to create API endpoints directly in your Next.js application.</p>

      <h2>Conclusion</h2>
      <p>Next.js 15 continues to push the boundaries of what's possible with React. Whether you're building a small project or a large-scale application, Next.js provides the tools you need to succeed.</p>
    `,
    tags: ["Next.js", "React", "Web Development"],
    published: true,
    read_time: "8 min read",
  },
  {
    title: "TypeScript Tips and Tricks for Better Code",
    slug: "typescript-tips-tricks",
    description:
      "Advanced TypeScript techniques to write more maintainable and type-safe code in your projects.",
    content: `
      <h1>TypeScript Tips and Tricks for Better Code</h1>
      <p>TypeScript has become an essential tool for modern JavaScript development. Here are some advanced tips to help you write better, more maintainable code.</p>

      <h2>Tip 1: Use Const Assertions</h2>
      <p>Const assertions allow you to create readonly types from values:</p>
      <pre><code>const routes = ['home', 'about', 'contact'] as const;
type Route = typeof routes[number]; // 'home' | 'about' | 'contact'</code></pre>

      <h2>Tip 2: Leverage Utility Types</h2>
      <p>TypeScript provides powerful utility types:</p>
      <pre><code>type User = {
  id: string;
  name: string;
  email: string;
};

type PartialUser = Partial&lt;User&gt;;
type ReadonlyUser = Readonly&lt;User&gt;;</code></pre>

      <h2>Tip 3: Use Discriminated Unions</h2>
      <p>Discriminated unions help create type-safe state machines:</p>
      <pre><code>type State =
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };</code></pre>

      <h2>Conclusion</h2>
      <p>These tips will help you write more type-safe and maintainable TypeScript code. Keep exploring and learning!</p>
    `,
    tags: ["TypeScript", "JavaScript", "Programming"],
    published: true,
    read_time: "6 min read",
  },
  {
    title: "Building Scalable REST APIs with Node.js",
    slug: "building-scalable-apis",
    description:
      "Best practices and architectural patterns for creating robust and scalable REST APIs using Node.js and Express.",
    content: `
      <h1>Building Scalable REST APIs with Node.js</h1>
      <p>Creating scalable APIs is crucial for modern applications. Let's explore best practices for building robust REST APIs with Node.js.</p>

      <h2>Architecture Principles</h2>

      <h3>Layered Architecture</h3>
      <p>Separate your application into distinct layers:</p>
      <ul>
        <li><strong>Controllers</strong>: Handle HTTP requests and responses</li>
        <li><strong>Services</strong>: Contain business logic</li>
        <li><strong>Repositories</strong>: Manage data access</li>
      </ul>

      <h2>Best Practices</h2>

      <h3>1. Use Proper HTTP Status Codes</h3>
      <p>Always return appropriate status codes:</p>
      <ul>
        <li>200: Success</li>
        <li>201: Created</li>
        <li>400: Bad Request</li>
        <li>404: Not Found</li>
        <li>500: Server Error</li>
      </ul>

      <h3>2. Implement Rate Limiting</h3>
      <p>Protect your API from abuse with rate limiting:</p>
      <pre><code>const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);</code></pre>

      <h3>3. Validate Input Data</h3>
      <p>Always validate incoming data to prevent security issues and bugs.</p>

      <h2>Conclusion</h2>
      <p>Building scalable APIs requires careful planning and adherence to best practices. Follow these guidelines to create robust backend services.</p>
    `,
    tags: ["Node.js", "API", "Backend"],
    published: true,
    read_time: "10 min read",
  },
  {
    title: "Modern State Management in React",
    slug: "state-management-react",
    description:
      "Explore different state management solutions in React and learn when to use each approach for optimal application architecture.",
    content: `
      <h1>Modern State Management in React</h1>
      <p>State management is a crucial aspect of React applications. Let's explore different approaches and when to use each.</p>

      <h2>Context API</h2>
      <p>The built-in Context API is perfect for simple global state:</p>
      <pre><code>const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    &lt;ThemeContext.Provider value={{ theme, setTheme }}&gt;
      &lt;YourApp /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}</code></pre>

      <h2>Zustand</h2>
      <p>For more complex state, Zustand provides a simple API:</p>
      <pre><code>import create from 'zustand';

const useStore = create((set) =&gt; ({
  count: 0,
  increment: () =&gt; set((state) =&gt; ({ count: state.count + 1 })),
}));</code></pre>

      <h2>When to Use What</h2>
      <ul>
        <li><strong>useState</strong>: Component-local state</li>
        <li><strong>Context API</strong>: Simple global state</li>
        <li><strong>Zustand/Redux</strong>: Complex global state with many actions</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Choose the right tool for your needs. Don't over-engineer with complex state management when simple solutions suffice.</p>
    `,
    tags: ["React", "State Management", "Frontend"],
    published: true,
    read_time: "7 min read",
  },
  {
    title: "Mastering Tailwind CSS: Advanced Techniques",
    slug: "mastering-tailwind-css",
    description:
      "Deep dive into advanced Tailwind CSS techniques including custom plugins, dynamic classes, and optimization strategies.",
    content: `
      <h1>Mastering Tailwind CSS: Advanced Techniques</h1>
      <p>Tailwind CSS has revolutionized how we write CSS. Let's explore some advanced techniques to take your Tailwind skills to the next level.</p>

      <h2>Custom Utility Classes</h2>
      <p>Create reusable custom utilities in your config:</p>
      <pre><code>module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    }
  }
}</code></pre>

      <h2>Dynamic Classes with safelist</h2>
      <p>Ensure dynamic classes aren't purged in production:</p>
      <pre><code>module.exports = {
  safelist: [
    'bg-red-500',
    'bg-blue-500',
    {
      pattern: /bg-(red|blue|green)-(400|500|600)/,
    }
  ]
}</code></pre>

      <h2>Custom Plugins</h2>
      <p>Extend Tailwind with custom plugins for common patterns:</p>
      <pre><code>const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        }
      })
    })
  ]
}</code></pre>

      <h2>Performance Optimization</h2>
      <ul>
        <li>Use JIT mode for faster builds</li>
        <li>Purge unused styles in production</li>
        <li>Minimize custom CSS</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Tailwind CSS is incredibly powerful when you know how to leverage its advanced features. These techniques will help you build better, faster applications.</p>
    `,
    tags: ["Tailwind CSS", "CSS", "Web Design"],
    published: true,
    read_time: "9 min read",
  },
  {
    title: "Supabase: The Firebase Alternative",
    slug: "supabase-firebase-alternative",
    description:
      "Discover why Supabase is becoming the go-to backend solution for modern web applications and how to get started.",
    content: `
      <h1>Supabase: The Firebase Alternative</h1>
      <p>Supabase has emerged as a powerful open-source alternative to Firebase. Let's explore what makes it special and how to get started.</p>

      <h2>Why Supabase?</h2>
      <ul>
        <li><strong>Open Source</strong>: Full control over your data</li>
        <li><strong>PostgreSQL</strong>: Powerful relational database</li>
        <li><strong>Real-time</strong>: Built-in real-time subscriptions</li>
        <li><strong>Authentication</strong>: Multiple auth providers out of the box</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Setting up Supabase is straightforward:</p>
      <pre><code>npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_KEY'
)</code></pre>

      <h2>Database Queries</h2>
      <p>Query your database with a simple API:</p>
      <pre><code>// Fetch data
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true)

// Insert data
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'New Post', content: 'Content...' })</code></pre>

      <h2>Real-time Subscriptions</h2>
      <p>Listen to database changes in real-time:</p>
      <pre><code>supabase
  .channel('posts')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) =&gt; console.log(payload)
  )
  .subscribe()</code></pre>

      <h2>Conclusion</h2>
      <p>Supabase provides a complete backend solution with the power of PostgreSQL and the ease of use of Firebase. It's perfect for modern web applications.</p>
    `,
    tags: ["Supabase", "Backend", "Database"],
    published: false,
    read_time: "8 min read",
  },
];

async function seedBlog() {
  console.log("Starting blog seed...");

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase credentials not found in .env.local");
    process.exit(1);
  }

  try {
    // Clear existing posts (optional)
    const { error: deleteError } = await supabase
      .from("blog_posts")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

    if (deleteError) {
      console.warn("Could not clear existing posts:", deleteError.message);
    } else {
      console.log("Cleared existing posts");
    }

    // Insert new posts
    const { data, error } = await supabase.from("blog_posts").insert(blogPosts);

    if (error) {
      console.error("Error seeding blog posts:", error);
      process.exit(1);
    }

    console.log(`Successfully seeded ${blogPosts.length} blog posts!`);
    console.log("\nSeeded posts:");
    blogPosts.forEach((post, index) => {
      console.log(
        `  ${index + 1}. ${post.title} ${post.published ? "📝" : "📄 (draft)"}`
      );
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    process.exit(1);
  }
}

seedBlog();
