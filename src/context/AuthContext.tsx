import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, CourseId, LanguagePreference, UserClass } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';

const STORAGE_USERS_KEY = 'codequest_registered_users_v3';
const STORAGE_CURRENT_USER_KEY = 'codequest_active_session_v3';

// Seed demo student for instant exploration if no accounts exist
const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr_demo_101',
  fullName: 'Kavya Sundaram',
  username: 'kavya_s',
  email: 'kavya@school.edu.in',
  userClass: 'Class 11',
  preferredCourse: 'python',
  explanationPreference: 'English',
  avatarSeed: 'kavya',
  joinedDate: '2026-08-15',
  totalXp: 180,
  level: 2,
  currentStreakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedTopicIds: ['python-1', 'python-2'],
  completedExerciseIds: [],
  earnedAchievementIds: ['first-step'],
  xpHistory: [
    { id: 'xp-1', description: 'Topic 1 Lesson Completed: Introduction to Programming', amount: 10, timestamp: '2026-10-10 10:00', courseId: 'python', topicNumber: 1 },
    { id: 'xp-2', description: 'Topic 1 Practice Solved: Introduction to Programming', amount: 20, timestamp: '2026-10-10 10:15', courseId: 'python', topicNumber: 1 },
    { id: 'xp-3', description: 'Topic 2 Lesson Completed: What Is Python?', amount: 10, timestamp: '2026-10-11 11:00', courseId: 'python', topicNumber: 2 },
    { id: 'xp-4', description: 'Topic 2 Practice Solved: What Is Python?', amount: 20, timestamp: '2026-10-11 11:20', courseId: 'python', topicNumber: 2 },
    { id: 'xp-5', description: 'Topic 3 Lesson Completed: Installing Python', amount: 10, timestamp: '2026-10-11 14:00', courseId: 'python', topicNumber: 3 },
    { id: 'xp-6', description: 'Topic 5 Lesson Completed: Your First Python Program', amount: 10, timestamp: '2026-10-12 09:00', courseId: 'python', topicNumber: 5 },
    { id: 'xp-7', description: 'Topic 5 Practice Solved: Your First Python Program', amount: 20, timestamp: '2026-10-12 09:10', courseId: 'python', topicNumber: 5 },
    { id: 'xp-8', description: 'Topic 7 Lesson Completed: print() Function', amount: 10, timestamp: '2026-10-12 09:30', courseId: 'python', topicNumber: 7 },
    { id: 'xp-9', description: 'Topic 7 Practice Solved: print() Function', amount: 20, timestamp: '2026-10-12 09:40', courseId: 'python', topicNumber: 7 },
    { id: 'xp-10', description: 'Topic 11 Lesson Completed: Variables', amount: 10, timestamp: '2026-10-12 10:00', courseId: 'python', topicNumber: 11 },
  ],
};

interface StoredAuthAccount {
  profile: UserProfile;
  passwordHash: string; // simulated secure hash
}

