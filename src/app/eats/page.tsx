import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';

export default async function EatsPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <div className="max-w-3xl mx-auto py-8 px-6">
        <h1 className="text-[32px] font-semibold text-[#ececec] mb-6">eats</h1>
        <div className="text-[#ececec] text-[16px] leading-relaxed">
          <p>Food recommendations and favorites!</p>
        </div>
      </div>
    </PageLayoutClient>
  );
}
