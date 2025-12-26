import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';

export default async function ProjectsPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <div className="min-w-[768px] max-w-3xl py-8 px-6 ml-60">
        <h1 className="text-[32px] font-semibold text-[#ececec] mb-2">projects</h1>
        <p className="text-[#9a9a9a] text-[16px] mb-8">
          Check out my projects!
        </p>
        <div className="h-16" />
      </div>
    </PageLayoutClient>
  );
}
