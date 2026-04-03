import { Ruler, Weight } from 'lucide-react';

interface PhysicalInfoProps {
  height: number;
  weight: number;
}

export default function PhysicalInfo({ height, weight }: PhysicalInfoProps) {
  return (
    <div className="flex gap-6 text-sm text-gray-700">
      <div className="flex items-center gap-1.5">
        <Ruler className="w-4 h-4 text-gray-400" />
        <span className="font-bold">{(height / 10).toFixed(1)} m</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Weight className="w-4 h-4 text-gray-400" />
        <span className="font-bold">{(weight / 10).toFixed(1)} kg</span>
      </div>
    </div>
  );
}
