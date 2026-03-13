export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  enrolledCourses: string[];
  completedLessons: string[];
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoId: string; // YouTube video ID
  duration: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorBio: string;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  rating: number;
  studentsCount: number;
  lessons: Lesson[];
  tags: string[];
  color: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  completedLessons: string[];
}
