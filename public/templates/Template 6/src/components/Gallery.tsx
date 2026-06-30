"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { weddingData } from "@/lib/constants";
import { X } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.4em] uppercase font-bold text-gold/60 mb-4 block">Our Memories</span>
          <h2 className="text-4xl md:text-5xl font-serif text-accent">Gallery Our Moment</h2>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {weddingData.gallery.map((item, idx) => (
            <div key={idx} className="break-inside-avoid mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx % 3 * 0.1 }}
                onClick={() => setSelectedImage(item.src)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-soft bg-beige/5"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-accent/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/90 text-accent px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Lihat Foto
                  </div>
                </div>

                {/* Decorative Border on hover */}
                <div className="absolute inset-3 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 z-[210] text-white/70 hover:text-white transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl h-full flex items-center justify-center"
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
