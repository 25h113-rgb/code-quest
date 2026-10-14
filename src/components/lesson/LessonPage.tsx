import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTopic, getTopicsForCourse } from '../../data/curriculum';
import { validateStudentCode, ValidationResult } from '../../utils/codeValidator';
import { CourseId, Topic, LanguagePreference } from '../../types';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Lightbulb, 
  AlertCircle, 
  BookOpen, 
  Check, 
  Languages, 
  Code2,
  Terminal,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

interface LessonPageProps {
  courseId: CourseId;
  topicNumber: number;
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  courseId,
  topicNumber,
  onNavigate,
}) => {
  const { 
    currentUser, 
    recordLessonCompletion, 
    recordExerciseCompletion, 
    checkTopicCompleted, 
    checkExerciseCompleted 
  } = useAuth();

  const topic: Topic | undefined = getTopic(courseId, topicNumber);

  // Explanation language toggle (default to user preference or English)
  const [langPreference, setLangPreference] = useState<LanguagePreference>(
    currentUser?.explanationPreference || 'English'
  );

  // Interactive exercise state
  const [exerciseMode, setExerciseMode] = useState<'mcq' | 'code'>('mcq');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqIsCorrect, setMcqIsCorrect] = useState<boolean | null>(null);

  const [studentCode, setStudentCode] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync starter code and reset quiz when topic changes
  useEffect(() => {
    if (topic) {
      setStudentCode(topic.exercise.starterCode);
      setSelectedOption(null);
      setMcqSubmitted(false);
      setMcqIsCorrect(null);
      setShowHint(false);
      setValidationResult(null);
      setHasSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [courseId, topicNumber]);

  if (!topic) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#24364B] mb-2">Topic Not Found</h2>
        <p className="text-sm text-[#6B7787] mb-6">Topic {topicNumber} does not exist in this course.</p>
        <button
          onClick={() => onNavigate('courses')}
          className="px-5 py-2.5 bg-[#24364B] text-[#FFFFFF] rounded-md text-sm font-semibold"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const isLessonCompleted = currentUser ? checkTopicCompleted(courseId, topicNumber) : false;
  const isExerciseCompleted = currentUser ? checkExerciseCompleted(courseId, topicNumber) : false;

  const handleMarkLessonComplete = () => {
    if (!currentUser) {
      setToastMessage('Please sign in or create an account to save your learning progress and earn XP.');
      return;
    }
    const res = recordLessonCompletion(courseId, topicNumber, topic.title);
    if (res.isFirstTime) {
      setToastMessage(`🎉 Congratulations! +${res.xpAwarded} XP earned for completing Lesson ${topicNumber}.`);
    } else {
      setToastMessage('Lesson progress verified. (XP already recorded previously).');
    }
  };

  const handleCheckAnswer = () => {
    setHasSubmitted(true);
    if (studentCode.includes('______') || studentCode.includes('____')) {
      setValidationResult({
        passed: false,
        actualOutput: '(blank space unfilled)',
        expectedOutput: topic.exercise.expectedOutput,
        feedbackMessage: 'Please replace the blank space (______) with your answer before submitting.',
        detailedAnalysis: ['The code still contains the blank space placeholder ______.', 'Type your code solution in place of ______ and click Check Answer.'],
        executionType: 'simulated_engine',
      });
      return;
    }
    const result = validateStudentCode(courseId, studentCode, topic.exercise.expectedOutput);
    setValidationResult(result);

    if (result.passed && currentUser) {
      const res = recordExerciseCompletion(courseId, topicNumber, topic.title);
      if (res.isFirstTime) {
        setToastMessage(`⭐ Practice Challenge Solved! +${res.xpAwarded} XP awarded!`);
      }
    }
  };

  const handleResetExercise = () => {
    setStudentCode(topic.exercise.starterCode);
    setValidationResult(null);
    setHasSubmitted(false);
  };

  const handleSubmitMcq = () => {
    if (selectedOption === null || !topic) return;
    const isCorrect = selectedOption === (topic.exercise.correctOptionIndex ?? 1);
    setMcqSubmitted(true);
    setMcqIsCorrect(isCorrect);

    if (isCorrect && currentUser) {
      const res = recordExerciseCompletion(courseId, topicNumber, topic.title);
      if (res.isFirstTime) {
        setToastMessage(`🎉 Quiz Challenge Solved! +${res.xpAwarded} XP awarded!`);
      } else {
        setToastMessage(`🎉 Correct answer! (XP already earned previously).`);
      }
    }
  };

  const handleRetryMcq = () => {
    setSelectedOption(null);
    setMcqSubmitted(false);
    setMcqIsCorrect(null);
  };

  const courseDisplayName = courseId === 'python' ? 'Python' : courseId === 'java' ? 'Java' : 'C++';
  const totalTopicsInCourse = 100;
  const nextTopicNumber = topicNumber < 100 ? topicNumber + 1 : null;
  const prevTopicNumber = topicNumber > 1 ? topicNumber - 1 : null;

  const hasUnfilledBlank = studentCode.includes('______') || studentCode.includes('____');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* 1. TOP BAR: BREADCRUMBS & TOPIC PROGRESS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2DFD2]">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigate('course-detail', { courseId })}
            className="font-semibold text-[#6B7787] hover:text-[#24364B] flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{courseDisplayName}</span>
          </button>
          <span className="text-[#6B7787]">/</span>
          <span className="text-[#6B7787]">Unit {topic.unitNumber}: {topic.unitTitle}</span>
          <span className="text-[#6B7787]">/</span>
          <span className="font-bold text-[#24364B]">Topic {topic.topicNumber}</span>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#6B7787]">
            Topic {topic.topicNumber} of 100 ({topic.topicNumber}%)
          </span>
          <div className="w-24 h-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#24364B]" 
              style={{ width: `${topic.topicNumber}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Toast notification if XP awarded */}
      {toastMessage && (
        <div className="p-3.5 bg-[#FAF4DC] border border-[#DFC974] rounded-lg text-xs sm:text-sm font-semibold text-[#24364B] flex items-center justify-between shadow-2xs">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-bold text-[#6B7787] hover:text-[#24364B] ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. LESSON HEADER: TITLE, DIFFICULTY, XP & LANGUAGE TOGGLE */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7787] mb-1">
              <span className="text-[#24364B] font-bold uppercase tracking-wider">{courseDisplayName} Course</span>
              <span>·</span>
              <span>Unit {topic.unitNumber}: {topic.unitTitle}</span>
              <span>·</span>
              <span className="text-[#8B6E07] font-bold">{topic.difficulty}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#24364B] tracking-tight">
              Topic {topic.topicNumber}: {topic.title}
            </h1>
          </div>

          {/* Bilingual Language Switcher */}
          <div className="flex items-center gap-2 bg-[#FAF8F0] p-1 rounded-lg border border-[#E2DFD2] shrink-0">
            <Languages className="w-4 h-4 text-[#6B7787] ml-2" />
            <button
              onClick={() => setLangPreference('English')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                langPreference === 'English'
                  ? 'bg-[#FFFFFF] text-[#24364B] shadow-2xs'
                  : 'text-[#6B7787] hover:text-[#24364B]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLangPreference('Tamil/Tanglish')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                langPreference === 'Tamil/Tanglish'
                  ? 'bg-[#FFFFFF] text-[#24364B] shadow-2xs'
                  : 'text-[#6B7787] hover:text-[#24364B]'
              }`}
            >
              தமிழ் / Tanglish
            </button>
          </div>
        </div>

        {/* 3. EXPLANATION: ENGLISH & OPTIONAL TAMIL/TANGLISH */}
        <div className="space-y-4 pt-2">
          {langPreference === 'English' ? (
            <div className="prose text-[#24364B] text-sm sm:text-base leading-relaxed">
              <p>{topic.englishExplanation}</p>
            </div>
          ) : (
            <div className="bg-[#FAF8F0] border border-[#E2DFD2] rounded-lg p-4 text-sm sm:text-base leading-relaxed text-[#24364B] space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-[#8B6E07] flex items-center gap-1.5">
                <span>தமிழ் விளக்கம் (Tamil Explanation)</span>
              </div>
              <p>{topic.tamilExplanation}</p>
              <div className="pt-2 border-t border-[#E2DFD2] text-xs text-[#6B7787]">
                <strong className="text-[#24364B]">English Reference:</strong> {topic.englishExplanation}
              </div>
            </div>
          )}
        </div>

        {/* 4. SYNTAX REFERENCE (IF AVAILABLE) */}
        {topic.syntax && (
          <div className="mt-6 pt-5 border-t border-[#E2DFD2]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7787] mb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#24364B]" />
              <span>Syntax Pattern</span>
            </h4>
            <div className="bg-[#FAF8F0] border border-[#E2DFD2] p-3 rounded-lg font-mono text-xs text-[#24364B] overflow-x-auto">
              <pre>{topic.syntax}</pre>
            </div>
          </div>
        )}
      </div>

      {/* 5. CODE EXAMPLE & EXPECTED OUTPUT */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl overflow-hidden shadow-xs">
        <div className="bg-[#FAF8F0] px-5 py-3 border-b border-[#E2DFD2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#24364B]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#24364B]">
              Practical Code Example ({courseDisplayName})
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#6B7787]">Verified Working Code</span>
        </div>

        <div className="p-4 bg-[#24364B] text-[#FAF8F0] font-mono text-xs sm:text-sm overflow-x-auto">
          <pre>{topic.codeExample}</pre>
        </div>

        {/* Expected Output */}
        <div className="bg-[#FAF8F0] p-4 border-t border-[#E2DFD2]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7787] mb-1.5">
            Standard Output:
          </div>
          <div className="bg-[#FFFFFF] border border-[#E2DFD2] p-3 rounded font-mono text-xs text-[#196B36] whitespace-pre-wrap">
            {topic.expectedOutput}
          </div>
        </div>

        {/* 6. LINE-BY-LINE EXPLANATION FOR BEGINNER TOPICS */}
        {topic.lineByLineExplanation && topic.lineByLineExplanation.length > 0 && (
          <div className="p-5 border-t border-[#E2DFD2] bg-[#FFFFFF]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#24364B] mb-3">
              Line-by-Line Code Breakdown:
            </h4>
            <div className="space-y-2">
              {topic.lineByLineExplanation.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#FAF8F0] border border-[#E2DFD2]/70 text-xs">
                  <div className="font-mono font-semibold text-[#24364B] mb-0.5">{item.line}</div>
                  <div className="text-[#6B7787]">{item.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 7. LESSON COMPLETION CHECK BUTTON */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div>
          <h4 className="text-sm font-bold text-[#24364B]">Lesson Concept Study</h4>
          <p className="text-xs text-[#6B7787] mt-0.5">
            Understood the concept? Mark lesson as completed to record +10 XP.
          </p>
        </div>

        <button
          onClick={handleMarkLessonComplete}
          disabled={isLessonCompleted}
          className={`px-5 py-2.5 rounded-md text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            isLessonCompleted
              ? 'bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA] cursor-default'
              : 'bg-[#24364B] hover:bg-[#1A2838] text-[#FFFFFF]'
          }`}
        >
          {isLessonCompleted ? (
            <>
              <Check className="w-4 h-4 text-[#03543F]" />
              <span>Lesson Completed (+10 XP Saved)</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Lesson as Completed (+10 XP)</span>
            </>
          )}
        </button>
      </div>

      {/* 8. INTERACTIVE PRACTICE: MCQ QUIZ & FILL-IN-THE-BLANK CHALLENGE */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl overflow-hidden shadow-xs">
        {/* Exercise Header & Mode Switcher */}
        <div className="bg-[#FAF8F0] px-5 py-3.5 border-b border-[#E2DFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B6E07] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Practice Challenge · +20 XP</span>
            </div>
            <h3 className="text-base font-bold text-[#24364B] mt-0.5">
              Practice for Topic {topic.topicNumber}: {topic.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-[#FFFFFF] p-1 rounded-lg border border-[#E2DFD2] text-xs font-semibold">
              <button
                onClick={() => setExerciseMode('mcq')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  exerciseMode === 'mcq'
                    ? 'bg-[#24364B] text-[#FFFFFF] font-bold shadow-2xs'
                    : 'text-[#6B7787] hover:text-[#24364B]'
                }`}
              >
                <span>Quiz (MCQ)</span>
              </button>
              <button
                onClick={() => setExerciseMode('code')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  exerciseMode === 'code'
                    ? 'bg-[#24364B] text-[#FFFFFF] font-bold shadow-2xs'
                    : 'text-[#6B7787] hover:text-[#24364B]'
                }`}
              >
                <span>Fill-in-the-Blanks Code</span>
              </button>
            </div>

            {isExerciseCompleted && (
              <span className="text-xs font-bold text-[#196B36] bg-[#DEF7EC] border border-[#BCF0DA] px-2.5 py-1 rounded-md flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Solved
              </span>
            )}

            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-semibold text-[#6B7787] hover:text-[#24364B] bg-[#FFFFFF] border border-[#E2DFD2] px-2.5 py-1.5 rounded-md flex items-center gap-1 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#D4A30B]" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>
          </div>
        </div>

        {/* Optional Hint display */}
        {showHint && (
          <div className="p-4 bg-[#FAF4DC] border-b border-[#E6D78E] text-xs text-[#24364B] flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-[#8B6E07] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#8B6E07]">Helpful Hint: </strong>
              <span>{topic.exercise.hint}</span>
            </div>
          </div>
        )}

        {/* MODE A: INTERACTIVE MCQ QUIZ (NO ANSWERS REVEALED UNTIL SUBMISSION) */}
        {exerciseMode === 'mcq' ? (
          <div className="p-6 space-y-6 bg-[#FFFFFF]">
            <div className="bg-[#FAF8F0] p-4 rounded-xl border border-[#E2DFD2] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B6E07] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#8B6E07]" />
                  <span>Topic Quiz Question</span>
                </span>
                <span className="text-xs font-semibold text-[#6B7787]">
                  Select 1 of 4 options
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#24364B] leading-snug">
                {topic.exercise.mcqQuestion || topic.exercise.prompt}
              </h4>
            </div>

            {/* 4 Interactive Options */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#6B7787] uppercase tracking-wider">
                Select your answer:
              </div>

              <div className="grid grid-cols-1 gap-3">
                {topic.exercise.options?.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === (topic.exercise.correctOptionIndex ?? 0);
                  const letter = ['A', 'B', 'C', 'D'][idx];

                  // Option styling: NEVER reveal correct answer before submission!
                  let optionStyles = 'bg-[#FFFFFF] border-[#E2DFD2] hover:border-[#24364B] hover:bg-[#FAF8F0]/50 text-[#24364B]';

                  if (mcqSubmitted) {
                    if (isCorrect) {
                      optionStyles = 'bg-[#DEF7EC] border-[#03543F] text-[#03543F] font-bold shadow-xs';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'bg-[#FDF2F2] border-[#9B1C1C] text-[#9B1C1C] font-semibold';
                    } else {
                      optionStyles = 'bg-[#FAF8F0]/30 border-[#E2DFD2] opacity-50';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-[#FAF4DC] border-[#24364B] ring-2 ring-[#24364B]/20 font-bold text-[#24364B] shadow-2xs';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={mcqSubmitted && mcqIsCorrect === true}
                      onClick={() => {
                        if (!mcqSubmitted) setSelectedOption(idx);
                      }}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${optionStyles}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                          isSelected && !mcqSubmitted
                            ? 'bg-[#24364B] text-[#FFFFFF]'
                            : mcqSubmitted && isCorrect
                            ? 'bg-[#03543F] text-[#FFFFFF]'
                            : mcqSubmitted && isSelected && !isCorrect
                            ? 'bg-[#9B1C1C] text-[#FFFFFF]'
                            : 'bg-[#FAF8F0] border border-[#E2DFD2] text-[#24364B]'
                        }`}>
                          {letter}
                        </span>
                        <span className="text-sm sm:text-base">{option}</span>
                      </div>

                      {/* State Icons */}
                      <div>
                        {mcqSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-[#03543F] shrink-0" />
                        )}
                        {mcqSubmitted && isSelected && !isCorrect && (
                          <AlertCircle className="w-5 h-5 text-[#9B1C1C] shrink-0" />
                        )}
                        {!mcqSubmitted && (
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#24364B] bg-[#24364B]' : 'border-[#C4BFB3]'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quiz Submit & Feedback Actions */}
            <div className="pt-4 border-t border-[#E2DFD2] flex flex-wrap items-center justify-between gap-4">
              {!mcqSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitMcq}
                  disabled={selectedOption === null}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    selectedOption !== null
                      ? 'bg-[#24364B] hover:bg-[#1A2838] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#FAF8F0] border border-[#E2DFD2] text-[#6B7787] cursor-not-allowed opacity-60'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{selectedOption !== null ? 'Submit My Answer' : 'Choose an option to submit'}</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  {!mcqIsCorrect && (
                    <button
                      type="button"
                      onClick={handleRetryMcq}
                      className="px-5 py-2.5 bg-[#24364B] hover:bg-[#1A2838] text-[#FFFFFF] rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Try Again & Re-select</span>
                    </button>
                  )}
                  {mcqIsCorrect && (
                    <span className="text-sm font-bold text-[#03543F] bg-[#DEF7EC] border border-[#BCF0DA] px-4 py-2 rounded-lg flex items-center gap-2 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Quiz Passed! +20 XP Awarded</span>
                    </span>
                  )}
                </div>
              )}

              <span className="text-xs text-[#6B7787]">
                {mcqSubmitted ? 'Result evaluated' : 'Answers are kept hidden until you click submit.'}
              </span>
            </div>

            {/* Post-submission explanation */}
            {mcqSubmitted && (
              <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                mcqIsCorrect ? 'bg-[#DEF7EC]/70 border-[#BCF0DA]' : 'bg-[#FDF2F2] border-[#F8B4B4]'
              }`}>
                <div className={`font-bold flex items-center gap-1.5 ${mcqIsCorrect ? 'text-[#03543F]' : 'text-[#9B1C1C]'}`}>
                  {mcqIsCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct Choice! Great job!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span>Incorrect Choice. Review and try again!</span>
                    </>
                  )}
                </div>
                <p className="text-[#24364B]">
                  {mcqIsCorrect
                    ? topic.exercise.mcqExplanation || 'You accurately identified the concept.'
                    : `That's not the right answer. ${topic.exercise.explanationOnMistake || 'Review the explanation above and click "Try Again" to select another option.'}`}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* MODE B: FILL-IN-THE-BLANKS CODE CHALLENGE (WITH VISIBLE ______ BLANK SPACE) */
          <div>
            <div className="p-5 border-b border-[#E2DFD2] space-y-3 bg-[#FFFFFF]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B6E07] flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#24364B]" />
                  <span>Fill-in-the-Blank Code Exercise</span>
                </span>
                
                {hasUnfilledBlank ? (
                  <span className="text-xs font-mono bg-[#FAF4DC] text-[#8B6E07] border border-[#DFC974] px-2.5 py-0.5 rounded font-semibold flex items-center gap-1">
                    <span>Unfilled Blank:</span>
                    <strong className="text-[#9B1C1C]">______</strong>
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-[#196B36] bg-[#DEF7EC] border border-[#BCF0DA] px-2.5 py-0.5 rounded flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Blank replaced</span>
                  </span>
                )}
              </div>

              <p className="text-sm text-[#24364B] font-medium leading-relaxed">
                {topic.exercise.prompt}
              </p>

              {/* Task Guide Box */}
              <div className="p-3 bg-[#FAF8F0] border border-[#E2DFD2] rounded-lg text-xs text-[#24364B] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#8B6E07] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#8B6E07]">Instructions: </strong>
                  <span>
                    In the code editor below, locate the <code className="bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E2DFD2] font-mono font-bold text-[#9B1C1C]">______</code> blank space placeholder and replace it with the missing code expression. Then click <strong>"Check Answer & Validate"</strong>.
                  </span>
                </div>
              </div>
            </div>

            {/* Code Editor Box */}
            <div className="relative">
              <textarea
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                rows={8}
                spellCheck={false}
                placeholder="// Replace the blank space (______) with your answer..."
                className="w-full p-4 bg-[#24364B] text-[#FAF8F0] font-mono text-xs sm:text-sm focus:outline-none resize-y border-b border-[#E2DFD2] leading-relaxed"
              />
            </div>

            {/* Action Buttons: Run & Check Answer, Reset */}
            <div className="bg-[#FAF8F0] px-5 py-3 border-b border-[#E2DFD2] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  className="px-4 py-2 bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] text-[#24364B] text-xs font-bold rounded-md flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-[#24364B]" />
                  <span>Check Answer & Validate</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetExercise}
                  className="px-3 py-2 bg-[#FFFFFF] hover:bg-[#FAF8F0] border border-[#E2DFD2] text-[#6B7787] hover:text-[#24364B] text-xs font-medium rounded-md flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Blank Space (______)</span>
                </button>
              </div>

              <div className="text-[11px] text-[#6B7787]">
                Evaluated client-side with whitespace-tolerant checking.
              </div>
            </div>

            {/* Validation Result */}
            {hasSubmitted && validationResult && (
              <div className={`p-5 ${validationResult.passed ? 'bg-[#DEF7EC]/50' : 'bg-[#FDF2F2]'}`}>
                <div className="flex items-start gap-3">
                  {validationResult.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#03543F] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#9B1C1C] shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-2 flex-1">
                    <div className={`font-bold text-sm ${validationResult.passed ? 'text-[#03543F]' : 'text-[#9B1C1C]'}`}>
                      {validationResult.passed ? 'Exercise Challenge Solved! +20 XP' : 'Blank Space / Solution Needs Adjustment'}
                    </div>

                    <p className="text-xs text-[#24364B] leading-relaxed">
                      {validationResult.feedbackMessage}
                    </p>

                    {!validationResult.passed && (
                      <div className="mt-2 p-3 bg-[#FFFFFF] border border-[#F8B4B4] rounded-md text-xs space-y-1.5">
                        <div className="font-bold text-[#9B1C1C]">Guidance:</div>
                        <div className="text-[#6B7787]">{topic.exercise.explanationOnMistake}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Safe Sandbox Execution Note */}
        <div className="px-5 py-2.5 bg-[#FAF8F0] border-t border-[#E2DFD2] flex items-center gap-2 text-[11px] text-[#6B7787]">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>
            Practice answers are validated client-side. Answers are kept hidden until submitted.
          </span>
        </div>
      </div>

      {/* 9. RELATED PRACTICE QUESTION */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-5 shadow-2xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7787] mb-1.5 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#24364B]" />
          <span>Conceptual Examination Question</span>
        </h4>
        <p className="text-sm font-semibold text-[#24364B]">
          {topic.relatedPracticeQuestion}
        </p>
        <p className="text-xs text-[#6B7787] mt-1">
          Commonly asked in CBSE/ICSE board vivas and practical assessments.
        </p>
      </div>

      {/* 10. PREVIOUS AND NEXT TOPIC NAVIGATION */}
      <div className="pt-4 border-t border-[#E2DFD2] flex items-center justify-between gap-4">
        {prevTopicNumber ? (
          <button
            onClick={() => onNavigate('lesson', { courseId, topicNumber: prevTopicNumber })}
            className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-xs font-bold text-[#24364B] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous: Topic {prevTopicNumber}</span>
          </button>
        ) : (
          <div />
        )}

        {nextTopicNumber ? (
          <button
            onClick={() => onNavigate('lesson', { courseId, topicNumber: nextTopicNumber })}
            className="px-5 py-2.5 bg-[#24364B] hover:bg-[#1A2838] rounded-md text-xs font-bold text-[#FFFFFF] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Next: Topic {nextTopicNumber}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigate('course-detail', { courseId })}
            className="px-5 py-2.5 bg-[#24364B] text-[#FFFFFF] rounded-md text-xs font-bold cursor-pointer"
          >
            Course Completed! Return to Overview
          </button>
        )}
      </div>
    </div>
  );
};
