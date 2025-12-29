import { supabase } from './supabase';
import type { BlogPost, BlogPostSummary } from '@/types/blog';

// Fetch all blog posts for sidebar (summary only)
export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, created_at')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }

  return data || [];
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching blog post:', error);
    throw new Error('Failed to fetch blog post');
  }

  return data;
}

// Get all slugs for static generation
export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug');

  if (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }

  return data?.map(post => post.slug) || [];
}
