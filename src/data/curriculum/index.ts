import { CourseId, Topic } from '../../types';
import { pythonTopics } from './python';
import { javaTopics } from './java';
import { cppTopics } from './cpp';

export { pythonTopics, javaTopics, cppTopics };

export const ALL_COURSES_TOPICS: Record<CourseId, Topic[]> = {
  python: pythonTopics,
  java: javaTopics,
  cpp: cppTopics,
};

export function getTopicsForCourse(courseId: CourseId): Topic[] {
  return ALL_COURSES_TOPICS[courseId] || [];
}

export function getTopic(courseId: CourseId, topicNumber: number): Topic | undefined {
  const list = getTopicsForCourse(courseId);
  return list.find(t => t.topicNumber === topicNumber);
}

export function getTopicsForUnit(courseId: CourseId, unitNumber: number): Topic[] {
  const list = getTopicsForCourse(courseId);
  return list.filter(t => t.unitNumber === unitNumber);
}

export function getTopicById(id: string): Topic | undefined {
  const parts = id.split('-');
  if (parts.length >= 2) {
    const courseId = parts[0] as CourseId;
    const num = parseInt(parts[1], 10);
    return getTopic(courseId, num);
  }
  return undefined;
}
