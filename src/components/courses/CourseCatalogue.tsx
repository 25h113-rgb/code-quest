import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from '../../data/coursesMeta';
import { ALL_COURSES_TOPICS } from '../../data/curriculum';
import { CourseId, Difficulty, Topic } from '../../types';
import { 
  Search, 
  Terminal, 
  Coffee, 
  Cpu, 
  ChevronRight, 
  BookOpen, 
  Filter, 
  CheckCircle2, 
  Sparkles,
  Layers
} from 'lucide-react';

interface CourseCatalogueProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const CourseCatalogue: React.FC<CourseCatalogueProps> = ({ onNavigate }) => {
  const { currentUser, checkTopicCompleted } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

  // Search filtering across all 300 topics if user searches
  const allTopics: Topic[] = [
    ...ALL_COURSES_TOPICS.python,
    ...ALL_COURSES_TOPICS.java,
    ...ALL_COURSES_TOPICS.cpp,
  ];

  const filteredTopics = allTopics.filter(t => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.englishExplanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.unitTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDiff = difficultyFilter === 'All' || t.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const difficulties: (Difficulty | 'All')[] = ['All', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-[#24364B] tracking-tight">
          Course Catalogue
        </h1>
        <p className="text-base text-[#6B7787] mt-3">
          Explore our structured 300-topic curriculum spanning Python, Java, and C++. Every topic includes lessons, code examples, bilingual guidance, and interactive exercises.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#6B7787] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search across all 300 topics (e.g. loops, recursion, arrays)..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-xs sm:text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
          />
        </div>

        {/* Difficulty Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-semibold text-[#6B7787] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Level:
          </span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                difficultyFilter === diff
                  ? 'bg-[#24364B] text-[#FFFFFF]'
                  : 'bg-[#FAF8F0] text-[#6B7787] hover:text-[#24364B]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* If Search is Active, display Search Results List */}
      {searchTerm.trim().length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#24364B]">
              Search Results ({filteredTopics.length} topics found)
            </h2>
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-semibold text-[#8B6E07] hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-12 text-center text-sm text-[#6B7787]">
              No topics matched your search query "{searchTerm}". Try terms like "loops", "functions", "classes", or "pointers".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTopics.map((topic) => {
                const isCompleted = currentUser ? checkTopicCompleted(topic.courseId, topic.topicNumber) : false;
                return (
                  <div
                    key={topic.id}
                    onClick={() => onNavigate('lesson', { courseId: topic.courseId, topicNumber: topic.topicNumber })}
                    className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-4.5 hover:border-[#24364B]/40 cursor-pointer transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7787] mb-1.5">
                        <span className="uppercase text-[#24364B] font-bold">{topic.courseId} · Unit {topic.unitNumber}</span>
                        <span>{topic.difficulty}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#24364B] mb-1">
                        Topic {topic.topicNumber}: {topic.title}
                      </h4>
                      <p className="text-xs text-[#6B7787] line-clamp-2 mb-3">
                        {topic.englishExplanation}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E2DFD2] flex items-center justify-between text-xs">
                      <span className="text-[#8B6E07] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        10 XP
                      </span>
                      {isCompleted ? (
                        <span className="text-[#196B36] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="font-semibold text-[#24364B] hover:underline flex items-center gap-0.5">
                          Open Lesson <ChevronRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Standard 3 Core Courses Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => {
            const completedCount = currentUser
              ? currentUser.completedTopicIds.filter(id => id.startsWith(`${course.id}-`)).length
              : 0;
            const pct = Math.round((completedCount / 100) * 100);

            return (
              <div
                key={course.id}
                className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#24364B]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: course.accentBg, border: `1px solid ${course.accentBorder}` }}
                    >
                      {course.id === 'python' && <Terminal className="w-6 h-6 text-[#24364B]" />}
                      {course.id === 'java' && <Coffee className="w-6 h-6 text-[#24364B]" />}
                      {course.id === 'cpp' && <Cpu className="w-6 h-6 text-[#24364B]" />}
                    </div>
                    <span className="text-xs font-black text-[#24364B] bg-[#FAF8F0] border border-[#E2DFD2] px-2.5 py-1 rounded-md">
                      100 Topics · 10 Units
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#24364B] mb-2">{course.title}</h2>
                  <p className="text-xs font-semibold text-[#24364B]/80 mb-2">{course.tagline}</p>
                  <p className="text-sm text-[#6B7787] leading-relaxed mb-6">{course.fullDescription}</p>

                  {/* Progress indicator */}
                  {currentUser && (
                    <div className="mb-6 p-3 bg-[#FAF8F0] rounded-xl border border-[#E2DFD2]">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[#24364B]">
                        <span>Your Completion</span>
                        <span>{completedCount}/100 ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#FFFFFF] border border-[#E2DFD2] rounded-full overflow-hidden">
                        <div className="h-full bg-[#24364B]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}

                  {/* Units list teaser */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7787] mb-2">
                      Structured 10-Unit Syllabus:
                    </div>
                    {course.units.map((unit) => (
                      <div
                        key={unit.unitNumber}
                        onClick={() => onNavigate('unit-detail', { courseId: course.id, unitNumber: unit.unitNumber })}
                        className="p-2 rounded-lg bg-[#FAF8F0]/70 hover:bg-[#FAF8F0] border border-[#E2DFD2]/60 hover:border-[#24364B]/30 flex items-center justify-between text-xs cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 text-center font-bold text-[#6B7787]">U{unit.unitNumber}</span>
                          <span className="font-semibold text-[#24364B]">{unit.name}</span>
                        </div>
                        <span className="text-[11px] text-[#6B7787]">{unit.startTopic}–{unit.endTopic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DFD2] flex gap-2">
                  <button
                    onClick={() => onNavigate('course-detail', { courseId: course.id })}
                    className="w-full py-3 px-4 bg-[#24364B] hover:bg-[#1A2838] text-[#FFFFFF] font-bold text-sm rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Explore All 100 Topics</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Helper for ArrowRight icon inside catalogue
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
