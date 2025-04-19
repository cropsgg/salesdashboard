'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiTrendingUp, FiPieChart, FiActivity } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function AnalyticsPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Sample data for charts
  const metrics = [
    { title: 'Total Views', value: '24.5K', increase: '+12.3%', icon: <FiBarChart2 size={24} /> },
    { title: 'Conversion Rate', value: '5.2%', increase: '+2.1%', icon: <FiActivity size={24} /> },
    { title: 'Average Time', value: '3m 42s', increase: '+0.8%', icon: <FiTrendingUp size={24} /> },
    { title: 'Bounce Rate', value: '42%', increase: '-3.4%', icon: <FiPieChart size={24} /> },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">View detailed performance metrics and insights.</p>
      </div>
      
      {/* Metrics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 dark:text-gray-400">{metric.title}</span>
              <div className="w-10 h-10 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400">
                {metric.icon}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              <span className={`text-sm font-medium ${metric.increase.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {metric.increase}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Overview</h2>
          {/* Chart placeholder */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Traffic chart will be displayed here</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Funnel</h2>
          {/* Chart placeholder */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Conversion funnel chart will be displayed here</p>
          </div>
        </motion.div>
      </div>
      
      {/* Activity Section */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="min-w-10 h-10 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400 mr-3">
                <FiActivity size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">User activity {i + 1}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Activity description and details would appear here
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {i + 1} hour{i !== 0 ? 's' : ''} ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
} 