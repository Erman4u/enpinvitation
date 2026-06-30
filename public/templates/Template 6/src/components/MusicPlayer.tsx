"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Autoplay blocked or error:", err));
      } else {
        audioRef.current.pause();
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current) audioRef.current.pause();
      } else {
        if (isPlaying && audioRef.current) {
          audioRef.current.play().catch((err) => console.log(err));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop src="/assets/audio/background-music.mp3" />
      <button
        onClick={onToggle}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-soft border border-gold/20 transition-all duration-500 hover:scale-110",
          isPlaying ? "animate-spin-slow rotate-0" : ""
        )}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-gold" />
        ) : (
          <VolumeX className="h-5 w-5 text-gold/50" />
        )}
      </button>
    </div>
  );
}
