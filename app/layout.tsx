import type { Metadata } from 'next';
import './globals.css';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'LearnHub — Learn Anything, Anytime',
  description: 'A modern learning platform with expert-led video courses.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}