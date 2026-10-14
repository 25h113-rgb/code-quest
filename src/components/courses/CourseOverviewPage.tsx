import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from '../../data/coursesMeta';
import { getTopicsForCourse } from '../../data/curriculum';
import { CourseId, Difficulty, Topic } from '../../types';
import { 
  ArrowLeft, 
  Terminal, 
  Coffee, 
  Cpu, 
  CheckCircle2, 
  Circle, 
  Search, 
  ChevronRight, 
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

interface CourseOverviewPageProps {
  courseId: CourseId;
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const CourseOverviewPage: React.FC<CourseOverviewPageProps> = ({ courseId, onNavigate }) => {
  const { currentUser, checkTopicCompleted } = useAuth();
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const allTopics = getTopicsForCourse(courseId);

  const completedCount = currentUser
    ? currentUser.completedTopicIds.filter(id => id.startsWith(`${courseId}-`)).length
    : 0;
  const progressPct = Math.round((completedCount / 100) * 100);

  // Filter topics
  const filteredTopics = allTopics.filter(t => {
    const matchesUnit = selectedUnit === 'all' || t.unitNumber === selectedUnit;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.englishExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  // Find next unfinished topic
  let firstUnfinishedNum = 1;
  for (let i = 1; i <= 100; i++) {
    if (!checkTopicCompleted(courseId, i)) {
      firstUnfinishedNum = i;
      break;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top back navigation button */}
      <div>
        <button
          onClick={() => onNavigate('courses')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7787] hover:text-[#24364B] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Catalogue</span>
        </button>
      </div>

      {/* Course Banner */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: course.accentBg, border: `1px solid ${course.accentBorder}` }}
              >
                {course.id === 'python' && <Terminal className="w-6 h-6 text-[#24364B]" />}
                {course.id === 'java' && <Coffee className="w-6 h-6 text-[#24364B]" />}
                {course.id === 'cpp' && <Cpu className="w-6 h-6 text-[#24364B]" />}
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#24364B] tracking-tight">
                  {course.title} Curriculum
                </h1>
                <p className="text-xs font-medium text-[#6B7787]">
                  100 Structured Topics · 10 Comprehensive Units
                </p>
              </div>
            </div>

            <p className="text-sm text-[#6B7787] leading-relaxed">
              {course.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#24364B]">
              <div className="bg-[#FAF8F0] border border-[#E2DFD2] px-3 py-1.5 rounded-md">
                <span className="text-[#6B7787]">Target Audience: </span>
                <span className="font-semibold">{course.targetAudience}</span>
              </div>
              <div className="bg-[#FAF8F0] border border-[#E2DFD2] px-3 py-1.5 rounded-md">
                <span className="text-[#6B7787]">Prerequisites: </span>
                <span className="font-semibold">{course.prerequisites}</span>
              </div>
            </div>
          </div>

          {/* Action & Stats Box */}
          <div className="bg-[#FAF8F0] border border-[#E2DFD2] rounded-xl p-5 min-w-[260px] flex flex-col justify-between">
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#24364B]">
                <span>Completed Topics</span>
                <span>{completedCount} / 100</span>
              </div>
              <div className="w-full h-2.5 bg-[#FFFFFF] border border-[#E2DFD2] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#24364B] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="text-[11px] text-[#6B7787] text-right font-semibold">
                {progressPct}% Mastered
              </div>
            </div>

            <button
              onClick={() => onNavigate('lesson', { courseId, topicNumber: firstUnfinishedNum })}
              className="w-full py-2.5 bg-[#24364B] hover:bg-[#1A2838] text-[#FFFFFF] font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{completedCount === 0 ? 'Start Topic 1' : `Resume Topic ${firstUnfinishedNum}`}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Unit Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Unit selector pill buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
            <button
              onClick={() => setSelectedUnit('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md shrink-0 transition-colors cursor-pointer ${
                selectedUnit === 'all'
                  ? 'bg-[#24364B] text-[#FFFFFF]'
                  : 'bg-[#FFFFFF] border border-[#E2DFD2] text-[#6B7787] hover:text-[#24364B]'
              }`}
            >
              All 10 Units
            </button>
            {course.units.map(u => (
              <button
                key={u.unitNumber}
                onClick={() => setSelectedUnit(u.unitNumber)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md shrink-0 transition-colors cursor-pointer ${
                  selectedUnit === u.unitNumber
                    ? 'bg-[#24364B] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] border border-[#E2DFD2] text-[#6B7787] hover:text-[#24364B]'
                }`}
              >
                U{u.unitNumber}: {u.name}
              </button>
            ))}
          </div>

          {/* Search within course */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#6B7787] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${course.title} topics...`}
              className="w-full pl-9 pr-3 py-1.5 bg-[#FFFFFF] border border-[#E2DFD2] rounded-md text-xs text-[#24364B] focus:outline-none focus:border-[#24364B]"
            />
          </div>
        </div>

        {/* 100 Topics Grid list */}
        <div className="space-y-6">
          {course.units
            .filter(u => selectedUnit === 'all' || u.unitNumber === selectedUnit)
            .map(unit => {
              const unitTopics = filteredTopics.filter(t => t.unitNumber === unit.unitNumber);
              if (unitTopics.length === 0) return null;

              const completedInUnit = unitTopics.filter(t => checkTopicCompleted(courseId, t.topicNumber)).length;

              return (
                <div key={unit.unitNumber} className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl overflow-hidden shadow-2xs">
                  {/* Unit Section Header */}
                  <div className="bg-[#FAF8F0] px-5 py-3.5 border-b border-[#E2DFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-[11px] font-bold text-[#8B6E07] uppercase tracking-wider">
                        Unit {unit.unitNumber} · {unit.difficulty}
                      </div>
                      <h3 className="text-base font-bold text-[#24364B]">
                        {unit.name} (Topics {unit.startTopic}–{unit.endTopic})
                      </h3>
                      <p className="text-xs text-[#6B7787] mt-0.5">{unit.description}</p>
                    </div>
                    <div className="text-xs font-semibold text-[#6B7787] shrink-0">
                      {completedInUnit}/{unitTopics.length} Completed
                    </div>
                  </div>

                  {/* Topic Items in Unit */}
                  <div className="divide-y divide-[#E2DFD2]/70">
                    {unitTopics.map(topic => {
                      const isCompleted = checkTopicCompleted(courseId, topic.topicNumber);
                      return (
                        <div
                          key={topic.id}
                          onClick={() => onNavigate('lesson', { courseId, topicNumber: topic.topicNumber })}
                          className="px-5 py-3.5 flex items-center justify-between hover:bg-[#FAF8F0]/50 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-[#196B36]" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border border-[#D8D2C4] flex items-center justify-center text-[10px] text-[#6B7787] font-semibold">
                                  {topic.topicNumber}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#24364B] group-hover:text-[#000000] flex items-center gap-2">
                                <span>Topic {topic.topicNumber}: {topic.title}</span>
                              </div>
                              <div className="text-xs text-[#6B7787] flex items-center gap-2 mt-0.5">
                                <span>{topic.difficulty}</span>
                                <span>·</span>
                                <span className="text-[#8B6E07] font-medium">+10 XP</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7787] group-hover:text-[#24364B]">
                            <span>{isCompleted ? 'Review' : 'Start'}</span>
                            <ChevronRight className="w-4 h-4 text-[#D8D2C4] group-hover:text-[#24364B] transition-colors" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
