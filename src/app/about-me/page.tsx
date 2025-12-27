import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export default async function AboutMePage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="about me" description="Welcome to my about page!" />
    </PageLayoutClient>
  );
}
