import React, { useState, useRef, ReactNode, useEffect } from 'react';
import { motion, useSpring, useTransform, MotionValue, animate } from 'framer-motion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  backgroundColor?: string;
  borderColor?: string;
  glareIntensity?: number;
  hoverScale?: number;
}

const Card3D = ({
  children,
  className = '',
  depth = 30,
  backgroundColor = 'rgba(255, 255, 255, 0.7)',
  borderColor = 'rgba(255, 255, 255, 0.2)',
  glareIntensity = 0.2,
  hoverScale = 1.05,
}: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Check if dark class is on html element (for themes with toggle)
    const htmlHasDarkClass = document.documentElement.classList.contains('dark');
    
    setIsDarkMode(prefersDark || htmlHasDarkClass);
    
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches || htmlHasDarkClass);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Background and glare colors based on mode
  const darkModeStyles = {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderColor: 'rgba(51, 65, 85, 0.6)',
    glareColor: 'rgba(59, 130, 246, 0.4)',
    glareBlend: 'screen' as const,
    gradientBg: 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20',
    boxShadowHover: "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.2)",
    boxShadowDefault: "0 10px 30px rgba(0, 0, 0, 0.3)"
  };
  
  const lightModeStyles = {
    backgroundColor,
    borderColor,
    glareColor: 'rgba(255, 255, 255, 0.9)',
    glareBlend: 'overlay' as const,
    gradientBg: 'bg-gradient-to-br from-blue-50 to-purple-50',
    boxShadowHover: "0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(31, 38, 135, 0.2)",
    boxShadowDefault: "0 10px 30px rgba(0, 0, 0, 0.1)"
  };
  
  const modeStyles = isDarkMode ? darkModeStyles : lightModeStyles;

  // Initialize floating animation
  useEffect(() => {
    setIsVisible(true);
    
    // Random initial phase to stagger animations between multiple cards
    const initialPhase = Math.random() * Math.PI * 2;
    let cleanup: ReturnType<typeof animate> | null = null;
    
    cleanup = animate(
      initialPhase,
      initialPhase + Math.PI * 2, 
      {
        duration: 3 + Math.random() * 2, // Random duration between 3-5 seconds for variety
        repeat: Infinity,
        ease: "easeInOut",
        onUpdate: (latest) => {
          if (ref.current && !hovering) {
            const floatY = Math.sin(latest) * 5; // 5px vertical floating
            const floatX = Math.sin(latest * 0.5) * 2; // 2px horizontal micro-movement
            ref.current.style.transform = `translateY(${floatY}px) translateX(${floatX}px) ${ref.current.style.transform.replace(/translateY\([^)]+\) translateX\([^)]+\)/, '')}`;
          }
        }
      }
    );
    
    return () => {
      if (cleanup) cleanup.stop();
    };
  }, [hovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (in percentage, -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  // Smooth spring animations with more dynamic settings
  const rotateX = useSpring(0, { stiffness: 200, damping: 15 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 15 });
  const scale = useSpring(1, { stiffness: 300, damping: 20 });
  const glareX = useSpring(50, { stiffness: 200, damping: 15 }); 
  const glareY = useSpring(50, { stiffness: 200, damping: 15 });
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 15 });
  const elevationZ = useSpring(0, { stiffness: 300, damping: 20 });

  // Update spring values based on mouse position with enhanced effects
  React.useEffect(() => {
    if (hovering) {
      rotateX.set(-mousePosition.y * depth);
      rotateY.set(mousePosition.x * depth);
      scale.set(hoverScale);
      glareX.set(mousePosition.x * 100 + 50);
      glareY.set(mousePosition.y * 100 + 50);
      glareOpacity.set(glareIntensity);
      elevationZ.set(30); // More elevation on hover
    } else {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
      glareOpacity.set(0);
      elevationZ.set(0);
    }
  }, [mousePosition, hovering, depth, rotateX, rotateY, scale, glareX, glareY, glareOpacity, glareIntensity, hoverScale, elevationZ]);

  // Transform for children to create 3D parallax effect with enhanced depth
  const createTransform = (offsetZ: number) => {
    return {
      x: useTransform(rotateY, (value) => value * offsetZ * 0.8),
      y: useTransform(rotateX, (value) => -value * offsetZ * 0.8),
      z: useTransform(elevationZ, (value) => value * offsetZ * 0.5),
    };
  };

  const cardTransforms = createTransform(1);
  const contentTransforms = createTransform(0.6);
  const backgroundTransforms = createTransform(0.3);

  const entryAnimation = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25, 
        delay: 0.1 
      } 
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        scale,
        rotateX,
        rotateY,
        backgroundColor: modeStyles.backgroundColor,
        border: `1px solid ${modeStyles.borderColor}`,
        boxShadow: hovering ? modeStyles.boxShadowHover : modeStyles.boxShadowDefault,
        transition: "box-shadow 0.3s ease",
        willChange: "transform, box-shadow",
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={entryAnimation}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      whileTap={{ scale: 0.97 }}
    >
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          x: backgroundTransforms.x,
          y: backgroundTransforms.y,
          z: backgroundTransforms.z,
        }}
      >
        <div className={`absolute inset-0 ${modeStyles.gradientBg}`} />
        
        {/* Dynamic pattern overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pattern-dots" />
      </motion.div>

      {/* Enhanced glare effect with more realistic behavior */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${modeStyles.glareColor} 0%, transparent 60%)`,
          opacity: glareOpacity,
          mixBlendMode: modeStyles.glareBlend,
        }}
      />

      {/* Subtle edge highlight on hover */}
      <motion.div
        className="absolute inset-0 z-5 pointer-events-none rounded-2xl"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
          opacity: useTransform(elevationZ, [0, 30], [0, 1]),
        }}
      />

      {/* Content with enhanced parallax effect */}
      <motion.div 
        className="relative z-20 p-6" 
        style={{
          x: contentTransforms.x,
          y: contentTransforms.y,
          z: contentTransforms.z,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Card3D; 