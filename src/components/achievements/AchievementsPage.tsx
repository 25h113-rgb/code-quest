import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ACHIEVEMENTS } from '../../data/achievements';
import { 
  Award, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Filter,
  ShieldCheck,
  TrendingUp,
  Zap,
  Terminal,
  Coffee,
  Cpu
} from 'lucide-react';

interface AchievementsPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'milestone' | 'course' | 'mastery' | 'streak'>('all');

  const earnedIds = new Set(currentUser?.earnedAchievementIds || []);

  const filteredAchievements = ACHIEVEMENTS.filter(a => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  const totalEarnedCount = ACHIEVEMENTS.filter(a => earnedIds.has(a.id)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-[#8B6E07] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4" />
              <span>Milestones & XP System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#24364B]">
              Student Achievements
            </h1>
            <p className="text-sm text-[#6B7787] mt-1 max-w-xl">
              Earn verified diplomas, track XP history, and unlock milestones by completing units and 100-topic curricula.
            </p>
          </div>

          <div className="bg-[#FAF8F0] border border-[#E2DFD2] p-4 rounded-xl text-center min-w-[200px]">
            <div className="text-xs font-semibold text-[#6B7787]">Badges Unlocked</div>
            <div className="text-2xl font-black text-[#24364B] mt-0.5">
              {totalEarnedCount} / {ACHIEVEMENTS.length}
            </div>
            <div className="text-[11px] font-bold text-[#8B6E07] mt-1">
              {currentUser ? `${currentUser.totalXp} Total XP` : '0 XP'}
            </div>
          </div>
        </div>

        {/* Level Progression Hierarchy Bar */}
        {currentUser && (
          <div className="mt-6 pt-6 border-t border-[#E2DFD2]">
            <div className="flex items-center justify-between text-xs font-semibold mb-2 text-[#24364B]">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A30B]" />
                Level {currentUser.level} Scholar
              </span>
              <span className="text-[#6B7787]">
                Level {currentUser.level + 1} at {currentUser.level * 100} XP
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#F4E7AE] transition-all"
                style={{ width: `${Math.min(100, currentUser.totalXp % 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Badges' },
          { id: 'milestone', label: 'Milestone Badges' },
          { id: 'course', label: 'Course Centurions' },
          { id: 'mastery', label: 'XP Mastery' },
          { id: 'streak', label: 'Streak Awards' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-bold rounded-md shrink-0 cursor-pointer transition-colors ${
              selectedCategory === tab.id
                ? 'bg-[#24364B] text-[#FFFFFF]'
                : 'bg-[#FFFFFF] border border-[#E2DFD2] text-[#6B7787] hover:text-[#24364B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAchievements.map((ach) => {
          const isEarned = earnedIds.has(ach.id);

          return (
            <div
              key={ach.id}
              className={`bg-[#FFFFFF] border rounded-xl p-5 flex flex-col justify-between transition-all ${
                isEarned
                  ? 'border-[#DFC974] shadow-xs'
                  : 'border-[#E2DFD2] opacity-70 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isEarned ? 'bg-[#FAF4DC] text-[#8B6E07] border border-[#E6D78E]' : 'bg-[#FAF8F0] text-[#6B7787] border border-[#E2DFD2]'
                  }`}>
                    {ach.requiredCourse === 'python' ? (
                      <Terminal className="w-6 h-6" />
                    ) : ach.requiredCourse === 'java' ? (
                      <Coffee className="w-6 h-6" />
                    ) : ach.requiredCourse === 'cpp' ? (
                      <Cpu className="w-6 h-6" />
                    ) : (
                      <Award className="w-6 h-6" />
                    )}
                  </div>

                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                    ach.tier === 'diamond' ? 'bg-[#E7E5F7] border-[#CBC5ED] text-[#4A3E8A]' :
                    ach.tier === 'gold' ? 'bg-[#FAF4DC] border-[#E6D78E] text-[#8B6E07]' :
                    ach.tier === 'silver' ? 'bg-[#DCEBFA] border-[#B0D3F5] text-[#24364B]' :
                    'bg-[#FAF8F0] border-[#E2DFD2] text-[#6B7787]'
                  }`}>
                    {ach.tier}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#24364B] mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-[#6B7787] leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2DFD2] flex items-center justify-between text-xs">
                {isEarned ? (
                  <span className="font-bold text-[#196B36] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#196B36]" />
                    <span>Unlocked & Verified</span>
                  </span>
                ) : (
                  <span className="font-semibold text-[#6B7787] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </span>
                )}

                {ach.requiredTopicsCount && (
                  <span className="text-[11px] text-[#6B7787]">
                    {ach.requiredTopicsCount} Topics needed
                  </span>
                )}
                {ach.requiredXp && (
                  <span className="text-[11px] text-[#8B6E07] font-semibold">
                    {ach.requiredXp} XP needed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* XP History Timeline Section */}
      {currentUser && (
        <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#24364B] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#24364B]" />
              <span>Verified XP Activity Timeline</span>
            </h3>
            <span className="text-xs text-[#6B7787] font-semibold">
              Total Transactions: {currentUser.xpHistory.length}
            </span>
          </div>

          {currentUser.xpHistory.length === 0 ? (
            <p className="text-xs text-[#6B7787] py-6 text-center">
              No transactions yet. Complete lessons and exercises to build your history!
            </p>
          ) : (
            <div className="divide-y divide-[#E2DFD2] max-h-80 overflow-y-auto pr-1">
              {currentUser.xpHistory.map(evt => (
                <div key={evt.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#24364B]">{evt.description}</div>
                    <div className="text-[11px] text-[#6B7787] mt-0.5">{evt.timestamp}</div>
                  </div>
                  <span className="font-black text-[#8B6E07] bg-[#F4E7AE]/40 border border-[#DFC974]/50 px-2 py-0.5 rounded text-xs">
                    +{evt.amount} XP
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
