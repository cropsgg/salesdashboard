import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useSpring, useTransform } from 'framer-motion';

interface AnimatedChartProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

const AnimatedChart: React.FC<AnimatedChartProps> = ({ 
  children, 
  className = '',
  depth = 15
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    });
  }, [controls]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  // Create 3D rotation effect with springs for smooth animation
  const rotateX = useSpring(0, { stiffness: 150, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 25 });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  
  useEffect(() => {
    if (hovering) {
      rotateX.set(-mousePosition.y * depth);
      rotateY.set(mousePosition.x * depth);
      scale.set(1.02);
    } else {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    }
  }, [mousePosition, hovering, rotateX, rotateY, scale, depth]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative z-10 ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Glass-like background effect with more opacity for better visibility */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm"
        style={{
          rotateX,
          rotateY,
          scale,
          boxShadow: hovering 
            ? '0 15px 35px rgba(0, 0, 0, 0.15), 0 3px 10px rgba(0, 0, 0, 0.1)'
            : '0 5px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          zIndex: 0
        }}
      />
      
      {/* Dynamic highlight effect that follows cursor */}
      {hovering && (
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-70 rounded-xl overflow-hidden z-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      
      {/* Content with subtle parallax movement */}
      <motion.div
        className="relative z-20"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedChart; 