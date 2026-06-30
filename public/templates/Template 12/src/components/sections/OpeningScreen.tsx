"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import WaxSeal from '../ui/WaxSeal';
import VintageOrnament from '../ui/VintageOrnament';

interface OpeningScreenProps {
  onOpen: () => void;
}

const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Terhormat';

  const handleOpen = () => {
    setIsOpen(true);
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-vintage-cream overflow-hidden"
        >
          {/* Background Texture & Grain */}
          <div className="paper-overlay"></div>
          <div className="grain-overlay grain-overlay-animated opacity-40"></div>
          <div className="vignette-overlay"></div>

          {/* Couple Photo Overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Image 
              src="/assets/Image/overlay.webp" 
              alt="Couple" 
              fill 
              className="object-cover grayscale mix-blend-multiply"
            />
          </motion.div>

          {/* Decorative Ornaments */}
          <VintageOrnament className="absolute -top-10 -left-10 w-64 h-64 opacity-20 rotate-180 pointer-events-none grayscale sepia z-10" />
          <VintageOrnament className="absolute -bottom-10 -right-10 w-64 h-64 opacity-20 pointer-events-none grayscale sepia z-10" />

          <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <WaxSeal text="A & C" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="serif-text text-vintage-brown/80 uppercase tracking-[0.5em] text-xs mb-4 weathered-text"
            >
              Wedding Invitation
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="script-text text-5xl sm:text-6xl md:text-8xl whitespace-nowrap text-vintage-brown mb-2 gold-glow"
            >
              Anwar & Cipung
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="serif-text text-vintage-gold font-bold tracking-[0.3em] mb-12 text-sm"
            >
              Rabu, 15 Maret 2027
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-12"
            >
              <p className="serif-text text-vintage-brown/60 text-xs uppercase tracking-widest mb-4">Kepada Bapak/Ibu/Saudara/i</p>
              <div className="bg-white/30 backdrop-blur-sm border-y border-vintage-gold/20 py-6 px-10 rounded-3xl shadow-inner">
                <h2 className="serif-text text-2xl md:text-3xl text-vintage-brown font-bold tracking-wider">{guestName}</h2>
              </div>
              <p className="serif-text text-[10px] text-vintage-brown/40 mt-6 italic max-w-xs mx-auto leading-relaxed">
                Mohon maaf apabila ada kesalahan penulisan nama dan gelar.
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="flex items-center gap-3 bg-vintage-brown text-vintage-cream px-10 py-4 rounded-xl shadow-2xl hover:bg-vintage-gold transition-all duration-300 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-10"></div>
              <MailOpen size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="serif-text font-bold tracking-[0.3em] uppercase text-xs">Open Invitation</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningScreen;
