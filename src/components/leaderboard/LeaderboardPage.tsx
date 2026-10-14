import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getComputedLeaderboard } from '../../data/leaderboardData';
import { UserClass } from '../../types';
import { Trophy, Flame, Sparkles, Filter, ShieldCheck, User } from 'lucide-react';

interface LeaderboardPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [selectedClass, setSelectedClass] = useState<UserClass | 'All'>('All');

  const leaderboard = getComputedLeaderboard(currentUser, selectedClass);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-[#8B6E07] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Trophy className="w-4 h-4" />
              <span>Public Student Rankings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#24364B]">
              CodeQuest Leaderboard
            </h1>
            <p className="text-sm text-[#6B7787] mt-1 max-w-xl">
              Honoring consistent daily learning, topics completed, and practice challenge mastery.
            </p>
          </div>

          <div className="bg-[#FAF8F0] border border-[#E2DFD2] px-4 py-3 rounded-xl text-center min-w-[180px]">
            <div className="text-xs font-semibold text-[#6B7787]">Your Global Rank</div>
            <div className="text-3xl font-black text-[#24364B] mt-0.5">
              {currentUser ? `#${leaderboard.find(u => u.username === currentUser.username)?.rank || '-'}` : 'Guest'}
            </div>
          </div>
        </div>

        {/* Safe Privacy notice */}
        <div className="mt-6 pt-4 border-t border-[#E2DFD2] flex items-center gap-2 text-xs text-[#6B7787]">
          <ShieldCheck className="w-4 h-4 text-[#196B36]" />
          <span>Student Privacy Protected: Displays only usernames, school grades, and public learning metrics.</span>
        </div>
      </div>

      {/* Class Filter Bar */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-3 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-semibold text-[#6B7787] mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by Grade:
          </span>
          {(['All', 'Class 10', 'Class 11', 'Class 12'] as (UserClass | 'All')[]).map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                selectedClass === cls
                  ? 'bg-[#24364B] text-[#FFFFFF]'
                  : 'bg-[#FAF8F0] text-[#6B7787] hover:text-[#24364B]'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-[#6B7787]">
          {leaderboard.length} Students Listed
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAF8F0] border-b border-[#E2DFD2] text-[11px] font-bold uppercase tracking-wider text-[#6B7787]">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Primary Language</th>
                <th className="py-3 px-4 text-center">Topics</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFD2]/70 text-[#24364B]">
              {leaderboard.map((student) => {
                const isSelf = currentUser && student.username.toLowerCase() === currentUser.username.toLowerCase();
                const isTop3 = student.rank <= 3;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isSelf ? 'bg-[#F4E7AE]/30 font-semibold' : 'hover:bg-[#FAF8F0]/40'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${
                        student.rank === 1 ? 'bg-[#FAF4DC] text-[#8B6E07] border border-[#DFC974]' :
                        student.rank === 2 ? 'bg-[#DCEBFA] text-[#24364B] border border-[#B0D3F5]' :
                        student.rank === 3 ? 'bg-[#E7E5F7] text-[#4A3E8A] border border-[#CBC5ED]' :
                        'text-[#6B7787]'
                      }`}>
                        {student.rank}
                      </span>
                    </td>

                    {/* Student Name */}
                    <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#FAF8F0] border border-[#E2DFD2] flex items-center justify-center text-[10px] text-[#24364B]">
                        {student.username.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span>{student.username}</span>
                        {isSelf && (
                          <span className="ml-2 text-[10px] font-bold bg-[#24364B] text-[#FFFFFF] px-1.5 py-0.5 rounded">
                            You
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Grade */}
                    <td className="py-3.5 px-4 text-[#6B7787]">
                      {student.userClass}
                    </td>

                    {/* Primary Course */}
                    <td className="py-3.5 px-4 uppercase text-xs font-semibold text-[#24364B]">
                      {student.primaryCourse}
                    </td>

                    {/* Topics completed */}
                    <td className="py-3.5 px-4 text-center font-medium">
                      {student.completedTopicsCount} / 300
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#E05638]">
                        <Flame className="w-3.5 h-3.5" />
                        {student.streakDays}d
                      </span>
                    </td>

                    {/* XP */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-extrabold text-[#8B6E07] flex items-center justify-end gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4A30B]" />
                        {student.totalXp} XP
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
