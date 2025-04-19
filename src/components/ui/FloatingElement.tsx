import React, { ReactNode, useRef, useEffect } from 'react';
import { motion, useAnimation, animate } from 'framer-motion';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  amplitude = 5,
  duration = 4,
  delay = 0,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Random initial phase to stagger animations
    const initialPhase = Math.random() * Math.PI * 2;
    let cleanup: ReturnType<typeof animate> | null = null;
    
    // Small delay for staggered animations
    const timeout = setTimeout(() => {
      cleanup = animate(
        initialPhase,
        initialPhase + Math.PI * 2, 
        {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          onUpdate: (latest) => {
            if (ref.current) {
              const y = Math.sin(latest) * amplitude;
              ref.current.style.transform = `translateY(${y}px)`;
            }
          }
        }
      );
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      if (cleanup) cleanup.stop();
    };
  }, [amplitude, duration, delay]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement; 