import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/lib/db';

export default function HomePage() {
  const featured = courses.slice(0, 4);

  const stats = [
    { value: '1,20,000+', label: 'Students Learning' },
    { value: '50+', label: 'Expert Courses' },
    { value: '4.8★', label: 'Average Rating' },
    { value: '100%', label: 'Free to Start' },
  ];

  const categories = [
    { name: 'Programming', icon: '💻', count: 12 },
    { name: 'Mathematics', icon: '📐', count: 8 },
    { name: 'Science', icon: '🔬', count: 10 },
    { name: 'Web Dev', icon: '🌐', count: 9 },
    { name: 'Data Science', icon: '📊', count: 7 },
    { name: 'Design', icon: '🎨', count: 5 },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Hero */}
        <section className="hero-gradient pt-28 pb-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <span className="badge bg-brand-100 text-brand-700 mb-4 text-sm">🚀 India's Fastest Growing LMS</span>
                <h1 style={{fontFamily:'var(--font-display)'}} className="text-5xl sm:text-6xl font-extrabold text-ink leading-tight mb-6">
                  Learn Without<br/>
                  <span className="text-brand-500">Limits.</span>
                </h1>
                <p className="text-ink-muted text-lg leading-relaxed mb-8 max-w-lg">
                  Expert-led video courses in programming, mathematics, science and more.
                  Learn at your own pace, anytime, anywhere.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/courses" className="btn-primary text-center text-base">
                    Explore Courses →
                  </Link>
                  <Link href="/auth?tab=signup" className="btn-secondary text-center text-base">
                    Join for Free
                  </Link>
                </div>
              </div>

              {/* Hero visual */}
              <div className="hidden lg:block relative animate-fade-in">
                <div className="relative w-full h-96">
                  {/* Floating cards */}
                  <div className="absolute top-0 right-8 bg-white rounded-2xl shadow-lg p-4 w-52 animate-slide-up" style={{animationDelay:'0.1s'}}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-xl">🐍</div>
                      <div>
                        <p className="font-semibold text-sm text-ink">Python Basics</p>
                        <p className="text-xs text-ink-muted">8 lessons · 12h</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-brand-100 rounded-full">
                      <div className="h-full bg-brand-500 rounded-full w-3/4"/>
                    </div>
                    <p className="text-xs text-brand-600 font-semibold mt-1">75% complete</p>
                  </div>

                  <div className="absolute top-32 left-0 bg-white rounded-2xl shadow-lg p-4 w-48 animate-slide-up" style={{animationDelay:'0.2s'}}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg">📐</div>
                      <p className="font-semibold text-sm text-ink">Math Mastery</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {'★★★★★'.split('').map((s,i) => <span key={i} className="text-sm">{s}</span>)}
                    </div>
                    <p className="text-xs text-ink-muted mt-1">4.9 · 41,200 students</p>
                  </div>

                  <div className="absolute bottom-16 right-16 bg-brand-500 rounded-2xl shadow-lg p-4 text-white animate-slide-up" style={{animationDelay:'0.3s'}}>
                    <p className="text-3xl font-bold">1.2L+</p>
                    <p className="text-brand-100 text-sm font-medium">Active Learners</p>
                  </div>

                  <div className="absolute bottom-0 left-8 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3 animate-slide-up" style={{animationDelay:'0.4s'}}>
                    <div className="flex -space-x-2">
                      {['#f97316','#8b5cf6','#06b6d4','#10b981'].map((c,i) => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor:c}}>
                          {['A','B','C','D'][i]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-ink">New students joined</p>
                      <p className="text-xs text-ink-muted">just now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-brand-500 py-10 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center text-white">
                <p style={{fontFamily:'var(--font-display)'}} className="text-3xl font-bold">{s.value}</p>
                <p className="text-brand-100 text-sm mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 bg-cream">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title text-center mb-2">Browse by Category</h2>
            <p className="text-ink-muted text-center mb-10">Pick a subject and start learning today</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link key={cat.name} href={`/courses?category=${cat.name}`}
                  className="bg-white rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <p className="font-semibold text-sm text-ink group-hover:text-brand-600 transition-colors">{cat.name}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{cat.count} courses</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="section-title mb-2">Featured Courses</h2>
                <p className="text-ink-muted">Handpicked by our expert educators</p>
              </div>
              <Link href="/courses" className="text-brand-500 font-semibold text-sm hover:text-brand-600 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-4 bg-ink">
          <div className="max-w-3xl mx-auto text-center">
            <h2 style={{fontFamily:'var(--font-display)'}} className="text-4xl font-bold text-white mb-4">
              Ready to start learning?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join over 1.2 lakh students already learning on LearnHub. No credit card needed.
            </p>
            <Link href="/auth?tab=signup" className="btn-primary text-base">
              Start Learning for Free →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-ink-soft py-8 px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{fontFamily:'var(--font-display)'}} className="text-white font-bold">LearnHub</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 LearnHub. Built with ❤️ for learners everywhere.</p>
        </footer>
      </main>
    </>
  );
}
