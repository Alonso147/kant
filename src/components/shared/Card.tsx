import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  fullHeight?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  action,
  fullHeight = false
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden ${fullHeight ? 'h-full' : ''} ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-medium text-sm text-neutral-800">{title}</h3>
          {action && <div className="flex">{action}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;