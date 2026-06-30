"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, CheckCircle } from 'lucide-react';
import FloralDivider from '../ui/FloralDivider';
import TornEdge from '../ui/TornEdge';
import VintageOrnament from '../ui/VintageOrnament';

const RSVP = () => {
  const [formData, setFormData] = useState({ name: '', attendance: 'Hadir', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const messages = [
    { name: "EnP Digital", message: "Selamat menempuh hidup baru Blacky & Cimeng! Samawa selalu.", date: "1 jam yang lalu" },
    { name: "Keluarga Besar", message: "Semoga dilancarkan sampai hari H. Aamiin.", date: "5 jam yang lalu" }
  ];

  return (
    <section id="rsvp" className="py-24 relative overflow-hidden bg-vintage-ivory/10">
      <TornEdge position="top" />
      
      <div className="container mx-auto px-6 relative z-10 pt-12">
        <div className="grid lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-md border border-vintage-gold/20 p-8 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none grayscale sepia">
                <MessageSquare size={100} />
             </div>
             
            <h2 className="script-text text-6xl text-vintage-brown mb-8 gold-glow">RSVP</h2>
            <p className="serif-text text-sm text-vintage-brown/70 mb-12 leading-relaxed italic weathered-text">
              Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="serif-text text-xs uppercase tracking-widest text-vintage-brown/60 mb-2 block">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-vintage-cream/30 border border-vintage-gold/20 px-6 py-4 rounded-xl focus:outline-none focus:border-vintage-gold transition-colors serif-text"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="serif-text text-xs uppercase tracking-widest text-vintage-brown/60 mb-2 block">Konfirmasi Kehadiran</label>
                <select
                  className="w-full bg-vintage-cream/30 border border-vintage-gold/20 px-6 py-4 rounded-xl focus:outline-none focus:border-vintage-gold transition-colors serif-text"
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                >
                  <option>Hadir</option>
                  <option>Berhalangan Hadir</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-vintage-gold text-white py-4 rounded-xl shadow-lg hover:bg-vintage-brown transition-colors flex items-center justify-center gap-3"
              >
                <Send size={18} />
                <span className="serif-text font-bold tracking-widest uppercase text-xs">Kirim via WhatsApp</span>
              </motion.button>
              
              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-green-600 text-sm serif-text italic"
                >
                  <CheckCircle size={14} className="inline mr-2" /> Konfirmasi telah dikirim!
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Guestbook */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="bg-vintage-gold/10 p-4 rounded-full text-vintage-gold border border-vintage-gold/20 shadow-inner">
                <MessageSquare size={24} />
              </div>
              <h2 className="script-text text-6xl text-vintage-brown gold-glow">Doa & Ucapan</h2>
            </div>

            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin">
              <div className="bg-white/40 border border-vintage-gold/10 p-6 rounded-2xl">
                <textarea
                  placeholder="Tulis doa dan ucapan terbaik..."
                  className="w-full bg-transparent border-none focus:outline-none serif-text text-sm italic resize-none h-24"
                ></textarea>
                <button className="mt-4 bg-vintage-brown text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-widest hover:bg-vintage-gold transition-all">
                  KIRIM UCAPAN
                </button>
              </div>

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white/30 border-l-4 border-vintage-gold p-6 rounded-r-2xl shadow-sm"
                >
                  <p className="serif-text font-bold text-vintage-brown text-sm">{msg.name}</p>
                  <p className="serif-text text-vintage-brown/80 text-sm mt-2 italic leading-relaxed">"{msg.message}"</p>
                  <p className="serif-text text-[10px] text-vintage-brown/40 mt-4 uppercase tracking-tighter">{msg.date}</p>
                </motion.div>
              ))}
              
              {messages.length === 0 && (
                <p className="serif-text text-center text-vintage-brown/40 italic py-10">Belum ada ucapan...</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner Ornaments */}
      <VintageOrnament className="absolute top-10 right-10 w-48 h-48 opacity-10 pointer-events-none rotate-90" />
      <VintageOrnament className="absolute bottom-10 left-10 w-48 h-48 opacity-10 pointer-events-none -rotate-90" />
    </section>
  );
};

export default RSVP;
