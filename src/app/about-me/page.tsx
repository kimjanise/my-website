import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getExperiences } from '@/lib/experiences';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { AboutMeContent } from '@/components/AboutMeContent';

export const metadata: Metadata = {
  title: 'janise kim • about me',
};

export default async function AboutMePage() {
  const [posts, experiences] = await Promise.all([
    getBlogPosts(),
    getExperiences(),
  ]);

  return (
    <PageLayoutClient posts={posts}>
      <AboutMeContent experiences={experiences} />
    </PageLayoutClient>
  );
}
