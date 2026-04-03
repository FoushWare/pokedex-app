type ViewMode = 'paginated' | 'loadmore';

interface ModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      <button
        onClick={() => onModeChange('paginated')}
        className={`px-5 py-2 text-sm font-semibold rounded-md transition-all ${
          mode === 'paginated'
            ? 'bg-black text-white shadow-md'
            : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
        }`}
      >
        Page Controls
      </button>
      <button
        onClick={() => onModeChange('loadmore')}
        className={`px-5 py-2 text-sm font-semibold rounded-md transition-all ${
          mode === 'loadmore'
            ? 'bg-black text-white shadow-md'
            : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
        }`}
      >
        Load More
      </button>
    </div>
  );
}

export type { ViewMode };
