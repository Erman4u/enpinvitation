"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/constants";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.event.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 bg-beige/30">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif text-gold mb-12"
        >
          Hitung Mundur
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="h-16 w-16 md:h-24 md:w-24 rounded-xl md:rounded-2xl bg-white shadow-soft border border-gold/10 flex items-center justify-center mb-3 md:mb-4">
                <span className="text-2xl md:text-4xl font-serif text-accent">{item.value}</span>
              </div>
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-accent/60">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-16 bg-accent text-white px-8 py-4 rounded-full font-medium tracking-wide shadow-lg"
        >
          Simpan di Kalender
        </motion.button>
      </div>
    </section>
  );
}
