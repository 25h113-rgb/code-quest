import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ACHIEVEMENTS } from '../../data/achievements';
import { COURSES } from '../../data/coursesMeta';
import { 
  User, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Settings, 
  BookOpen, 
  CheckCircle2, 
  Calendar,
  Flame,
  Shield
} from 'lucide-react';

interface StudentProfilePageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <h2 className="text-xl font-bold text-[#24364B] mb-3">Please Log In</h2>
        <p className="text-xs text-[#6B7787] mb-4">You need an active session to view your profile.</p>
        <button
          onClick={() => onNavigate('login')}
          className="px-4 py-2 bg-[#24364B] text-[#FFFFFF] rounded-md text-xs font-bold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const pythonCount = currentUser.completedTopicIds.filter(id => id.startsWith('python-')).length;
  const javaCount = currentUser.completedTopicIds.filter(id => id.startsWith('java-')).length;
  const cppCount = currentUser.completedTopicIds.filter(id => id.startsWith('cpp-')).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* 1. PROFILE HEADER CARD */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#24364B] text-[#F4E7AE] flex items-center justify-center font-black text-3xl uppercase shadow-xs">
              {currentUser.username.substring(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24364B]">
                {currentUser.fullName}
              </h1>
              <p className="text-sm text-[#6B7787] mt-0.5">
                @{currentUser.username} · {currentUser.email}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                <span className="bg-[#FAF8F0] border border-[#E2DFD2] px-2.5 py-0.5 rounded text-[#24364B] font-semibold">
                  {currentUser.userClass}
                </span>
                <span className="bg-[#FAF8F0] border border-[#E2DFD2] px-2.5 py-0.5 rounded text-[#24364B] font-semibold">
                  Primary: {currentUser.preferredCourse.toUpperCase()}
                </span>
                <span className="bg-[#FAF8F0] border border-[#E2DFD2] px-2.5 py-0.5 rounded text-[#24364B] font-semibold">
                  Language: {currentUser.explanationPreference}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('settings')}
            className="px-4 py-2 bg-[#FAF8F0] hover:bg-[#F4E7AE]/40 border border-[#E2DFD2] rounded-md text-xs font-bold text-[#24364B] flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-center"
          >
            <Settings className="w-4 h-4 text-[#6B7787]" />
            <span>Edit Profile & Settings</span>
          </button>
        </div>

        {/* Core Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#E2DFD2]">
          <div className="bg-[#FAF8F0] p-3.5 rounded-xl border border-[#E2DFD2]">
            <div className="text-[11px] font-bold uppercase text-[#6B7787]">Student Level</div>
            <div className="text-2xl font-black text-[#24364B] mt-1">Level {currentUser.level}</div>
          </div>
          <div className="bg-[#FAF8F0] p-3.5 rounded-xl border border-[#E2DFD2]">
            <div className="text-[11px] font-bold uppercase text-[#6B7787]">Total XP</div>
            <div className="text-2xl font-black text-[#8B6E07] mt-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#D4A30B]" />
              {currentUser.totalXp}
            </div>
          </div>
          <div className="bg-[#FAF8F0] p-3.5 rounded-xl border border-[#E2DFD2]">
            <div className="text-[11px] font-bold uppercase text-[#6B7787]">Mastered Topics</div>
            <div className="text-2xl font-black text-[#24364B] mt-1">
              {currentUser.completedTopicIds.length} / 300
            </div>
          </div>
          <div className="bg-[#FAF8F0] p-3.5 rounded-xl border border-[#E2DFD2]">
            <div className="text-[11px] font-bold uppercase text-[#6B7787]">Learning Streak</div>
            <div className="text-2xl font-black text-[#24364B] mt-1 flex items-center gap-1">
              <Flame className="w-4 h-4 text-[#E05638]" />
              {currentUser.currentStreakDays} Days
            </div>
          </div>
        </div>
      </div>

      {/* 2. COURSE PROGRESS BREAKDOWN */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 shadow-xs">
        <h3 className="text-lg font-bold text-[#24364B] mb-4">
          Course Progression (100 Topics Each)
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[#24364B]">
              <span>Python Curriculum</span>
              <span>{pythonCount} / 100 Topics ({pythonCount}%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-full overflow-hidden">
              <div className="h-full bg-[#E6D78E]" style={{ width: `${pythonCount}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[#24364B]">
              <span>Java Curriculum</span>
              <span>{javaCount} / 100 Topics ({javaCount}%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-full overflow-hidden">
              <div className="h-full bg-[#B0D3F5]" style={{ width: `${javaCount}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[#24364B]">
              <span>C++ Curriculum</span>
              <span>{cppCount} / 100 Topics ({cppCount}%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-full overflow-hidden">
              <div className="h-full bg-[#CBC5ED]" style={{ width: `${cppCount}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. ACHIEVEMENTS TROPHY COLLECTION */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#24364B] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#8B6E07]" />
            <span>Achievements Collection ({currentUser.earnedAchievementIds.length} / {ACHIEVEMENTS.length} Earned)</span>
          </h3>
          <button
            onClick={() => onNavigate('achievements')}
            className="text-xs font-bold text-[#24364B] hover:underline cursor-pointer"
          >
            View All Badges
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map(ach => {
            const isEarned = currentUser.earnedAchievementIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  isEarned
                    ? 'bg-[#FAF8F0] border-[#DFC974]'
                    : 'bg-[#FAF8F0]/30 border-[#E2DFD2] opacity-50'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E2DFD2] mx-auto flex items-center justify-center mb-2">
                  <Award className={`w-4 h-4 ${isEarned ? 'text-[#8B6E07]' : 'text-[#6B7787]'}`} />
                </div>
                <div className="font-bold text-xs text-[#24364B]">{ach.title}</div>
                <div className="text-[10px] text-[#6B7787] mt-0.5 line-clamp-1">{ach.description}</div>
                <div className="text-[10px] font-bold mt-2 text-[#8B6E07]">
                  {isEarned ? '✓ Earned' : 'Locked'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. COMPLETED TOPICS RECORD */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 shadow-xs">
        <h3 className="text-lg font-bold text-[#24364B] mb-3">
          Completed Topics Index ({currentUser.completedTopicIds.length})
        </h3>
        {currentUser.completedTopicIds.length === 0 ? (
          <p className="text-xs text-[#6B7787]">No topics completed yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {currentUser.completedTopicIds.map((id) => {
              const [cId, num] = id.split('-');
              return (
                <button
                  key={id}
                  onClick={() => onNavigate('lesson', { courseId: cId as any, topicNumber: parseInt(num, 10) })}
                  className="px-2.5 py-1 bg-[#FAF8F0] hover:bg-[#F4E7AE] border border-[#E2DFD2] rounded text-xs font-semibold text-[#24364B] transition-colors cursor-pointer"
                >
                  {cId.toUpperCase()} #{num}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
