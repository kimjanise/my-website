import { getBlogPosts } from '@/lib/blog';
import { PageLayoutClient } from '@/components/PageLayoutClient';

export default async function TechPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayoutClient posts={posts}>
      <div className="max-w-3xl mx-auto py-8 px-6">
        <h1 className="text-[32px] font-semibold text-[#ececec] mb-6">tech</h1>
        <div className="text-[#ececec] text-[16px] leading-relaxed">
          <p>Tech inspiration and resources!</p>
        </div>
      </div>
    </PageLayoutClient>
  );
}
