"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react/dist/cjs/lucide-react.js";
import { useState } from "react";

const profiles = [
  {
    name: "Aditya",
    username: "@aditya_official",
    role: "Mempelai Pria",
    image: "/assets/Image/cowo.webp",
    parentInfo: "Putra ke-1 Dari : Bapak Bambang & Ibu Sri Wahyuni",
    color: "bg-baby-blue",
    accent: "text-blue-500",
    borderGrad: "from-blue-400 via-purple-500 to-pink-500",
    posts: "47",
    followers: "1.2M",
    following: "312",
    highlightColor: "bg-blue-500",
    caption: "Menuju hari bahagia bersama pujaan hati 💙 #AdityaLestari #MempelaiPria",
  },
  {
    name: "Lestari",
    username: "@lestari_vibes",
    role: "Mempelai Wanita",
    image: "/assets/Image/cewe.webp",
    parentInfo: "Putri ke-2 Dari : Bapak Suherman & Ibu Ratnasari",
    color: "bg-pastel-pink",
    accent: "text-neon-pink",
    borderGrad: "from-yellow-400 via-red-500 to-purple-600",
    posts: "63",
    followers: "1.5M",
    following: "208",
    highlightColor: "bg-pink-500",
    caption: "She said YES! 💍 Siap memasuki era selamanya ✨ #AdityaLestari #MempelaiWanita",
  },
];

export default function Couple() {
  const [followed, setFollowed] = useState([false, false]);
  const [liked, setLiked] = useState([false, false]);
  const [likeCounts, setLikeCounts] = useState([8420, 9317]);

  const toggleFollow = (i: number) => {
    setFollowed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const toggleLike = (i: number) => {
    setLiked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    setLikeCounts((prev) =>
      prev.map((v, idx) => (idx === i ? (liked[i] ? v - 1 : v + 1) : v))
    );
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Section Header */}
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-6xl font-heading font-bold text-gray-900"
          >
            Pasangan Berbahagia
          </motion.h2>
          <p className="text-base text-gray-500 font-body">Dua insan, satu cinta, cerita yang nyata.</p>
        </div>

        {/* Profile Cards — IG style */}
        <div className="flex flex-col gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`p-0.5 rounded-full bg-gradient-to-tr ${profile.borderGrad}`}>
                    <div className="bg-white p-0.5 rounded-full">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={profile.image} alt={profile.name} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-none">{profile.username}</p>
                    <p className={`text-xs font-bold mt-0.5 ${profile.accent}`}>{profile.role}</p>
                  </div>
                </div>
                <button className="text-gray-500 font-bold text-lg tracking-widest leading-none pb-1">···</button>
              </div>

              {/* Profile Photo (IG square post) */}
              <div className={`relative w-full aspect-[4/5] sm:aspect-square ${profile.color}/30`}>
                <Image src={profile.image} alt={profile.name} fill className="object-cover object-top" />
                {/* overlay bottom gradient - diperbesar supaya text jelas */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-col items-start">
                  <p className="text-white/90 text-xs font-bold bg-black/40 px-2 py-1 rounded-md mb-2 flex items-center gap-1">
                    {profile.username}
                  </p>
                  <p className="text-white font-black text-4xl sm:text-5xl font-heading drop-shadow-lg leading-tight">{profile.name}</p>
                  <p className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-widest mt-1 opacity-90">{profile.parentInfo}</p>
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
                    <Share2 size={24} className="text-gray-800" />
                  </div>
                  <Bookmark size={26} className="text-gray-800" />
                </div>

                {/* Like count */}
                <p className="text-sm font-bold text-gray-900">
                  {likeCounts[index].toLocaleString("id")} likes
                </p>

                {/* Caption */}
                <p className="text-sm text-gray-800 leading-snug">
                  <span className="font-bold">{profile.username}</span>{" "}
                  {profile.caption}
                </p>
              </div>

              {/* IG-style Stats + Follow */}
              <div className="px-4 pb-4 pt-3 border-t border-gray-100 mt-2">
                <div className="flex items-center justify-between">
                  {/* Stats */}
                  <div className="flex gap-5 text-center">
                    {[
                      { label: "Posts", value: profile.posts },
                      { label: "Followers", value: profile.followers },
                      { label: "Following", value: profile.following },
                    ].map((s) => (
                      <div key={s.label} className="flex flex-col items-center">
                        <span className="font-black text-sm text-gray-900">{s.value}</span>
                        <span className="text-[10px] text-gray-500">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  {/* Follow Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFollow(index)}
                    className={`px-5 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      followed[index]
                        ? "bg-gray-100 text-gray-800 border border-gray-300"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {followed[index] ? "Following ✓" : "Follow"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
