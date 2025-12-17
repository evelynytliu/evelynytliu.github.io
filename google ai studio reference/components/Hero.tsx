import React from 'react';
import { HeroBackground } from './HeroBackground';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center py-12 md:py-24 overflow-hidden isolate">
      <HeroBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="order-2 md:order-1 relative">
          <div className="mb-8 relative">
            <div className="absolute -top-12 -left-10 text-white opacity-80">
               <svg width="40" height="40" viewBox="0 0 100 100" className="animate-pulse">
                  <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="currentColor" />
               </svg>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-800 drop-shadow-sm tracking-tight leading-tight">
              KEEP EXPLORING,
            </h1>
            <div className="flex items-end justify-start md:translate-x-12 -mt-2 md:-mt-4">
              <h2 className="font-script text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-md transform -rotate-2">
                and leave traces.
              </h2>
            </div>
            
             {/* Decorative doodle arrow */}
             <svg className="absolute -left-4 bottom-0 w-12 h-12 md:w-16 md:h-16 text-slate-600 transform rotate-45 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>

          {/* Bio Text */}
          <div className="max-w-xl mt-8 space-y-2 text-slate-700/90 text-lg font-medium tracking-wide">
            <p>做了 18 年的平面設計，現在也開始做些小工具。</p>
            <p>兩個男孩的媽媽，偶爾也會做些給小孩玩的東西。</p>
            <p>這裡試著開始收藏一些作品，自己玩的東西 —— 歡迎來晃晃。</p>
          </div>
        </div>

        {/* Right: Portrait Image */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
             <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Image Glow */}
                <div className="absolute inset-0 bg-evelyn-accent rounded-full opacity-30 blur-3xl transform translate-x-4 translate-y-4"></div>
                
                {/* Portrait */}
                <img 
                  src="https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=1000&auto=format&fit=crop" 
                  alt="Evelyn Portrait" 
                  className="w-full h-full object-cover shadow-2xl relative z-10"
                  style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                />

                {/* Rotating Circle Text */}
                 <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 z-20 animate-[spin_10s_linear_infinite]">
                    <svg width="140" height="140" viewBox="0 0 100 100" className="text-white drop-shadow-md">
                        <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent"/>
                        <text className="text-[10px] tracking-[0.2em] uppercase font-bold fill-current">
                            <textPath href="#curve">
                                • Creative • Designer • Developer • Mom
                            </textPath>
                        </text>
                    </svg>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};