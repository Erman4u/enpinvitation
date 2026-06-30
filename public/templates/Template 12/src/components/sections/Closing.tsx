"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FloralDivider from '../ui/FloralDivider';
import TornEdge from '../ui/TornEdge';
import WaxSeal from '../ui/WaxSeal';
import VintageOrnament from '../ui/VintageOrnament';

const Closing = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-vintage-cream text-center">
      <TornEdge position="top" />
      
      <div className="container mx-auto px-6 relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="w-24 h-24 mx-auto mb-10 opacity-30 grayscale sepia">
            <VintageOrnament />
          </div>

          <h2 className="script-text text-7xl text-vintage-brown mb-10 gold-glow">Anwar & Cipung</h2>
          
          <p className="serif-text italic text-vintage-brown text-lg md:text-xl mb-12 leading-relaxed weathered-text">
            Alhamdulillahirabbil'alamin. Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami. Wassalamualaikum Warahmatullahi Wabarakatuh.
          </p>

          <FloralDivider className="opacity-40 my-16" />

          <div className="mt-12 space-y-6">
            <p className="serif-text font-bold text-vintage-gold tracking-[0.4em] uppercase text-xs">Kami Yang Berbahagia</p>
            <h3 className="script-text text-6xl text-vintage-brown gold-glow">Anwar & Cipung</h3>
            <div className="pt-8">
               <p className="serif-text text-sm text-vintage-brown/60 tracking-widest uppercase weathered-text">Keluarga Besar Bapak Bertos & Bapak Ronald</p>
            </div>
          </div>

          <div className="mt-40 pt-16 border-t border-vintage-gold/20 relative">
            {/* Wax Seal as a stamp of quality */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 scale-75">
               <WaxSeal text="ENP" />
            </div>
            
            <p className="serif-text text-[10px] uppercase tracking-[0.5em] text-vintage-brown/40 mb-6">Handcrafted with heart by</p>
            <h4 className="serif-text font-bold text-vintage-brown tracking-[0.3em] text-lg uppercase gold-glow">EnP Digital Service</h4>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 mt-6 text-[10px] serif-text text-vintage-brown/50 tracking-[0.2em] uppercase">
              <p className="flex items-center justify-center gap-2">WhatsApp: 082229243737</p>
              <p className="flex items-center justify-center gap-2">Instagram: @enpdigitalservice</p>
            </div>
            <p className="mt-12 text-[9px] serif-text opacity-30 tracking-widest">© 2026 ENP DIGITAL SERVICE. ALL RIGHTS RESERVED.</p>
          </div>
        </motion.div>
      </div>

      {/* Final Ornaments */}
      <VintageOrnament className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none" />
      <VintageOrnament className="absolute bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none rotate-180" />
    </section>
  );
};

export default Closing;
