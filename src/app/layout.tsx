import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sales Dashboard - Ultimate UI/UX Experience",
  description: "A modern sales dashboard with premium UI/UX features",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--background-start-rgb)",
                color: "var(--foreground-rgb)",
                borderRadius: "8px",
                fontSize: "0.875rem",
              }
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
