'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green' | 'blue' | 'purple' | 'amber' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      case 'amber': return 'bg-amber-100 text-amber-800';
      case 'red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeClasses = () => {
    return size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
  };

  return (
    <span className={`${getSizeClasses()} ${getVariantClasses()} rounded-full font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Badge;