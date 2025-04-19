'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  FiSun, 
  FiMoon, 
  FiSearch, 
  FiBell, 
  FiPlus, 
  FiCalendar,
  FiChevronDown,
  FiFilter
} from 'react-icons/fi';
import { Switch } from '@headlessui/react';
import { Menu } from '@headlessui/react';
import { timeRanges } from '@/data/mockData';

interface HeaderProps {
  onAddWidget?: () => void;
}

export function Header({ onAddWidget }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[1]); // Default to 30 days
  const [notifications, setNotifications] = useState(3); // Mock notification count
  const [isLive, setIsLive] = useState(true);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Theme toggle effect (avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 w-full transition-all duration-300 ${
        isScrolled ? 'shadow-sm border-b border-gray-200 dark:border-gray-800' : ''
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          {/* Search input */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-64 rounded-lg py-2 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search metrics, products..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <kbd className="px-1.5 py-0.5 text-2xs bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
                /
              </kbd>
            </div>
          </div>

          {/* Time range selector */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <FiCalendar className="text-gray-500 dark:text-gray-400" size={16} />
              <span>{selectedTimeRange.label}</span>
              <FiChevronDown className="text-gray-500 dark:text-gray-400" size={14} />
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-1 w-48 origin-top-left rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
              {timeRanges.map((range) => (
                <Menu.Item key={range.value}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedTimeRange(range)}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${
                        selectedTimeRange.value === range.value ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                      } flex w-full items-center px-4 py-2 text-sm`}
                    >
                      {range.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>

          {/* Filter button (mobile & desktop) */}
          <button className="p-2 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <FiFilter size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Live toggle */}
          <div className="hidden md:flex items-center gap-2 mr-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Live</span>
            <Switch
              checked={isLive}
              onChange={setIsLive}
              className={`${
                isLive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  isLive ? 'translate-x-5' : 'translate-x-1'
                } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
              />
              {isLive && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute right-1 w-2 h-2 rounded-full bg-white"
                />
              )}
            </Switch>
          </div>

          {/* Add Widget Button */}
          {onAddWidget && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddWidget}
              className="hidden md:flex items-center gap-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiPlus size={16} />
              <span className="text-sm font-medium">Add Widget</span>
            </motion.button>
          )}

          {/* Notification Bell */}
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <div className="relative">
                <FiBell size={18} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-2xs rounded-full">
                    {notifications}
                  </span>
                )}
              </div>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-1 w-72 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">
                <p className="py-1">New order received (#1234)</p>
                <p className="py-1">Revenue target reached</p>
                <p className="py-1">New product added to inventory</p>
              </div>
            </Menu.Items>
          </Menu>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>

          {/* User Profile */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-medium text-sm">
                JD
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                John Doe
              </span>
              <FiChevronDown className="hidden md:block text-gray-500 dark:text-gray-400" size={14} />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-1 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                  >
                    Settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </motion.header>
  );
} 