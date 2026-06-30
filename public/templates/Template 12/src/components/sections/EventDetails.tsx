"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import TornEdge from '../ui/TornEdge';
import VintageOrnament from '../ui/VintageOrnament';

const EventDetails = () => {
  const Card = ({ title, date, time, location, gmapsLink }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/50 backdrop-blur-md border border-vintage-gold/20 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-vintage-gold/50 transition-all duration-500 shadow-2xl"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity grayscale sepia">
        <VintageOrnament className="w-32 h-32" />
      </div>
      
      <h3 className="script-text text-6xl text-vintage-brown mb-8 gold-glow">{title}</h3>
      
      <div className="space-y-8 text-left relative z-10">
        <div className="flex items-start gap-5">
          <div className="bg-vintage-gold/10 p-4 rounded-full text-vintage-gold border border-vintage-gold/20 shadow-inner">
            <Calendar size={22} />
          </div>
          <div>
            <p className="serif-text font-bold text-vintage-brown uppercase tracking-widest text-xs mb-1">Hari / Tanggal</p>
            <p className="serif-text text-vintage-brown text-lg weathered-text">{date}</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="bg-vintage-gold/10 p-4 rounded-full text-vintage-gold border border-vintage-gold/20 shadow-inner">
            <Clock size={22} />
          </div>
          <div>
            <p className="serif-text font-bold text-vintage-brown uppercase tracking-widest text-xs mb-1">Waktu</p>
            <p className="serif-text text-vintage-brown text-lg weathered-text">{time}</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="bg-vintage-gold/10 p-4 rounded-full text-vintage-gold border border-vintage-gold/20 shadow-inner">
            <MapPin size={22} />
          </div>
          <div>
            <p className="serif-text font-bold text-vintage-brown uppercase tracking-widest text-xs mb-1">Lokasi</p>
            <p className="serif-text text-base leading-relaxed text-vintage-brown weathered-text">{location}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-10 border-t border-vintage-gold/20 flex items-center gap-4">
        <div className="w-2 h-2 bg-vintage-gold rounded-full opacity-50"></div>
        <div className="flex-1">
          <p className="serif-text text-[10px] uppercase tracking-[0.3em] text-vintage-brown/60 mb-1">Dress Code:</p>
          <p className="serif-text text-sm italic text-vintage-brown-dark weathered-text">Busana batik dan bersepatu.</p>
        </div>
      </div>

      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={gmapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 flex items-center justify-center gap-3 bg-vintage-brown text-vintage-cream py-5 rounded-2xl shadow-xl hover:bg-vintage-gold transition-all group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-10"></div>
        <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
        <span className="serif-text font-bold text-sm tracking-[0.2em] uppercase">Buka Google Maps</span>
      </motion.a>
    </motion.div>
  );

  return (
    <section id="acara" className="py-24 relative overflow-hidden bg-vintage-ivory/50">
      <TornEdge position="top" />
      
      <div className="container mx-auto px-6 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="script-text text-7xl text-vintage-brown gold-glow">Momen Bahagia</h2>
          <div className="h-[1.5px] w-32 bg-gradient-to-r from-transparent via-vintage-gold/50 to-transparent mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card
            title="Akad Nikah"
            date="Rabu, 15 Maret 2027"
            time="10.00 WIB — Selesai"
            location="RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281"
            gmapsLink="https://maps.google.com/?q=RT+02,+Desa+Padang+Jaya,+Kec.+Kuaro,+Kab.+Paser"
          />
          <Card
            title="Resepsi"
            date="Rabu, 15 Maret 2027"
            time="13.00 WIB — Selesai"
            location="RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281"
            gmapsLink="https://maps.google.com/?q=RT+02,+Desa+Padang+Jaya,+Kec.+Kuaro,+Kab.+Paser"
          />
        </div>

        {/* Dummy Map Embed Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 grayscale-[50%] hover:grayscale-0 transition-all duration-700 h-[400px] relative"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15951.68351543169!2d116.0371!3d-1.8974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTMnNTAuNiJTIDExNsKwMDInMTMuNiJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* Corner Ornaments */}
      <VintageOrnament className="absolute top-10 left-10 w-48 h-48 opacity-10 pointer-events-none rotate-180" />
      <VintageOrnament className="absolute bottom-10 right-10 w-48 h-48 opacity-10 pointer-events-none" />
    </section>
  );
};

export default EventDetails;
