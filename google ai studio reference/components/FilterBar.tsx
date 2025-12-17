import React from 'react';
import { Category } from '../types';

interface FilterBarProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="w-full bg-white border-b border-slate-100 sticky top-20 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-2 md:space-x-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm md:text-base
                ${activeCategory === cat.id 
                  ? 'bg-evelyn-blue text-white shadow-md transform scale-105' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }
              `}
            >
              {cat.icon}
              <span className="font-medium tracking-wide">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
