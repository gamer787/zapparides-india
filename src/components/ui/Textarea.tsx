import React from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-3 rounded-2xl bg-gray-800 border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500",
        className
      )}
      {...props}
    />
  );
}