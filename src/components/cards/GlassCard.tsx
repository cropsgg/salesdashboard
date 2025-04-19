import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
};

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
}) => {
  return (
    <motion.div
      className={classNames(
        'backdrop-blur-md bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-xl shadow-lg p-4',
        {
          'hover:bg-white/20 dark:hover:bg-slate-800/30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1': hoverEffect,
          'cursor-pointer': !!onClick,
        },
        className
      )}
      onClick={onClick}
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard; 