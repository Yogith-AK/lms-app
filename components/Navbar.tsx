'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AuthUser } from '@/types';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => setUser(d.user));
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const signOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    setUser(null);
    router.push('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-brand-600 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{fontFamily:'var(--font-display)'}} className="text-xl font-bold text-ink">LearnHub</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="animated-underline text-ink-muted hover:text-ink font-medium text-sm transition-colors">Courses</Link>
            {user && <Link href="/dashboard" className="animated-underline text-ink-muted hover:text-ink font-medium text-sm transition-colors">Dashboard</Link>}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                  <span className="text-brand-600 font-bold text-sm">{user.name[0].toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-ink">{user.name.split(' ')[0]}</span>
                <button onClick={signOut} className="text-sm text-ink-muted hover:text-ink transition-colors px-3 py-1.5 rounded-lg hover:bg-cream-dark">
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors px-3 py-1.5">Sign in</Link>
                <Link href="/auth?tab=signup" className="btn-primary !py-2 !px-4 text-sm">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-cream-dark transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              {menuOpen
                ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 animate-fade-in">
          <Link href="/courses" onClick={() => setMenuOpen(false)} className="block text-ink font-medium py-2">Courses</Link>
          {user && <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block text-ink font-medium py-2">Dashboard</Link>}
          <hr className="border-gray-100"/>
          {user ? (
            <button onClick={signOut} className="block text-red-500 font-medium py-2">Sign out</button>
          ) : (
            <>
              <Link href="/auth" onClick={() => setMenuOpen(false)} className="block text-ink font-medium py-2">Sign in</Link>
              <Link href="/auth?tab=signup" onClick={() => setMenuOpen(false)} className="btn-primary block text-center">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
