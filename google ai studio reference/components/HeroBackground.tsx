import React from 'react';

export const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
      {/* Main Base Color - Darker teal/blue specific to Evelyn theme */}
      <div className="absolute inset-0 bg-[#8FAEC1]"></div>

      {/* Abstract Blobs - Recreating the art style */}
      
      {/* Top Left Dark Blob */}
      <svg className="absolute -top-20 -left-20 w-[500px] h-[500px] text-[#4F6D7E] opacity-60 mix-blend-multiply" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.7C91.4,-34.3,98.1,-19.6,95.8,-5.8C93.5,8,82.2,20.9,71.2,31.7C60.2,42.5,49.5,51.2,37.8,58.3C26.1,65.4,13.4,70.9,0.3,70.3C-12.8,69.8,-25.3,63.2,-36.8,55.5C-48.3,47.8,-58.8,39,-66.6,28.2C-74.4,17.4,-79.5,4.6,-78.2,-7.6C-76.9,-19.8,-69.2,-31.4,-59.6,-40.8C-50,-50.2,-38.5,-57.4,-26.6,-66.2C-14.7,-75,-2.4,-85.4,10.1,-85.4C22.6,-85.4,45.2,-75,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>

      {/* Top Right Large Dark Blob */}
      <svg className="absolute -top-40 -right-20 w-[800px] h-[800px] text-[#3A4E5C] opacity-30 mix-blend-multiply" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M39.9,-65.7C54.1,-60.5,69.6,-53.9,78.8,-42.9C88,-31.9,90.9,-16.5,88.7,-2.1C86.5,12.3,79.2,25.7,69.6,36.9C60,48.1,48.1,57.1,35.7,64.4C23.3,71.7,10.4,77.3,-2.3,77.7C-15,78.1,-27.9,73.3,-39.3,65.4C-50.7,57.5,-60.6,46.5,-67.2,34.1C-73.8,21.7,-77.1,7.9,-75.6,-5.2C-74.1,-18.3,-67.8,-30.7,-58.5,-40.3C-49.2,-49.9,-36.9,-56.7,-24.8,-63.3C-12.7,-69.9,-0.8,-76.3,10.2,-74.8C21.2,-73.3,32.2,-64,39.9,-65.7Z" transform="translate(100 100)" />
      </svg>
      
       {/* Bottom Right Light Teal Blob */}
       <svg className="absolute bottom-0 right-0 w-[600px] h-[400px] text-[#A8D0E6] opacity-40 mix-blend-overlay" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M42.7,-72.8C54.6,-67.1,63.1,-55.4,70.5,-43.3C77.9,-31.2,84.2,-18.7,83.1,-6.8C82,5.1,73.5,16.4,64.8,26.4C56.1,36.4,47.2,45.1,37.3,51.8C27.4,58.5,16.5,63.2,5.1,63.2C-6.3,63.2,-18.9,58.5,-30.4,52.2C-41.9,45.9,-52.3,38,-61.4,28C-70.5,18,-78.3,5.9,-77.1,-5.5C-75.9,-16.9,-65.7,-27.6,-55.4,-37.2C-45.1,-46.8,-34.7,-55.3,-23.4,-61.4C-12.1,-67.5,-0.1,-71.2,12.7,-72.1C25.5,-73,51,-70.9,42.7,-72.8Z" transform="translate(100 100)" />
      </svg>

      {/* Doodles/Lines */}
      <svg className="absolute top-20 right-1/4 w-32 h-32 text-white/50" viewBox="0 0 100 100">
         <path fill="none" stroke="currentColor" strokeWidth="2" d="M10,50 Q25,25 40,50 T70,50 T90,20" />
         <circle cx="85" cy="25" r="2" fill="currentColor"/>
         <circle cx="15" cy="55" r="2" fill="currentColor"/>
      </svg>

       <svg className="absolute bottom-10 left-10 w-48 h-48 text-white/40 rotate-12" viewBox="0 0 100 100">
         <path fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" d="M10,80 C30,90 50,10 90,20" />
      </svg>

       <div className="absolute top-32 left-32 text-white/60">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      </div>

       <div className="absolute top-24 right-40 text-[#E09F88]/80">
         <svg width="60" height="60" viewBox="0 0 100 100">
            <path fill="currentColor" d="M50,10 Q60,40 90,50 Q60,60 50,90 Q40,60 10,50 Q40,40 50,10" />
         </svg>
      </div>
      
       {/* Squiggle Text 'lle' simulation */}
      <div className="absolute top-10 right-1/3 text-white/30 font-script text-9xl rotate-12 pointer-events-none">
        lle.
      </div>
      
       <div className="absolute bottom-20 left-10 text-white/20 font-script text-6xl -rotate-12 pointer-events-none">
        traces
      </div>
    </div>
  );
};