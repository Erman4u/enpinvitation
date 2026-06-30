import React from 'react';
import { motion } from 'framer-motion';

interface WaxSealProps {
  className?: string;
  text?: string;
}

const WaxSeal: React.FC<WaxSealProps> = ({ className = "", text = "B&C" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      className={`relative w-20 h-20 flex items-center justify-center ${className}`}
    >
      {/* Outer irregular shape of wax */}
      <div className="absolute inset-0 bg-[#A52A2A] rounded-full opacity-90 shadow-lg border-2 border-[#8B0000]" 
           style={{ borderRadius: '45% 55% 50% 50% / 50% 50% 45% 55%' }}></div>
      <div className="absolute inset-2 bg-[#8B0000] rounded-full opacity-40 blur-[1px]"></div>
      
      {/* Inner seal circle */}
      <div className="relative w-14 h-14 rounded-full border-2 border-[#5C0000]/30 flex items-center justify-center shadow-inner overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20"></div>
        <span className="script-text text-xl text-[#FFD700]/70 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] select-none">
          {text}
        </span>
      </div>
      
      {/* Glossy highlight */}
      <div className="absolute top-3 left-4 w-4 h-4 bg-white/10 rounded-full blur-[2px]"></div>
    </motion.div>
  );
};

export default WaxSeal;
