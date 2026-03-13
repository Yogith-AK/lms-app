import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LearnHub — Learn Anything, Anytime',
  description: 'A modern learning platform with expert-led video courses in programming, math, science, and more.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
