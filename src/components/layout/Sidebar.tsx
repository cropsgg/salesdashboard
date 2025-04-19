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
  FiGrid
} from 'react-icons/fi';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Check if mobile view on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
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
    { label: 'Components', icon: <FiGrid size={20} />, href: '/components-showcase' },
  ];

  const bottomNavItems: NavItem[] = [
    { label: 'Settings', icon: <FiSettings size={20} />, href: '/settings' },
    { label: 'Help & Support', icon: <FiHelpCircle size={20} />, href: '/help' },
  ];

  // Sidebar animation variants
  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '72px' },
  };

  // Mobile sidebar variants
  const mobileSidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
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
            className={`flex items-center py-3 px-4 rounded-lg mb-1 cursor-pointer transition-colors duration-200 ${
              isActive
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-center w-6">{item.icon}</div>
            
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
                className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
              />
            )}
          </div>
        </Link>
      </motion.div>
    );
  };

  // Mobile sidebar toggle button
  const mobileToggleButton = (
    <button
      onClick={toggleSidebar}
      className="lg:hidden fixed z-50 bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      aria-label="Toggle Menu"
    >
      {isMobileOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
    </button>
  );

  // Sidebar content
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4 mb-6">
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
        </AnimatePresence>
        
        {!isMobile && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
          </motion.button>
        )}
      </div>
      
      <div className="px-3 mb-8">
        <div className="mb-2 px-4">
          <p className={`text-xs font-medium text-gray-400 uppercase ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? 'Menu' : 'Main Menu'}
          </p>
        </div>
        
        <nav>
          {navItems.map((item, index) => renderNavItem(item, index))}
        </nav>
      </div>
      
      <div className="px-3 mt-auto">
        <div className="mb-2 px-4">
          <p className={`text-xs font-medium text-gray-400 uppercase ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? 'More' : 'Support & Settings'}
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
        className="h-screen flex flex-col py-2 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 sticky top-0 overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>
    );
  }

  // For mobile view
  return (
    <>
      {mobileToggleButton}
      
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