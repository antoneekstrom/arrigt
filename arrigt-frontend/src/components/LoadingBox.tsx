export function LoadingBox({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="h-full w-full overflow-clip rounded-lg bg-gray-200/70">
        <div className="shimmer h-full w-full" />
      </div>
    </div>
  );
}
