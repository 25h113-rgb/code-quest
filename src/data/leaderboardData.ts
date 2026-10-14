import { LeaderboardUser, UserProfile, UserClass } from '../types';

export const SEEDED_STUDENTS: LeaderboardUser[] = [
  { id: 'sb-1', rank: 1, username: 'adhithya_c', userClass: 'Class 12', totalXp: 980, level: 10, completedTopicsCount: 42, primaryCourse: 'cpp', streakDays: 14 },
  { id: 'sb-2', rank: 2, username: 'ananya_ram', userClass: 'Class 12', totalXp: 860, level: 9, completedTopicsCount: 36, primaryCourse: 'python', streakDays: 11 },
  { id: 'sb-3', rank: 3, username: 'siddharth_m', userClass: 'Class 11', totalXp: 740, level: 8, completedTopicsCount: 31, primaryCourse: 'java', streakDays: 9 },
  { id: 'sb-4', rank: 4, username: 'meera_nair', userClass: 'Class 11', totalXp: 620, level: 7, completedTopicsCount: 26, primaryCourse: 'python', streakDays: 7 },
  { id: 'sb-5', rank: 5, username: 'karthik_b', userClass: 'Class 10', totalXp: 510, level: 6, completedTopicsCount: 21, primaryCourse: 'cpp', streakDays: 6 },
  { id: 'sb-6', rank: 6, username: 'divya_krishna', userClass: 'Class 10', totalXp: 430, level: 5, completedTopicsCount: 18, primaryCourse: 'java', streakDays: 5 },
  { id: 'sb-7', rank: 7, username: 'rohit_kumar', userClass: 'Class 11', totalXp: 350, level: 4, completedTopicsCount: 14, primaryCourse: 'python', streakDays: 4 },
  { id: 'sb-8', rank: 8, username: 'swetha_balan', userClass: 'Class 12', totalXp: 290, level: 3, completedTopicsCount: 12, primaryCourse: 'cpp', streakDays: 3 },
  { id: 'sb-9', rank: 9, username: 'vijay_raghav', userClass: 'Class 10', totalXp: 220, level: 3, completedTopicsCount: 9, primaryCourse: 'python', streakDays: 3 },
];

export function getComputedLeaderboard(currentUser: UserProfile | null, filterClass?: UserClass | 'All'): LeaderboardUser[] {
  let list = [...SEEDED_STUDENTS];

  if (currentUser) {
    // If current user is already present, update; else add
    const existingIdx = list.findIndex(u => u.username.toLowerCase() === currentUser.username.toLowerCase());
    const currentUserItem: LeaderboardUser = {
      id: currentUser.id,
      rank: 0,
      username: currentUser.username,
      userClass: currentUser.userClass,
      totalXp: currentUser.totalXp,
      level: currentUser.level,
      completedTopicsCount: currentUser.completedTopicIds.length,
      primaryCourse: currentUser.preferredCourse,
      streakDays: currentUser.currentStreakDays,
    };

    if (existingIdx >= 0) {
      list[existingIdx] = currentUserItem;
    } else {
      list.push(currentUserItem);
    }
  }

  // Filter if needed
  if (filterClass && filterClass !== 'All') {
    list = list.filter(u => u.userClass === filterClass);
  }

  // Sort by totalXp descending, then completedTopicsCount
  list.sort((a, b) => {
    if (b.totalXp !== a.totalXp) return b.totalXp - a.totalXp;
    return b.completedTopicsCount - a.completedTopicsCount;
  });

  // Assign ranks
  return list.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
}
