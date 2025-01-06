import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-4 py-3 rounded-full bg-gray-800 border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500",
        className
      )}
      {...props}
    />
  );
}