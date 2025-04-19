'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Currency symbols to display
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

interface CurrencyParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  name: string;
  size: number;
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

    // Create initial particles
    const initialParticles: CurrencyParticle[] = Array.from({ length: 25 }, (_, i) => {
      const randomCurrency = CURRENCY_SYMBOLS[Math.floor(Math.random() * CURRENCY_SYMBOLS.length)];
      return {
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        symbol: randomCurrency.symbol,
        name: randomCurrency.name,
        size: Math.random() * 20 + 20, // Size between 20 and 40
        rotation: Math.random() * 360,
        speed: Math.random() * 0.5 + 0.1,
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
          const attractionFactor = 0.02;
          const avoidanceDistance = 150;
          
          // Default movement based on particle direction
          let newX = particle.x + Math.cos(particle.direction * (Math.PI / 180)) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction * (Math.PI / 180)) * particle.speed;
          
          // Apply mouse influence if within range
          if (distance < 300) {
            const factor = distance < avoidanceDistance 
              ? -attractionFactor * (1 - distance / avoidanceDistance) // Repel when too close
              : attractionFactor * (1 - distance / 300); // Attract when at medium distance
            
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
            rotation: particle.rotation + 0.2,
          };
        })
      );
    }, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, [particles, mousePosition, windowSize]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-gray-400 dark:text-gray-600 select-none"
          style={{
            x: particle.x,
            y: particle.y,
            fontSize: `${particle.size}px`,
            rotate: particle.rotation,
            opacity: 0.2,
            fontWeight: 'bold',
            filter: 'blur(1px)',
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            opacity: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            },
            scale: { duration: 0.5 }
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
} 