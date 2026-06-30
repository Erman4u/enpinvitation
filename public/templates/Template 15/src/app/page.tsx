"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Overlay from "@/components/Overlay";
import Hero from "@/components/Hero";
import SaveTheDate from "@/components/SaveTheDate";
import Couple from "@/components/Couple";
import Events from "@/components/Events";
import LoveStory from "@/components/LoveStory";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import MusicPlayer from "@/components/MusicPlayer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Suspense } from "react";

import Gifts from "@/components/Gifts";
import Navbar from "@/components/Navbar";

function InvitationContent() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Terhormat";

  const handleOpen = () => {
    setIsOpen(true);
    window.scrollTo(0, 0);
  };

  return (
    <main className="relative min-h-screen">
      {/* Overlay is always mounted but exits via AnimatePresence */}
      <Overlay guestName={guestName} onOpen={handleOpen} />

      {isOpen && (
        <div className="animate-in fade-in duration-1000">
          <Hero />
          
          {/* Guest Greeting — IG notification/DM style */}
          <div className="bg-white px-4 sm:px-6 py-10 flex justify-center">
            <div className="max-w-xl w-full space-y-3">

              {/* IG notification pill */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Notifikasi Baru</p>
              </div>

              {/* DM Request Card */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                    <div className="bg-white p-0.5 rounded-full">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <img src="/assets/Image/hero.jpg" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm leading-none">aditya_lestari_official</p>
                    <p className="text-xs text-gray-400 mt-0.5">mengirimkan undangan pernikahan · Baru saja</p>
                  </div>
                  <div className="bg-blue-500 rounded-full w-2.5 h-2.5 flex-shrink-0" />
                </div>

                {/* Message body */}
                <div className="px-4 py-5 space-y-4">
                  <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5">📬 Kepada Yth.</p>
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 leading-tight">{guestName}</h2>
                  </div>

                  <p className="text-sm text-gray-600 font-body leading-relaxed italic">
                    Bismillah. &ldquo;Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat kebesaran Allah.&rdquo;
                    <span className="font-bold not-italic text-gray-800"> — QS. Adh-Dhariyat: 49</span>
                  </p>

                  {/* Action buttons like IG DM request */}
                  <div className="flex gap-2 pt-1">
                    <div className="flex-1 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold text-center">
                      Terima Undangan ✓
                    </div>
                    <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold border border-gray-200">
                      Nanti
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="mempelai"><Couple /></div>
          <SaveTheDate />
          <div id="acara"><Events /></div>
          <div id="cerita"><LoveStory /></div>
          <div id="galeri"><Gallery /></div>
          <RSVP />
          <Gifts />
          
          <footer className="py-24 px-4 sm:px-6 text-center bg-gray-50 space-y-12 relative overflow-hidden">
             <div className="max-w-3xl mx-auto space-y-8 relative z-10">
               <p className="text-base sm:text-xl italic font-body text-gray-500 leading-relaxed px-4">
                 "dan sesungguhnya Dialah yang menciptakan pasangan laki-laki dan perempuan," 
                 <br />
                 <span className="font-bold">— QS. An-Najm: 45</span>
               </p>
               
               <div className="space-y-4">
                 <h4 className="text-xl sm:text-3xl font-heading font-bold text-gray-800 uppercase tracking-tighter">Kami Yang Berbahagia</h4>
                 <p className="text-xl sm:text-2xl font-heading font-bold text-soft-purple">Aditya & Lestari</p>
                 <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest px-4">Keluarga Besar Bapak Bambang & Ibu Sri Wahyuni serta Bapak Suherman & Ibu Ratnasari</p>
               </div>

               <div className="h-px w-20 bg-gray-200 mx-auto" />

               <div className="space-y-6 pt-6">
                 <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.4em]">Created with love by</p>
                 <div className="space-y-2">
                   <h5 className="text-xl font-heading font-bold text-gray-800">EnP Digital Service</h5>
                   <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-soft-purple underline underline-offset-4">
                     <a href="https://enpdigitalservice.my.id">Web: enpdigitalservice.my.id</a>
                     <a href="https://wa.me/6282229243737">WA: 082229243737</a>
                     <a href="https://instagram.com/enpdigitalservice">@enpdigitalservice</a>
                   </div>
                 </div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Copyright © 2026 EnP Digital Service. All rights reserved.</p>
               </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute top-0 left-0 w-32 h-32 bg-pastel-pink/10 rounded-full blur-3xl" />
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-baby-blue/10 rounded-full blur-3xl" />
          </footer>

          <Navbar />
          <DarkModeToggle />
          <MusicPlayer isPlaying={isOpen} />
        </div>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-mesh animate-pulse" />}>
      <InvitationContent />
    </Suspense>
  );
}