interface RegisterInput {
  fullName: string;
  username: string;
  email: string;
  password: string;
  userClass: UserClass;
  preferredCourse: CourseId;
  explanationPreference: LanguagePreference;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  register: (data: RegisterInput) => { success: boolean; error?: string };
  login: (usernameOrEmail: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => { success: boolean; error?: string };
  updateProfile: (updates: Partial<UserProfile>) => void;
  deleteAccount: () => void;
  recordLessonCompletion: (courseId: CourseId, topicNumber: number, topicTitle: string) => { xpAwarded: number; isFirstTime: boolean };
  recordExerciseCompletion: (courseId: CourseId, topicNumber: number, topicTitle: string) => { xpAwarded: number; isFirstTime: boolean };
  checkTopicCompleted: (courseId: CourseId, topicNumber: number) => boolean;
  checkExerciseCompleted: (courseId: CourseId, topicNumber: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const activeSession = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (activeSession) {
        return JSON.parse(activeSession);
      }
      return DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  // Ensure accounts store has at least default user
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (!stored) {
        const initialAccounts: Record<string, StoredAuthAccount> = {
          [DEFAULT_DEMO_USER.username.toLowerCase()]: {
            profile: DEFAULT_DEMO_USER,
            passwordHash: 'DemoStudent123!',
          },
        };
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initialAccounts));
      }
    } catch (e) {
      console.warn('Storage init failed', e);
    }
  }, []);

  // Save active session
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(currentUser));
        // Also sync back to main accounts registry
        const stored = localStorage.getItem(STORAGE_USERS_KEY);
        if (stored) {
          const accounts: Record<string, StoredAuthAccount> = JSON.parse(stored);
          const key = currentUser.username.toLowerCase();
          if (accounts[key]) {
            accounts[key].profile = currentUser;
            localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
          }
        }
      } else {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
      }
    } catch (e) {
      console.warn('Session sync failed', e);
    }
  }, [currentUser]);

  const register = (data: RegisterInput): { success: boolean; error?: string } => {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      const accounts: Record<string, StoredAuthAccount> = stored ? JSON.parse(stored) : {};

      const unameKey = data.username.trim().toLowerCase();
      if (accounts[unameKey]) {
        return { success: false, error: 'Username is already taken by another student.' };
      }

      // Check duplicate email
      const emailExists = Object.values(accounts).some(
        acc => acc.profile.email.toLowerCase() === data.email.trim().toLowerCase()
      );
      if (emailExists) {
        return { success: false, error: 'An account with this email address already exists.' };
      }

      const newProfile: UserProfile = {
        id: `usr_${Date.now()}`,
        fullName: data.fullName.trim(),
        username: data.username.trim(),
        email: data.email.trim(),
        userClass: data.userClass,
        preferredCourse: data.preferredCourse,
        explanationPreference: data.explanationPreference,
        avatarSeed: data.username.trim().toLowerCase(),
        joinedDate: new Date().toISOString().split('T')[0],
        totalXp: 0,
        level: 1,
        currentStreakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        completedTopicIds: [],
        completedExerciseIds: [],
        earnedAchievementIds: [],
        xpHistory: [],
      };

      accounts[unameKey] = {
        profile: newProfile,
        passwordHash: data.password,
      };

      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
      setCurrentUser(newProfile);
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to complete registration due to local storage error.' };
    }
  };

  const login = (usernameOrEmail: string, password: string): { success: boolean; error?: string } => {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      const accounts: Record<string, StoredAuthAccount> = stored ? JSON.parse(stored) : {};

      const input = usernameOrEmail.trim().toLowerCase();
      // Match by username or email
      let matched = accounts[input];
      if (!matched) {
        matched = Object.values(accounts).find(
          acc => acc.profile.email.toLowerCase() === input
        )!;
      }

      if (!matched) {
        return { success: false, error: 'No account found with this username or email.' };
      }

      if (matched.passwordHash !== password) {
        return { success: false, error: 'Incorrect password. Please verify and try again.' };
      }

      // Update last active date & streak
      const today = new Date().toISOString().split('T')[0];
      const updatedProfile = { ...matched.profile, lastActiveDate: today };
      setCurrentUser(updatedProfile);
      return { success: true };
    } catch {
      return { success: false, error: 'Login verification failed.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const resetPassword = (email: string, newPassword: string): { success: boolean; error?: string } => {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      const accounts: Record<string, StoredAuthAccount> = stored ? JSON.parse(stored) : {};

      const targetKey = Object.keys(accounts).find(
        key => accounts[key].profile.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!targetKey) {
        return { success: false, error: 'No registered student found with this email.' };
      }

      accounts[targetKey].passwordHash = newPassword;
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
      return { success: true };
    } catch {
      return { success: false, error: 'Unable to reset password.' };
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser(prev => (prev ? { ...prev, ...updates } : null));
  };

  const deleteAccount = () => {
    if (!currentUser) return;
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (stored) {
        const accounts: Record<string, StoredAuthAccount> = JSON.parse(stored);
        delete accounts[currentUser.username.toLowerCase()];
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
      }
    } catch (e) {
      console.warn('Deletion error', e);
    }
    setCurrentUser(null);
  };

  // Helper to re-evaluate achievements
  const evaluateAchievements = (user: UserProfile): string[] => {
    const earned = new Set(user.earnedAchievementIds);
    ACHIEVEMENTS.forEach(ach => {
      if (ach.requiredTopicsCount && user.completedTopicIds.length >= ach.requiredTopicsCount) {
        if (!ach.requiredCourse || user.completedTopicIds.filter(id => id.startsWith(ach.requiredCourse!)).length >= ach.requiredTopicsCount) {
          earned.add(ach.id);
        }
      }
      if (ach.requiredXp && user.totalXp >= ach.requiredXp) {
        earned.add(ach.id);
      }
    });
    return Array.from(earned);
  };

  const recordLessonCompletion = (courseId: CourseId, topicNumber: number, topicTitle: string) => {
    if (!currentUser) return { xpAwarded: 0, isFirstTime: false };

    const topicId = `${courseId}-${topicNumber}`;
    if (currentUser.completedTopicIds.includes(topicId)) {
      return { xpAwarded: 0, isFirstTime: false };
    }

    const xpEarned = 10;
    const newCompleted = [...currentUser.completedTopicIds, topicId];
    const newTotalXp = currentUser.totalXp + xpEarned;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    const newHistoryItem = {
      id: `xp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      description: `Topic ${topicNumber} Lesson Completed: ${topicTitle}`,
      amount: xpEarned,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      courseId,
      topicNumber,
    };

    let updated: UserProfile = {
      ...currentUser,
      completedTopicIds: newCompleted,
      totalXp: newTotalXp,
      level: newLevel,
      lastActiveDate: new Date().toISOString().split('T')[0],
      xpHistory: [newHistoryItem, ...currentUser.xpHistory],
    };

    updated.earnedAchievementIds = evaluateAchievements(updated);
    setCurrentUser(updated);

    return { xpAwarded: xpEarned, isFirstTime: true };
  };

  const recordExerciseCompletion = (courseId: CourseId, topicNumber: number, topicTitle: string) => {
    if (!currentUser) return { xpAwarded: 0, isFirstTime: false };

    const exerciseId = `ex-${courseId}-${topicNumber}`;
    if (currentUser.completedExerciseIds.includes(exerciseId)) {
      return { xpAwarded: 0, isFirstTime: false };
    }

    const xpEarned = 20;
    const newExercises = [...currentUser.completedExerciseIds, exerciseId];
    const newTotalXp = currentUser.totalXp + xpEarned;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    const newHistoryItem = {
      id: `xp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      description: `Topic ${topicNumber} Practice Solved: ${topicTitle}`,
      amount: xpEarned,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      courseId,
      topicNumber,
    };

    let updated: UserProfile = {
      ...currentUser,
      completedExerciseIds: newExercises,
      totalXp: newTotalXp,
      level: newLevel,
      lastActiveDate: new Date().toISOString().split('T')[0],
      xpHistory: [newHistoryItem, ...currentUser.xpHistory],
    };

    updated.earnedAchievementIds = evaluateAchievements(updated);
    setCurrentUser(updated);

    return { xpAwarded: xpEarned, isFirstTime: true };
  };

  const checkTopicCompleted = (courseId: CourseId, topicNumber: number) => {
    if (!currentUser) return false;
    return currentUser.completedTopicIds.includes(`${courseId}-${topicNumber}`);
  };

  const checkExerciseCompleted = (courseId: CourseId, topicNumber: number) => {
    if (!currentUser) return false;
    return currentUser.completedExerciseIds.includes(`ex-${courseId}-${topicNumber}`);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        register,
        login,
        logout,
        resetPassword,
        updateProfile,
        deleteAccount,
        recordLessonCompletion,
        recordExerciseCompletion,
        checkTopicCompleted,
        checkExerciseCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
