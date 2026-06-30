"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bookmark, Heart, MessageCircle, Send, Calendar, MapPin } from "lucide-react/dist/cjs/lucide-react.js";
import Image from "next/image";

export default function SaveTheDate() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(12847);

  useEffect(() => {
    const targetDate = new Date("2027-03-15T10:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Hari", value: timeLeft.days, color: "bg-pastel-pink" },
    { label: "Jam", value: timeLeft.hours, color: "bg-soft-purple" },
    { label: "Menit", value: timeLeft.minutes, color: "bg-baby-blue" },
    { label: "Detik", value: timeLeft.seconds, color: "bg-mint" },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => liked ? c - 1 : c + 1);
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Section title */}
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-6xl font-heading font-bold text-gray-900 flex items-center justify-center gap-3"
          >
            <Calendar size={28} className="text-soft-purple" /> Save The Date
          </motion.h2>
        </div>

        {/* IG Post Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="bg-white p-0.5 rounded-full">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image src="/assets/Image/hero.jpg" alt="Profile" fill className="object-cover" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-none">aditya_lestari_official</p>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <MapPin size={12} className="text-gray-400" /> Kalimantan Timur
                </p>
              </div>
            </div>
            <button className="text-gray-600 font-bold text-lg tracking-widest leading-none pb-1">···</button>
          </div>

          {/* Countdown Grid as the "image" */}
          <div className="bg-gradient-to-br from-pastel-pink/30 via-white to-baby-blue/30 p-4 sm:p-6">
            
            {/* Clear Info Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-5 text-center mb-6 shadow-sm">
              <h3 className="text-lg font-heading font-black text-gray-900 uppercase tracking-widest">Pernikahan</h3>
              <p className="text-3xl sm:text-4xl font-heading font-black text-soft-purple mt-1 drop-shadow-sm">Aditya & Lestari</p>
              <div className="w-16 h-1 bg-gray-200 mx-auto my-3 rounded-full" />
              <p className="text-base sm:text-lg font-bold text-gray-800">Rabu, 15 Maret 2027</p>
            </div>

            <div className="text-center mb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Menuju Hari Bahagia</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  whileHover={{ y: -4, rotate: index % 2 === 0 ? 2 : -2 }}
                  className={`${unit.color} p-3 rounded-2xl text-center relative shadow-md`}
                >
                  <span className="text-2xl sm:text-3xl font-heading font-black text-gray-900 tabular-nums block leading-none">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mt-1 block">
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="px-4 py-3 space-y-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={handleLike}
                >
                  <Heart
                    size={26}
                    className={`transition-colors duration-200 ${liked ? "text-red-500 fill-red-500" : "text-gray-800"}`}
                    fill={liked ? "currentColor" : "none"}
                  />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }}>
                  <MessageCircle size={26} className="text-gray-800" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }}>
                  <Send size={24} className="text-gray-800" />
                </motion.button>
              </div>
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => setSaved(!saved)}>
                <Bookmark
                  size={26}
                  className={`transition-colors ${saved ? "text-gray-900 fill-gray-900" : "text-gray-800"}`}
                  fill={saved ? "currentColor" : "none"}
                />
              </motion.button>
            </div>

            {/* Like Count */}
            <p className="text-sm font-bold text-gray-900">
              {likeCount.toLocaleString("id")} likes
            </p>

            {/* Caption */}
            <p className="text-sm text-gray-800 leading-snug">
              <span className="font-bold">aditya_lestari_official</span>{" "}
              Save the date! Rabu, 15 Maret 2027. Mohon doa restu dan kehadirannya ya!{" "}
              <span className="text-blue-500">#AdityaLestari #SaveTheDate #Wedding2027 #PasanganBerbahagia</span>
            </p>

            {/* Comments preview */}
            <div className="space-y-0.5">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">bestie_forever</span>{" "}
                Selamat ya kakk!! Bahagia selalu
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">wedding_goals_id</span>{" "}
                Cantik banget! Saved!
              </p>
            </div>

            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Rabu, 15 Maret 2027</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
