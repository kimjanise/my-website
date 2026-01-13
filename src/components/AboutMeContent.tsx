'use client';

import { useTheme } from '@/context/ThemeContext';
import { PageContainer } from './PageContainer';
import type { Experience } from '@/types/experiences';

interface AboutMeContentProps {
  experiences: Experience[];
}

export function AboutMeContent({ experiences }: AboutMeContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <PageContainer wide>
      <h1 className={`text-[32px] font-semibold mb-2 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        about me
      </h1>
      <p className={`text-[16px] mb-6 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
        [jan-iss] /ˈdʒæn ɪs/
      </p>

      <div className={`text-[15px] leading-relaxed ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        <ol className="list-decimal list-outside ml-5 space-y-4">
          <li>
            <span>studying cs + human-computer interaction @ <a href="https://www.cmu.edu/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">carnegie mellon university</a></span>
          </li>
          <li>
            <span>passionate about building responsible systems we can trust</span>
            <div className="mt-1 ml-1">
              <p className="mt-1"><span className="font-semibold">previously:</span></p>
              <ul className="list-disc list-outside ml-5 mt-0.5 space-y-0.5">
                {experiences.map((exp) => (
                  <li key={exp.id}>
                    {exp.role_description} @{' '}
                    {exp.organization_url ? (
                      <a
                        href={exp.organization_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:opacity-70"
                      >
                        {exp.organization}
                      </a>
                    ) : (
                      exp.organization
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>probably in sf or pittsburgh (or nyc sometimes)</li>
        </ol>
      </div>

      <div className="flex justify-center mt-10">
        <div className="max-w-xlg w-full">
          <img
            src="/about-me.jpg"
            alt="Janise as a child with laptop"
            className="w-full rounded-sm"
          />
          <p className={`text-[16px] mt-2 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
            11/19/2007
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
