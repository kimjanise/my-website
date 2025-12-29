'use client';

interface PageContainerProps {
  wide?: boolean;
  children: React.ReactNode;
}

export function PageContainer({ wide, children }: PageContainerProps) {
  return (
    <div className={`w-full py-8 px-6 mx-auto ${wide ? 'max-w-3xl' : 'max-w-xl'}`}>
      {children}
      <div className="h-16" />
    </div>
  );
}
