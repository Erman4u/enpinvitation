"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import FloralDivider from '../ui/FloralDivider';
import VintageOrnament from '../ui/VintageOrnament';

import { usePageVisibility } from '../../hooks/usePageVisibility';

const SaveTheDate = () => {
  const targetDate = new Date("2027-03-15T10:00:00").getTime();
  const isPageVisible = usePageVisibility();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!isPageVisible) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isPageVisible]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center bg-vintage-ivory/50 border border-vintage-gold/20 p-2 md:p-4 rounded-xl min-w-[65px] md:min-w-[100px] shadow-sm backdrop-blur-sm">
      <span className="serif-text text-2xl md:text-4xl font-bold text-vintage-brown">{value}</span>
      <span className="serif-text text-[8px] md:text-xs uppercase tracking-widest text-vintage-gold mt-1">{label}</span>
    </div>
  );

  return (
    <section id="countdown" className="py-24 relative overflow-hidden bg-vintage-cream/50">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="script-text text-6xl text-vintage-brown mb-4">Save The Date</h2>
          <p className="serif-text text-vintage-gold tracking-[0.3em] uppercase text-sm mb-12">Hitung Mundur</p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-16">
            <TimeUnit value={timeLeft.days} label="Hari" />
            <TimeUnit value={timeLeft.hours} label="Jam" />
            <TimeUnit value={timeLeft.minutes} label="Menit" />
            <TimeUnit value={timeLeft.seconds} label="Detik" />
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Anwar+%26+Cipung&dates=20270315T020000Z/20270315T080000Z&details=Pernikahan+Anwar+%26+Cipung&location=RT+02,+Desa+Padang+Jaya,+Kec.+Kuaro,+Kab.+Paser,+Kalimantan+Timur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-vintage-brown text-vintage-cream px-8 py-4 rounded-full shadow-xl hover:bg-vintage-gold transition-all duration-300 group"
            >
              <Calendar size={20} className="group-hover:rotate-12" />
              <span className="serif-text font-bold tracking-widest uppercase text-xs">Simpan di Kalender</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Ornaments */}
      <VintageOrnament className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none" />
    </section>
  );
};

export default SaveTheDate;
