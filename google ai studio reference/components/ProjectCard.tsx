import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white border border-slate-100">
      
      {/* Decorative Ticket Cutouts (Visual Flair) */}
      <div className="absolute top-1/2 -left-2 w-4 h-4 bg-evelyn-bg rounded-full z-10"></div>
      <div className="absolute top-1/2 -right-2 w-4 h-4 bg-evelyn-bg rounded-full z-10"></div>

      <div className={`p-6 md:p-8 h-full flex flex-col justify-between ${project.bgColor} ${project.textColor} relative overflow-hidden`}>
        
        {/* Abstract shapes in card background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl -ml-5 -mb-5"></div>

        <div className="relative z-10">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 tracking-tight group-hover:scale-[1.02] transition-transform origin-left">
                {project.title}
            </h3>
            
            {/* Dotted Line Divider */}
            <div className="w-full border-b-2 border-dotted border-current opacity-30 my-4"></div>

            <p className="text-sm md:text-base opacity-90 leading-relaxed font-sans">
                {project.description}
            </p>
        </div>

        <div className="relative z-10 mt-8 flex justify-between items-end">
            <div className="text-xs uppercase tracking-widest opacity-70 font-bold">
                {project.category}
            </div>
            
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};
