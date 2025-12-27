import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export default async function MusicPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="music" description="Music I love listening to!" />
    </PageLayoutClient>
  );
}
