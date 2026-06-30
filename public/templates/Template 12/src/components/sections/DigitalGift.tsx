"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, MapPin, QrCode } from 'lucide-react';
import Image from 'next/image';
import TornEdge from '../ui/TornEdge';
import VintageOrnament from '../ui/VintageOrnament';

const DigitalGift = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const Card = ({ title, icon, details, copyText, id }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white/50 backdrop-blur-md border border-vintage-gold/20 p-8 rounded-2xl text-center shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 grayscale sepia">
         <VintageOrnament className="w-20 h-20" />
      </div>
      
      <div className="bg-vintage-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-vintage-gold border border-vintage-gold/20">
        {icon}
      </div>
      <h3 className="serif-text font-bold text-vintage-brown text-xl mb-4 uppercase tracking-widest gold-glow">{title}</h3>
      <div className="serif-text text-vintage-brown mb-6 space-y-1 weathered-text">
        {details.map((line: string, i: number) => (
          <p key={i} className={i === 0 ? 'font-bold text-lg' : ''}>{line}</p>
        ))}
      </div>
      
      {copyText && (
        <button
          onClick={() => copyToClipboard(copyText, id)}
          className="flex items-center gap-2 mx-auto bg-vintage-brown text-vintage-cream px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-vintage-gold transition-all"
        >
          {copied === id ? <Check size={14} /> : <Copy size={14} />}
          {copied === id ? "Berhasil Disalin" : "Salin Rekening"}
        </button>
      )}
    </motion.div>
  );

  return (
    <section id="gift" className="py-24 relative overflow-hidden bg-vintage-cream/50">
      <TornEdge position="top" />
      
      <div className="container mx-auto px-6 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Gift size={40} className="mx-auto mb-6 text-vintage-gold opacity-50" />
          <h2 className="script-text text-7xl text-vintage-brown gold-glow">Love Gift</h2>
          <p className="serif-text text-vintage-brown/70 max-w-lg mx-auto mt-8 text-sm leading-relaxed weathered-text">
            Doa restu Anda merupakan hadiah terindah bagi kami. Namun bagi Anda yang ingin memberikan tanda kasih, dapat melalui:
          </p>
          <button 
            onClick={() => setIsGiftOpen(!isGiftOpen)}
            className="mt-8 mx-auto flex items-center gap-2 bg-vintage-brown text-vintage-cream px-8 py-3 rounded-full text-sm font-bold tracking-widest hover:bg-vintage-gold transition-all"
          >
            {isGiftOpen ? "Tutup Kirim Hadiah" : "Kirim Hadiah"}
          </button>
        </motion.div>

        <AnimatePresence>
          {isGiftOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-10">
          <Card
            title="Bank BRI"
            icon={<Gift size={24} />}
            details={["Atas Nama: Anwar", "082229243737"]}
            copyText="082229243737"
            id="bank"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/40 backdrop-blur-md border border-vintage-gold/20 p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden flex flex-col items-center"
          >
             <div className="bg-vintage-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-vintage-gold">
               <QrCode size={24} />
             </div>
             <h3 className="serif-text font-bold text-vintage-brown text-xl mb-4 uppercase tracking-widest">QRIS Cipung</h3>
             <div className="relative w-40 h-40 bg-white p-2 rounded-lg mb-6 border border-vintage-gold/20">
               <Image src="/assets/Image/donate.webp" alt="QRIS" fill className="object-contain p-2" />
             </div>
             <p className="serif-text text-[10px] uppercase tracking-widest text-vintage-brown/60 italic">Pindai untuk kirim tanda kasih</p>
          </motion.div>

          <Card
            title="Alamat Pengiriman"
            icon={<MapPin size={24} />}
            details={["RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281"]}
            copyText="RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281"
            id="address"
          />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner Ornaments */}
      <VintageOrnament className="absolute top-10 left-10 w-48 h-48 opacity-10 pointer-events-none rotate-180" />
      <VintageOrnament className="absolute bottom-10 right-10 w-48 h-48 opacity-10 pointer-events-none" />

      <TornEdge position="bottom" />
    </section>
  );
};

export default DigitalGift;
