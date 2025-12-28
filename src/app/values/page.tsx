import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';

export default async function ValuesPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="values" description="Values I live by!" />
    </PageLayoutClient>
  );
}
