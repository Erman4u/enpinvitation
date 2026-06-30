"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, Video, Info, ArrowLeft, Camera, Mic, ImageIcon, X } from "lucide-react/dist/cjs/lucide-react.js";
import { useState } from "react";

const timeline = [
  {
    sender: "Aditya",
    message: "Hai, kamu pasti sering lihat aku di sini 😄 Boleh kenalan?",
    time: "Januari 2026",
    label: "Awal Pertemuan",
    type: "received",
    photo: "/assets/Image/gallery3.webp",
    reaction: "❤️",
    avatar: "/assets/Image/cowo.webp",
  },
  {
    sender: "Lestari",
    message: "Hehe iya sering 😅 Boleh dong! Nama aku Lestari ✨",
    time: "Januari 2026",
    label: "Perkenalan Pertama",
    type: "sent",
    photo: "/assets/Image/gallery4.webp",
    reaction: "😍",
    avatar: "/assets/Image/cewe.webp",
  },
  {
    sender: "Aditya",
    message: "Lestari, selama ini aku selalu lihat kamu dari jauh... Aku serius. Boleh aku kenalkan ke keluarga?",
    time: "Maret 2026",
    label: "Lamaran",
    type: "received",
    photo: "/assets/Image/gallery5.webp",
    reaction: "💍",
    avatar: "/assets/Image/cowo.webp",
  },
  {
    sender: "Status",
    message: "15 Maret 2027 — Akad Nikah",
    time: "Next Level",
    label: "",
    type: "status",
    photo: null,
    reaction: null,
    avatar: null,
  },
];

export default function LoveStory() {
  const [expandedPhoto, setExpandedPhoto] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Section Label */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-7xl font-heading font-bold text-gray-900 flex items-center justify-center gap-3"
          >
            Kisah Kami
          </motion.h2>
          <p className="text-base md:text-xl text-gray-500 font-body">Semuanya berawal dari DM...</p>
        </div>

        {/* IG DM Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-2xl"
        >
          {/* DM Header — like IG DM inbox */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
            <button className="text-gray-800 mr-1">
              <ArrowLeft size={22} />
            </button>
            {/* Stacked avatars */}
            <div className="relative w-11 h-11 flex-shrink-0">
              <div className="absolute top-0 left-0 w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image src="/assets/Image/cowo.webp" alt="Aditya" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image src="/assets/Image/cewe.webp" alt="Lestari" fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm leading-none truncate">aditya_official, lestari_vibes</p>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block shrink-0" />
                Active now
              </p>
            </div>
            <div className="flex gap-4 text-gray-700 flex-shrink-0">
              <Phone size={20} />
              <Video size={20} />
              <Info size={20} />
            </div>
          </div>

          {/* Chat Body */}
          <div className="bg-white px-4 py-6 space-y-6">

            {/* Connected Notice */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex -space-x-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow ring-2 ring-gray-100">
                  <Image src="/assets/Image/cowo.webp" alt="Aditya" fill className="object-cover" />
                </div>
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow ring-2 ring-gray-100">
                  <Image src="/assets/Image/cewe.webp" alt="Lestari" fill className="object-cover" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-sm">aditya_official &amp; lestari_vibes</p>
                <p className="text-xs text-gray-400 mt-0.5">You are now connected on Instagram · 2026</p>
              </div>
            </div>

            {/* Message Bubbles */}
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, x: item.type === "sent" ? 20 : item.type === "status" ? 0 : -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className={`flex flex-col ${
                  item.type === "sent" ? "items-end" :
                  item.type === "status" ? "items-center" : "items-start"
                }`}
              >
                {item.type === "status" ? (
                  /* ── Status separator ── */
                  <div className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wider my-2">
                    {item.message}
                  </div>
                ) : (
                  /* ── Chat bubble with optional photo ── */
                  <div className={`max-w-[75%] space-y-1 flex flex-col ${item.type === "sent" ? "items-end" : "items-start"}`}>

                    {/* Avatar for received */}
                    {item.type === "received" && (
                      <div className="flex items-end gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-1">
                          <Image src={item.avatar!} alt={item.sender} fill className="object-cover" />
                        </div>
                        {/* Column */}
                        <div className="space-y-1">
                          {/* Photo bubble */}
                          {item.photo && (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setExpandedPhoto(item.photo!)}
                              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl rounded-bl-sm overflow-hidden shadow block"
                            >
                              <Image src={item.photo} alt={item.label} fill className="object-cover" />
                              <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                <span className="text-white text-[10px] font-bold">{item.label}</span>
                              </div>
                            </motion.button>
                          )}
                          {/* Text bubble */}
                          <div className="px-4 py-2.5 bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm text-sm font-body leading-relaxed shadow-sm">
                            {item.message}
                          </div>
                          {/* Time */}
                          <span className="text-[10px] font-bold text-gray-400 pl-1 uppercase tracking-wider">{item.time}</span>
                          {/* Reaction */}
                          {item.reaction && (
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                              className="ml-1 w-fit px-2 py-0.5 bg-white border border-gray-200 rounded-full shadow-sm text-sm"
                            >
                              {item.reaction}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sent (right side) */}
                    {item.type === "sent" && (
                      <div className="flex items-end gap-2">
                        <div className="space-y-1 flex flex-col items-end">
                          {/* Photo bubble */}
                          {item.photo && (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setExpandedPhoto(item.photo!)}
                              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl rounded-br-sm overflow-hidden shadow block"
                            >
                              <Image src={item.photo} alt={item.label} fill className="object-cover" />
                              <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                <span className="text-white text-[10px] font-bold">{item.label}</span>
                              </div>
                            </motion.button>
                          )}
                          {/* Text bubble */}
                          <div className="px-4 py-2.5 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl rounded-br-sm text-sm font-body leading-relaxed shadow-sm">
                            {item.message}
                          </div>
                          {/* Time */}
                          <span className="text-[10px] font-bold text-gray-400 pr-1 uppercase tracking-wider">{item.time}</span>
                          {/* Reaction */}
                          {item.reaction && (
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                              className="mr-1 w-fit px-2 py-0.5 bg-white border border-gray-200 rounded-full shadow-sm text-sm"
                            >
                              {item.reaction}
                            </motion.div>
                          )}
                        </div>
                        <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-1">
                          <Image src={item.avatar!} alt={item.sender} fill className="object-cover" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* DM Footer — input bar */}
          <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-3 bg-white">
            <Camera size={22} className="text-gray-500 flex-shrink-0" />
            <div className="flex-1 bg-gray-100 rounded-full h-9 px-4 flex items-center">
              <span className="text-gray-400 text-sm">Kirim pesan...</span>
            </div>
            <ImageIcon size={22} className="text-gray-500 flex-shrink-0" />
            <Mic size={22} className="text-gray-500 flex-shrink-0" />
          </div>
        </motion.div>
      </div>

      {/* Photo Full-screen Viewer */}
      <AnimatePresence>
        {expandedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedPhoto(null)}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-6"
          >
            <button
              onClick={() => setExpandedPhoto(null)}
              className="absolute top-5 right-5 text-white z-10"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src={expandedPhoto} alt="Expanded Photo" fill className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
