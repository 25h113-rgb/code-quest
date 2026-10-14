import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from '../../data/coursesMeta';
import { ACHIEVEMENTS } from '../../data/achievements';
import { getComputedLeaderboard } from '../../data/leaderboardData';
import { getTopic } from '../../data/curriculum';
import { CourseId } from '../../types';
import { CircularProgressBar } from './CircularProgressBar';
import { 
  Sparkles, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Flame, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Terminal, 
  Coffee, 
  Cpu, 
  Trophy, 
  Play,
  Layers,
  PieChart
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [progressDisplayMode, setProgressDisplayMode] = useState<'combined' | 'circular' | 'linear'>('combined');
  const [isAnimated, setIsAnimated] = useState(false);

  React.useEffect(() => {
    // Slight delay so the browser paints the initial 0-state before animating forward smoothly
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-8 shadow-xs">
          <BookOpen className="w-12 h-12 text-[#24364B] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#24364B] mb-2">Sign in to Access Your Dashboard</h2>
          <p className="text-sm text-[#6B7787] mb-6">
            Track completed topics, earn XP rewards, collect milestone badges, and climb the student leaderboards.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="px-5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] font-semibold text-sm text-[#24364B] rounded-md"
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="px-5 py-2.5 bg-[#F4E7AE] border border-[#DFC974] font-bold text-sm text-[#24364B] rounded-md"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate course completion stats
  const pythonCompleted = currentUser.completedTopicIds.filter(id => id.startsWith('python-')).length;
  const javaCompleted = currentUser.completedTopicIds.filter(id => id.startsWith('java-')).length;
  const cppCompleted = currentUser.completedTopicIds.filter(id => id.startsWith('cpp-')).length;
  const totalCompleted = currentUser.completedTopicIds.length;
  const overallPercentage = Math.round((totalCompleted / 300) * 100);

  // Find next recommended topic in preferred course
  const preferredCourse = currentUser.preferredCourse || 'python';
  const completedInPreferred = currentUser.completedTopicIds
    .filter(id => id.startsWith(`${preferredCourse}-`))
    .map(id => parseInt(id.split('-')[1], 10));

  let nextTopicNumber = 1;
  for (let i = 1; i <= 100; i++) {
    if (!completedInPreferred.includes(i)) {
      nextTopicNumber = i;
      break;
    }
  }

  const nextTopicObj = getTopic(preferredCourse, nextTopicNumber);

  // Top leaderboard snippet
  const leaderboardPreview = getComputedLeaderboard(currentUser).slice(0, 5);
  const userRank = getComputedLeaderboard(currentUser).find(u => u.username === currentUser.username)?.rank || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. WELCOME & STUDENT HEADER */}
      <div className="card-attractive p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#24364B] text-[#F4E7AE] flex items-center justify-center font-black text-2xl uppercase shadow-md ring-4 ring-[#F4E7AE]/30 transition-transform hover:scale-105">
              {currentUser.username.substring(0, 2)}
            </div>
            <div>
              <div className="bubble-tag-yellow animate-float-gentle mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8B6E07] animate-bubble-pulse" />
                <span>Student Mission · Active Learner</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24364B] tracking-tight">
                Welcome back, {currentUser.fullName}!
              </h1>
              <p className="text-sm text-[#6B7787] mt-1 flex items-center gap-2">
                <span className="font-semibold text-[#24364B]">{currentUser.userClass}</span>
                <span>·</span>
                <span>Enrolled in {currentUser.preferredCourse.toUpperCase()}</span>
                <span>·</span>
                <span>Language: {currentUser.explanationPreference}</span>
              </p>
            </div>
          </div>

          {/* Overall 300-Topic Circular Master Progress Gauge & Metrics Bar */}
          <div className="flex flex-wrap items-center gap-5 border-t md:border-t-0 md:border-l border-[#E2DFD2] pt-4 md:pt-0 md:pl-6">
            
            {/* Master Curriculum Circular Gauge */}
            <div className="flex items-center gap-3 pr-2 border-r border-[#E2DFD2]">
              <CircularProgressBar
                percentage={overallPercentage}
                completedCount={totalCompleted}
                totalCount={300}
                size={70}
                strokeWidth={7}
                color="#24364B"
                trackColor="#E2DFD2"
              />
              <div className="text-left">
                <div className="text-[11px] font-bold uppercase text-[#6B7787] tracking-wider">Curriculum</div>
                <div className="text-sm font-black text-[#24364B]">All 3 Courses</div>
                <div className="text-[11px] text-[#6B7787] font-semibold">{totalCompleted}/300 Topics</div>
              </div>
            </div>

            <div className="text-center px-2">
              <div className="text-xs uppercase font-bold text-[#6B7787] tracking-wider">Level</div>
              <div className="text-2xl font-black text-[#24364B] mt-0.5">{currentUser.level}</div>
            </div>
            <div className="text-center px-2 border-l border-[#E2DFD2]">
              <div className="text-xs uppercase font-bold text-[#6B7787] tracking-wider">Total XP</div>
              <div className="text-2xl font-black text-[#8B6E07] mt-0.5 flex items-center gap-1 justify-center">
                <Sparkles className="w-4 h-4 text-[#D4A30B]" />
                {currentUser.totalXp}
              </div>
            </div>
            <div className="text-center px-2 border-l border-[#E2DFD2]">
              <div className="text-xs uppercase font-bold text-[#6B7787] tracking-wider">Streak</div>
              <div className="text-2xl font-black text-[#24364B] mt-0.5 flex items-center gap-1 justify-center">
                <Flame className="w-4 h-4 text-[#E05638]" />
                {currentUser.currentStreakDays}d
              </div>
            </div>
            <div className="text-center px-2 border-l border-[#E2DFD2]">
              <div className="text-xs uppercase font-bold text-[#6B7787] tracking-wider">Rank</div>
              <div className="text-2xl font-black text-[#24364B] mt-0.5">#{userRank}</div>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-5 border-t border-[#E2DFD2]">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-[#24364B]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B6E07] animate-bubble-pulse" />
              Level {currentUser.level} Progression
            </span>
            <span className="text-[#6B7787]">
              {currentUser.totalXp % 100} / 100 XP to Level {currentUser.level + 1}
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#F4E7AE] to-[#DFC974] rounded-full shadow-xs"
              style={{ 
                width: `${isAnimated ? Math.min(100, currentUser.totalXp % 100) : 0}%`,
                transition: 'width 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'width'
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. CONTINUE LEARNING CALLOUT WITH BUBBLE TITLE */}
      {nextTopicObj && (
        <div className="card-attractive p-6 bg-gradient-to-r from-[#FAF8F0] to-[#FFFFFF] border border-[#DFC974]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="bubble-tag-yellow animate-float-gentle">
              <Play className="w-3 h-3 fill-current" />
              <span>Next Recommended Topic</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#24364B]">
              Topic {nextTopicObj.topicNumber}: {nextTopicObj.title}
            </h3>
            <p className="text-xs text-[#6B7787]">
              {nextTopicObj.courseId.toUpperCase()} · Unit {nextTopicObj.unitNumber}: {nextTopicObj.unitTitle} · {nextTopicObj.difficulty}
            </p>
          </div>

          <button
            onClick={() => onNavigate('lesson', { courseId: nextTopicObj.courseId, topicNumber: nextTopicObj.topicNumber })}
            className="px-6 py-3 bg-[#24364B] hover:bg-[#1A2838] text-[#FAF8F0] font-bold text-sm rounded-xl transition-all hover:shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-102"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. THREE COURSE PROGRESS PANELS WITH DYNAMIC CIRCULAR & LINEAR PROGRESS BARS */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="bubble-tag-blue animate-float-gentle mb-1.5">
              <BookOpen className="w-3 h-3" />
              <span>300 Topics · 3 Pure Languages</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#24364B] tracking-tight">
              Course Curricula & Progress
            </h2>
            <p className="text-xs text-[#6B7787] mt-0.5">
              Live visual progress updated dynamically from your completed lessons profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher: Combined, Circular, Linear */}
            <div className="flex items-center gap-1 bg-[#FAF8F0] p-1 rounded-lg border border-[#E2DFD2]">
              <button
                onClick={() => setProgressDisplayMode('combined')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  progressDisplayMode === 'combined'
                    ? 'bg-[#FFFFFF] text-[#24364B] shadow-2xs font-bold'
                    : 'text-[#6B7787] hover:text-[#24364B]'
                }`}
              >
                Combined
              </button>
              <button
                onClick={() => setProgressDisplayMode('circular')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  progressDisplayMode === 'circular'
                    ? 'bg-[#FFFFFF] text-[#24364B] shadow-2xs font-bold'
                    : 'text-[#6B7787] hover:text-[#24364B]'
                }`}
              >
                <PieChart className="w-3.5 h-3.5" />
                <span>Circular</span>
              </button>
              <button
                onClick={() => setProgressDisplayMode('linear')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  progressDisplayMode === 'linear'
                    ? 'bg-[#FFFFFF] text-[#24364B] shadow-2xs font-bold'
                    : 'text-[#6B7787] hover:text-[#24364B]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Linear</span>
              </button>
            </div>

            <button
              onClick={() => onNavigate('courses')}
              className="text-xs font-bold text-[#24364B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Catalogue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((c) => {
            const completedCount = currentUser.completedTopicIds.filter(id => id.startsWith(`${c.id}-`)).length;
            const pct = Math.round((completedCount / 100) * 100);

            // Calculate active unit (each unit has 10 topics)
            const activeUnitIndex = Math.min(10, Math.floor(completedCount / 10) + 1);
            const activeUnit = c.units.find(u => u.unitNumber === activeUnitIndex) || c.units[0];
            const topicsInActiveUnit = currentUser.completedTopicIds.filter(id => {
              if (!id.startsWith(`${c.id}-`)) return false;
              const num = parseInt(id.split('-')[1], 10);
              return num >= activeUnit.startTopic && num <= activeUnit.endTopic;
            }).length;

            // Brand accent colors for circular rings
            const ringColor = c.id === 'python' ? '#B78A00' : c.id === 'java' ? '#1D4ED8' : '#6D28D9';
            const ringTrack = c.id === 'python' ? '#F7F1D5' : c.id === 'java' ? '#DBEAFE' : '#EDE9FE';

            return (
              <div 
                key={c.id}
                className="card-attractive p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top card bar with Course identity + Circular Progress Meter */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: c.accentBg, border: `1px solid ${c.accentBorder}` }}
                      >
                        {c.id === 'python' && <Terminal className="w-5 h-5 text-[#24364B]" />}
                        {c.id === 'java' && <Coffee className="w-5 h-5 text-[#24364B]" />}
                        {c.id === 'cpp' && <Cpu className="w-5 h-5 text-[#24364B]" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#24364B] leading-snug">{c.title}</h3>
                        <span className="text-[11px] font-semibold text-[#6B7787]">
                          {completedCount === 0 ? 'Not Started' : completedCount === 100 ? 'Course Mastered' : `In Progress · ${completedCount}/100`}
                        </span>
                      </div>
                    </div>

                    {/* Circular Progress Gauge */}
                    {(progressDisplayMode === 'combined' || progressDisplayMode === 'circular') && (
                      <CircularProgressBar
                        percentage={pct}
                        completedCount={completedCount}
                        totalCount={100}
                        size={64}
                        strokeWidth={6}
                        color={ringColor}
                        trackColor={ringTrack}
                      />
                    )}
                  </div>

                  <p className="text-xs text-[#6B7787] line-clamp-2 mb-4 leading-relaxed">{c.shortDescription}</p>

                  {/* Linear Progress Bar with 10-Unit Segments */}
                  {(progressDisplayMode === 'combined' || progressDisplayMode === 'linear') && (
                    <div className="mb-4 space-y-2 bg-[#FAF8F0] p-3 rounded-lg border border-[#E2DFD2]">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#24364B]">
                        <span>Linear Progress</span>
                        <span className="font-bold">{pct}% ({completedCount} / 100)</span>
                      </div>

                      {/* Continuous animated fill bar */}
                      <div className="w-full h-2 bg-[#FFFFFF] border border-[#E2DFD2] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${isAnimated ? pct : 0}%`,
                            backgroundColor: ringColor,
                            transition: 'width 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                            willChange: 'width'
                          }}
                        />
                      </div>

                      {/* 10-Unit Segmented Tick Visualizer */}
                      <div className="grid grid-cols-10 gap-1 pt-1">
                        {Array.from({ length: 10 }).map((_, unitIdx) => {
                          const unitNum = unitIdx + 1;
                          const unitStart = unitIdx * 10 + 1;
                          const unitEnd = (unitIdx + 1) * 10;
                          
                          // Count completed in this specific unit
                          const countInThisUnit = currentUser.completedTopicIds.filter(id => {
                            if (!id.startsWith(`${c.id}-`)) return false;
                            const num = parseInt(id.split('-')[1], 10);
                            return num >= unitStart && num <= unitEnd;
                          }).length;

                          const isUnitFullyDone = countInThisUnit === 10;
                          const isUnitInProgress = countInThisUnit > 0 && countInThisUnit < 10;

                          return (
                            <div
                              key={unitIdx}
                              title={`Unit ${unitNum}: ${countInThisUnit}/10 topics finished`}
                              className={`h-2 rounded-xs transition-colors cursor-pointer ${
                                isUnitFullyDone
                                  ? 'bg-[#24364B]'
                                  : isUnitInProgress
                                  ? 'bg-[#F4E7AE] border border-[#DFC974]'
                                  : 'bg-[#E2DFD2]/60 hover:bg-[#E2DFD2]'
                              }`}
                              onClick={() => onNavigate('unit-detail', { courseId: c.id, unitNumber: unitNum })}
                            />
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#6B7787] pt-0.5">
                        <span>Unit {activeUnit.unitNumber}: {activeUnit.name}</span>
                        <span>{topicsInActiveUnit}/10 in unit</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#E2DFD2]">
                  <button
                    onClick={() => onNavigate('course-detail', { courseId: c.id })}
                    className="flex-1 py-2 px-3 text-xs font-bold bg-[#FAF8F0] hover:bg-[#F4E7AE] border border-[#E2DFD2] rounded-md text-[#24364B] transition-colors text-center cursor-pointer"
                  >
                    View All Topics
                  </button>
                  <button
                    onClick={() => {
                      // Navigate directly to first incomplete topic
                      let targetNum = 1;
                      for (let i = 1; i <= 100; i++) {
                        if (!currentUser.completedTopicIds.includes(`${c.id}-${i}`)) {
                          targetNum = i;
                          break;
                        }
                      }
                      onNavigate('lesson', { courseId: c.id, topicNumber: targetNum });
                    }}
                    className="py-2 px-3.5 text-xs font-bold bg-[#24364B] hover:bg-[#1A2838] text-[#FFFFFF] rounded-md transition-colors text-center cursor-pointer flex items-center gap-1"
                  >
                    <span>Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. RECENT ACTIVITY & LEADERBOARD SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Learning Activity Log with Bubble Title */}
        <div className="lg:col-span-7 card-attractive p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="bubble-tag-yellow mb-1">
                <TrendingUp className="w-3 h-3 text-[#8B6E07]" />
                <span>Verified XP Timeline</span>
              </div>
              <h3 className="text-lg font-bold text-[#24364B] flex items-center gap-2">
                Recent Activity History
              </h3>
            </div>
            <span className="text-xs text-[#6B7787] font-semibold">{currentUser.xpHistory.length} total events</span>
          </div>

          {currentUser.xpHistory.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6B7787]">
              No activity recorded yet. Start any lesson from the course overview to begin earning XP!
            </div>
          ) : (
            <div className="divide-y divide-[#E2DFD2] max-h-72 overflow-y-auto pr-1">
              {currentUser.xpHistory.slice(0, 8).map((evt) => (
                <div key={evt.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[#24364B]">{evt.description}</div>
                    <div className="text-[11px] text-[#6B7787]">{evt.timestamp}</div>
                  </div>
                  <span className="font-bold text-[#8B6E07] bg-[#F4E7AE]/40 px-2.5 py-1 rounded-full text-xs shrink-0 border border-[#DFC974]/50 shadow-2xs">
                    +{evt.amount} XP
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leaderboard Preview Card with Bubble Title */}
        <div className="lg:col-span-5 card-attractive p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="bubble-tag-blue mb-1">
                <Trophy className="w-3 h-3 text-[#1D4ED8]" />
                <span>Top Class Rank</span>
              </div>
              <h3 className="text-lg font-bold text-[#24364B] flex items-center gap-2">
                Leaderboard Standings
              </h3>
            </div>
            <button
              onClick={() => onNavigate('leaderboard')}
              className="text-xs font-bold text-[#24364B] hover:underline cursor-pointer"
            >
              View Full
            </button>
          </div>

          <div className="space-y-2">
            {leaderboardPreview.map((user) => {
              const isSelf = user.username.toLowerCase() === currentUser.username.toLowerCase();
              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                    isSelf ? 'bg-[#F4E7AE]/40 border border-[#DFC974]' : 'bg-[#FAF8F0] border border-[#E2DFD2]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 text-center font-black ${user.rank <= 3 ? 'text-[#8B6E07]' : 'text-[#6B7787]'}`}>
                      #{user.rank}
                    </span>
                    <div>
                      <div className="font-bold text-[#24364B] flex items-center gap-1.5">
                        <span>{user.username}</span>
                        {isSelf && <span className="text-[10px] bg-[#24364B] text-[#FFFFFF] px-1.5 py-0.5 rounded-full font-bold">You</span>}
                      </div>
                      <div className="text-[11px] text-[#6B7787]">{user.userClass}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#24364B]">{user.totalXp} XP</div>
                    <div className="text-[10px] text-[#6B7787]">{user.completedTopicsCount} topics</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. EARNED ACHIEVEMENTS SNIPPET WITH BUBBLE TITLE */}
      <div className="card-attractive p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="bubble-tag-lavender mb-1">
              <Award className="w-3 h-3 text-[#6D28D9]" />
              <span>Milestones & Badges</span>
            </div>
            <h3 className="text-lg font-bold text-[#24364B] flex items-center gap-2">
              Earned Achievements & Diplomas
            </h3>
          </div>
          <button
            onClick={() => onNavigate('achievements')}
            className="text-xs font-bold text-[#24364B] hover:underline cursor-pointer"
          >
            All Achievements ({currentUser.earnedAchievementIds.length} Unlocked)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ACHIEVEMENTS.slice(0, 4).map((ach) => {
            const isEarned = currentUser.earnedAchievementIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border text-center transition-all ${
                  isEarned
                    ? 'bg-[#FAF8F0] border-[#DFC974]'
                    : 'bg-[#FAF8F0]/40 border-[#E2DFD2] opacity-60'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E2DFD2] mx-auto flex items-center justify-center mb-2">
                  <Award className={`w-5 h-5 ${isEarned ? 'text-[#8B6E07]' : 'text-[#6B7787]'}`} />
                </div>
                <div className="font-bold text-xs text-[#24364B]">{ach.title}</div>
                <div className="text-[11px] text-[#6B7787] mt-1 line-clamp-2">{ach.description}</div>
                <div className="text-[10px] font-bold mt-2 text-[#8B6E07]">
                  {isEarned ? '✓ Unlocked' : 'Locked'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
