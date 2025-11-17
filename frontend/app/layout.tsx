import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'RepRise - Frontend',
  description: 'A Next.js starter app for RepRise'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-50 text-gray-900">{children}</main>
      </body>
    </html>
  );
}
