'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [tab, setTab] = useState<'signin' | 'signup'>(
    params.get('tab') === 'signup' ? 'signup' : 'signin'
  );
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = tab === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
    const body = tab === 'signin'
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong'); return; }
      router.push('/dashboard');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-brand-600 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{fontFamily:'var(--font-display)'}} className="text-2xl font-bold text-ink">LearnHub</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-gray-100">
            {(['signin', 'signup'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); }}
                className={`py-4 text-sm font-semibold transition-all duration-200 ${tab === t ? 'text-brand-600 border-b-2 border-brand-500 bg-brand-50/50' : 'text-ink-muted hover:text-ink'}`}>
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div className="p-8">
            <h2 style={{fontFamily:'var(--font-display)'}} className="text-2xl font-bold text-ink mb-1">
              {tab === 'signin' ? 'Welcome back!' : 'Start learning today'}
            </h2>
            <p className="text-ink-muted text-sm mb-6">
              {tab === 'signin' ? 'Sign in to continue your learning journey.' : 'Create your free account and explore courses.'}
            </p>

            {/* Demo credentials hint */}
            {tab === 'signin' && (
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 mb-5 text-sm">
                <p className="font-semibold text-brand-700 mb-1">🎯 Demo Account</p>
                <p className="text-brand-600">Email: <strong>demo@learnhub.com</strong></p>
                <p className="text-brand-600">Password: <strong>password</strong></p>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {tab === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
                  <input type="text" placeholder="Arjun Sharma" required value={form.name}
                    onChange={e => update('name', e.target.value)} className="input-field"/>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
                <input type="email" placeholder="you@example.com" required value={form.email}
                  onChange={e => update('email', e.target.value)} className="input-field"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
                <input type="password" placeholder={tab === 'signup' ? 'Min 6 characters' : '••••••••'} required value={form.password}
                  onChange={e => update('password', e.target.value)} className="input-field"/>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading && (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                )}
                {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-ink-muted mt-6">
              {tab === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => { setTab(tab === 'signin' ? 'signup' : 'signin'); setError(''); }}
                className="text-brand-600 font-semibold hover:underline">
                {tab === 'signin' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}
