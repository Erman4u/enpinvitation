"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import VintageFrame from '../ui/VintageFrame';
import FloralDivider from '../ui/FloralDivider';
import TornEdge from '../ui/TornEdge';
import VintageOrnament from '../ui/VintageOrnament';
import { Camera } from 'lucide-react';

const Mempelai = () => {
  return (
    <section id="mempelai" className="py-24 bg-vintage-ivory/40 relative overflow-hidden">
      <TornEdge position="top" />
      
      <div className="container mx-auto px-6 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="w-48 h-20 mx-auto mb-8 opacity-60 grayscale sepia">
            <Image src="/assets/Image/bismillah.webp" alt="Bismillah" width={200} height={80} className="w-full h-full object-contain" />
          </div>
          <p className="serif-text italic text-vintage-brown-dark text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed weathered-text">
            "Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)."
          </p>
          <p className="serif-text text-sm mt-4 opacity-50 italic uppercase tracking-widest">QS. Adh-Dhariyat: 49</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-32">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="relative group">
              <div className="absolute -inset-4 border border-vintage-gold/20 rounded-full rotate-3 pointer-events-none group-hover:rotate-0 transition-transform duration-1000"></div>
              <VintageFrame className="mb-10 shadow-2xl">
                <div className="relative w-64 h-80 md:w-72 md:h-96 transition-all duration-1000">
                  <Image
                    src="/assets/Image/pria.jpg"
                    alt="Groom"
                    fill
                    className="object-cover sepia-[0.3] hover:sepia-0 transition-all duration-700"
                  />
                </div>
              </VintageFrame>
            </div>
            <h3 className="script-text text-6xl text-vintage-brown mb-4 gold-glow">Anwar</h3>
            <p className="serif-text font-bold text-vintage-brown/60 uppercase tracking-widest text-xs mb-4">Putra ke-1 Dari :</p>
            <p className="serif-text text-vintage-brown text-lg font-medium weathered-text">Bapak Bertos & Ibu Beti</p>
            <a href="https://instagram.com/anwar" target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-3 text-vintage-gold hover:text-vintage-brown transition-all hover:scale-110">
              <Camera size={18} />
              <span className="serif-text text-sm tracking-widest">@anwar</span>
            </a>
          </motion.div>

          {/* & Divider */}
          <div className="hidden lg:block relative">
             <span className="script-text text-8xl text-vintage-gold opacity-30 select-none">&</span>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-vintage-gold/10 rounded-full animate-pulse"></div>
          </div>
          <div className="lg:hidden w-full py-4">
            <FloralDivider />
          </div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="relative group">
              <div className="absolute -inset-4 border border-vintage-gold/20 rounded-full -rotate-3 pointer-events-none group-hover:rotate-0 transition-transform duration-1000"></div>
              <VintageFrame className="mb-10 shadow-2xl">
                <div className="relative w-64 h-80 md:w-72 md:h-96 transition-all duration-1000">
                  <Image
                    src="/assets/Image/wanita.jpg"
                    alt="Bride"
                    fill
                    className="object-cover sepia-[0.3] hover:sepia-0 transition-all duration-700"
                  />
                </div>
              </VintageFrame>
            </div>
            <h3 className="script-text text-6xl text-vintage-brown mb-4 gold-glow">Cipung</h3>
            <p className="serif-text font-bold text-vintage-brown/60 uppercase tracking-widest text-xs mb-4">Putri ke-2 Dari :</p>
            <p className="serif-text text-vintage-brown text-lg font-medium weathered-text">Bapak Ronald & Ibu Risma</p>
            <a href="https://instagram.com/cipung" target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-3 text-vintage-gold hover:text-vintage-brown transition-all hover:scale-110">
              <Camera size={18} />
              <span className="serif-text text-sm tracking-widest">@cipung</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Corner Ornaments */}
      <VintageOrnament className="absolute top-10 right-10 w-48 h-48 opacity-10 pointer-events-none rotate-90" />
      <VintageOrnament className="absolute bottom-10 left-10 w-48 h-48 opacity-10 pointer-events-none -rotate-90" />

      <TornEdge position="bottom" />
    </section>
  );
};

export default Mempelai;
