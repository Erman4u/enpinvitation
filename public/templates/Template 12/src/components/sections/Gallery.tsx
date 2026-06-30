"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import VintageFrame from '../ui/VintageFrame';
import TornEdge from '../ui/TornEdge';
import VintageOrnament from '../ui/VintageOrnament';

const Gallery = () => {
  const images = [
    { src: '/assets/Image/galery.webp', alt: 'Gallery 1', span: 'col-span-2 row-span-2' },
    { src: '/assets/Image/hero.webp', alt: 'Gallery 2', span: 'col-span-1 row-span-1' },
    { src: '/assets/Image/galery3.webp', alt: 'Gallery 3', span: 'col-span-1 row-span-1' },
    { src: '/assets/Image/galery4.webp', alt: 'Slider 1', span: 'col-span-1 row-span-1' },
    { src: '/assets/Image/galery5.webp', alt: 'Slider 2', span: 'col-span-1 row-span-1' },
    { src: '/assets/Image/overlay.webp', alt: 'Slider 3', span: 'col-span-2 row-span-1' },
  ];

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-vintage-ivory/20">
      <TornEdge position="top" />
      
      <div className="container mx-auto px-6 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="serif-text text-vintage-gold tracking-[0.5em] uppercase text-xs mb-4 weathered-text">Our Memories</p>
          <h2 className="script-text text-7xl text-vintage-brown gold-glow">Gallery Our Moment</h2>
          <div className="w-20 h-[1px] bg-vintage-gold/50 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`${img.span} relative group cursor-pointer`}
            >
              <VintageFrame className="h-full shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-vintage-brown/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="serif-text text-white text-xs uppercase tracking-widest border border-white/40 px-4 py-2">Lihat Foto</span>
                  </div>
                </div>
              </VintageFrame>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Ornaments */}
      <VintageOrnament className="absolute top-10 right-10 w-48 h-48 opacity-10 pointer-events-none rotate-90" />
      <VintageOrnament className="absolute bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none -scale-x-100" />
    </section>
  );
};

export default Gallery;
