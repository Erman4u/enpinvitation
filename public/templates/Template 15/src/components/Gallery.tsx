"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Heart, MessageCircle, Send, Bookmark, ChevronsRight, MapPin } from "lucide-react/dist/cjs/lucide-react.js";
import { useState } from "react";

const images = [
  { src: "/assets/Image/gallery3.webp", caption: "Momen Pertama ✨" },
  { src: "/assets/Image/gallery4.webp", caption: "Benih Cinta 💜" },
  { src: "/assets/Image/gallery5.webp", caption: "Bahagia Bersama 🌸" },
  { src: "/assets/Image/gallery6.webp", caption: "Selamanya 💕" },
  { src: "/assets/Image/gallery7.webp", caption: "Menuju Altar 🎊" },
];

const comments = [
  { user: "bestie_hana", text: "Cantik banget kalian!!" },
  { user: "wedding_inspo_id", text: "Saved! Inspirasi banget" },
  { user: "mama_bareng", text: "Bahagia selalu ya nak" },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(24391);
  const activeImage = images[activeIndex];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => liked ? c - 1 : c + 1);
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Section heading */}
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-6xl font-heading font-bold text-gray-900 flex items-center justify-center gap-3"
          >
            Galeri Kami <Camera size={28} className="text-soft-purple" />
          </motion.h2>
          <p className="text-sm text-gray-500 font-body uppercase tracking-widest font-bold">Momen Terabadikan</p>
        </div>

        {/* IG Post Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between px-4 py-3">
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
            <button className="text-gray-500 font-bold text-lg tracking-widest leading-none pb-1">···</button>
          </div>

          {/* Main Image */}
          <motion.div
            key={activeImage.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="relative w-full aspect-square bg-gray-100"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.caption}
              fill
              className="object-cover"
              priority
            />
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/50 to-transparent">
              <p className="text-white text-sm font-bold drop-shadow">{activeImage.caption}</p>
            </div>
          </motion.div>

          {/* Action Bar */}
          <div className="px-4 pt-3 pb-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button whileTap={{ scale: 0.75 }} onClick={handleLike}>
                  <Heart
                    size={26}
                    className={`transition-colors ${liked ? "text-red-500" : "text-gray-800"}`}
                    fill={liked ? "currentColor" : "none"}
                  />
                </motion.button>
                <MessageCircle size={26} className="text-gray-800" />
                <Send size={24} className="text-gray-800" />
              </div>
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => setSaved(!saved)}>
                <Bookmark
                  size={26}
                  className={`transition-colors ${saved ? "text-gray-900" : "text-gray-800"}`}
                  fill={saved ? "currentColor" : "none"}
                />
              </motion.button>
            </div>

            {/* Like count */}
            <p className="text-sm font-bold text-gray-900">
              {likeCount.toLocaleString("id")} likes
            </p>

            {/* Caption */}
            <p className="text-sm text-gray-800 leading-snug">
              <span className="font-bold">aditya_lestari_official</span>{" "}
              Setiap foto menyimpan seribu kata. Terima kasih sudah menjadi bagian dari kisah kami 💕{" "}
              <span className="text-blue-500">#AdityaLestari #WeddingGallery #FotoKita</span>
            </p>

            {/* Comments */}
            <div className="space-y-0.5">
              {comments.map((c) => (
                <p key={c.user} className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">{c.user}</span> {c.text}
                </p>
              ))}
            </div>
          </div>

          {/* Thumbnail Selector */}
          <div className="px-4 pt-3 pb-2 border-t border-gray-100 space-y-2 mb-2">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">📸 Pilih Foto</p>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden snap-center transition-all duration-300 ${
                    activeIndex === index
                      ? "ring-2 ring-soft-purple ring-offset-2 scale-105 shadow-lg"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img.src} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold animate-pulse md:hidden uppercase tracking-widest">
              <ChevronsRight size={12} /> <span>Geser Foto</span> <ChevronsRight size={12} />
            </div>
          </div>
        </motion.div>

        {/* Marquee text */}
        <div className="relative h-14 overflow-hidden rounded-xl bg-gray-100">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-10 text-2xl font-heading font-black text-gray-300 uppercase italic absolute top-1/2 -translate-y-1/2"
          >
            <span>LIVE LOVE LAUGH • ADITYA & LESTARI • FOREVER ERA • 2027 •</span>
            <span>LIVE LOVE LAUGH • ADITYA & LESTARI • FOREVER ERA • 2027 •</span>
            <span>LIVE LOVE LAUGH • ADITYA & LESTARI • FOREVER ERA • 2027 •</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
