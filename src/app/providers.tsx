'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
} 