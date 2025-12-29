import { getBlogPosts } from '@/lib/blog';
import { HomeClient } from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getBlogPosts();

  return <HomeClient posts={posts} />;
}
