import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export const metadata: Metadata = {
  title: 'janise kim • tech',
};

export default async function TechPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="tech" description="a brain dump of cool research, articles, startups, and more" />
    </PageLayoutClient>
  );
}
