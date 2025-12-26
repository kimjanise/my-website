import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';

export default async function MusicPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <div className="max-w-3xl mx-auto py-8 px-6">
        <h1 className="text-[32px] font-semibold text-[#ececec] mb-6">music</h1>
        <div className="text-[#ececec] text-[16px] leading-relaxed">
          <p>Music I love listening to!</p>
        </div>
      </div>
    </PageLayoutClient>
  );
}
