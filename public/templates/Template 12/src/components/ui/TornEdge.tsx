import React from 'react';

interface TornEdgeProps {
  position: 'top' | 'bottom';
  className?: string;
  color?: string;
}

const TornEdge: React.FC<TornEdgeProps> = ({ position, className = "", color = "#FDF5E6" }) => {
  return (
    <div 
      className={`absolute left-0 w-full h-8 z-20 pointer-events-none ${position === 'top' ? 'top-0' : 'bottom-0'} ${className}`}
    >
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className={`w-full h-full fill-current ${position === 'bottom' ? 'rotate-180' : ''}`}
        style={{ color }}
      >
        <path d="M0,0 L1200,0 L1200,80 C1100,70 1000,90 900,80 C800,70 700,90 600,80 C500,70 400,90 300,80 C200,70 100,90 0,80 Z" />
        <path d="M0,0 L1200,0 L1200,40 C1150,35 1100,45 1050,40 C1000,35 950,45 900,40 C850,35 800,45 750,40 C700,35 650,45 600,40 C550,35 500,45 450,40 C400,35 350,45 300,40 C250,35 200,45 150,40 C100,35 50,45 0,40 Z" opacity="0.5" />
      </svg>
    </div>
  );
};

export default TornEdge;
