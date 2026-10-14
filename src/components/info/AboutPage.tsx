import React from 'react';
import { BookOpen, Target, Sparkles, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-xl bg-[#24364B] text-[#F4E7AE] font-black text-2xl flex items-center justify-center mx-auto mb-4">
          CQ
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#24364B] tracking-tight">
          About CodeQuest
        </h1>
        <p className="text-base text-[#6B7787] mt-2">
          Learn to Code. Play to Win.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-[#24364B]">
          Our Educational Mission
        </h2>
        <p className="text-sm sm:text-base text-[#6B7787] leading-relaxed">
          CodeQuest is an educational programming platform built specifically for students in <strong>Classes 10, 11, and 12</strong> across CBSE, ICSE/ISC, and State Board curricula.
        </p>
        <p className="text-sm sm:text-base text-[#6B7787] leading-relaxed">
          Too many computer science platforms either overwhelm beginners with confusing industry tooling or offer trivial drag-and-drop puzzles that fail to prepare students for school board examinations, practical coding tests, and future university coursework.
        </p>
        <p className="text-sm sm:text-base text-[#6B7787] leading-relaxed">
          CodeQuest bridges this gap by delivering <strong>exactly 300 structured topics</strong> across Python, Java, and C++, with comprehensive line-by-line explanations, practical exercises, and bilingual English plus Tamil/Tanglish summaries.
        </p>
      </div>

      {/* Curriculum Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center text-[#24364B] font-bold mb-3">
            01
          </div>
          <h3 className="font-bold text-[#24364B] text-base mb-1.5">Pure Three Languages</h3>
          <p className="text-xs text-[#6B7787] leading-relaxed">
            Strictly focused on Python, Java, and C++. No bloat, no distracting noise. 100 numbered topics per language.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center text-[#8B6E07] font-bold mb-3">
            02
          </div>
          <h3 className="font-bold text-[#24364B] text-base mb-1.5">Bilingual Learning</h3>
          <p className="text-xs text-[#6B7787] leading-relaxed">
            Every concept features plain English and authentic Tamil/Tanglish explanations so students never feel left behind by language barriers.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center text-[#196B36] font-bold mb-3">
            03
          </div>
          <h3 className="font-bold text-[#24364B] text-base mb-1.5">Verified Progress</h3>
          <p className="text-xs text-[#6B7787] leading-relaxed">
            Interactive practice with transparent output validation, explanatory feedback on errors, and non-duplicative XP incentives.
          </p>
        </div>
      </div>

      {/* Student Privacy & Ethics */}
      <div className="bg-[#FAF8F0] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#196B36] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Student Privacy & Safety Guarantee</span>
        </div>
        <h3 className="text-lg font-bold text-[#24364B]">
          Safe, Respectful, and Advertisement-Free
        </h3>
        <p className="text-xs sm:text-sm text-[#6B7787] leading-relaxed">
          CodeQuest never shares student emails, passwords, or personal academic performance with third-party advertisers. All leaderboards only showcase student usernames and school grade categories.
        </p>
      </div>

      {/* Action footer */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('courses')}
          className="px-6 py-3 bg-[#24364B] hover:bg-[#1A2838] text-[#FFFFFF] font-bold text-sm rounded-md transition-colors cursor-pointer"
        >
          Explore the 300 Topics
        </button>
      </div>
    </div>
  );
};
