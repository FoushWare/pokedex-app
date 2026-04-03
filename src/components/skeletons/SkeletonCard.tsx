export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center gap-3 animate-pulse">
      <div className="w-full aspect-[4/3] rounded-lg bg-gray-200" />
      <div className="w-full space-y-2 px-1">
        <div className="h-4 w-3/4 mx-auto rounded bg-gray-200" />
        <div className="h-3 w-1/2 mx-auto rounded bg-gray-200" />
      </div>
    </div>
  );
}
