'use client';

import { ReactNode } from 'react';

interface ComponentsLayoutProps {
  children: ReactNode;
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 