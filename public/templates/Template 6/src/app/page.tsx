"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OpeningScreen from "@/components/OpeningScreen";
import MusicPlayer from "@/components/MusicPlayer";
import Hero from "@/components/Hero";
import Mempelai from "@/components/Mempelai";
import Countdown from "@/components/Countdown";
import EventDetail from "@/components/EventDetail";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Gift from "@/components/Gift";
import Footer from "@/components/Footer";

function WeddingContent() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Starting Overlay */}
      <OpeningScreen isOpen={isOpened} onOpen={handleOpenInvitation} guestName={guestName || undefined} />

      {/* Floating Music Player */}
      <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />

      {/* Main Content Sections */}
      <div className={isOpened ? "block" : "fixed overflow-hidden h-screen w-screen"}>
        <Hero />
        <Mempelai />
        <Countdown />
        <EventDetail />
        <Timeline />
        <Gallery />
        <Gift />
        <RSVP />
        <Footer />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="bg-black h-screen w-screen" />}>
        <WeddingContent />
      </Suspense>
    </main>
  );
}
