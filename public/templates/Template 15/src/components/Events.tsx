"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, ExternalLink, Heart, MessageCircle, Send, Shirt } from "lucide-react/dist/cjs/lucide-react.js";
import { useState } from "react";
import Image from "next/image";

const events = [
  {
    title: "Akad Nikah",
    date: "Rabu, 15 Maret 2027",
    time: "10.00 WIB — Selesai",
    location: "RT 02, Desa Padang Jaya",
    address: "Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281",
    grad: "from-yellow-400 via-red-500 to-purple-600",
    accent: "text-soft-purple",
    bgAccent: "bg-soft-purple",
    coverImg: "/assets/Image/gallery3.webp",
    mapsUrl: "https://maps.google.com/?q=Desa+Padang+Jaya,Kec+Kuaro,Kab+Paser,Kalimantan+Timur",
    hashtag: "#AkadNikah",
    likes: 5830,
    caption: "Momen sakral yang paling dinantikan. Mohon doa restu dari seluruh keluarga dan sahabat.",
  },
  {
    title: "Resepsi",
    date: "Rabu, 15 Maret 2027",
    time: "13.00 WIB — Selesai",
    location: "RT 02, Desa Padang Jaya",
    address: "Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281",
    grad: "from-blue-400 via-cyan-500 to-teal-500",
    accent: "text-baby-blue",
    bgAccent: "bg-baby-blue",
    coverImg: "/assets/Image/gallery4.webp",
    mapsUrl: "https://maps.google.com/?q=Desa+Padang+Jaya,Kec+Kuaro,Kab+Paser,Kalimantan+Timur",
    hashtag: "#ResepsiPernikahan",
    likes: 7204,
    caption: "Rayakan bersama kami! Makan-makan, foto-foto, ketawa-tawa. Hadir ya!",
  },
];

export default function Events() {
  const [liked, setLiked] = useState([false, false]);
  const [likeCounts, setLikeCounts] = useState(events.map((e) => e.likes));

  const toggleLike = (i: number) => {
    setLiked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    setLikeCounts((prev) => prev.map((v, idx) => (idx === i ? (liked[i] ? v - 1 : v + 1) : v)));
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Section Header */}
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-6xl font-heading font-bold text-gray-900 flex items-center justify-center gap-3"
          >
            Hari Bahagia <MapPin size={26} className="text-soft-purple" />
          </motion.h2>
          <p className="text-sm text-gray-500 font-body uppercase tracking-widest font-bold">Detail Acara</p>
        </div>

        {/* Event IG Posts */}
        {events.map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Story-ring avatar */}
                <div className={`p-0.5 rounded-full bg-gradient-to-tr ${event.grad}`}>
                  <div className="bg-white p-0.5 rounded-full">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden">
                      <Image src="/assets/Image/hero.jpg" alt="Profile" fill className="object-cover" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm leading-none">aditya_lestari_official</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <MapPin size={10} /> {event.location}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 font-bold text-lg tracking-widest leading-none pb-1">···</button>
            </div>

            {/* Cover image with event info overlay */}
            <div className="relative w-full aspect-[4/3] bg-gray-100">
              <Image src={event.coverImg} alt={event.title} fill className="object-cover" />
              {/* Dark overlay for cover effect only */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* IG Reels/Story style label top-right */}
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r ${event.grad} shadow-md`}>
                <span className="text-white text-xs font-black uppercase tracking-wider">{event.hashtag}</span>
              </div>
            </div>

            {/* Event Info Card (Clean & Prominent) */}
            <div className="px-4 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-3">
                {event.title}
              </h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-gray-700">
                  <Calendar size={18} className={event.accent} /> {event.date}
                </p>
                <p className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-gray-700">
                  <Clock size={18} className={event.accent} /> {event.time}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="px-4 pt-3 pb-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button whileTap={{ scale: 0.75 }} onClick={() => toggleLike(index)}>
                    <Heart
                      size={26}
                      className={`transition-colors ${liked[index] ? "text-red-500" : "text-gray-800"}`}
                      fill={liked[index] ? "currentColor" : "none"}
                    />
                  </motion.button>
                  <MessageCircle size={26} className="text-gray-800" />
                  <Send size={24} className="text-gray-800" />
                </div>
              </div>

              <p className="text-sm font-bold text-gray-900">{likeCounts[index].toLocaleString("id")} likes</p>

              {/* Caption */}
              <p className="text-sm text-gray-800 leading-snug">
                <span className="font-bold">aditya_lestari_official</span>{" "}
                {event.caption}{" "}
                <span className="text-blue-500">{event.hashtag} #AdityaLestari #Wedding2027</span>
              </p>

              {/* Location + Maps CTA */}
              <div className="flex items-center gap-2 py-1">
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{event.location}</p>
                  <p className="text-xs text-gray-400 truncate">{event.address}</p>
                </div>
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-xl flex-shrink-0"
                >
                  <ExternalLink size={12} /> Peta
                </a>
              </div>
            </div>

            {/* Bottom border padding */}
            <div className="h-3" />
          </motion.div>
        ))}

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Post header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <div className="p-1.5 bg-soft-purple/10 rounded-xl">
              <MapPin size={18} className="text-soft-purple" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-none">Lokasi Acara</p>
              <p className="text-xs text-gray-400 mt-0.5">RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser</p>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-52 md:h-72 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d116.35!3d-2.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDQnNDguMCJTIDExNsKwMjEnMDAuMCJF!5e0!3m2!1sid!2sid!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Acara Pernikahan"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="p-4 space-y-2">
            <a
              href="https://maps.google.com/?q=Desa+Padang+Jaya,Kec+Kuaro,Kab+Paser,Kalimantan+Timur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-soft-purple text-white rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
            >
              <MapPin size={16} /> Buka di Google Maps
            </a>
            <a
              href="https://waze.com/ul?q=Desa+Padang+Jaya,Kec+Kuaro,Kab+Paser,Kalimantan+Timur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
            >
              <MapPin size={16} className="text-blue-500" /> Buka di Waze
            </a>
          </div>
        </motion.div>

        {/* Dresscode — IG Highlight style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pastel-pink via-soft-purple to-baby-blue flex items-center justify-center shadow-inner">
              <Shirt size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-none">aditya_lestari_official</p>
              <p className="text-xs text-gray-400 mt-0.5">Dress Code Info</p>
            </div>
          </div>
          <div className="px-4 py-5 flex flex-col sm:flex-row items-center gap-5">
            <div className="flex-1 space-y-2">
              <h3 className="text-lg sm:text-xl font-heading font-bold text-gray-800">
                Dresscode: <span className="text-mint">Batik & Bersepatu</span>
              </h3>
              <p className="text-sm text-gray-600 font-body leading-relaxed">
                Demi kenyamanan dan keselarasan acara, kami memohon kehadiran dengan mengenakan busana batik dan bersepatu.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              {["bg-pastel-pink", "bg-soft-purple", "bg-baby-blue", "bg-mint"].map((c) => (
                <div key={c} className={`w-9 h-9 rounded-full ${c} shadow-md`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
