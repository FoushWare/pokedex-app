interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export default function LoadMoreButton({ onClick, isLoading, hasMore }: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <p className="text-center text-gray-500 mt-8 pb-4">
        All Pokémon loaded!
      </p>
    );
  }

  return (
    <div className="flex justify-center mt-10 pb-4">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-8 py-3 bg-black text-white font-semibold rounded-full shadow-md hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  );
}
