'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiBell, FiMonitor, FiGlobe, FiSettings, FiSave, FiMoon, FiSun } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function SettingsPage() {
  // Tabs
  const [activeTab, setActiveTab] = useState('profile');
  
  // User Profile Form
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Product Manager with 5+ years of experience in SaaS products.',
    avatar: '/images/avatar.png'
  });
  
  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    monthlyReports: true,
    twoFactorAuth: false
  });
  
  // Application Settings
  const [appSettings, setAppSettings] = useState({
    theme: 'system', // 'light', 'dark', 'system'
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    timezone: 'America/New_York'
  });
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile logic would go here
    alert('Profile updated successfully!');
  };
  
  // Handle setting toggle
  const handleSettingChange = (setting: string, value: boolean) => {
    setAccountSettings({
      ...accountSettings,
      [setting]: value
    });
  };
  
  // Handle app setting change
  const handleAppSettingChange = (setting: string, value: string) => {
    setAppSettings({
      ...appSettings,
      [setting]: value
    });
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your profile and application settings.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/4">
          <nav className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <ul>
              <li>
                <button 
                  className={`w-full flex items-center py-3 px-4 transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FiUser className="mr-3" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full flex items-center py-3 px-4 transition-colors ${
                    activeTab === 'account' 
                      ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('account')}
                >
                  <FiBell className="mr-3" />
                  <span>Notifications</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full flex items-center py-3 px-4 transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  <FiLock className="mr-3" />
                  <span>Security</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full flex items-center py-3 px-4 transition-colors ${
                    activeTab === 'appearance' 
                      ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('appearance')}
                >
                  <FiMonitor className="mr-3" />
                  <span>Appearance</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full flex items-center py-3 px-4 transition-colors ${
                    activeTab === 'regional' 
                      ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('regional')}
                >
                  <FiGlobe className="mr-3" />
                  <span>Regional</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Content Area */}
        <div className="w-full md:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">User Profile</h2>
                
                <form onSubmit={handleProfileUpdate}>
                  <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      <FiUser size={48} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{userProfile.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{userProfile.email}</p>
                      <button className="mt-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Change Photo
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          id="name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          id="phone"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Bio
                        </label>
                        <textarea 
                          id="bio"
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userProfile.bio}
                          onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                        ></textarea>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <FiSave size={16} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'account' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accountSettings.emailNotifications}
                        onChange={() => handleSettingChange('emailNotifications', !accountSettings.emailNotifications)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications in browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accountSettings.pushNotifications}
                        onChange={() => handleSettingChange('pushNotifications', !accountSettings.pushNotifications)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive marketing and promotional emails</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accountSettings.marketingEmails}
                        onChange={() => handleSettingChange('marketingEmails', !accountSettings.marketingEmails)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accountSettings.twoFactorAuth}
                        onChange={() => handleSettingChange('twoFactorAuth', !accountSettings.twoFactorAuth)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Password
                        </label>
                        <input 
                          type="password" 
                          id="current-password"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          New Password
                        </label>
                        <input 
                          type="password" 
                          id="new-password"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <input 
                          type="password" 
                          id="confirm-password"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`p-4 rounded-lg border ${appSettings.theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700'} cursor-pointer`}
                        onClick={() => handleAppSettingChange('theme', 'light')}
                      >
                        <div className="flex items-center justify-center mb-3">
                          <FiSun size={24} className="text-yellow-500" />
                        </div>
                        <h4 className="font-medium text-center text-gray-900 dark:text-white">Light Mode</h4>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg border ${appSettings.theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700'} cursor-pointer`}
                        onClick={() => handleAppSettingChange('theme', 'dark')}
                      >
                        <div className="flex items-center justify-center mb-3">
                          <FiMoon size={24} className="text-blue-500" />
                        </div>
                        <h4 className="font-medium text-center text-gray-900 dark:text-white">Dark Mode</h4>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg border ${appSettings.theme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700'} cursor-pointer`}
                        onClick={() => handleAppSettingChange('theme', 'system')}
                      >
                        <div className="flex items-center justify-center mb-3">
                          <FiMonitor size={24} className="text-purple-500" />
                        </div>
                        <h4 className="font-medium text-center text-gray-900 dark:text-white">System Default</h4>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {/* Regional Tab */}
            {activeTab === 'regional' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Regional Settings</h2>
                
                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Language
                    </label>
                    <select 
                      id="language"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={appSettings.language}
                      onChange={(e) => handleAppSettingChange('language', e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date Format
                    </label>
                    <select 
                      id="dateFormat"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={appSettings.dateFormat}
                      onChange={(e) => handleAppSettingChange('dateFormat', e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Currency
                    </label>
                    <select 
                      id="currency"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={appSettings.currency}
                      onChange={(e) => handleAppSettingChange('currency', e.target.value)}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                  </motion.div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <FiSave size={16} />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 