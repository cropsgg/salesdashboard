'use client';

import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiDownload, FiMaximize } from 'react-icons/fi';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  onRefresh?: () => void;
  onExport?: () => void;
}

export function DashboardCard({
  title,
  children,
  isLoading = false,
  className = '',
  onRefresh,
  onExport,
}: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
        
        <div className="flex items-center gap-1">
          {isLoading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="text-blue-500 w-4 h-4"
            >
              <FiRefreshCw size={16} />
            </motion.div>
          )}
          
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiRefreshCw size={16} />
            </button>
          )}
          
          {onExport && (
            <button 
              onClick={onExport}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiDownload size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
} 