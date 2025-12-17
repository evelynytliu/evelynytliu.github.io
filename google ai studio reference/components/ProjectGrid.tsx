import React from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="min-h-[300px]">
             <ProjectCard project={project} />
          </div>
        ))}
        
        {/* Placeholder / Coming Soon Card for aesthetics */}
        <div className="min-h-[300px] border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:border-evelyn-blue hover:text-evelyn-blue transition-colors cursor-pointer group p-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center mb-4 transition-colors">
                <span className="text-3xl">+</span>
            </div>
            <span className="font-medium">More to come</span>
        </div>
      </div>
      
       {/* Decorative element at bottom of grid */}
       <div className="w-full flex justify-center mt-20 opacity-50">
          <svg width="100" height="20" viewBox="0 0 100 20">
             <path d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
       </div>
    </div>
  );
};
