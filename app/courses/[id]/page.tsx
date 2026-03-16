'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Course, AuthUser } from '@/types';

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [courseRes, meRes] = await Promise.all([
        fetch(`/api/courses/${id}`),
        fetch('/api/auth/me'),
      ]);
      const courseData = await courseRes.json();
      const meData = await meRes.json();
      if (courseData.course) {
        setCourse(courseData.course);
        if (meData.user) {
          setUser(meData.user);
          setEnrolled(meData.user.enrolledCourses.includes(id));
        }
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleEnroll = async () => {
  if (!user) { router.push('/auth'); return; }
  setEnrolling(true);
  const res = await fetch(`/api/courses/${id}/enroll`, { method: 'POST' });
  const data = await res.json();
  if (res.ok || data.enrolled) {
    setEnrolled(true);
    // Force refresh user data
    const meRes = await fetch('/api/auth/me');
    const meData = await meRes.json();
    if (meData.user) setUser(meData.user);
  }
  setEnrolling(false);
};

  if (loading) return (
    <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin"/>
      </div>
    </>
  );

  if (!course) return (
    <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center pt-16 text-center">
        <div>
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-ink">Course not found</h2>
          <Link href="/courses" className="text-brand-500 mt-4 inline-block hover:underline">Browse all courses</Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar/>
      <main className="pt-16 min-h-screen">
        {/* Hero */}
        <div className="bg-ink px-4 py-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 animate-slide-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="badge bg-brand-500/20 text-brand-300 text-xs">{course.category}</span>
                <span className={`badge text-xs ${levelColors[course.level]} !bg-opacity-20`}>{course.level}</span>
              </div>
              <h1 style={{fontFamily:'var(--font-display)'}} className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">{course.longDescription}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 20 20" fill="#f59e0b" className="w-4 h-4"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span className="text-amber-400 font-semibold">{course.rating}</span>
                </span>
                <span>·</span>
                <span>{course.studentsCount.toLocaleString()} students</span>
                <span>·</span>
                <span>{course.lessonsCount} lessons</span>
                <span>·</span>
                <span>{course.duration}</span>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                  {course.instructor[0]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{course.instructor}</p>
                  <p className="text-gray-400 text-xs">{course.instructorBio}</p>
                </div>
              </div>
            </div>

            {/* Enroll card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-in-right">
              <div className="relative h-44 bg-gray-100">
                <Image src={course.thumbnail} alt={course.title} fill className="object-cover" unoptimized/>
              </div>
              <div className="p-6">
                <p style={{fontFamily:'var(--font-display)'}} className="text-3xl font-bold text-ink mb-1">Free</p>
                <p className="text-ink-muted text-sm mb-5">Full course access, forever.</p>
                {enrolled ? (
                  <div>
                    <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-semibold text-center mb-3">
                      ✓ You're enrolled
                    </div>
                    <Link href={`/courses/${id}/learn/${course.lessons[0].id}`} className="btn-primary w-full block text-center"
                      onClick={(e) => {
                        if (!user) { e.preventDefault(); router.push('/auth'); }
                      }}>
                      Continue Learning →
                    </Link>
                  </div>
                ) : (
                  <button onClick={handleEnroll} disabled={enrolling}
                    className="btn-primary w-full disabled:opacity-60">
                    {enrolling ? 'Enrolling...' : 'Enroll Now — Free'}
                  </button>
                )}

                <ul className="mt-5 space-y-2 text-sm text-ink-muted">
                  {[
                    `${course.lessonsCount} video lessons`,
                    `Total ${course.duration} of content`,
                    'Learn at your own pace',
                    'Certificate on completion',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg viewBox="0 0 20 20" fill="#f97316" className="w-4 h-4 shrink-0"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons list */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="lg:max-w-2xl">
            <h2 style={{fontFamily:'var(--font-display)'}} className="text-2xl font-bold text-ink mb-6">Course Curriculum</h2>
            <div className="space-y-3">
              {course.lessons.map((lesson, index) => {
                const isCompleted = user?.completedLessons.includes(lesson.id);
                return (
                  <div key={lesson.id}
                    className={`bg-white rounded-xl p-4 border transition-all duration-200 ${enrolled ? 'hover:border-brand-300 hover:shadow-sm cursor-pointer group' : 'border-gray-100'}`}
                    onClick={() => enrolled && router.push(`/courses/${id}/learn/${lesson.id}`)}>
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-brand-100 text-brand-600'}`}>
                        {isCompleted ? (
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        ) : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${enrolled ? 'group-hover:text-brand-600 transition-colors' : ''} text-ink`}>
                          {lesson.title}
                        </p>
                        <p className="text-ink-muted text-xs mt-0.5">{lesson.description}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-ink-muted shrink-0">
                        <span>{lesson.duration}</span>
                        {enrolled ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-brand-400">
                            <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-300">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-10 lg:max-w-2xl">
            <p className="text-sm font-semibold text-ink-muted mb-3">Topics covered</p>
            <div className="flex flex-wrap gap-2">
              {course.tags.map(tag => (
                <span key={tag} className="badge bg-cream-dark text-ink-muted text-xs">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
