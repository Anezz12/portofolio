import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for blog posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
  read_time: string;
}

export interface CreateBlogPost {
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  published: boolean;
  read_time: string;
}

export interface UpdateBlogPost extends Partial<CreateBlogPost> {
  id: string;
}
