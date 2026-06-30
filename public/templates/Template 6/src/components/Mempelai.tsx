"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { weddingData } from "@/lib/constants";
import Image from "next/image";

export default function Mempelai() {
  const { groom, bride } = weddingData.couple;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <Image 
                src="/assets/Image/bismillah.webp" 
                alt="Bismillah" 
                width={200} 
                height={50} 
                className="opacity-80"
            />
          </div>
          <p className="text-accent/80 leading-relaxed max-w-2xl mx-auto italic font-serif">
            "Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)."
            <br />
            <span className="not-italic font-sans text-xs tracking-widest uppercase mt-2 block font-bold">
              QS. Adh-Dhariyat: 49
            </span>
          </p>
        </motion.div>

        {/* Profiles */}
        <div className="grid md:grid-cols-11 items-center gap-12 md:gap-4">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-5 text-center md:text-right"
          >
            <div className="relative w-64 h-80 mx-auto md:ml-auto md:mr-0 mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image src={groom.image} alt={groom.fullName} fill className="object-cover" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-2">{groom.fullName}</h2>
            <p className="text-accent/90 font-medium mb-4">{groom.childOrder} Dari :</p>
            <p className="text-accent/70 text-sm leading-loose mb-6">
              {groom.parents}
            </p>
            <a 
              href={groom.instagram} 
              target="_blank" 
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span className="text-sm font-semibold tracking-widest uppercase">@Blacky</span>
            </a>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:flex md:col-span-1 h-32 justify-center items-center">
            <span className="font-serif text-5xl text-gold/20 italic">&</span>
          </div>
          <div className="md:hidden text-center text-4xl text-gold/30 font-serif mb-8">&</div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-5 text-center md:text-left"
          >
            <div className="relative w-64 h-80 mx-auto md:mr-auto md:ml-0 mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image src={bride.image} alt={bride.fullName} fill className="object-cover" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-2">{bride.fullName}</h2>
            <p className="text-accent/90 font-medium mb-4">{bride.childOrder} Dari :</p>
            <p className="text-accent/70 text-sm leading-loose mb-6">
              {bride.parents}
            </p>
            <a 
              href={bride.instagram} 
              target="_blank" 
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span className="text-sm font-semibold tracking-widest uppercase">@Cimeng</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
