import { getBlogPosts } from '@/lib/blog';
import { getPlaces } from '@/lib/eats';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { EatsClient } from '@/components/EatsClient';

export default async function EatsPage() {
  const [posts, places] = await Promise.all([
    getBlogPosts(),
    getPlaces(),
  ]);

  return (
    <PageLayoutClient posts={posts}>
      <EatsClient places={places} />
    </PageLayoutClient>
  );
}
