'use client';

import { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useHotkeys } from 'react-hotkeys-hook';
import toast from 'react-hot-toast';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { ChannelDonutChart } from '@/components/charts/ChannelDonutChart';
import { ProductsTable } from '@/components/dashboard/ProductsTable';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { DashboardCard } from '@/components/ui/DashboardCard';

import { 
  kpiSummary, 
  revenueData, 
  revenueByChannel,
  productPerformance
} from '@/data/mockData';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Add a fix for Recharts rendering - makes sure CSS is properly applied to SVG elements
  useEffect(() => {
    // Force a redraw of the charts after a slight delay
    const timer = setTimeout(() => {
      const chartContainers = document.querySelectorAll('.recharts-wrapper');
      chartContainers.forEach(container => {
        // Force a reflow/redraw
        if (container instanceof HTMLElement) {
          container.style.display = 'none';
          // This causes a reflow
          void container.offsetHeight; 
          container.style.display = 'block';
        }
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Bind keyboard shortcuts for demo purposes
  useHotkeys('r', () => {
    toast.success('Refreshing dashboard data...');
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  });

  // Animation variants for staggered cards
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

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's your sales overview.</p>
      </div>
      
      {/* KPI Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Total Revenue"
            value={kpiSummary.totalRevenue}
            prefix="$"
            trend={kpiSummary.revenueGrowth}
            trendLabel="vs last period"
            icon={<FiDollarSign size={24} />}
            isLoading={isLoading}
            formatter={(value) => formatCurrency(value)}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Total Sales"
            value={kpiSummary.totalSales}
            trend={kpiSummary.salesGrowth}
            trendLabel="vs last period"
            icon={<FiShoppingBag size={24} />}
            isLoading={isLoading}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Avg. Order Value"
            value={kpiSummary.averageOrderValue}
            prefix="$"
            trend={kpiSummary.aovGrowth}
            trendLabel="vs last period"
            icon={<FiTrendingUp size={24} />}
            isLoading={isLoading}
            decimals={2}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Conversion Rate"
            value={kpiSummary.conversionRate}
            suffix="%"
            trend={kpiSummary.conversionGrowth}
            trendLabel="vs last period"
            icon={<FiUsers size={24} />}
            isLoading={isLoading}
            isPercentage={true}
            decimals={1}
          />
        </motion.div>
      </motion.div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} isLoading={isLoading} />
        </div>
        <div>
          <DashboardCard 
            title="Revenue by Channel" 
            isLoading={isLoading}
            onRefresh={() => {}}
            onExport={() => {}}
          >
            <div className="h-80 bg-white dark:bg-gray-900 rounded-lg">
              {isLoading ? (
                <div className="h-full w-full bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
              ) : (
                <ChannelDonutChart 
                  data={revenueByChannel} 
                  isLoading={false} 
                  standalone={true}
                />
              )}
            </div>
          </DashboardCard>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="mb-6">
        <ProductsTable products={productPerformance} isLoading={isLoading} />
      </div>
      
      {/* User Presence Indicator (Demo) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full px-4 py-2 flex items-center space-x-2 border border-gray-200 dark:border-gray-700 z-10">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">3 users viewing this dashboard</span>
    </div>
    </DashboardLayout>
  );
}
