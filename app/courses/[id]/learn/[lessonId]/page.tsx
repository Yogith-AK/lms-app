'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';
import { Course, AuthUser, Lesson } from '@/types';

export default function LearnPage() {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [courseRes, meRes] = await Promise.all([
        fetch(`/api/courses/${id}`),
        fetch('/api/auth/me'),
      ]);
      const courseData = await courseRes.json();
      const meData = await meRes.json();
      if (!meData.user) { router.push('/auth'); return; }
      if (!courseData.course) { router.push('/courses'); return; }
      if (!meData.user.enrolledCourses.includes(id)) { router.push(`/courses/${id}`); return; }

      setCourse(courseData.course);
      setUser(meData.user);
      setCompletedLessons(meData.user.completedLessons);
      const lesson = courseData.course.lessons.find((l: Lesson) => l.id === lessonId);
      setCurrentLesson(lesson || courseData.course.lessons[0]);
    };
    load();
  }, [id, lessonId, router]);

  const markComplete = async () => {
    if (!currentLesson || completedLessons.includes(currentLesson.id)) return;
    setMarking(true);
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: currentLesson.id }),
    });
    const data = await res.json();
    if (res.ok) setCompletedLessons(data.completedLessons);
    setMarking(false);
  };

  const goToLesson = (lesson: Lesson) => {
    router.push(`/courses/${id}/learn/${lesson.id}`);
  };

  const goNext = () => {
    if (!course || !currentLesson) return;
    const idx = course.lessons.findIndex(l => l.id === currentLesson.id);
    if (idx < course.lessons.length - 1) goToLesson(course.lessons[idx + 1]);
  };

  const goPrev = () => {
    if (!course || !currentLesson) return;
    const idx = course.lessons.findIndex(l => l.id === currentLesson.id);
    if (idx > 0) goToLesson(course.lessons[idx - 1]);
  };

  if (!course || !currentLesson) return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="w-10 h-10 border-4 border-brand-300 border-t-brand-500 rounded-full animate-spin"/>
    </div>
  );

  const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id);
  const completedCount = completedLessons.filter(l =>
    course.lessons.some(cl => cl.id === l)
  ).length;
  const progress = Math.round((completedCount / course.lessons.length) * 100);
  const isCompleted = completedLessons.includes(currentLesson.id);

  return (
    <div className="h-screen flex flex-col bg-gray-950 overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <Link href={`/courses/${id}`} className="text-gray-400 hover:text-white transition-colors p-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <div className="h-5 w-px bg-gray-700"/>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{fontFamily:'var(--font-display)'}} className="text-white font-bold text-sm hidden sm:block">LearnHub</span>
          </div>
          <div className="h-5 w-px bg-gray-700 hidden sm:block"/>
          <p className="text-gray-300 text-sm font-medium hidden sm:block truncate max-w-[200px] lg:max-w-sm">
            {course.title}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-28 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full progress-fill" style={{width:`${progress}%`}}/>
            </div>
            <span className="text-gray-400 text-xs font-medium">{progress}%</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 max-w-4xl mx-auto">
            {/* Video */}
            <VideoPlayer videoId={currentLesson.videoId} title={currentLesson.title} />

            {/* Lesson info */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-brand-400 text-sm font-medium">
                    Lesson {currentIndex + 1} of {course.lessons.length}
                  </span>
                  {isCompleted && (
                    <span className="badge bg-green-900/50 text-green-400 text-xs">✓ Completed</span>
                  )}
                </div>
                <h1 style={{fontFamily:'var(--font-display)'}} className="text-white text-2xl font-bold">
                  {currentLesson.title}
                </h1>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">{currentLesson.description}</p>
              </div>

              <button onClick={markComplete} disabled={isCompleted || marking}
                className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-green-900/40 text-green-400 border border-green-800 cursor-default'
                    : 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow-md active:scale-95'
                } disabled:opacity-60`}>
                {marking ? 'Saving...' : isCompleted ? '✓ Completed' : 'Mark as Complete'}
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
              <button onClick={goPrev} disabled={currentIndex === 0}
                className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous Lesson
              </button>
              <span className="text-gray-600 text-xs">{currentIndex + 1} / {course.lessons.length}</span>
              <button onClick={goNext} disabled={currentIndex === course.lessons.length - 1}
                className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium">
                Next Lesson
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col overflow-hidden shrink-0 hidden lg:flex">
            <div className="p-4 border-b border-gray-800">
              <p className="text-white font-semibold text-sm">Course Content</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full progress-fill" style={{width:`${progress}%`}}/>
                </div>
                <span className="text-gray-400 text-xs">{completedCount}/{course.lessons.length}</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {course.lessons.map((lesson, idx) => {
                const done = completedLessons.includes(lesson.id);
                const active = lesson.id === currentLesson.id;
                return (
                  <button key={lesson.id} onClick={() => goToLesson(lesson)}
                    className={`w-full lesson-item text-left ${active ? 'active' : ''} ${done ? 'completed' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      done ? 'bg-green-900/60 text-green-400'
                        : active ? 'bg-brand-500 text-white'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      {done ? (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      ) : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold truncate ${active ? 'text-brand-400' : done ? 'text-green-400' : 'text-gray-300'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">{lesson.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
