import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';

interface Props {
  course: Course;
  enrolled?: boolean;
  progress?: number;
}

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
};

export default function CourseCard({ course, enrolled, progress }: Props) {
  return (
    <Link href={`/courses/${course.id}`} className="card group block cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
        {/* Category badge */}
        <span className="absolute top-3 left-3 badge bg-white/90 text-ink-soft text-xs font-semibold">
          {course.category}
        </span>
        {enrolled && (
          <span className="absolute top-3 right-3 badge bg-brand-500 text-white text-xs">
            ✓ Enrolled
          </span>
        )}
        {/* Duration */}
        <span className="absolute bottom-3 right-3 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-lg">
          {course.duration}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`badge text-xs ${levelColors[course.level]}`}>{course.level}</span>
          <div className="flex items-center gap-1 text-amber-500 text-sm">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="font-semibold text-ink">{course.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-ink text-base leading-snug mb-1 group-hover:text-brand-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-ink-muted text-sm leading-relaxed mb-3 line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-2 text-xs text-ink-muted mb-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span>{course.instructor}</span>
          <span className="mx-1">·</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <span>{course.lessonsCount} lessons</span>
        </div>

        {/* Progress bar if enrolled */}
        {enrolled && progress !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-ink-muted mb-1">
              <span>Progress</span>
              <span className="font-semibold text-brand-600">{progress}%</span>
            </div>
            <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full progress-fill" style={{ width: `${progress}%` }}/>
            </div>
          </div>
        )}

        {/* Students count */}
        {!enrolled && (
          <p className="text-xs text-ink-muted">
            {course.studentsCount.toLocaleString()} students enrolled
          </p>
        )}
      </div>
    </Link>
  );
}
