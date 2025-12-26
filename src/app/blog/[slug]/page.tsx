import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllSlugs } from '@/lib/blog';
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
    <article className="max-w-3xl mx-auto py-8 px-6">
      <h1 className="text-[32px] font-semibold text-[#ececec] mb-4">
        {post.title}
      </h1>
      <time className="text-[14px] text-[#9a9a9a] block mb-8">
        {new Date(post.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <div className="text-[#ececec] text-[16px] leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
