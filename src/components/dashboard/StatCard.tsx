'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FiArrowUp, FiArrowDown, FiMinus } from 'react-icons/fi';
import { DashboardCard } from '../ui/DashboardCard';
import Card3D from '../cards/Card3D';

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  icon?: ReactNode;
  iconColor?: string;
  iconBgColor?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  gradient?: string;
  onClick?: () => void;
  isPercentage?: boolean;
  isLoading?: boolean;
  decimals?: number;
  formatter?: (value: number) => string;
  // For backward compatibility with other versions of the component
  prefix?: string;
  suffix?: string;
  trend?: number;
  trendLabel?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  iconColor = 'text-blue-500',
  iconBgColor = 'bg-blue-100',
  valuePrefix = '',
  valueSuffix = '',
  gradient = 'from-blue-500 to-indigo-600',
  onClick,
  isPercentage = false,
  isLoading = false,
  decimals = 0,
  formatter,
  // Handle compatibility with other component versions
  prefix = '',
  suffix = '',
  trend,
  trendLabel,
}: StatCardProps) {
  // Use prefix/suffix as fallbacks if valuePrefix/valueSuffix aren't provided
  const displayPrefix = valuePrefix || prefix;
  const displaySuffix = valueSuffix || suffix;
  
  // Use change as fallback if trend is provided
  const displayChange = change !== undefined ? change : trend;
  
  // Determine if change is positive, negative, or neutral
  const changeType = displayChange ? (displayChange > 0 ? 'positive' : displayChange < 0 ? 'negative' : 'neutral') : 'neutral';
  
  // Color classes based on change type
  const changeColors = {
    positive: 'text-green-500 bg-green-100 dark:bg-green-900/20',
    negative: 'text-red-500 bg-red-100 dark:bg-red-900/20',
    neutral: 'text-gray-500 bg-gray-100 dark:bg-gray-800',
  };

  // Icon classes
  const iconClasses = `${iconColor} ${iconBgColor} dark:bg-opacity-20 p-3 rounded-lg`;
  
  // Determine gradient based on title (for variety)
  let cardGradient = gradient;
  if (title.includes('Revenue')) {
    cardGradient = 'from-blue-600 to-indigo-700';
  } else if (title.includes('Sales')) {
    cardGradient = 'from-indigo-600 to-purple-700';
  } else if (title.includes('Order')) {
    cardGradient = 'from-purple-600 to-pink-700';
  } else if (title.includes('Conversion')) {
    cardGradient = 'from-emerald-600 to-teal-700';
  }

  return (
    <Card3D 
      className="h-full w-full cursor-pointer"
      depth={20}
      backgroundColor="rgba(255, 255, 255, 0.9)"
      borderColor="rgba(255, 255, 255, 0.2)"
    >
      <div className="flex flex-col h-full" onClick={onClick}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {displayPrefix}
                {!isLoading && (
                  <CountUp 
                    end={value} 
                    decimals={decimals}
                    duration={1.5}
                    separator=","
                    preserveValue={true}
                    formattingFn={formatter}
                  />
                )}
                {isLoading && (
                  <div className="inline-block w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                )}
                {displaySuffix}
              </span>
            </div>
          </div>
          
          {icon && (
            <div className={`${iconClasses} rounded-lg`}>
              {icon}
            </div>
          )}
        </div>
        
        {displayChange !== undefined && (
          <div className="mt-auto">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                changeColors[changeType]
              }`}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mr-1"
              >
                {displayChange > 0 ? '↑' : displayChange < 0 ? '↓' : '•'}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {Math.abs(displayChange)}% {trendLabel || (displayChange > 0 ? 'increase' : displayChange < 0 ? 'decrease' : '')}
              </motion.span>
            </span>
          </div>
        )}
        
        {/* Background gradient element */}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cardGradient}`}
          animate={{ 
            width: ["0%", "100%"],
            opacity: [0, 1],
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </Card3D>
  );
} 