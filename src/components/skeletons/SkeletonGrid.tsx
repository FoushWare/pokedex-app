import { POKEMON_PER_PAGE } from '@/config/constants';
import SkeletonCard from './SkeletonCard';

export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: POKEMON_PER_PAGE }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
