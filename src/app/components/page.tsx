'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiGrid, FiList, FiSearch, FiUser, FiMail, FiPhone, FiMapPin, 
  FiDollarSign, FiCalendar, FiArrowUp, FiArrowDown, FiTag, 
  FiPackage, FiBarChart2, FiTrendingUp, FiPieChart, FiActivity,
  FiSettings, FiHelpCircle, FiMessageSquare, FiBook, FiChevronDown,
  FiChevronUp, FiMoon, FiSun, FiMonitor, FiGlobe, FiLock, FiBell,
  FiSave, FiPlus, FiX, FiCheck, FiMove, FiMessageCircle
} from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Button3D from '@/components/ui/Button3D';
import { StatCard } from '@/components/dashboard/StatCard';

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = useState('buttons');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for components
  const metrics = [
    { title: 'Total Views', value: 24500, increase: 12.3, icon: <FiBarChart2 size={24} /> },
    { title: 'Conversion Rate', value: 5.2, increase: 2.1, icon: <FiActivity size={24} /> },
    { title: 'Average Time', value: 222, increase: 0.8, icon: <FiTrendingUp size={24} /> },
    { title: 'Bounce Rate', value: 42, increase: -3.4, icon: <FiPieChart size={24} /> },
  ];
  
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      totalSpent: 1249.99,
      lastPurchase: '2023-09-15',
      status: 'active',
      orderCount: 12,
      avatar: '/images/avatar1.png'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      location: 'Los Angeles, CA',
      totalSpent: 3452.75,
      lastPurchase: '2023-10-02',
      status: 'active',
      orderCount: 24,
      avatar: '/images/avatar2.png'
    }
  ];
  
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
    }
  ];
  
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Component Showcase</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Explore and test all available UI components.</p>
      </div>
      
      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button 
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'buttons' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('buttons')}
          >
            <FiGrid className="mr-2" />
            <span>Buttons</span>
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'cards' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('cards')}
          >
            <FiGrid className="mr-2" />
            <span>Cards</span>
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'forms' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('forms')}
          >
            <FiList className="mr-2" />
            <span>Forms</span>
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'tables' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('tables')}
          >
            <FiList className="mr-2" />
            <span>Tables</span>
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'modals' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('modals')}
          >
            <FiGrid className="mr-2" />
            <span>Modals</span>
          </button>
        </div>
      </div>
      
      {/* Buttons Section */}
      {activeSection === 'buttons' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Buttons</h2>
          
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">3D Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button3D variant="primary">Primary Button</Button3D>
                <Button3D variant="secondary">Secondary Button</Button3D>
                <Button3D variant="success">Success Button</Button3D>
                <Button3D variant="danger">Danger Button</Button3D>
                <Button3D variant="warning">Warning Button</Button3D>
                <Button3D variant="info">Info Button</Button3D>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Button Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button3D size="sm">Small Button</Button3D>
                <Button3D size="md">Medium Button</Button3D>
                <Button3D size="lg">Large Button</Button3D>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <Button3D isLoading>Loading Button</Button3D>
                <Button3D isDisabled>Disabled Button</Button3D>
                <Button3D icon={<FiPlus />}>With Icon</Button3D>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Cards Section */}
      {activeSection === 'cards' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Cards</h2>
          
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Stat Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                  <StatCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    change={metric.increase}
                    icon={metric.icon}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product Cards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow transition-transform hover:scale-[1.02]">
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
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Forms Section */}
      {activeSection === 'forms' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Forms</h2>
          
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Input Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Text Input
                  </label>
                  <input 
                    type="text" 
                    id="text-input"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter text..."
                  />
                </div>
                
                <div>
                  <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Input
                  </label>
                  <input 
                    type="email" 
                    id="email-input"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email..."
                  />
                </div>
                
                <div>
                  <label htmlFor="password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password Input
                  </label>
                  <input 
                    type="password" 
                    id="password-input"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password..."
                  />
                </div>
                
                <div>
                  <label htmlFor="select-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Input
                  </label>
                  <select 
                    id="select-input"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Checkboxes & Radios</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="checkbox-1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Checkbox 1
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="radio-1"
                    name="radio-group"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Radio 1
                  </label>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Textarea</h3>
              <textarea 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter your message..."
              ></textarea>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Tables Section */}
      {activeSection === 'tables' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Tables</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Order
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <FiUser className="text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{customer.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">${customer.totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{customer.orderCount} orders</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{customer.lastPurchase}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
      
      {/* Modals Section */}
      {activeSection === 'modals' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Modals</h2>
          
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Modal</h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Modal Title</h4>
                  <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <FiX size={20} />
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This is a basic modal example. You can add any content here.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Form Modal</h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Add New Item</h4>
                  <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <FiX size={20} />
                  </button>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="modal-name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter name..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="modal-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea 
                      id="modal-description"
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter description..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
} 