'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUser, FiMail, FiPhone, FiMapPin, FiDollarSign, FiCalendar, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  // Sample customer data
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
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      totalSpent: 876.50,
      lastPurchase: '2023-08-28',
      status: 'inactive',
      orderCount: 7,
      avatar: '/images/avatar3.png'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Houston, TX',
      totalSpent: 2167.30,
      lastPurchase: '2023-09-30',
      status: 'active',
      orderCount: 18,
      avatar: '/images/avatar4.png'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michael.w@example.com',
      phone: '+1 (555) 876-5432',
      location: 'Phoenix, AZ',
      totalSpent: 567.80,
      lastPurchase: '2023-07-15',
      status: 'inactive',
      orderCount: 4,
      avatar: '/images/avatar5.png'
    }
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort customers
  const sortedCustomers = [...customers].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'totalSpent') {
      comparison = a.totalSpent - b.totalSpent;
    } else if (sortField === 'lastPurchase') {
      comparison = new Date(a.lastPurchase).getTime() - new Date(b.lastPurchase).getTime();
    } else if (sortField === 'orderCount') {
      comparison = a.orderCount - b.orderCount;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Filter customers based on search query
  const filteredCustomers = sortedCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sort click
  const handleSortClick = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get selected customer details
  const selectedCustomerDetails = customers.find(c => c.id === selectedCustomer);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your customers and view their details.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Customer List */}
        <div className="w-full lg:w-2/3">
          {/* Search Bar */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Customers Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSortClick('name')}>
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        {sortField === 'name' && (
                          sortDirection === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSortClick('totalSpent')}>
                      <div className="flex items-center space-x-1">
                        <span>Spent</span>
                        {sortField === 'totalSpent' && (
                          sortDirection === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSortClick('lastPurchase')}>
                      <div className="flex items-center space-x-1">
                        <span>Last Order</span>
                        {sortField === 'lastPurchase' && (
                          sortDirection === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <motion.tr 
                        key={customer.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${selectedCustomer === customer.id ? 'bg-blue-50 dark:bg-gray-600' : ''}`}
                        onClick={() => setSelectedCustomer(customer.id)}
                        variants={itemVariants}
                      >
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
                          <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(customer.lastPurchase)}</div>
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
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Customer Details */}
        <div className="w-full lg:w-1/3">
          {selectedCustomerDetails ? (
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <FiUser size={32} className="text-gray-500 dark:text-gray-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedCustomerDetails.name}</h3>
                  <p className={`text-sm ${selectedCustomerDetails.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {selectedCustomerDetails.status.charAt(0).toUpperCase() + selectedCustomerDetails.status.slice(1)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiMail className="text-gray-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{selectedCustomerDetails.email}</span>
                </div>
                
                <div className="flex items-center">
                  <FiPhone className="text-gray-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{selectedCustomerDetails.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <FiMapPin className="text-gray-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{selectedCustomerDetails.location}</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-sm uppercase font-medium text-gray-500 dark:text-gray-400 mb-3">Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <FiDollarSign className="text-blue-500 mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Total Spent</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">${selectedCustomerDetails.totalSpent.toFixed(2)}</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <FiCalendar className="text-blue-500 mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Last Purchase</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{formatDate(selectedCustomerDetails.lastPurchase)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-1">
                  View Orders
                </button>
                <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Edit
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <FiUser size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No customer selected</h3>
              <p className="text-gray-500 dark:text-gray-400">Select a customer from the list to view their details.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 