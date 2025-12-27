import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export default async function PeoplePage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="people" description="People I admire and follow!" />
    </PageLayoutClient>
  );
}
