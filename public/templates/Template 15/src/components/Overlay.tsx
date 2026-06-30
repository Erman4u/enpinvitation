"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Sparkles, Calendar, Mail } from "lucide-react/dist/cjs/lucide-react.js";
import Image from "next/image";

interface OverlayProps {
  onOpen: () => void;
  guestName?: string;
}

export default function Overlay({ onOpen, guestName = "Tamu Undangan" }: OverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 800);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-gray-900 overflow-hidden py-8 px-6 h-[100dvh]"
        >
          {/* Animated Background Elements - Optimized for Mobile */}
          {isMounted && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.1, 0.2, 0.1], 
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                  }}
                  transition={{ 
                    duration: 15 + i * 5, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute w-64 h-64 rounded-full blur-[80px] will-change-transform"
                  style={{ 
                    backgroundColor: i % 2 === 0 ? '#FFD1DC' : '#B2E2F2',
                    left: `${20 + i * 20}%`,
                    top: `${20 + i * 15}%`
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6 flex flex-col items-center"
            >
              <span className="text-sm font-black tracking-[0.5em] uppercase text-gray-400">
                The Wedding Of
              </span>

              {/* Profile Card Style from Hero */}
              <div className="flex flex-col items-center gap-6">
                {/* Avatar Container */}
                <div className="relative p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-2xl">
                  <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white">
                    <Image 
                      src="/assets/Image/hero.jpg" 
                      alt="Aditya & Lestari"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Verification Badge */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                </div>

                <div className="text-center space-y-3">
                  <h2 className="text-2xl sm:text-3xl md:text-6xl font-heading font-bold text-gray-900 tracking-tight flex items-center justify-center gap-2 drop-shadow-md">
                    Aditya & Lestari <Sparkles className="text-yellow-400 w-5 h-5 md:w-8 md:h-8" />
                  </h2>
                  <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                    <span className="px-4 py-1.5 bg-pastel-pink text-gray-800 rounded-full shadow-sm font-bold text-xs md:text-sm">15.03.2027</span>
                    <span className="px-4 py-1.5 bg-baby-blue text-gray-800 rounded-full shadow-sm font-bold text-xs md:text-sm">#AdityaLestari</span>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4 pt-4 w-full"
              >
                <div className="flex flex-col items-center gap-2">
                  <Mail size={20} className="text-gray-400 mb-2" />
                  <p className="text-sm font-medium tracking-widest uppercase text-gray-500">
                    Kepada Yth. Bapak/Ibu/Saudara/i
                  </p>
                  <div className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl shadow-lg w-full max-w-sm">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-800 drop-shadow-sm">
                      {guestName}
                    </h2>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="group relative mt-2 px-7 py-3 bg-gray-900 text-white font-heading font-bold text-sm sm:text-base rounded-full shadow-xl transition-all flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pastel-pink/50 to-soft-purple/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Buka Undangan</span>
              <Sparkles size={20} className="relative z-10 text-yellow-400 group-hover:rotate-12 transition-transform" />
            </motion.button>
          </div>

          {/* Floating Icons at Bottom */}
          <div className="absolute bottom-6 flex gap-8 md:gap-12 opacity-20 text-soft-purple">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}><Heart size={24} /></motion.div>
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}><Sparkles size={24} /></motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}><Heart size={24} fill="currentColor" /></motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
