"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import VintageFrame from '../ui/VintageFrame';
import TornEdge from '../ui/TornEdge';
import VintageOrnament from '../ui/VintageOrnament';

const LoveStory = () => {
  const stories = [
    {
      date: "Januari 2024",
      title: "Awal Pertemuan",
      content: "Berawal dari pertemuan tak sengaja di sebuah perpustakaan kota, Anwar terkesima dengan ketenangan Cipung yang sedang asyik membaca buku. Sebuah teguran sederhana menjadi awal dari diskusi panjang tentang mimpi dan hobi yang ternyata saling bertautan.",
      image: "/assets/Image/galery3.webp"
    },
    {
      date: "Agustus 2025",
      title: "Menjalin Komitmen",
      content: "Setelah melewati berbagai suka dan duka bersama, Anwar dan Cipung memutuskan untuk melangkah ke jenjang yang lebih serius. Mereka menyadari bahwa perbedaan yang ada justru menjadi pelengkap sempurna dalam perjalanan hidup mereka menuju masa depan.",
      image: "/assets/Image/galery2.webp"
    },
    {
      date: "Maret 2027",
      title: "Menuju Ridha Allah",
      content: "Dengan restu dari kedua orang tua, kini Anwar dan Cipung siap mengikat janji suci di hadapan Allah SWT. Pernikahan ini bukanlah akhir, melainkan awal dari petualangan panjang yang akan mereka jalani bersama selamanya.",
      image: "/assets/Image/galery5.webp"
    }
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const ornamentY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} id="story" className="py-24 relative overflow-hidden bg-vintage-cream">
      <TornEdge position="top" />

      <div className="container mx-auto px-6 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="serif-text text-vintage-gold tracking-[0.6em] uppercase text-xs mb-4 weathered-text">Our Journey</p>
          <h2 className="script-text text-7xl text-vintage-brown gold-glow">Kisah Cinta</h2>
          <div className="w-24 h-[1px] bg-vintage-gold/40 mx-auto mt-8"></div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-4">
          {stories.map((story, index) => (
            <div key={index} className={`relative flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20 mb-32`}>
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <VintageFrame className="shadow-2xl">
                  <div className="relative aspect-[4/3] md:aspect-square">
                    <Image src={story.image} alt={story.title} fill className="object-cover" />
                  </div>
                </VintageFrame>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full md:w-1/2 text-center md:text-left"
              >
                <div className={`bg-white/40 backdrop-blur-sm border border-vintage-gold/20 p-8 md:p-12 rounded-3xl shadow-xl hover:border-vintage-gold/50 transition-all group relative ${index % 2 === 0 ? 'md:border-l-4' : 'md:border-r-4'} border-vintage-gold`}>
                  {/* Decorative corner icon */}
                  <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Heart size={40} />
                  </div>

                  <span className="serif-text text-vintage-gold font-bold text-sm tracking-[0.3em] uppercase">{story.date}</span>
                  <h3 className="serif-text text-2xl font-bold text-vintage-brown mt-3 mb-6 uppercase tracking-wider weathered-text">{story.title}</h3>
                  <p className="font-mono text-vintage-brown/90 leading-relaxed text-xs md:text-sm tracking-tighter border-l-2 border-vintage-gold/20 pl-4">
                    {story.content}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Corner Ornaments */}
      <motion.div style={{ y: ornamentY }} className="absolute top-10 left-10 w-48 h-48 opacity-10 pointer-events-none rotate-180">
        <VintageOrnament />
      </motion.div>
      <motion.div style={{ y: ornamentY }} className="absolute bottom-10 right-10 w-48 h-48 opacity-10 pointer-events-none">
        <VintageOrnament />
      </motion.div>

      <TornEdge position="bottom" />
    </section>
  );
};

export default LoveStory;
