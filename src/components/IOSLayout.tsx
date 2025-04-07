import React from 'react';

interface IOSLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export const IOSLayout: React.FC<IOSLayoutProps> = ({ 
  children, 
  backgroundColor = '#4A90E2' 
}) => {
  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Status Bar Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-[44px]"
        style={{ backgroundColor }}
      />
      
      {/* Content Container */}
      <div className="relative w-full h-full max-w-[375px] mx-auto pt-[44px] px-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}; 