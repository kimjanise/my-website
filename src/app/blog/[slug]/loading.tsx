export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <div className="animate-pulse">
        <div className="h-10 bg-[#2f2f2f] rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-[#2f2f2f] rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-[#2f2f2f] rounded"></div>
          <div className="h-4 bg-[#2f2f2f] rounded"></div>
          <div className="h-4 bg-[#2f2f2f] rounded w-5/6"></div>
          <div className="h-4 bg-[#2f2f2f] rounded"></div>
          <div className="h-4 bg-[#2f2f2f] rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}
