// components/Container.tsx
export default function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto max-w-6xl px-4 md:px-6 ${className}`}>{children}</div>;
}
