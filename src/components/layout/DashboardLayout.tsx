'use client';

import { useState, ReactNode, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';
import { useHotkeys } from 'react-hotkeys-hook';
import toast from 'react-hot-toast';


interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Toggle keyboard shortcuts modal
        alert('Keyboard shortcuts:\n\n? - Show this help\nD - Toggle dark mode\n+ - Add widget');
      }
      
      if (e.key === 'd' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Toggle dark mode
        document.documentElement.classList.toggle('dark');
      }
      
      if (e.key === '+' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Open add widget modal
        setShowAddWidgetModal(true);
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [setShowAddWidgetModal]);

  useHotkeys('n', () => {
    setShowAddWidgetModal(true);
    toast.success('Add Widget shortcut activated (N)');
  });

  useHotkeys('/', () => {
    // Focus the search input
    const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      toast.success('Search shortcut activated (/)');
    }
  });

  useHotkeys('t', () => {
    // Toggle theme - handled in Header
    toast.success('Theme toggle shortcut activated (T)');
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 relative">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-50 dark:opacity-20 pointer-events-none"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%',
          backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.1), transparent 30%), radial-gradient(circle at 90% 20%, rgba(124, 58, 237, 0.1), transparent 30%), radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1), transparent 30%)'
        }}
      />
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></motion.div>
      )}
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden relative z-10">
        <Header onAddWidget={() => setShowAddWidgetModal(true)} />
        
        <motion.main 
          className="relative flex-1 overflow-y-auto focus:outline-none px-4 py-6 md:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto">
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {children}
            </motion.div>
            
            {/* Bottom decorative gradient */}
            <motion.div 
              className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none z-0 opacity-60"
              style={{
                background: 'linear-gradient(to top, rgba(59, 130, 246, 0.05), transparent)',
              }}
            />
          </div>
        </motion.main>
      </div>

      {/* Keyboard shortcuts help tooltip */}
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
        Press <kbd className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">?</kbd> for keyboard shortcuts
      </div>
    </div>
  );
} 