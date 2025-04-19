'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Currency symbols with a cohesive color palette
const CURRENCY_SYMBOLS = [
  { symbol: '$', name: 'dollar', color: 'from-emerald-400 to-emerald-600' },
  { symbol: '€', name: 'euro', color: 'from-blue-400 to-blue-600' },
  { symbol: '¥', name: 'yen', color: 'from-purple-400 to-purple-600' },
  { symbol: '£', name: 'pound', color: 'from-indigo-400 to-indigo-600' },
  { symbol: '₹', name: 'rupee', color: 'from-amber-400 to-amber-600' },
  { symbol: '₩', name: 'won', color: 'from-cyan-400 to-cyan-600' },
  { symbol: '฿', name: 'baht', color: 'from-pink-400 to-pink-600' },
  { symbol: '₽', name: 'ruble', color: 'from-sky-400 to-sky-600' },
  { symbol: '₺', name: 'lira', color: 'from-orange-400 to-orange-600' },
  { symbol: 'د.إ', name: 'dirham', color: 'from-rose-400 to-rose-600' },
  { symbol: '₿', name: 'bitcoin', color: 'from-yellow-400 to-yellow-600' },
];

// Size categories for more uniform appearance
const SIZE_CATEGORIES = [
  { size: 36, weight: 'font-semibold' },
  { size: 44, weight: 'font-bold' },
  { size: 52, weight: 'font-bold' },
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

    // Distribute particles evenly across the screen for better coverage
    const initialParticles: CurrencyParticle[] = Array.from({ length: 30 }, (_, i) => {
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
        speed: 0.3 + Math.random() * 0.4, // More consistent speed
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
            opacity: 0.85,
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            opacity: [0.6, 0.85, 0.6],
          }}
          transition={{
            opacity: {
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse'
            },
            scale: { duration: 0.8 }
          }}
        >
          <div className={`relative flex items-center justify-center ${particle.weight}`} 
               style={{ width: `${particle.size * 1.5}px`, height: `${particle.size * 1.5}px` }}>
            {/* Colorful gradient background */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${particle.color} opacity-90 shadow-lg`}></div>
            
            {/* White inner glow */}
            <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900 opacity-30"></div>
            
            {/* Currency symbol */}
            <span className="relative z-10 text-white drop-shadow-md">{particle.symbol}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 