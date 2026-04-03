import { useState } from 'react';

interface PokemonImageProps {
  src: string;
  alt: string;
}

export default function PokemonImage({ src, alt }: PokemonImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-40 h-40 object-contain transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
