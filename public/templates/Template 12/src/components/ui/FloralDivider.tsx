import React from 'react';

const FloralDivider = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="h-[1px] w-12 md:w-24 bg-vintage-gold/30"></div>
      <div className="mx-4 text-vintage-gold">
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 md:w-10 md:h-10"
        >
          <path
            d="M50 10C50 10 55 30 75 30C95 30 90 50 75 50C60 50 55 45 50 65C45 45 40 50 25 50C10 50 5 30 25 30C45 30 50 10 50 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="40" r="3" fill="currentColor" />
          <path
            d="M50 65V90"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="h-[1px] w-12 md:w-24 bg-vintage-gold/30"></div>
    </div>
  );
};

export default FloralDivider;
