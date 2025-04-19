import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
};

const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 20,
  className = '',
}: FadeInProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      case 'none':
        return {};
      default:
        return { y: distance };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn; 