import React from 'react';

interface VintageFrameProps {
  children: React.ReactNode;
  className?: string;
}

const VintageFrame: React.FC<VintageFrameProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative p-6 ${className}`}>
      {/* Complex Ornate Outer Border */}
      <div className="absolute inset-0 border-[3px] border-vintage-gold/50 m-2 pointer-events-none rounded-lg shadow-inner"></div>
      <div className="absolute inset-0 border-[1px] border-vintage-gold/30 m-4 pointer-events-none"></div>
      
      {/* Floral Corners SVGs */}
      <svg className="absolute top-0 left-0 w-16 h-16 text-vintage-gold/80 -translate-x-1 -translate-y-1" viewBox="0 0 100 100">
        <path d="M10,10 Q30,10 30,30 Q30,50 10,50 Q20,30 10,10 Z" fill="currentColor" opacity="0.4" />
        <path d="M5,5 L20,5 L20,20" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
      <svg className="absolute top-0 right-0 w-16 h-16 text-vintage-gold/80 translate-x-1 -translate-y-1 rotate-90" viewBox="0 0 100 100">
        <path d="M10,10 Q30,10 30,30 Q30,50 10,50 Q20,30 10,10 Z" fill="currentColor" opacity="0.4" />
        <path d="M5,5 L20,5 L20,20" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-16 h-16 text-vintage-gold/80 -translate-x-1 translate-y-1 -rotate-90" viewBox="0 0 100 100">
        <path d="M10,10 Q30,10 30,30 Q30,50 10,50 Q20,30 10,10 Z" fill="currentColor" opacity="0.4" />
        <path d="M5,5 L20,5 L20,20" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-16 h-16 text-vintage-gold/80 translate-x-1 translate-y-1 rotate-180" viewBox="0 0 100 100">
        <path d="M10,10 Q30,10 30,30 Q30,50 10,50 Q20,30 10,10 Z" fill="currentColor" opacity="0.4" />
        <path d="M5,5 L20,5 L20,20" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>

      <div className="relative z-0 h-full w-full overflow-hidden bg-white/50 shadow-[inset_0_0_20px_rgba(93,64,55,0.1)] ring-1 ring-vintage-gold/20">
        {children}
      </div>
    </div>
  );
};

export default VintageFrame;
