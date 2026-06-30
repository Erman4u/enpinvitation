import React from 'react';

const VintageOrnament = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`${className} text-vintage-gold`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M100 20C100 20 110 50 140 50C170 50 180 80 180 100C180 120 170 150 140 150C110 150 100 180 100 180C100 180 90 150 60 150C30 150 20 120 20 100C20 80 30 50 60 50C90 50 100 20 100 20Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M100 50C100 50 105 70 120 70C135 70 140 85 140 100C140 115 135 130 120 130C105 130 100 150 100 150C100 150 95 130 80 130C65 130 60 115 60 100C60 85 65 70 80 70C95 70 100 50 100 50Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="1" />
        <path
          d="M100 20V40M100 160V180M20 100H40M160 100H180"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Curlicues */}
        <path
          d="M70 40C60 30 40 40 50 60M130 40C140 30 160 40 150 60M70 160C60 170 40 160 50 140M130 160C140 170 160 160 150 140"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default VintageOrnament;
