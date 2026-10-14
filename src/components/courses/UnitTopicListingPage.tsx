import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from '../../data/coursesMeta';
import { getTopicsForUnit } from '../../data/curriculum';
import { CourseId } from '../../types';
import { ArrowLeft, CheckCircle2, ChevronRight, BookOpen, Sparkles, ChevronLeft } from 'lucide-react';

interface UnitTopicListingPageProps {
  courseId: CourseId;
  unitNumber: number;
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const UnitTopicListingPage: React.FC<UnitTopicListingPageProps> = ({
  courseId,
  unitNumber,
  onNavigate,
}) => {
  const { currentUser, checkTopicCompleted } = useAuth();
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const unit = course.units.find(u => u.unitNumber === unitNumber) || course.units[0];
  const topics = getTopicsForUnit(courseId, unitNumber);

  const completedCount = topics.filter(t => checkTopicCompleted(courseId, t.topicNumber)).length;
  const unitPct = Math.round((completedCount / topics.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Navigation breadcrumb */}
      <div>
        <button
          onClick={() => onNavigate('course-detail', { courseId })}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7787] hover:text-[#24364B] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {course.title} Syllabus</span>
        </button>
      </div>

      {/* Unit Overview Card */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-bold text-[#8B6E07] uppercase tracking-wider">
              {course.title} · Unit {unit.unitNumber} of 10
            </div>
            <h1 className="text-2xl font-black text-[#24364B] mt-0.5">
              {unit.name}
            </h1>
            <p className="text-sm text-[#6B7787] mt-1">{unit.description}</p>
          </div>

          <div className="bg-[#FAF8F0] border border-[#E2DFD2] px-4 py-2.5 rounded-lg text-center shrink-0">
            <div className="text-xs font-semibold text-[#6B7787]">Unit Progress</div>
            <div className="text-lg font-black text-[#24364B]">
              {completedCount} / {topics.length} ({unitPct}%)
            </div>
          </div>
        </div>

        <div className="w-full h-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-full overflow-hidden">
          <div className="h-full bg-[#24364B]" style={{ width: `${unitPct}%` }} />
        </div>
      </div>

      {/* Topics List */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl overflow-hidden shadow-xs">
        <div className="bg-[#FAF8F0] px-5 py-3 border-b border-[#E2DFD2] font-bold text-xs uppercase tracking-wider text-[#6B7787]">
          Unit Topics (Topics {unit.startTopic} to {unit.endTopic})
        </div>

        <div className="divide-y divide-[#E2DFD2]/70">
          {topics.map((t) => {
            const isCompleted = checkTopicCompleted(courseId, t.topicNumber);
            return (
              <div
                key={t.id}
                onClick={() => onNavigate('lesson', { courseId, topicNumber: t.topicNumber })}
                className="px-5 py-4 flex items-center justify-between hover:bg-[#FAF8F0]/60 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#196B36]" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-[#D8D2C4] flex items-center justify-center text-xs font-bold text-[#6B7787]">
                        {t.topicNumber}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#24364B] group-hover:text-[#000000]">
                      Topic {t.topicNumber}: {t.title}
                    </h3>
                    <div className="text-xs text-[#6B7787] flex items-center gap-2 mt-0.5">
                      <span>{t.difficulty}</span>
                      <span>·</span>
                      <span className="text-[#8B6E07] font-semibold">+10 XP</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#24364B]">
                  <span>{isCompleted ? 'Review' : 'Open Lesson'}</span>
                  <ChevronRight className="w-4 h-4 text-[#D8D2C4] group-hover:text-[#24364B]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Previous / Next Unit Navigation */}
      <div className="flex items-center justify-between pt-2">
        {unitNumber > 1 ? (
          <button
            onClick={() => onNavigate('unit-detail', { courseId, unitNumber: unitNumber - 1 })}
            className="flex items-center gap-1 text-xs font-bold text-[#24364B] hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Unit {unitNumber - 1}</span>
          </button>
        ) : <div />}

        {unitNumber < 10 ? (
          <button
            onClick={() => onNavigate('unit-detail', { courseId, unitNumber: unitNumber + 1 })}
            className="flex items-center gap-1 text-xs font-bold text-[#24364B] hover:underline cursor-pointer"
          >
            <span>Unit {unitNumber + 1}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
