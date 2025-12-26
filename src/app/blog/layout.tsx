import { getBlogPosts } from '@/lib/blog';
import { BlogLayoutClient } from '@/components/BlogLayoutClient';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getBlogPosts();

  return <BlogLayoutClient posts={posts}>{children}</BlogLayoutClient>;
}
