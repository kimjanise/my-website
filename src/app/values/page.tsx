import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getValues } from '@/lib/values';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';
import { ValuesContent } from '@/components/ValuesContent';

export const metadata: Metadata = {
  title: 'janise kim • values',
};

export default async function ValuesPage() {
  const [posts, values] = await Promise.all([
    getBlogPosts(),
    getValues(),
  ]);

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="values" description="things that keeps me up at night">
        <ValuesContent values={values} />
      </SubpageContent>
    </PageLayoutClient>
  );
}
