import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'android';
  isLoading?: boolean;
  icon?: React.ReactNode;
  label?: string;
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  isLoading,
  icon,
  label,
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "relative font-bold py-4 px-8 rounded-full text-lg transition-all transform";
  
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-600 text-black shadow-lg shadow-cyan-500/20",
    secondary: "bg-gradient-to-r from-blue-500 to-cyan-500 text-black shadow-lg shadow-blue-500/20",
    outline: "border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 shadow-lg shadow-cyan-500/10",
    android: "bg-teal-400 hover:bg-teal-500 text-black shadow-lg shadow-teal-500/20"
  };

  const styles = cn(
    baseStyles,
    variants[variant],
    (isLoading || disabled) && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <motion.button 
      className={styles} 
      disabled={isLoading || disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {icon}
        {label || children}
      </span>
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full",
          variant === 'android' ? "bg-gradient-to-r from-teal-400/20 to-emerald-500/20" : "bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}