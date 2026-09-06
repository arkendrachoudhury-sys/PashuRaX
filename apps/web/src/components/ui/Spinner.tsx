import React from 'react';
import { cn } from './Button';

export const Spinner = ({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = { sm: 'h-4 w-4 border-2', md: 'h-8 w-8 border-2', lg: 'h-12 w-12 border-4' };
  return (
    <div className="flex justify-center items-center">
      <div className={cn("animate-spin rounded-full border-gray-300 border-t-primary", sizes[size], className)} />
    </div>
  );
};
