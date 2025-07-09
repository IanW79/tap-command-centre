
import React from 'react';

interface TAPintoBrandProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  trademarkStyle?: 'default' | 'black-small';
}

export const TAPintoBrand: React.FC<TAPintoBrandProps> = ({ 
  className = '', 
  size = 'md',
  trademarkStyle = 'default'
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl', 
    lg: 'text-4xl',
    xl: 'text-5xl'
  };

  const getTrademarkClasses = () => {
    if (trademarkStyle === 'black-small') {
      return 'text-black text-sm absolute top-0 -right-1';
    }
    return 'absolute top-0 -right-1 text-xs';
  };

  return (
    <span className={`font-bold ${sizeClasses[size]} ${className}`}>
      <span className="text-tapinto-blue">TAP</span>
      <span className="text-tapinto-orange relative">
        into
        <span className={getTrademarkClasses()}>®</span>
      </span>
    </span>
  );
};
