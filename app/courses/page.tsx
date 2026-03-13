'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const CATEGORIES = ['All', 'Programming', 'Mathematics', 'Science', 'Web Dev'];

function CoursesContent() {
  const params = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filtered, setFiltered] = useState<Course[]>([]);
  const [level, setLevel] = useState('All');
  const [category, setCategory] = useState(params.get('category') || 'All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses').then(r => r.json()).then(d => {
      setCourses(d.courses);
      setFiltered(d.courses);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = courses;
    if (level !== 'All') result = result.filter(c => c.level === level);
    if (category !== 'All') result = result.filter(c => c.category === category);
    if (search.trim()) result = result.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(result);
  }, [level, category, search, courses]);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-ink py-14 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 style={{fontFamily:'var(--font-display)'}} className="text-4xl font-bold text-white mb-3">All Courses</h1>
            <p className="text-gray-400 text-lg mb-8">Expert-taught video courses for every skill level</p>
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search courses, topics, skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-ink placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-ink-muted">Level:</span>
              {LEVELS.map(l => (
                <button key={l} onClick={() => setLevel(l)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${level === l ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-ink-muted hover:bg-brand-50 hover:text-ink border border-gray-200'}`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-ink-muted">Category:</span>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${category === c ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-ink-muted hover:bg-brand-50 hover:text-ink border border-gray-200'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-ink-muted mb-6 font-medium">
            {loading ? 'Loading...' : `${filtered.length} course${filtered.length !== 1 ? 's' : ''} found`}
          </p>

          {/* Grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse"/>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-ink mb-2">No courses found</h3>
              <p className="text-ink-muted text-sm">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function CoursesPage() {
  return <Suspense><CoursesContent /></Suspense>;
}
