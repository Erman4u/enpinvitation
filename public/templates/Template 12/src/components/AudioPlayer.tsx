"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play } from 'lucide-react';
import { usePageVisibility } from '../hooks/usePageVisibility';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPageVisible = usePageVisibility();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && isPageVisible) {
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isPageVisible]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/audio/background-music.mp3"
        loop
      />
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[5000] bg-vintage-gold text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <div className="relative">
          {isPlaying ? (
            <motion.div
              animate={isPageVisible ? { rotate: 360 } : { rotate: 0 }}
              transition={isPageVisible ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0 }}
            >
              <Music size={24} />
            </motion.div>
          ) : (
            <Play size={24} />
          )}
          
          {isPlaying && isPageVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.5, 0], scale: [1, 2, 3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-white rounded-full -z-10"
            ></motion.div>
          )}
        </div>
      </motion.button>
    </>
  );
};

export default AudioPlayer;
