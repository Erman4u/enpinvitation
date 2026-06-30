"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "@/lib/constants";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center p-4">
      {/* Parallax Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="/assets/Image/hero.webp"
          alt="Wedding Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>
 
      {/* Hero Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center text-white w-full max-w-lg mb-12 md:mb-0"
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           viewport={{ once: true }}
           className="bg-white/10 backdrop-blur-md border border-white/20 py-10 px-6 md:p-20 rounded-full inline-flex flex-col items-center shadow-2xl backdrop-saturate-150"
        >
          <p className="font-sans tracking-[0.4em] uppercase text-[9px] md:text-sm mb-4 md:mb-6 opacity-70">
            The Wedding Of
          </p>
          <h1 className="font-serif text-4xl md:text-8xl mb-4 text-gold drop-shadow-2xl px-4">
            {weddingData.couple.groom.firstName} & {weddingData.couple.bride.firstName}
          </h1>
          <div className="w-10 md:w-16 h-[1px] md:h-[2px] bg-gold/60 mb-6 md:mb-8" />
          <div className="space-y-4">
            <p className="font-serif text-md md:text-2xl tracking-[0.2em] md:tracking-widest italic opacity-95">
              Save The Date
            </p>
            <p className="font-serif text-sm md:text-xl tracking-widest text-gold/90">
              15 . 03 . 2027
            </p>
          </div>
        </motion.div>
      </motion.div>
 
      {/* Decorative Elements */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[8px] md:text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  );
}
