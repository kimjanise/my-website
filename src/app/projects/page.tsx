import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export const metadata: Metadata = {
  title: 'janise kim • projects',
};

export default async function ProjectsPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="projects" description="Check out my projects!" />
    </PageLayoutClient>
  );
}
