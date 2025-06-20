import React, { useState } from 'react';
import { CheckCircleIcon, PhotoIcon, PlayIcon, MusicalNoteIcon, Squares2X2Icon } from '@heroicons/react/24/solid';

interface MediaSelectorProps {
  /**
   * Callback invoked when the user finishes the selector.
   * If the user clicks Skip, the value passed will be `null`.
   * Otherwise, it will be the selected category string.
   */
  onComplete: (category: string | null) => void;
}

interface Category {
  label: string;
  icon: React.ReactNode;
  span?: number; // grid column span
}

const categories: Category[] = [
  { label: 'All Media', icon: <Squares2X2Icon className="h-6 w-6" />, span: 2 },
  { label: 'Images', icon: <PhotoIcon className="h-6 w-6" /> },
  { label: 'Videos', icon: <PlayIcon className="h-6 w-6" /> },
  { label: 'Audio', icon: <MusicalNoteIcon className="h-6 w-6" /> },
];

const MediaSelector: React.FC<MediaSelectorProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
      <div className="bg-white/15 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-2xl p-8 w-11/12 max-w-md shadow-2xl border border-white/30 animate-scalein">
        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Choose Media Category
        </h2>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelected(cat.label)}
              className={`relative flex flex-col items-center justify-center py-4 px-4 rounded-xl transition-all transform border border-white/20 text-white/90 backdrop-blur-md hover:scale-105 focus:outline-none ${
                selected === cat.label ? 'bg-blue-600/70 shadow-lg' : 'bg-white/10 hover:bg-white/20'
              } ${cat.span ? `col-span-${cat.span}` : ''}`}
              style={{ minHeight: '72px' }}
            >
              {selected === cat.label && (
                <CheckCircleIcon className="absolute top-2 right-2 h-5 w-5 text-green-300" />
              )}
              {cat.icon}
              <span className="mt-2 text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => onComplete(null)}
            className="px-4 py-2 rounded-lg bg-gray-400/50 text-white hover:bg-gray-500/70 transition-colors backdrop-blur"
          >
            Skip
          </button>
          <button
            onClick={() => onComplete(selected)}
            disabled={!selected}
            className="px-4 py-2 rounded-lg bg-blue-500/80 text-white hover:bg-blue-600/90 transition-colors disabled:bg-blue-300/40 disabled:cursor-not-allowed backdrop-blur"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaSelector;

// Tailwind keyframes (in global styles or tailwind.config):
// @layer utilities {
//   @keyframes fadein { 0%{opacity:0;} 100%{opacity:1;} }
//   @keyframes scalein { 0%{opacity:0; transform:scale(.9);} 100%{opacity:1; transform:scale(1);} }
//   .animate-fadein { animation: fadein 0.3s ease-out forwards; }
//   .animate-scalein { animation: scalein 0.3s ease-out forwards; }
// }
