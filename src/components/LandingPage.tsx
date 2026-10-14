import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES } from '../data/coursesMeta';
import { ACHIEVEMENTS } from '../data/achievements';
import { 
  ArrowRight, 
  Terminal, 
  Coffee, 
  Cpu, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Award, 
  ChevronRight,
  Code2,
  Play,
  RotateCcw
} from 'lucide-react';
import { CourseId } from '../types';

interface LandingPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { isAuthenticated, currentUser } = useAuth();

  // Interactive sample widget state right on the homepage
  const [sampleLang, setSampleLang] = useState<'python' | 'java' | 'cpp'>('python');
  const [sampleCode, setSampleCode] = useState<string>(
    '# Calculate simple interest\nprincipal = 1000\nrate = 5\ntime = 2\ninterest = (principal * rate * time) / 100\nprint("Interest earned:", interest)'
  );
  const [sampleOutput, setSampleOutput] = useState<string | null>(null);

  const handleRunSample = () => {
    if (sampleLang === 'python') {
      setSampleOutput('Interest earned: 100.0');
    } else if (sampleLang === 'java') {
      setSampleOutput('Class 11 Array Average: 88.5');
    } else {
      setSampleOutput('Pointer Address: 0x7ffd92\nValue: 42');
    }
  };

  const handleSelectSampleLang = (lang: 'python' | 'java' | 'cpp') => {
    setSampleLang(lang);
    setSampleOutput(null);
    if (lang === 'python') {
      setSampleCode('# Calculate simple interest\nprincipal = 1000\nrate = 5\ntime = 2\ninterest = (principal * rate * time) / 100\nprint("Interest earned:", interest)');
    } else if (lang === 'java') {
      setSampleCode('public class Main {\n    public static void main(String[] args) {\n        int[] scores = {85, 92, 88};\n        double avg = (scores[0] + scores[1] + scores[2]) / 3.0;\n        System.out.printf("Class 11 Array Average: %.1f\\n", avg);\n    }\n}');
    } else {
      setSampleCode('#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 42;\n    int* ptr = &val;\n    cout << "Pointer Address: 0x7ffd92" << endl;\n    cout << "Value: " << *ptr << endl;\n    return 0;\n}');
    }
  };

  const handleStartLearning = () => {
    if (isAuthenticated) {
      onNavigate('dashboard');
    } else {
      onNavigate('signup');
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="pt-10 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#24364B] tracking-tight leading-[1.15]">
              Level Up Your Coding Skills.
            </h1>

            <p className="text-lg sm:text-xl text-[#6B7787] font-normal leading-relaxed max-w-2xl">
              Explore programming, practise real examples, and build your skills one topic at a time. Master Python, Java, and C++ with curriculum-aligned lessons, Tamil/Tanglish explanations, and instant verification.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleStartLearning}
                className="px-6 py-3.5 bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] text-[#24364B] font-bold text-base rounded-md transition-all shadow-sm hover:shadow-md flex items-center gap-2.5 cursor-pointer"
              >
                <span>{isAuthenticated ? 'Go to My Dashboard' : 'Start Learning'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('courses')}
                className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#FAF8F0] border border-[#E2DFD2] text-[#24364B] font-semibold text-base rounded-md transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Courses</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E2DFD2]/80 text-[#24364B]">
              <div>
                <div className="text-2xl font-black tracking-tight">300</div>
                <div className="text-xs text-[#6B7787] font-medium mt-0.5">Structured Topics</div>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight">3</div>
                <div className="text-xs text-[#6B7787] font-medium mt-0.5">Pure Languages</div>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight">100%</div>
                <div className="text-xs text-[#6B7787] font-medium mt-0.5">Free for Students</div>
              </div>
            </div>
          </div>

          {/* Interactive Live Preview Box on Hero */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#FAF8F0] px-4 py-3 border-b border-[#E2DFD2] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#E2DFD2]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2DFD2]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2DFD2]"></div>
                  <span className="ml-2 text-xs font-semibold text-[#6B7787]">Interactive Sandbox Preview</span>
                </div>
                {/* Language Switcher Tabs */}
                <div className="flex items-center gap-1 bg-[#FFFFFF] p-0.5 rounded-md border border-[#E2DFD2]">
                  <button
                    onClick={() => handleSelectSampleLang('python')}
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      sampleLang === 'python' ? 'bg-[#F4E7AE] text-[#24364B] font-bold' : 'text-[#6B7787]'
                    }`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => handleSelectSampleLang('java')}
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      sampleLang === 'java' ? 'bg-[#DCEBFA] text-[#24364B] font-bold' : 'text-[#6B7787]'
                    }`}
                  >
                    Java
                  </button>
                  <button
                    onClick={() => handleSelectSampleLang('cpp')}
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      sampleLang === 'cpp' ? 'bg-[#E7E5F7] text-[#24364B] font-bold' : 'text-[#6B7787]'
                    }`}
                  >
                    C++
                  </button>
                </div>
              </div>

              {/* Code text preview */}
              <div className="p-4 bg-[#24364B] text-[#FAF8F0] font-mono text-xs sm:text-sm overflow-x-auto min-h-[160px]">
                <pre>{sampleCode}</pre>
              </div>

              {/* Output Panel if run */}
              {sampleOutput && (
                <div className="px-4 py-2.5 bg-[#F4F9F4] border-t border-[#D5ECD5] text-xs font-mono text-[#196B36]">
                  <div className="font-bold text-[11px] uppercase tracking-wider text-[#196B36]/80 mb-1">Standard Output:</div>
                  <pre>{sampleOutput}</pre>
                </div>
              )}

              {/* Action buttons */}
              <div className="px-4 py-3 bg-[#FFFFFF] border-t border-[#E2DFD2] flex items-center justify-between">
                <span className="text-xs text-[#6B7787]">Ready to test this concept?</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunSample}
                    className="px-3 py-1.5 bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] text-[#24364B] text-xs font-bold rounded-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#24364B]" />
                    <span>Run Code</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE DEDICATED COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-[#24364B] tracking-tight">
            Three Core Languages. Exactly 100 Topics Each.
          </h2>
          <p className="text-base text-[#6B7787] mt-3">
            Pure focus on the most important programming foundations without distracting clutter. Each course offers 10 units of 10 structured topics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COURSES.map((course) => {
            const isPython = course.id === 'python';
            const isJava = course.id === 'java';
            const isCpp = course.id === 'cpp';

            return (
              <div
                key={course.id}
                className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#24364B]/40 transition-all shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center font-black text-xl"
                      style={{ backgroundColor: course.accentBg, border: `1px solid ${course.accentBorder}` }}
                    >
                      {isPython && <Terminal className="w-6 h-6 text-[#24364B]" />}
                      {isJava && <Coffee className="w-6 h-6 text-[#24364B]" />}
                      {isCpp && <Cpu className="w-6 h-6 text-[#24364B]" />}
                    </div>
                    <span className="text-xs font-bold text-[#6B7787] uppercase tracking-wider">
                      100 Topics
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#24364B] mb-2">
                    {course.title}
                  </h3>

                  <p className="text-sm font-medium text-[#24364B]/80 mb-3">
                    {course.tagline}
                  </p>

                  <p className="text-sm text-[#6B7787] leading-relaxed mb-6">
                    {course.shortDescription}
                  </p>

                  <div className="space-y-2 border-t border-[#E2DFD2] pt-4 mb-6 text-xs text-[#24364B]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7787]">Progression</span>
                      <span className="font-semibold">Beginner to Expert</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7787]">Curriculum</span>
                      <span className="font-semibold">10 Units · 10 Topics each</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7787]">Board Syllabus</span>
                      <span className="font-semibold">CBSE, ICSE & State Board</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('course-detail', { courseId: course.id })}
                  className="w-full py-2.5 px-4 bg-[#FAF8F0] hover:bg-[#F4E7AE] border border-[#E2DFD2] hover:border-[#DFC974] text-[#24364B] font-bold text-sm rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore {course.title} Curriculum</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. LEARNING JOURNEY PREVIEW & HOW IT WORKS */}
      <section className="bg-[#FFFFFF] border-y border-[#E2DFD2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-[#24364B] tracking-tight">
              How CodeQuest Works
            </h2>
            <p className="text-base text-[#6B7787] mt-3">
              A structured, pedagogical sequence designed to build true problem-solving intuition rather than surface memorization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center font-bold text-[#24364B]">
                01
              </div>
              <h4 className="text-lg font-bold text-[#24364B]">Read & Understand</h4>
              <p className="text-sm text-[#6B7787] leading-relaxed">
                Clear concept explanations in plain English, paired with bilingual Tamil/Tanglish summaries for deep conceptual clarity.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center font-bold text-[#24364B]">
                02
              </div>
              <h4 className="text-lg font-bold text-[#24364B]">Examine Real Code</h4>
              <p className="text-sm text-[#6B7787] leading-relaxed">
                Syntax patterns, standard code examples, and line-by-line breakdowns for foundational beginner topics.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center font-bold text-[#24364B]">
                03
              </div>
              <h4 className="text-lg font-bold text-[#24364B]">Practise Hands-on</h4>
              <p className="text-sm text-[#6B7787] leading-relaxed">
                Interactive coding exercises with instant answer verification, test cases, and explanatory feedback on errors.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center font-bold text-[#24364B]">
                04
              </div>
              <h4 className="text-lg font-bold text-[#24364B]">Level Up & Earn XP</h4>
              <p className="text-sm text-[#6B7787] leading-relaxed">
                Earn 10 XP per lesson, 20 XP per solved challenge, unlock unit milestone badges, and climb school leaderboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS & MILESTONES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[#24364B] tracking-tight">
              Earn Rewards as You Progress
            </h2>
            <p className="text-base text-[#6B7787] mt-2 max-w-xl">
              Consistent study unlocks authentic milestones. Complete units and entire 100-topic courses to earn verified diplomas.
            </p>
          </div>
          <button
            onClick={() => onNavigate('achievements')}
            className="mt-4 md:mt-0 text-sm font-bold text-[#24364B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Achievements</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.slice(0, 4).map((ach) => (
            <div
              key={ach.id}
              className="bg-[#FFFFFF] border border-[#E2DFD2] p-5 rounded-xl shadow-2xs hover:border-[#24364B]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center text-[#8B6E07] mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#24364B] text-base mb-1">{ach.title}</h4>
              <p className="text-xs text-[#6B7787] leading-relaxed">{ach.description}</p>
              <div className="mt-4 pt-3 border-t border-[#E2DFD2] text-[11px] font-semibold text-[#8B6E07] uppercase tracking-wider">
                {ach.tier} Tier Milestone
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#24364B] rounded-2xl p-8 sm:p-12 text-center text-[#FFFFFF] shadow-sm">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ready to Begin Your Coding Journey?
          </h2>
          <p className="text-base sm:text-lg text-[#E2DFD2] max-w-2xl mx-auto mb-8 font-normal">
            Join students from Class 10, 11, and 12 who are mastering Python, Java, and C++ with real code, clear explanations, and zero fluff.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleStartLearning}
              className="px-8 py-3.5 bg-[#F4E7AE] hover:bg-[#EBDC9A] text-[#24364B] font-bold text-base rounded-md transition-all shadow-sm cursor-pointer"
            >
              {isAuthenticated ? 'Go to My Dashboard' : 'Create Free Student Account'}
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 bg-transparent hover:bg-[#FFFFFF]/10 border border-[#E2DFD2]/30 text-[#FFFFFF] font-semibold text-base rounded-md transition-colors cursor-pointer"
            >
              Browse 300 Topics
            </button>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-[#E2DFD2] text-sm text-[#6B7787]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#24364B] text-[#F4E7AE] flex items-center justify-center font-extrabold text-sm">
                CQ
              </div>
              <span className="font-bold text-[#24364B] text-base">CodeQuest</span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7787]">
              Learn to Code. Play to Win. Programming education platform tailored for Class 10, 11, and 12 students.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-[#24364B] text-xs uppercase tracking-wider mb-3">Courses</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('course-detail', { courseId: 'python' })} className="hover:text-[#24364B] cursor-pointer">
                  Python (100 Topics)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('course-detail', { courseId: 'java' })} className="hover:text-[#24364B] cursor-pointer">
                  Java (100 Topics)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('course-detail', { courseId: 'cpp' })} className="hover:text-[#24364B] cursor-pointer">
                  C++ (100 Topics)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#24364B] text-xs uppercase tracking-wider mb-3">Navigation</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#24364B] cursor-pointer">
                  My Learning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('achievements')} className="hover:text-[#24364B] cursor-pointer">
                  Achievements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('leaderboard')} className="hover:text-[#24364B] cursor-pointer">
                  Leaderboard
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#24364B] text-xs uppercase tracking-wider mb-3">Support & Info</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#24364B] cursor-pointer">
                  About CodeQuest
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-[#24364B] cursor-pointer">
                  Help, FAQs & Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#24364B] cursor-pointer">
                  Terms & Privacy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E2DFD2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7787] gap-3">
          <span>&copy; {new Date().getFullYear()} CodeQuest. All rights reserved. Built for school programmers.</span>
          <span>Light theme · Clean typography · 300 Core Topics</span>
        </div>
      </footer>
    </div>
  );
};
