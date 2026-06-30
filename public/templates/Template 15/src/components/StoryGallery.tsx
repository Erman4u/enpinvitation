"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react/dist/cjs/lucide-react.js";

const storyImages = [
  { src: "/assets/Image/gallery3.webp", caption: "Awal Pertemuan" },
  { src: "/assets/Image/gallery4.webp", caption: "Benih Cinta" },
  { src: "/assets/Image/gallery5.webp", caption: "Momen Bahagia" },
  { src: "/assets/Image/gallery6.webp", caption: "Selamanya" },
  { src: "/assets/Image/gallery7.webp", caption: "Menuju Halal" },
];

export default function StoryGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    if (activeIndex < storyImages.length - 1) {
      setDirection(1);
      setActiveIndex((i) => i + 1);
    } else {
      setIsOpen(false);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((i) => i - 1);
    }
  };

  const openStory = (index: number) => {
    setActiveIndex(index);
    setDirection(0);
    setIsOpen(true);
  };

  return (
    <>
      {/* Story Bubbles Row */}
      <div className="flex gap-5 overflow-x-auto pb-3 no-scrollbar">
        {storyImages.map((story, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            onClick={() => openStory(index)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0"
          >
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
              <div className="bg-white p-0.5 rounded-full">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image src={story.src} alt={story.caption} fill className="object-cover" />
                </div>
              </div>
            </div>
            <span className="text-[11px] text-gray-700 truncate max-w-[60px] text-center">
              {story.caption.split(" ")[0]}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Story Fullscreen Viewer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
          >
            {/* Progress bars */}
            <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
              {storyImages.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-white rounded-full transition-none ${i < activeIndex ? "w-full" : i === activeIndex ? "w-full animate-story-progress" : "w-0"}`}
                  />
                </div>
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-4 z-10 text-white p-2"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ x: direction === 0 ? 0 : direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full h-screen"
              >
                <Image
                  src={storyImages[activeIndex].src}
                  alt={storyImages[activeIndex].caption}
                  fill
                  className="object-contain"
                  priority
                />
                {/* Caption */}
                <div className="absolute bottom-16 left-0 right-0 text-center px-6">
                  <p className="text-white font-heading font-bold text-2xl drop-shadow-lg">
                    {storyImages[activeIndex].caption}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {activeIndex + 1} / {storyImages.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tap zones */}
            <div className="absolute inset-0 flex z-10">
              <button onClick={goPrev} className="flex-1 flex items-center justify-start pl-4">
                {activeIndex > 0 && <ChevronLeft size={32} className="text-white/60" />}
              </button>
              <button onClick={goNext} className="flex-1 flex items-center justify-end pr-4">
                <ChevronRight size={32} className="text-white/60" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
