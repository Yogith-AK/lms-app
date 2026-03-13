'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { AuthUser, Course } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [meRes, coursesRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/courses'),
      ]);
      const meData = await meRes.json();
      const coursesData = await coursesRes.json();

      if (!meData.user) { router.push('/auth'); return; }
      setUser(meData.user);

      const all: Course[] = coursesData.courses;
      setAllCourses(all);
      setEnrolledCourses(all.filter((c: Course) => meData.user.enrolledCourses.includes(c.id)));
      setLoading(false);
    };
    load();
  }, [router]);

  const getProgress = (courseId: string, course: Course) => {
    if (!user || !course.lessons) return 0;
    // Estimate lesson IDs from naming convention
    const completed = user.completedLessons.filter(l => l.startsWith(`lesson_${courseId.split('_')[1]}`));
    return Math.round((completed.length / (course.lessonsCount || 1)) * 100);
  };

  const suggested = allCourses.filter(c => !user?.enrolledCourses.includes(c.id)).slice(0, 2);

  if (loading) return (
    <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin mx-auto mb-4"/>
          <p className="text-ink-muted font-medium">Loading your dashboard...</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar/>
      <main className="pt-16 min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center shadow-sm">
                <span className="text-brand-600 font-bold text-2xl">{user?.name[0].toUpperCase()}</span>
              </div>
              <div>
                <h1 style={{fontFamily:'var(--font-display)'}} className="text-2xl font-bold text-ink">
                  Welcome back, {user?.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-ink-muted text-sm mt-0.5">
                  {enrolledCourses.length > 0
                    ? `You're enrolled in ${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''}. Keep it up!`
                    : 'Start your learning journey today.'}
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: 'Courses Enrolled', value: enrolledCourses.length, icon: '📚' },
                { label: 'Lessons Completed', value: user?.completedLessons.length ?? 0, icon: '✅' },
                { label: 'Learning Streak', value: '3 days 🔥', icon: '' },
              ].map((s, i) => (
                <div key={i} className="bg-cream rounded-xl p-4 text-center">
                  {s.icon && <div className="text-2xl mb-1">{s.icon}</div>}
                  <p style={{fontFamily:'var(--font-display)'}} className="text-2xl font-bold text-ink">{s.value}</p>
                  <p className="text-xs text-ink-muted font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* My Courses */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{fontFamily:'var(--font-display)'}} className="text-2xl font-bold text-ink">My Courses</h2>
              <Link href="/courses" className="text-brand-500 text-sm font-semibold hover:text-brand-600 transition-colors">Browse more →</Link>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-brand-200">
                <div className="text-5xl mb-4">📖</div>
                <h3 className="text-lg font-bold text-ink mb-2">No courses yet!</h3>
                <p className="text-ink-muted text-sm mb-6">Explore our catalog and enroll in your first course.</p>
                <Link href="/courses" className="btn-primary">Explore Courses</Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    enrolled
                    progress={getProgress(course.id, course)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Suggested Courses */}
          {suggested.length > 0 && (
            <section>
              <h2 style={{fontFamily:'var(--font-display)'}} className="text-2xl font-bold text-ink mb-6">Suggested for You</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {suggested.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
