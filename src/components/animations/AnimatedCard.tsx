import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AnimatedCardProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const AnimatedCard = ({ children, delay = 0, className = '' }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: delay * 0.1,
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 