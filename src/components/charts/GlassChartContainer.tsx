import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface GlassChartContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  glassTint?: 'blue' | 'purple' | 'green' | 'pink' | 'amber' | 'none';
}

const GlassChartContainer = ({
  children,
  title,
  subtitle,
  className = '',
  glassTint = 'blue',
}: GlassChartContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Glass tint colors
  const tintColors = {
    blue: 'from-blue-500/10 to-blue-500/5',
    purple: 'from-purple-500/10 to-purple-500/5',
    green: 'from-emerald-500/10 to-emerald-500/5',
    pink: 'from-pink-500/10 to-pink-500/5',
    amber: 'from-amber-500/10 to-amber-500/5',
    none: '',
  };

  // Border colors
  const borderColors = {
    blue: 'border-blue-200 dark:border-blue-900/30',
    purple: 'border-purple-200 dark:border-purple-900/30',
    green: 'border-emerald-200 dark:border-emerald-900/30',
    pink: 'border-pink-200 dark:border-pink-900/30',
    amber: 'border-amber-200 dark:border-amber-900/30',
    none: 'border-gray-200 dark:border-gray-800',
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-lg 
                 bg-white/80 dark:bg-gray-900/70 border p-5
                 ${borderColors[glassTint]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      {glassTint !== 'none' && (
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${tintColors[glassTint]} pointer-events-none z-0`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHovered ? 0.8 : 0.5 }}
        />
      )}

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-[200%] h-[200%] absolute -top-[50%] -left-[50%]"
          initial={{ rotate: 45, x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 1.5, repeat: 0, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20">
        <div className="mb-4">
          <motion.h3
            className="text-lg font-semibold text-gray-900 dark:text-white"
            animate={{ 
              color: isHovered ? '#3b82f6' : '#1f2937', 
              y: isHovered ? -2 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>

        <motion.div
          className="w-full h-full relative"
          animate={{ 
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GlassChartContainer; 