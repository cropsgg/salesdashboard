'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Currency symbols with minimalist color scheme
const CURRENCY_SYMBOLS = [
  { symbol: '$', name: 'dollar' },
  { symbol: '€', name: 'euro' },
  { symbol: '¥', name: 'yen' },
  { symbol: '£', name: 'pound' },
  { symbol: '₹', name: 'rupee' },
  { symbol: '₩', name: 'won' },
  { symbol: '฿', name: 'baht' },
  { symbol: '₽', name: 'ruble' },
  { symbol: '₺', name: 'lira' },
  { symbol: 'د.إ', name: 'dirham' },
  { symbol: '₿', name: 'bitcoin' },
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
            opacity: 0.6, // Slightly lower opacity for minimalist design
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            opacity: [0.4, 0.6, 0.4], // Subtle opacity range
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
            {/* Minimalist grey/white gradient background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800 opacity-60 shadow-sm"></div>
            
            {/* Subtle inner glow */}
            <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-700 opacity-20"></div>
            
            {/* Currency symbol */}
            <span className="relative z-10 text-gray-700 dark:text-gray-200 drop-shadow-sm">{particle.symbol}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 