'use client';

import { useState, useMemo } from 'react';
import { FiChevronUp, FiChevronDown, FiSearch, FiFilter, FiArrowUp, FiArrowDown, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardCard } from '../ui/DashboardCard';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface Product {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
  category: string;
  image?: string;
}

interface ProductsTableProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductsTable({ products, isLoading = false }: ProductsTableProps) {
  const [sortField, setSortField] = useState<keyof Product>('revenue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(product => product.category));
    return Array.from(uniqueCategories);
  }, [products]);

  // Handle sorting logic
  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Apply search filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        // Apply category filter
        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        // Apply sorting
        const aValue = a[sortField] as number | string;
        const bValue = b[sortField] as number | string;
        
        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [products, searchTerm, selectedCategory, sortField, sortDirection]);

  // Skeleton loader for table rows during loading state
  const SkeletonRow = () => (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="ml-3 w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </td>
      <td className="py-3 px-4">
        <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </td>
      <td className="py-3 px-4">
        <div className="w-14 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </td>
      <td className="py-3 px-4">
        <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </td>
    </tr>
  );

  return (
    <DashboardCard 
      title="Top Performing Products" 
      isLoading={isLoading}
      onRefresh={() => {}}
      onExport={() => {}}
    >
      <div>
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg py-2 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-500 dark:text-gray-400" />
            <select
              className="block rounded-lg py-2 px-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto -mx-4 -mb-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th 
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Product
                </th>
                <th 
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center">
                    Category
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('sales')}
                >
                  <div className="flex items-center">
                    Sales
                    {sortField === 'sales' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('revenue')}
                >
                  <div className="flex items-center">
                    Revenue
                    {sortField === 'revenue' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('growth')}
                >
                  <div className="flex items-center">
                    Growth
                    {sortField === 'growth' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {isLoading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : (
                <>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                        No products found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    <>
                      <AnimatePresence>
                        {filteredProducts.map((product, index) => (
                          <motion.tr 
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ 
                              duration: 0.3,
                              delay: index * 0.05,
                              ease: [0.25, 0.1, 0.25, 1.0]
                            }}
                            whileHover={{ 
                              backgroundColor: "rgba(59, 130, 246, 0.05)",
                              scale: 1.01,
                              transition: { duration: 0.1 }
                            }}
                            className="relative hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer transition-all transform"
                          >
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {product.image ? (
                                  <motion.div 
                                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-blue-500 shadow-md shadow-blue-500/20"
                                    whileHover={{ 
                                      scale: 1.2,
                                      rotate: 5,
                                      borderColor: "#3b82f6",
                                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                                    }}
                                  >
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                  </motion.div>
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-300 font-medium text-sm">
                                    {product.name.charAt(0)}
                                  </div>
                                )}
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm">
                              <motion.span
                                className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                whileHover={{ scale: 1.05, backgroundColor: "#e0e7ff" }}
                              >
                                {product.category}
                              </motion.span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                              >
                                {formatNumber(product.sales)}
                              </motion.div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 + 0.4, duration: 0.5 }}
                              >
                                {formatCurrency(product.revenue)}
                              </motion.div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className={`inline-flex items-center ${
                                product.growth > 0 
                                  ? 'text-green-500' 
                                  : product.growth < 0 
                                    ? 'text-red-500' 
                                    : 'text-gray-500'
                              }`}>
                                <motion.div 
                                  className="flex items-center gap-1"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 + 0.5, duration: 0.4 }}
                                >
                                  {product.growth > 0 ? (
                                    <FiArrowUp className="text-green-500" />
                                  ) : product.growth < 0 ? (
                                    <FiArrowDown className="text-red-500" />
                                  ) : (
                                    <FiMinus className="text-gray-500" />
                                  )}
                                  <span className="text-sm font-medium">
                                    {Math.abs(product.growth).toFixed(1)}%
                                  </span>
                                </motion.div>
                              </div>
                            </td>
                            
                            {/* Animated highlight effect on hover */}
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg" />
                            </motion.div>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardCard>
  );
} 