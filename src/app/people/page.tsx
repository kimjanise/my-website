import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getPeople } from '@/lib/people';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { SubpageContent } from '@/components/SubpageContent';
import { PeopleContent } from '@/components/PeopleContent';

export const metadata: Metadata = {
  title: 'janise kim • people',
};

export default async function PeoplePage() {
  const [posts, people] = await Promise.all([
    getBlogPosts(),
    getPeople(),
  ]);

  return (
    <PageLayoutClient posts={posts}>
      <SubpageContent title="people" description="an incomplete list of friends + family, mentors, and role models that shape me">
        <PeopleContent people={people} />
      </SubpageContent>
    </PageLayoutClient>
  );
}
