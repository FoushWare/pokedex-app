interface PokemonPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PokemonPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PokemonPaginationProps) {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getVisiblePages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5 mt-8" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        ‹ Prev
      </button>

      {getVisiblePages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400 select-none">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-9 h-9 text-sm rounded-md font-medium transition-colors ${
              page === currentPage
                ? 'bg-black text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Next ›
      </button>
    </nav>
  );
}
