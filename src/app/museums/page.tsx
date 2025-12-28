import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export const metadata: Metadata = {
  title: 'janise kim • museums',
};

export default async function MuseumsPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="museums" description="a small curation of art and objects that made me feel something" />
    </PageLayoutClient>
  );
}
