import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AnimatedLayoutProps = {
  children: ReactNode;
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedLayout; 