import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getProjects } from '@/lib/projects';
import { PageLayoutClient } from '@/components/PageLayoutClient';
import { ProjectsContent } from '@/components/ProjectsContent';

export const metadata: Metadata = {
  title: 'janise kim • projects',
};

export default async function ProjectsPage() {
  const [posts, projects] = await Promise.all([
    getBlogPosts(),
    getProjects(),
  ]);

  return (
    <PageLayoutClient posts={posts}>
      <ProjectsContent projects={projects} />
    </PageLayoutClient>
  );
}
