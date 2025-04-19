'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiPlus, FiX, FiCheck, FiMove, FiSettings } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function WidgetsPage() {
  const [showAddWidget, setShowAddWidget] = useState(false);
  
  // Sample widget templates
  const widgetTemplates = [
    { id: 'sales', name: 'Sales Overview', icon: '📊', category: 'charts' },
    { id: 'customers', name: 'Customer Growth', icon: '👥', category: 'charts' },
    { id: 'orders', name: 'Recent Orders', icon: '📦', category: 'tables' },
    { id: 'revenue', name: 'Revenue Metrics', icon: '💰', category: 'metrics' },
    { id: 'products', name: 'Top Products', icon: '🏆', category: 'tables' },
    { id: 'tasks', name: 'Task List', icon: '✅', category: 'utilities' },
    { id: 'calendar', name: 'Calendar', icon: '📅', category: 'utilities' },
    { id: 'weather', name: 'Weather', icon: '🌤️', category: 'utilities' },
  ];
  
  // Active widgets
  const [activeWidgets, setActiveWidgets] = useState([
    { id: 'w1', templateId: 'sales', position: { x: 0, y: 0 }, size: { cols: 2, rows: 1 } },
    { id: 'w2', templateId: 'customers', position: { x: 2, y: 0 }, size: { cols: 1, rows: 1 } },
    { id: 'w3', templateId: 'orders', position: { x: 0, y: 1 }, size: { cols: 3, rows: 1 } },
  ]);
  
  // Widget categories
  const categories = [
    { id: 'charts', name: 'Charts' },
    { id: 'tables', name: 'Tables' },
    { id: 'metrics', name: 'Metrics' },
    { id: 'utilities', name: 'Utilities' },
  ];
  
  // Filter widgets by category
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredTemplates = selectedCategory === 'all'
    ? widgetTemplates
    : widgetTemplates.filter(widget => widget.category === selectedCategory);
  
  // Add a widget
  const addWidget = (templateId: string) => {
    const newWidget = {
      id: `w${activeWidgets.length + 1}`,
      templateId,
      position: { x: 0, y: activeWidgets.length }, // Simple position for demo
      size: { cols: 1, rows: 1 }
    };
    
    setActiveWidgets([...activeWidgets, newWidget]);
    setShowAddWidget(false);
  };
  
  // Remove a widget
  const removeWidget = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter(w => w.id !== widgetId));
  };
  
  // Get widget name from template
  const getWidgetName = (templateId: string) => {
    const template = widgetTemplates.find(t => t.id === templateId);
    return template ? template.name : 'Widget';
  };

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

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Widgets Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Customize your dashboard by adding and arranging widgets.</p>
        </div>
        
        <button 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
          onClick={() => setShowAddWidget(true)}
        >
          <FiPlus />
          <span>Add Widget</span>
        </button>
      </div>
      
      {/* Grid Layout */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 min-h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeWidgets.map((widget) => {
            const template = widgetTemplates.find(t => t.id === widget.templateId);
            
            return (
              <motion.div
                key={widget.id}
                className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  gridColumn: `span ${widget.size.cols}`,
                  gridRow: `span ${widget.size.rows}`,
                }}
              >
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">
                      {template?.icon || '📊'}
                    </span>
                    <h3 className="font-medium text-gray-700 dark:text-gray-200">
                      {template?.name || 'Widget'}
                    </h3>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FiMove size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FiSettings size={16} />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => removeWidget(widget.id)}
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    {template?.name || 'Widget'} content goes here
                  </p>
                </div>
              </motion.div>
            );
          })}
          
          {/* Empty State */}
          {activeWidgets.length === 0 && (
            <div className="col-span-3 bg-white dark:bg-gray-700 rounded-lg p-8 text-center">
              <FiGrid size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No widgets added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Start customizing your dashboard by adding widgets.</p>
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center space-x-2 transition-colors"
                onClick={() => setShowAddWidget(true)}
              >
                <FiPlus />
                <span>Add Widget</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Widget Modal */}
      {showAddWidget && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add a Widget</h3>
              <button 
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowAddWidget(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="px-6 py-4">
              {/* Category Filter */}
              <div className="mb-6">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  <button 
                    className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                      selectedCategory === 'all' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Widgets
                  </button>
                  
                  {categories.map(category => (
                    <button 
                      key={category.id}
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        selectedCategory === category.id 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Widget Grid */}
              <div className="overflow-y-auto max-h-[50vh]">
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filteredTemplates.map(template => (
                    <motion.div
                      key={template.id}
                      variants={itemVariants}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => addWidget(template.id)}
                    >
                      <div className="flex items-start">
                        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-white dark:bg-gray-800 rounded-lg mr-4">
                          {template.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Add this widget to your dashboard
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg mr-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowAddWidget(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
} 