import React, { useState, useRef, ReactNode } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { FiMoreVertical, FiMaximize2, FiRefreshCcw, FiDownload, FiX } from 'react-icons/fi';
import { Menu } from '@headlessui/react';

interface GlassMorphicCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  showMenu?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  onRemove?: () => void;
}

const GlassMorphicCard: React.FC<GlassMorphicCardProps> = ({
  title,
  children,
  className = '',
  showMenu = true,
  isLoading = false,
  onRefresh,
  onExport,
  onRemove,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isExpanded) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (in percentage, -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  // Subtle tilt effect on hover
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  
  React.useEffect(() => {
    if (hovering && !isExpanded) {
      rotateX.set(-mousePosition.y * 5); // Subtle 5-degree tilt
      rotateY.set(mousePosition.x * 5);
      scale.set(1.01);
    } else {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    }
  }, [mousePosition, hovering, rotateX, rotateY, scale, isExpanded]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${isExpanded ? 'fixed inset-4 z-50' : ''} ${className}`}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: 1200,
        rotateX,
        rotateY,
        scale,
      }}
      layoutId={`card-${title.replace(/\s/g, '-').toLowerCase()}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {/* Blurred backdrop */}
      <div 
        className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md border border-white/20 dark:border-gray-800/50"
        style={{ 
          boxShadow: hovering 
            ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.05)' 
            : '0 10px 30px rgba(0, 0, 0, 0.1)', 
        }}
      />
      
      {/* Gradient background with animation */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-blue-900/20 dark:via-indigo-900/10 dark:to-purple-900/10"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
      </div>
      
      {/* Card Content - Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800/50">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
          
          <div className="flex items-center gap-1">
            {isLoading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="text-blue-500 w-4 h-4"
              >
                <FiRefreshCcw size={16} />
              </motion.div>
            )}
            
            {/* Expand Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isExpanded ? "Minimize" : "Expand"}
            >
              {isExpanded ? <FiX size={16} /> : <FiMaximize2 size={16} />}
            </motion.button>
            
            {/* Card Menu */}
            {showMenu && (
              <Menu as="div" className="relative">
                <Menu.Button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <FiMoreVertical size={16} />
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                  {onRefresh && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onRefresh}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                        >
                          <FiRefreshCcw className="mr-2" size={14} />
                          Refresh
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  
                  {onExport && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onExport}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                        >
                          <FiDownload className="mr-2" size={14} />
                          Export
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  
                  {onRemove && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onRemove}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                        >
                          <FiX className="mr-2" size={14} />
                          Remove
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </Menu.Items>
              </Menu>
            )}
          </div>
        </div>
        
        {/* Card Content - Body */}
        <div className="p-4">
          {children}
        </div>
      </div>
      
      {/* Dynamic highlight effect that follows cursor */}
      {hovering && !isExpanded && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </motion.div>
  );
};

export default GlassMorphicCard; 