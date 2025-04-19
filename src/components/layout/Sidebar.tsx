'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiBarChart2, 
  FiUsers, 
  FiSettings, 
  FiShoppingBag, 
  FiHelpCircle, 
  FiChevronLeft, 
  FiChevronRight,
  FiGrid,
  FiLayers
} from 'react-icons/fi';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Check if mobile view on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check on mount
    checkIfMobile();

    // Add resize listener
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: <FiHome size={20} />, href: '/' },
    { label: 'Analytics', icon: <FiBarChart2 size={20} />, href: '/analytics' },
    { label: 'Products', icon: <FiShoppingBag size={20} />, href: '/products' },
    { label: 'Customers', icon: <FiUsers size={20} />, href: '/customers' },
    { label: 'Widgets', icon: <FiGrid size={20} />, href: '/widgets' },
    { label: 'Components', icon: <FiLayers size={20} />, href: '/components' },
  ];

  const bottomNavItems: NavItem[] = [
    { label: 'Settings', icon: <FiSettings size={20} />, href: '/settings' },
    { label: 'Help & Support', icon: <FiHelpCircle size={20} />, href: '/help' },
  ];

  // Sidebar animation variants
  const sidebarVariants = {
    expanded: { width: '240px', transition: { duration: 0.3, ease: 'easeOut' } },
    collapsed: { width: '72px', transition: { duration: 0.3, ease: 'easeOut' } },
  };

  // Mobile sidebar variants
  const mobileSidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  // Overlay variants (for mobile)
  const overlayVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Render a nav item
  const renderNavItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.href;

    return (
      <motion.div
        key={item.href}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link href={item.href} passHref>
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} py-3 ${isCollapsed ? 'px-2' : 'px-4'} rounded-lg mb-1 cursor-pointer transition-all duration-200 group ${
              isActive
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <div className={`flex items-center justify-center ${isCollapsed ? 'w-8 h-8' : 'w-6'} ${isCollapsed && !isActive ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400' : ''}`}>
              {item.icon}
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            
            {isActive && (
              <motion.div
                layoutId="activeNavIndicator"
                className={`absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full`}
              />
            )}
          </div>
        </Link>
      </motion.div>
    );
  };

  // Sidebar content
  const sidebarContent = (
    <>
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 mb-6`}>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">SalesBoard</span>
            </motion.div>
          )}
          {isCollapsed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900"
            >
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">S</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isMobile && !isCollapsed && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            aria-label="Collapse Sidebar"
          >
            <FiChevronLeft size={16} />
          </motion.button>
        )}
      </div>
      
      <div className="px-3 mb-8">
        <div className="mb-2 px-4">
          <p className={`text-xs font-medium text-gray-400 uppercase ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '' : 'Main Menu'}
          </p>
        </div>
        
        <nav>
          {navItems.map((item, index) => renderNavItem(item, index))}
        </nav>
      </div>
      
      <div className="px-3 mt-auto">
        <div className="mb-2 px-4">
          <p className={`text-xs font-medium text-gray-400 uppercase ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '' : 'Support & Settings'}
          </p>
        </div>
        
        <nav>
          {bottomNavItems.map((item, index) => renderNavItem(item, index + navItems.length))}
        </nav>
      </div>
    </>
  );

  // For desktop view
  if (!isMobile) {
    return (
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
        className="h-screen flex flex-col py-2 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 sticky top-0 overflow-hidden relative"
      >
        {sidebarContent}
        
        {/* Enhanced expand button when collapsed */}
        {isCollapsed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-l-md shadow-md"
            aria-label="Expand Sidebar"
          >
            <FiChevronRight size={16} />
          </motion.button>
        )}
      </motion.aside>
    );
  }

  // For mobile view
  return (
    <>
      {/* Enhanced mobile toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="lg:hidden fixed z-50 bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        {!isMobileOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            className="ml-2 font-medium"
          >
            Menu
          </motion.span>
        )}
      </motion.button>
      
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={overlayVariants.open}
            exit={overlayVariants.closed}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <motion.aside
        variants={mobileSidebarVariants}
        initial="closed"
        animate={isMobileOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
        className="h-screen w-64 flex flex-col py-2 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed top-0 left-0 z-50 overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
} 