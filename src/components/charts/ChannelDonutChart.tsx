'use client';

import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend,
  TooltipProps
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardCard } from '../ui/DashboardCard';

// Define color palette
const COLORS = ['#3b82f6', '#4f46e5', '#8b5cf6', '#ec4899', '#10b981', '#0ea5e9'];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: payload[0].payload.fill }}
          />
          <p className="font-medium text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
        </div>
        <p className="text-lg font-semibold mt-1 text-gray-900 dark:text-white">
          {payload[0].value}%
        </p>
      </motion.div>
    );
  }
  return null;
};

interface ChannelDonutChartProps {
  data: Array<{
    channel: string;
    value: number;
  }>;
  isLoading?: boolean;
  standalone?: boolean;
}

export function ChannelDonutChart({ data, isLoading = false, standalone = false }: ChannelDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const dataWithColors = data.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length],
  }));

  // Custom legend with animations
  const CustomLegend = () => (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {dataWithColors.map((entry, index) => (
        <motion.div 
          key={index}
          whileHover={{ scale: 1.02 }}
          className={`flex items-center text-sm p-2 rounded-lg transition-colors duration-200 ${
            activeIndex === index 
              ? 'bg-gray-100 dark:bg-gray-800' 
              : ''
          }`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-gray-700 dark:text-gray-300 flex-1 truncate">
            {entry.channel}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {entry.value}%
          </span>
        </motion.div>
      ))}
    </div>
  );

  // If this is a standalone chart, it needs its own wrapper
  if (standalone) {
    return (
      <div className="h-full w-full bg-white dark:bg-gray-900 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="70%" className="z-20">
          <PieChart>
            <Pie
              data={dataWithColors}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              animationDuration={1000}
              animationBegin={0}
              stroke="#ffffff"
              strokeWidth={2}
              style={{ visibility: 'visible', display: 'block' }}
            >
              {dataWithColors.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill} 
                  stroke={activeIndex === index ? '#fff' : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dataWithColors[activeIndex].channel}
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {dataWithColors[activeIndex].value}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <CustomLegend />
      </div>
    );
  }

  return (
    <DashboardCard 
      title="Revenue by Channel" 
      isLoading={isLoading}
      onRefresh={() => {}}
      onExport={() => {}}
    >
      <div className="h-64">
        {isLoading ? (
          <div className="h-full w-full bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        ) : (
          <div className="w-full h-full bg-white dark:bg-gray-900 p-2 rounded-lg">
            <ResponsiveContainer width="100%" height="70%" className="z-20">
              <PieChart>
                <Pie
                  data={dataWithColors}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  animationDuration={1000}
                  animationBegin={0}
                  stroke="#ffffff"
                  strokeWidth={2}
                  style={{ visibility: 'visible', display: 'block' }}
                >
                  {dataWithColors.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill} 
                      stroke={activeIndex === index ? '#fff' : 'none'}
                      strokeWidth={activeIndex === index ? 2 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            <AnimatePresence>
              {activeIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center mb-4"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {dataWithColors[activeIndex].channel}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {dataWithColors[activeIndex].value}%
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <CustomLegend />
          </div>
        )}
      </div>
    </DashboardCard>
  );
} 