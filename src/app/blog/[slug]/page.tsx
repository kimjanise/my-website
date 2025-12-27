import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllSlugs } from '@/lib/blog';
import { BlogPostContent } from '@/components/BlogPostContent';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostContent
      title={post.title}
      createdAt={post.created_at}
      content={post.content}
    />
  );
}
