export default function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center gap-2 animate-pulse">
      <div className="w-32 h-32 rounded-lg bg-muted" />
      <div className="h-5 w-24 rounded bg-muted" />
      <div className="h-4 w-12 rounded bg-muted" />
    </div>
  );
}
