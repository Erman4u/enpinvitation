"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Grid3x3, Play } from "lucide-react/dist/cjs/lucide-react.js";
import { useState } from "react";
import StoryGallery from "./StoryGallery";

export default function Hero() {
  const [followed, setFollowed] = useState(false);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* IG Profile Header */}
      <div className="pt-16 pb-0 px-4 sm:px-6 max-w-2xl mx-auto">

        {/* Username bar (like IG top) */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-black text-lg text-gray-900 tracking-tight">aditya_lestari_official</h1>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="w-2 h-2 bg-blue-500 rounded-full opacity-60" />
            <span className="w-2 h-2 bg-blue-500 rounded-full opacity-30" />
          </div>
        </div>

        {/* Top Row: Avatar + Stats */}
        <div className="flex items-center gap-6 sm:gap-10 mb-5">
          {/* Avatar */}
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex-shrink-0">
            <div className="bg-white p-0.5 rounded-full">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
                <Image
                  src="/assets/Image/hero.jpg"
                  alt="Aditya & Lestari"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-3 gap-1 text-center">
            {[
              { label: "Posts", value: "12" },
              { label: "Followers", value: "2.7M" },
              { label: "Following", value: "∞" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-black text-lg sm:text-xl text-gray-900 font-heading leading-tight">{stat.value}</span>
                <span className="text-xs text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Name + Bio */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2">
            <p className="font-black text-gray-900 text-sm leading-tight">aditya_lestari_official</p>
            <div className="bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[9px] font-black">✓</span>
            </div>
          </div>
          <p className="text-xs font-bold text-gray-500">Pasangan Berbahagia</p>
          <p className="text-sm text-gray-800 leading-snug">
            Berawal dari <span className="font-bold">DM</span>, kini masuk{" "}
            <span className="italic">era selamanya</span><br />
            <span className="text-blue-500 font-semibold">#AdityaLestari</span> • 15.03.2027
          </p>
          <p className="text-sm text-blue-500 font-semibold">🔗 Save The Date ↓</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setFollowed(!followed)}
            className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              followed
                ? "bg-gray-100 text-gray-800 border border-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            {followed ? "Following ✓" : "Follow"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="flex-1 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-sm font-bold border border-gray-200"
          >
            Message
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-sm font-bold border border-gray-200"
          >
            ▾
          </motion.button>
        </div>

        {/* Story Highlights */}
        <div className="pb-3">
          <StoryGallery />
        </div>

        {/* Grid / Reels Tab */}
        <div className="border-t border-gray-200 flex mt-1">
          <button className="flex-1 py-3 flex items-center justify-center border-b-2 border-gray-900">
            <Grid3x3 size={20} className="text-gray-900" />
          </button>
          <button className="flex-1 py-3 flex items-center justify-center">
            <Play size={20} className="text-gray-300" />
          </button>
        </div>
      </div>

    </section>
  );
}
