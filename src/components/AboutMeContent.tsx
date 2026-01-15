'use client';

import { useTheme } from '@/context/ThemeContext';
import { PageContainer } from './PageContainer';

export function AboutMeContent() {
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
            <span>ai engineer + tinkerer interested in , and ai alignment.</span>
          </li>
          <li>
            <span>studying <a href="https://www.cs.cmu.edu/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">cs</a> + <a href="https://www.cmu.edu/swartz-center-for-entrepreneurship/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">entrepreneurship</a> as a <a href="https://www.cmu.edu/swartz-center-for-entrepreneurship/mentorship-and-learning/undergraduate-innovation-scholars/index.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">swartz innovation scholar</a> @ <a href="https://www.cmu.edu/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">carnegie mellon university</a></span>
          </li>
          <li>
            <span>building a modern agent stack-tracing platform as a founder-in-residence @ <a href="https://www.afore.vc/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">afore capital</a></span>
          </li>
          <li>
            <span>passionate about building responsible systems we can trust</span>
            <div className="mt-1 ml-1">
              <p className="mt-1"><span className="font-semibold">previously:</span></p>
              <ul className="list-disc list-outside ml-5 mt-0.5 space-y-0.5">
                <li>shipped 0→1 evals for llm observability @ <a href="https://www.datadoghq.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">datadog</a></li>
                <li>sourced + supported student founders as a venture fellow @ <a href="https://www.critical.vc/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">critical vc</a></li>
                <li>taught <a href="https://www.cs.cmu.edu/~15150/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">functional programming</a> to 400+ students with professors <a href="https://www.cs.cmu.edu/~me/whois-me.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">mike erdmann</a>, <a href="https://www.cs.cmu.edu/~dilsun/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">dilsun kaynar</a>, and <a href="https://www.cs.cmu.edu/~balzers/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">stephanie balzer</a></li>
                <li>helped launch the <a href="https://delphi.cmu.edu/covidcast/?date=20260103" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">epidata dashboard</a> and perform epidemeological forecasting as an ai/ml researcher @ <a href="https://delphi.cmu.edu/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">delphi research group</a></li>
                <li>designed mixed ux research methods with professor <a href="https://andrewbegel.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">andrew begel</a> @ <a href="https://hcii.cmu.edu/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">hcii</a></li>
              </ul>
            </div>
          </li>
          <li>probably in sf or pittsburgh</li>
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
