import React, { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'gradient';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Button3DProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  depth?: number;
}

const Button3D = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  className = '',
  onClick,
  href,
  depth = 6,
  ...props
}: Button3DProps) => {
  // Color variants
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-gray-400/20 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:shadow-gray-900/30',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30',
    info: 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/30',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white shadow-gray-900/30',
    light: 'bg-white hover:bg-gray-100 text-gray-800 shadow-gray-300/30 border border-gray-200',
    gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-blue-500/30',
  };

  // Size variants
  const sizeClasses: Record<ButtonSize, string> = {
    xs: 'text-xs px-2 py-1 rounded',
    sm: 'text-sm px-3 py-1.5 rounded-md',
    md: 'text-base px-4 py-2 rounded-lg',
    lg: 'text-lg px-5 py-2.5 rounded-lg',
    xl: 'text-xl px-6 py-3 rounded-xl',
  };

  // Construct the base classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-200
    ${variantClasses[variant]} 
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  // 3D effect styles
  const getBeforeStyle = () => {
    return {
      content: '""',
      position: 'absolute',
      inset: '0',
      borderRadius: 'inherit',
      opacity: '0',
      transition: 'opacity 0.2s ease'
    };
  };

  // Component rendering
  const ButtonContent = () => (
    <>
      {isLoading && (
        <motion.div 
          className="mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full" />
        </motion.div>
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  // Handle the button or anchor rendering
  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        style={{ position: 'relative' }}
        initial={{ y: 0 }}
        whileHover={{ y: -depth/2 }}
        whileTap={{ y: 0 }}
      >
        <motion.span 
          className="block relative z-10"
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ButtonContent />
        </motion.span>
        <motion.div
          className={`absolute inset-x-0 bottom-0 -z-10 h-${depth} bg-black/20 blur-md rounded-xl`}
          initial={{ opacity: 0.3, y: depth/2 }}
          whileHover={{ opacity: 0.5, y: depth, scale: 0.95 }}
          whileTap={{ opacity: 0.2, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.a>
    );
  }

  // Create a safe subset of props for the button element
  const buttonProps: HTMLMotionProps<"button"> = {
    onClick,
    disabled: isDisabled || isLoading,
    className: baseClasses,
    style: { position: 'relative' }
  };

  return (
    <motion.button
      {...buttonProps}
      initial={{ y: 0 }}
      whileHover={isDisabled ? {} : { y: -depth/2 }}
      whileTap={isDisabled ? {} : { y: 0 }}
    >
      <motion.span 
        className="block relative z-10"
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <ButtonContent />
      </motion.span>
      <motion.div
        className={`absolute inset-x-0 bottom-0 -z-10 h-${depth} bg-black/20 blur-md rounded-xl`}
        initial={{ opacity: 0.3, y: depth/2 }}
        whileHover={isDisabled ? {} : { opacity: 0.5, y: depth, scale: 0.95 }}
        whileTap={isDisabled ? {} : { opacity: 0.2, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.button>
  );
};

export default Button3D; 