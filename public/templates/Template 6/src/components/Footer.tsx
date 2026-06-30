"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/constants";
import { Instagram, Globe } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-accent pb-20 pt-32 text-center text-white overflow-hidden">
      {/* Background with darker overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image 
          src="/assets/Image/gallery6.webp" 
          alt="Overlay" 
          fill 
          className="object-cover grayscale"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
        >
          <div className="flex justify-center mb-8">
            <span className="font-serif text-5xl md:text-6xl text-gold">
                {weddingData.couple.groom.firstName} & {weddingData.couple.bride.firstName}
            </span>
          </div>

          <p className="text-xl md:text-3xl font-serif italic mb-12 text-white/90 leading-relaxed">
            "dan sesungguhnya Dialah yang menciptakan pasangan laki-laki dan perempuan,"
            <br />
            <span className="not-italic font-sans text-xs tracking-widest uppercase mt-4 block font-bold text-gold/60">
                QS. An-Najm: 45
            </span>
          </p>

          <p className="text-sm md:text-md text-white/70 max-w-xl mx-auto leading-relaxed mb-20 italic">
            Alhamdulillahirabbil'alamin. Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami. Wassalamualaikum Warahmatullahi Wabarakatuh.
          </p>

          <div className="h-[1px] w-full bg-white/10 mb-12" />

          <div className="space-y-6">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Kami Yang Berbahagia</p>
            <p className="font-serif text-3xl md:text-4xl text-white">Joko & Mega</p>
            <p className="font-sans text-xs text-white/50 tracking-widest uppercase">Keluarga Besar Bapak Mulyono & Bapak Sukijan</p>
          </div>

          <div className="mt-32 space-y-6">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Created with love by</p>
            <h4 className="font-serif text-2xl text-gold/80">EnP Digital Service</h4>
            <div className="flex justify-center gap-6 text-white/40">
                <a href={`https://wa.me/${weddingData.contact.whatsapp}`} className="hover:text-gold transition-colors">
                    <span className="text-xs uppercase tracking-widest font-bold">WA: {weddingData.contact.whatsapp}</span>
                </a>
                <a href={`https://instagram.com/${weddingData.contact.instagram}`} className="hover:text-gold transition-colors flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-widest font-bold">@{weddingData.contact.instagram}</span>
                </a>
            </div>
          </div>
          
          <p className="mt-20 text-[10px] text-white/20 uppercase tracking-[0.2em]">
            Copyright © 2026 EnP Digital Service. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
