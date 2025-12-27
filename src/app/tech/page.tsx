import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export default async function TechPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="tech" description="Tech inspiration and resources!" />
    </PageLayoutClient>
  );
}
