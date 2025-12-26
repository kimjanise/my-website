import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className="text-[32px] font-semibold text-[#ececec] mb-4">
        Post Not Found
      </h1>
      <p className="text-[#9a9a9a] mb-8">
        The blog post you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#2f2f2f] text-[#ececec] rounded-lg hover:bg-[#424242] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
