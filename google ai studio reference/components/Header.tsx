import React from 'react';

export const Header: React.FC = () => {
  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-serif tracking-widest text-slate-700 font-bold">
          EVELYN.
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <a href="#" className="flex items-center gap-2 text-slate-600 hover:text-evelyn-blue transition-colors text-sm font-medium">
             <span className="text-lg">🍞</span> 
             <span>簡介</span>
          </a>
           <a href="#" className="flex items-center gap-2 text-slate-600 hover:text-evelyn-blue transition-colors text-sm font-medium">
             <span>作品</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
