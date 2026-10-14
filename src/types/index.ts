export type CourseId = 'python' | 'java' | 'cpp';

export type Difficulty = 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Expert';

export type UserClass = 'Class 10' | 'Class 11' | 'Class 12' | 'Other';

export type LanguagePreference = 'English' | 'Tamil/Tanglish';

export interface ExerciseTestCase {
  input?: string;
  expectedOutput: string;
  description: string;
}

export interface TopicExercise {
  id: string;
  prompt: string;
  starterCode: string;
  solutionCode?: string;
  expectedOutput: string;
  hint: string;
  explanationOnMistake: string;
  testCases?: ExerciseTestCase[];
  type?: 'code' | 'fill-in' | 'multiple-choice';
  options?: string[];
  correctOptionIndex?: number;
  mcqQuestion?: string;
  mcqExplanation?: string;
}

export interface Topic {
  id: string;
  topicNumber: number; // 1 to 100
  courseId: CourseId;
  unitNumber: number; // 1 to 10
  unitTitle: string;
  title: string;
  difficulty: Difficulty;
  englishExplanation: string;
  tamilExplanation: string;
  syntax?: string;
  codeExample: string;
  expectedOutput: string;
  lineByLineExplanation?: { line: string; explanation: string }[];
  exercise: TopicExercise;
  relatedPracticeQuestion: string;
  xpReward: number; // default 10 for lesson, 20 for exercise
}

export interface CourseUnit {
  unitNumber: number;
  title: number | string;
  name: string;
  description: string;
  difficulty: Difficulty;
  startTopic: number;
  endTopic: number;
  topicsCount: number;
}

export interface CourseMeta {
  id: CourseId;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  totalTopics: number;
  totalUnits: number;
  accentBg: string;
  accentBorder: string;
  iconName: string;
  units: CourseUnit[];
  prerequisites: string;
  targetAudience: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  userClass: UserClass;
  preferredCourse: CourseId;
  explanationPreference: LanguagePreference;
  avatarSeed: string;
  joinedDate: string;
  totalXp: number;
  level: number;
  currentStreakDays: number;
  lastActiveDate: string;
  completedTopicIds: string[]; // e.g. ["python-1", "python-2"]
  completedExerciseIds: string[];
  earnedAchievementIds: string[];
  xpHistory: {
    id: string;
    description: string;
    amount: number;
    timestamp: string;
    courseId?: CourseId;
    topicNumber?: number;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredXp?: number;
  requiredTopicsCount?: number;
  requiredCourse?: CourseId;
  category: 'milestone' | 'course' | 'streak' | 'mastery';
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  userClass: UserClass;
  totalXp: number;
  level: number;
  completedTopicsCount: number;
  primaryCourse: CourseId;
  streakDays: number;
}
