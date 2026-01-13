'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { PageContainer } from './PageContainer';
import type { Project } from '@/types/projects';

interface ProjectsContentProps {
  projects: Project[];
}

function ProjectCard({ project, onClick, isDark }: { project: Project; onClick: () => void; isDark: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-colors ${
        isDark
          ? 'bg-[#2f2f2f] border-[#424242] hover:bg-[#3a3a3a]'
          : 'bg-[#f5f5f5] border-[#e5e5e5] hover:bg-[#ebebeb]'
      }`}
    >
      <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-[#424242]' : 'bg-[#e5e5e5]'
      }`}>
        {project.icon_url ? (
          <img src={project.icon_url} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl">{project.title.charAt(0)}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`text-[16px] font-semibold mb-1 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
          {project.title}
        </h3>
        <p className={`text-[14px] line-clamp-2 mb-2 ${isDark ? 'text-[#b4b4b4]' : 'text-[#6b6b6b]'}`}>
          {project.short_description}
        </p>
        <p className={`text-[12px] ${isDark ? 'text-[#8e8e8e]' : 'text-[#9a9a9a]'}`}>
          {project.category}
        </p>
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose, isDark }: { project: Project; onClose: () => void; isDark: boolean }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${
          isDark ? 'bg-[#212121]' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            isDark ? 'hover:bg-[#2f2f2f] text-[#9a9a9a]' : 'hover:bg-[#f0f0f0] text-[#6b6b6b]'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden mb-4 ${
            isDark ? 'bg-[#2f2f2f]' : 'bg-[#f0f0f0]'
          }`}>
            {project.icon_url ? (
              <img src={project.icon_url} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">{project.title.charAt(0)}</span>
            )}
          </div>
          <h2 className={`text-[24px] font-semibold mb-1 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
            {project.title}
          </h2>
          <p className={`text-[14px] ${isDark ? 'text-[#8e8e8e]' : 'text-[#9a9a9a]'}`}>
            {project.category}
          </p>
        </div>

        <p className={`text-[15px] leading-relaxed mb-6 ${isDark ? 'text-[#b4b4b4]' : 'text-[#4a4a4a]'}`}>
          {project.full_description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-[14px] font-semibold mb-3 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-[12px] px-3 py-1 rounded-full ${
                    isDark ? 'bg-[#2f2f2f] text-[#b4b4b4]' : 'bg-[#f0f0f0] text-[#6b6b6b]'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.link_url && (
          <a
            href={project.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-medium transition-colors ${
              isDark
                ? 'bg-[#ececec] text-[#0d0d0d] hover:bg-[#d4d4d4]'
                : 'bg-[#0d0d0d] text-[#ececec] hover:bg-[#2a2a2a]'
            }`}
          >
            {project.link_text || 'View Project'}
          </a>
        )}
      </div>
    </div>
  );
}

export function ProjectsContent({ projects }: ProjectsContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <PageContainer wide>
      <h1 className={`text-[32px] font-semibold mb-2 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        projects
      </h1>
      <p className={`text-[16px] mb-6 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
        things i've built or contributed to
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
            isDark={isDark}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isDark={isDark}
        />
      )}
    </PageContainer>
  );
}
