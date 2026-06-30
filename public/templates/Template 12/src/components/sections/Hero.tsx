"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import VintageFrame from '../ui/VintageFrame';
import TornEdge from '../ui/TornEdge';
import VintageOrnament from '../ui/VintageOrnament';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-vintage-cream">
      <style jsx global>{`
        @keyframes noise-anim {
          0% { transform: translate(0,0) }
          10% { transform: translate(-5%,-5%) }
          20% { transform: translate(-10%,5%) }
          30% { transform: translate(5%,-10%) }
          40% { transform: translate(-5%,15%) }
          50% { transform: translate(-10%,5%) }
          60% { transform: translate(15%,0) }
          70% { transform: translate(0,10%) }
          80% { transform: translate(-15%,0) }
          90% { transform: translate(10%,5%) }
          100% { transform: translate(5%,0) }
        }
        .grain-overlay-animated {
          animation: noise-anim 0.2s infinite steps(1);
        }
      `}</style>
      {/* Texture & Vignette */}
      <div className="paper-overlay"></div>
      <div className="vignette-overlay"></div>
      <div className="grain-overlay grain-overlay-animated opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mb-10"
          >
            <p className="serif-text text-vintage-brown/80 uppercase tracking-[0.6em] text-xs md:text-sm mb-6 weathered-text">
              Wedding Invitation
            </p>
            <h1 className="script-text text-[3.5rem] sm:text-6xl md:text-[8rem] lg:text-[10rem] whitespace-nowrap text-vintage-brown mb-2 leading-tight gold-glow">
              Anwar & Cipung
            </h1>
            <div className="h-[1px] w-48 bg-vintage-gold/40 mx-auto my-6"></div>
            <p className="serif-text text-vintage-gold italic tracking-[0.5em] text-lg md:text-2xl font-bold">
              15 . 03 . 2027
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="w-full max-w-xl mx-auto relative px-4"
          >
            {/* Ornate Frame Detail */}
            <div className="absolute -inset-4 border-[1px] border-vintage-gold/20 rounded-lg pointer-events-none -rotate-1"></div>
            
            <VintageFrame className="shadow-[0_20px_50px_rgba(93,64,55,0.3)] w-full max-w-sm mx-auto">
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden transition-all duration-1000 group">
                <Image
                  src="/assets/Image/galery2.webp"
                  alt="Anwar & Cipung"
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
                  priority
                />
              </div>
            </VintageFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="mt-16 animate-bounce opacity-40"
          >
            <p className="serif-text text-[9px] uppercase tracking-[0.5em]">Lanjut Ke Undangan</p>
            <div className="w-[1px] h-16 bg-vintage-gold/60 mx-auto mt-4"></div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Ornaments */}
      <VintageOrnament className="absolute top-10 left-10 w-48 h-48 opacity-15 pointer-events-none grayscale sepia" />
      <VintageOrnament className="absolute bottom-10 right-10 w-48 h-48 opacity-15 pointer-events-none rotate-180 grayscale sepia" />

      <TornEdge position="bottom" />
    </section>
  );
};

export default Hero;
