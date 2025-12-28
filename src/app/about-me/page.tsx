import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export const metadata: Metadata = {
  title: 'janise kim • about me',
};

export default async function AboutMePage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="about me" description="..." />
    </PageLayoutClient>
  );
}
