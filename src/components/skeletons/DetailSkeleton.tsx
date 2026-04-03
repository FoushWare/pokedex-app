export default function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="h-5 w-28 bg-gray-200 rounded mb-8" />
        <div className="h-28 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-t-3xl" />
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-4 md:w-2/5">
              <div className="w-48 h-48 rounded-full bg-gray-200" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-md" />
                <div className="h-6 w-16 bg-gray-200 rounded-md" />
              </div>
              <div className="flex gap-6">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-5 w-24 bg-gray-200 rounded" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-3 w-12 bg-gray-200 rounded" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full" />
                  <div className="h-3 w-8 bg-gray-200 rounded" />
                </div>
              ))}
              <div className="h-5 w-20 bg-gray-200 rounded mt-6" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
