'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { PageContainer } from './PageContainer';
import type { Project } from '@/types/projects';

interface ProjectsContentProps {
  projects: Project[];
}

const skillColors: Record<string, string> = {
  'pm': 'bg-blue-500/20 text-blue-400',
  'ui/ux': 'bg-orange-500/20 text-orange-400',
  'ai/ml': 'bg-yellow-500/20 text-yellow-400',
  'swe': 'bg-gray-500/20 text-gray-400',
};

const getSkillColor = (skill: string, isDark: boolean) => {
  return skillColors[skill] || (isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-500/20 text-gray-500');
};

function ProjectCard({ project, onClick, isDark }: { project: Project; onClick: () => void; isDark: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col rounded-lg border text-left transition-colors overflow-hidden ${isDark
          ? 'bg-[#2f2f2f] border-[#424242] hover:bg-[#3a3a3a]'
          : 'bg-[#f5f5f5] border-[#e5e5e5] hover:bg-[#ebebeb]'
        }`}
    >
      {/* Top - Preview/Graphic */}
      <div className={`w-full h-56 flex items-center justify-center ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#e0e0e0]'
        }`}>
        {project.icon_url ? (
          <img src={project.icon_url} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span className={`text-6xl font-bold ${isDark ? 'text-[#333]' : 'text-[#ccc]'}`}>
            {project.title.charAt(0)}
          </span>
        )}
      </div>

      {/* Bottom - Info */}
      <div className="px-3 py-2.5">
        <h3 className={`text-[14px] font-semibold mb-1 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
          {project.title}
        </h3>

        <p className={`text-[12px] leading-snug mb-2 line-clamp-2 ${isDark ? 'text-[#b4b4b4]' : 'text-[#6b6b6b]'}`}>
          {project.short_description}
        </p>

        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.skills.map((skill, index) => (
              <span
                key={index}
                className={`text-[11px] px-2 py-0.5 rounded-full ${getSkillColor(skill, isDark)}`}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
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
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${isDark ? 'bg-[#212121]' : 'bg-white'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isDark ? 'hover:bg-[#2f2f2f] text-[#9a9a9a]' : 'hover:bg-[#f0f0f0] text-[#6b6b6b]'
            }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className={`text-[28px] font-bold mb-6 pr-8 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
          {project.title}
        </h2>

        {/* Properties */}
        <div className="space-y-3 mb-6">
          {/* Date */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 w-24 ${isDark ? 'text-[#8e8e8e]' : 'text-[#9a9a9a]'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-[14px]">Date</span>
            </div>
            <span className={`text-[14px] ${isDark ? 'text-[#b4b4b4]' : 'text-[#6b6b6b]'}`}>
              {project.date || 'Empty'}
            </span>
          </div>

          {/* Skills */}
          <div className="flex items-start gap-3">
            <div className={`flex items-center gap-2 w-24 flex-shrink-0 ${isDark ? 'text-[#8e8e8e]' : 'text-[#9a9a9a]'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="text-[14px]">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.skills && project.skills.length > 0 ? (
                project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`text-[12px] px-2.5 py-1 rounded-full ${getSkillColor(skill, isDark)}`}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className={`text-[14px] ${isDark ? 'text-[#b4b4b4]' : 'text-[#6b6b6b]'}`}>Empty</span>
              )}
            </div>
          </div>

          {/* Link */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 w-24 ${isDark ? 'text-[#8e8e8e]' : 'text-[#9a9a9a]'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span className="text-[14px]">Link</span>
            </div>
            {project.link_url ? (
              <a
                href={project.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[14px] underline underline-offset-2 hover:opacity-70 ${isDark ? 'text-[#b4b4b4]' : 'text-[#6b6b6b]'}`}
              >
                {project.link_url.replace(/^https?:\/\//, '').slice(0, 30)}...
              </a>
            ) : (
              <span className={`text-[14px] ${isDark ? 'text-[#b4b4b4]' : 'text-[#6b6b6b]'}`}>Empty</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t my-6 ${isDark ? 'border-[#424242]' : 'border-[#e5e5e5]'}`} />

        {/* Bullet Points */}
        {project.bullet_points && project.bullet_points.length > 0 && (
          <ul className={`list-disc list-outside ml-5 space-y-2 text-[15px] leading-relaxed ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
            {project.bullet_points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
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
    <div className="w-full max-w-4xl py-8 px-6 mx-auto">
      <h1 className={`text-[32px] font-semibold mb-2 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        work
      </h1>
      <p className={`text-[16px] mb-6 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
        some things i've built or contributed to recently
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
      <div className="h-16" />
    </div>
  );
}
