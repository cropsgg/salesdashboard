'use client';

import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  TooltipProps,
  ComposedChart,
  Line,
  ReferenceArea
} from 'recharts';
import { motion } from 'framer-motion';
import { DashboardCard } from '../ui/DashboardCard';
import { formatCurrency } from '@/utils/formatters';
import GlassChartContainer from './GlassChartContainer';
import AnimatedChart from './AnimatedChart';

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <div className="mt-2 space-y-1">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.name}: {formatCurrency(item.value as number)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  return null;
};

interface RevenueChartProps {
  data: {
    month: string;
    revenue: number;
    target: number;
    lastYear: number;
  }[];
  isLoading?: boolean;
}

export function RevenueChart({ data, isLoading = false }: RevenueChartProps) {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const [showTarget, setShowTarget] = useState(true);
  const [showLastYear, setShowLastYear] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Custom legend that acts as toggles
  const CustomLegend = () => {
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-2">
        <div 
          className="flex items-center text-sm cursor-pointer"
          onClick={() => setShowTarget(!showTarget)}
        >
          <motion.div 
            animate={{ opacity: showTarget ? 1 : 0.5 }}
            className="w-3 h-3 rounded-full mr-2 bg-blue-500" 
          />
          <span className={showTarget ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}>
            Target
          </span>
        </div>
        
        <div 
          className="flex items-center text-sm cursor-pointer"
          onClick={() => setShowLastYear(!showLastYear)}
        >
          <motion.div 
            animate={{ opacity: showLastYear ? 1 : 0.5 }}
            className="w-3 h-3 rounded-full mr-2 bg-gray-400" 
          />
          <span className={showLastYear ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}>
            Last Year
          </span>
        </div>
      </div>
    );
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${value / 1000}k`;
    }
    return `$${value}`;
  };

  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    
    if (active && payload && payload.length) {
      return (
        <motion.div 
          className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-medium text-gray-800 dark:text-white mb-1">{payload[0].payload.month}</p>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Revenue:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">${formatCurrency(payload[0].value)}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Target:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">${formatCurrency(payload[1].value)}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-500 mr-2"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Last Year:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">${formatCurrency(payload[2].value)}</span>
            </div>
          </div>
        </motion.div>
      );
    }
    
    return null;
  };

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.revenue));
    const dataMin = Math.min(...data.map((i) => i.revenue));
    
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

  return (
    <DashboardCard 
      title="Revenue Trend" 
      isLoading={isLoading}
      onRefresh={() => {}}
      onExport={() => {}}
    >
      <div className="h-80 relative">
        {isLoading ? (
          <div className="h-full w-full bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        ) : (
          <div className="w-full h-full bg-white dark:bg-gray-900 p-2 rounded-lg">
            <ResponsiveContainer width="100%" height="100%" className="z-10">
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                onMouseMove={(e) => {
                  if (e.activeTooltipIndex !== undefined) {
                    setActiveIndex(e.activeTooltipIndex);
                    setHoveredMonth(data[e.activeTooltipIndex]?.month);
                  }
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                  setHoveredMonth(null);
                }}
                style={{ visibility: 'visible', display: 'block' }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#94A3B8' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  tickFormatter={formatYAxis}
                  tick={{ fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={renderTooltip} cursor={{ opacity: 0.1 }} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: 20 }}
                  formatter={(value) => <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{value}</span>}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ 
                    r: 8, 
                    strokeWidth: 2, 
                    stroke: '#fff' 
                  }}
                  fill="url(#colorRevenue)" 
                  name="Revenue"
                />
                {showTarget && (
                  <Line 
                    type="linear" 
                    dataKey="target" 
                    stroke="#7C3AED" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={{ r: 3, fill: '#7C3AED', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ 
                      r: 6, 
                      strokeWidth: 2, 
                      stroke: '#fff' 
                    }}
                    name="Target"
                  />
                )}
                {showLastYear && (
                  <Line 
                    type="monotone" 
                    dataKey="lastYear" 
                    stroke="#94A3B8" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ 
                      r: 6, 
                      strokeWidth: 2, 
                      stroke: '#fff' 
                    }}
                    name="Last Year"
                  />
                )}
                {/* Animated highlights for active month */}
                {activeIndex !== null && (
                  <ReferenceArea 
                    x1={data[activeIndex]?.month} 
                    x2={data[activeIndex]?.month}
                    strokeOpacity={0.3} 
                    fill="#3B82F6" 
                    fillOpacity={0.1}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
            <CustomLegend />
            
            {/* Highlighted Month Info */}
            {hoveredMonth && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400"
              >
                Hover over the chart to see detailed revenue information
              </motion.div>
            )}
          </div>
        )}
      </div>
    </DashboardCard>
  );
} 