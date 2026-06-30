"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Music2 } from "lucide-react/dist/cjs/lucide-react.js";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer({ isPlaying: initialPlaying = false }) {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (initialPlaying) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Auto-play blocked"));
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (initialPlaying && audioRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [initialPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-[90]">
      <audio ref={audioRef} loop src="/assets/audio/background-music.mp3" />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isPlaying ? "bg-neon-pink text-white animate-spin-slow" : "bg-white text-gray-400"
        }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
            >
              <Music2 size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -180 }}
            >
              <Music size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Notes when playing */}
      {isPlaying && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: [0, 1, 0], y: -50, x: (i - 1) * 20 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeOut"
              }}
              className="absolute text-neon-pink text-xl"
            >
              <Music size={16} />
            </motion.span>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
