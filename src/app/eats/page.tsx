import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { EatsClient } from '@/components/EatsClient';

export default async function EatsPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <EatsClient />
    </PageLayoutClient>
  );
}
