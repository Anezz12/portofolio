# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: `portfolio-blog`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
4. Click "Create new project" and wait for setup to complete

## 2. Create Database Table

Go to SQL Editor in your Supabase dashboard and run this SQL:

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  read_time TEXT DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);

-- Create index on published for filtering
CREATE INDEX blog_posts_published_idx ON blog_posts(published);

-- Create index on created_at for sorting
CREATE INDEX blog_posts_created_at_idx ON blog_posts(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published posts
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT
  USING (published = true);

-- Create policy to allow all operations for authenticated users (you can modify this)
-- For now, we'll allow insert/update/delete for everyone (you should add authentication later)
CREATE POLICY "Enable all access for development" ON blog_posts
  FOR ALL
  USING (true);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 3. Get API Keys

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Project API keys** > **anon** **public** key

## 4. Configure Environment Variables

1. Create `.env.local` file in your project root:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. Test Connection

Restart your development server:

```bash
npm run dev
```

Navigate to `/admin/blog` to start adding blog posts!

## Security Notes

⚠️ **Important for Production:**

1. The current RLS policy allows anyone to insert/update/delete posts
2. You should implement proper authentication:
   - Use Supabase Auth
   - Update RLS policies to check `auth.uid()`
   - Add admin role checking

Example secure policy:
```sql
-- Remove the open policy
DROP POLICY "Enable all access for development" ON blog_posts;

-- Add secure policies
CREATE POLICY "Authenticated users can insert" ON blog_posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON blog_posts
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete" ON blog_posts
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

## Database Schema

```typescript
interface BlogPost {
  id: string;              // UUID
  title: string;           // Post title
  slug: string;            // URL-friendly slug (unique)
  description: string;     // Short description/excerpt
  content: string;         // Full markdown content
  tags: string[];          // Array of tags
  published: boolean;      // Published status
  read_time: string;       // Reading time estimate
  created_at: string;      // ISO timestamp
  updated_at: string;      // ISO timestamp
}
```
