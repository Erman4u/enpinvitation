"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const OpeningScreen = dynamic(() => import('@/components/sections/OpeningScreen'), { ssr: true });
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: true });
const Mempelai = dynamic(() => import('@/components/sections/Mempelai'), { ssr: true });
const SaveTheDate = dynamic(() => import('@/components/sections/SaveTheDate'), { ssr: true });
const EventDetails = dynamic(() => import('@/components/sections/EventDetails'), { ssr: true });
const LoveStory = dynamic(() => import('@/components/sections/LoveStory'), { ssr: true });
const Gallery = dynamic(() => import('@/components/sections/Gallery'), { ssr: true });
const RSVP = dynamic(() => import('@/components/sections/RSVP'), { ssr: true });
const DigitalGift = dynamic(() => import('@/components/sections/DigitalGift'), { ssr: true });
const Closing = dynamic(() => import('@/components/sections/Closing'), { ssr: true });
const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
import VintageOrnament from '@/components/ui/VintageOrnament';
import { Suspense } from 'react';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    // Initial state: lock scroll
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    }
  }, [isOpened]);

  return (
    <main className="bg-vintage-cream min-h-screen relative selection:bg-vintage-gold/30 selection:text-vintage-brown">
      <Suspense fallback={<div className="fixed inset-0 bg-vintage-cream z-[10001]"></div>}>
        <OpeningScreen onOpen={handleOpenInvitation} />
      </Suspense>

      {isOpened && (
        <div className="animate-fade-slow">
          <Hero />
          <Mempelai />
          <SaveTheDate />
          <EventDetails />
          <LoveStory />
          <Gallery />
          <DigitalGift />
          <RSVP />
          <Closing />
          <Navbar />
          <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
      )}
    </main>
  );
}
