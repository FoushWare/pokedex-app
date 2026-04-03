import { useState, useEffect } from 'react';

interface PokemonImageProps {
  src: string;
  alt: string;
  id?: number | string;
}

export default function PokemonImage({ src, alt, id }: PokemonImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Reset loading state when the id changes
  useEffect(() => {
    setLoaded(false);
  }, [id]);

  return (
    <div className="w-48 h-48 rounded-full bg-gray-50 flex items-center justify-center relative overflow-hidden ring-1 ring-gray-100 shadow-inner">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-100 animate-shimmer" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-40 h-40 object-contain transition-all duration-1000 ease-out z-10 ${
          loaded 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-4'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
