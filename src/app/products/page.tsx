'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiGrid, FiList, FiTag, FiPackage } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: '/images/products/headphones.png',
      category: 'Audio',
      price: 129.99,
      stock: 45,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Smart Watch',
      image: '/images/products/watch.png',
      category: 'Wearables',
      price: 199.99,
      stock: 32,
      rating: 4.3,
    },
    {
      id: 3,
      name: 'Wireless Earbuds',
      image: '/images/products/earbuds.png',
      category: 'Audio',
      price: 89.99,
      stock: 67,
      rating: 4.2,
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      image: '/images/products/speaker.png',
      category: 'Audio',
      price: 79.99,
      stock: 51,
      rating: 4.0,
    },
    {
      id: 5,
      name: 'Fitness Tracker',
      image: '/images/products/tracker.png',
      category: 'Wearables',
      price: 59.99,
      stock: 28,
      rating: 3.9,
    },
    {
      id: 6,
      name: 'Wireless Headphones 2',
      image: '/images/products/headphones.png',
      category: 'Audio',
      price: 149.99,
      stock: 18,
      rating: 4.7,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your product inventory and listings.</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 flex items-center space-x-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">
              <FiFilter size={16} />
              <span>Filter</span>
            </button>
            
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200'}`}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid size={18} />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200'}`}
                onClick={() => setViewMode('list')}
              >
                <FiList size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow transition-transform hover:scale-[1.02]"
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-4 aspect-square flex items-center justify-center">
                <img src={product.image} alt={product.name} className="h-48 object-contain" />
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-400">
                    {product.category}
                  </span>
                  <div className="flex items-center text-yellow-400">
                    {'★'.repeat(Math.floor(product.rating))}
                    {product.rating % 1 !== 0 ? '½' : ''}
                    {'☆'.repeat(5 - Math.ceil(product.rating))}
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({product.rating})</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{product.name}</h3>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                  <span className={`text-sm ${product.stock > 30 ? 'text-green-500' : product.stock > 10 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {product.stock} in stock
                  </span>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    View
                  </button>
                  <button className="py-2 px-4 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <FiPackage />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex items-center space-x-4"
            >
              <img src={product.image} alt={product.name} className="w-20 h-20 object-contain" />
              
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium rounded bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-400">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center text-yellow-400 mt-1">
                  {'★'.repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 ? '½' : ''}
                  {'☆'.repeat(5 - Math.ceil(product.rating))}
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({product.rating})</span>
                </div>
              </div>
              
              <div className="text-right">
                <span className="block text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                <span className={`block text-sm mt-1 ${product.stock > 30 ? 'text-green-500' : product.stock > 10 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {product.stock} in stock
                </span>
              </div>
              
              <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow">
          <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No products found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </DashboardLayout>
  );
} 