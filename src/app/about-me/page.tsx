import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { AboutMeContent } from '@/components/AboutMeContent';

export const metadata: Metadata = {
  title: 'janise kim • about me',
};

export default async function AboutMePage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <AboutMeContent />
    </PageLayoutClient>
  );
}
