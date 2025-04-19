'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Currency symbols with medium-brightness colors (between pastel and vivid)
const CURRENCY_SYMBOLS = [
  { symbol: '$', name: 'dollar', color: 'from-emerald-300 to-emerald-500' },
  { symbol: '€', name: 'euro', color: 'from-blue-300 to-blue-500' },
  { symbol: '¥', name: 'yen', color: 'from-purple-300 to-purple-500' },
  { symbol: '£', name: 'pound', color: 'from-indigo-300 to-indigo-500' },
  { symbol: '₹', name: 'rupee', color: 'from-amber-300 to-amber-500' },
  { symbol: '₩', name: 'won', color: 'from-cyan-300 to-cyan-500' },
  { symbol: '฿', name: 'baht', color: 'from-pink-300 to-pink-500' },
  { symbol: '₽', name: 'ruble', color: 'from-sky-300 to-sky-500' },
  { symbol: '₺', name: 'lira', color: 'from-orange-300 to-orange-500' },
  { symbol: 'د.إ', name: 'dirham', color: 'from-rose-300 to-rose-500' },
  { symbol: '₿', name: 'bitcoin', color: 'from-yellow-300 to-yellow-500' },
];

// Size categories for more uniform appearance (slightly smaller)
const SIZE_CATEGORIES = [
  { size: 32, weight: 'font-medium' },
  { size: 40, weight: 'font-semibold' },
  { size: 46, weight: 'font-semibold' },
];

interface CurrencyParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  name: string;
  color: string;
  size: number;
  weight: string;
  rotation: number;
  speed: number;
  direction: number;
}

export function CurrencyBackground() {
  const [particles, setParticles] = useState<CurrencyParticle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Initialize particles
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setWindowSize({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });

    // Distribute particles evenly across the screen with fewer particles
    const initialParticles: CurrencyParticle[] = Array.from({ length: 25 }, (_, i) => {
      const randomCurrency = CURRENCY_SYMBOLS[Math.floor(Math.random() * CURRENCY_SYMBOLS.length)];
      const sizeCategory = SIZE_CATEGORIES[Math.floor(Math.random() * SIZE_CATEGORIES.length)];
      
      // Create a grid-like distribution with randomization
      const gridCols = 5;
      const gridRows = 6;
      
      const colWidth = window.innerWidth / gridCols;
      const rowHeight = window.innerHeight / gridRows;
      
      const col = i % gridCols;
      const row = Math.floor(i / gridCols) % gridRows;
      
      // Add randomness within the grid cell
      const randomX = (col * colWidth) + (Math.random() * 0.8 * colWidth);
      const randomY = (row * rowHeight) + (Math.random() * 0.8 * rowHeight);
      
      return {
        id: i,
        x: randomX,
        y: randomY,
        symbol: randomCurrency.symbol,
        name: randomCurrency.name,
        color: randomCurrency.color,
        size: sizeCategory.size,
        weight: sizeCategory.weight,
        rotation: Math.floor(Math.random() * 4) * 90, // Only 0, 90, 180, 270 degrees
        speed: 0.2 + Math.random() * 0.3, // Slower speed for less distracting movement
        direction: Math.random() * 360,
      };
    });

    setParticles(initialParticles);

    // Handle window resize
    const handleResize = () => {
      setWindowSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update particles position based on mouse movement
  useEffect(() => {
    if (particles.length === 0) return;

    const intervalId = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Calculate distance from mouse
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Determine if particle should move toward or away from mouse
          const attractionFactor = 0.015;
          const avoidanceDistance = 150;
          
          // Default movement based on particle direction
          let newX = particle.x + Math.cos(particle.direction * (Math.PI / 180)) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction * (Math.PI / 180)) * particle.speed;
          
          // Apply mouse influence if within range
          if (distance < 350) {
            const factor = distance < avoidanceDistance 
              ? -attractionFactor * (1 - distance / avoidanceDistance) // Repel when too close
              : attractionFactor * (1 - distance / 350); // Attract when at medium distance
            
            newX += dx * factor;
            newY += dy * factor;
          }
          
          // Bounce off edges
          if (newX < 0 || newX > windowSize.width) {
            newX = Math.max(0, Math.min(newX, windowSize.width));
            particle.direction = 180 - particle.direction;
          }
          
          if (newY < 0 || newY > windowSize.height) {
            newY = Math.max(0, Math.min(newY, windowSize.height));
            particle.direction = 360 - particle.direction;
          }
          
          return {
            ...particle,
            x: newX,
            y: newY,
            rotation: particle.rotation + 0.1, // Slower rotation
          };
        })
      );
    }, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, [particles, mousePosition, windowSize]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute select-none"
          style={{
            x: particle.x,
            y: particle.y,
            fontSize: `${particle.size}px`,
            rotate: particle.rotation,
            opacity: 0.65, // Moderate opacity - visible but not distracting
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            opacity: [0.5, 0.65, 0.5], // Moderate opacity range
          }}
          transition={{
            opacity: {
              duration: 6,
              repeat: Infinity,
              repeatType: 'reverse'
            },
            scale: { duration: 1 }
          }}
        >
          <div className={`relative flex items-center justify-center ${particle.weight}`} 
               style={{ width: `${particle.size * 1.5}px`, height: `${particle.size * 1.5}px` }}>
            {/* Gradient background with moderate opacity */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${particle.color} opacity-75 shadow`}></div>
            
            {/* Inner glow */}
            <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900 opacity-25"></div>
            
            {/* Currency symbol with improved visibility */}
            <span className="relative z-10 text-white drop-shadow-sm">{particle.symbol}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 