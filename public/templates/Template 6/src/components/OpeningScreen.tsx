"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import { weddingData } from "@/lib/constants";
import Image from "next/image";

interface OpeningScreenProps {
  isOpen: boolean;
  onOpen: () => void;
  guestName?: string;
}

export default function OpeningScreen({ isOpen, onOpen, guestName }: OpeningScreenProps) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black text-white"
        >
          {/* Background Image with Blur */}
          <div className="absolute inset-0 opacity-60">
            <Image
              src="/assets/Image/hero.webp"
              alt="Background"
              fill
              className="object-cover blur-sm"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-4 text-sm font-medium tracking-[0.3em] uppercase opacity-80"
            >
              Wedding Invitation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-2 text-5xl md:text-7xl font-serif text-gold leading-tight"
            >
              {weddingData.couple.groom.firstName} & {weddingData.couple.bride.firstName}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 mb-12"
            >
              <div className="h-[1px] w-24 bg-gold/50 mx-auto mb-6" />
              <p className="text-xl md:text-2xl font-serif tracking-widest italic">
                {weddingData.event.day}, 15 Maret 2027
              </p>
              <div className="h-[1px] w-24 bg-gold/50 mx-auto mt-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-4 mb-8 space-y-2"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">Kepada Bapak/Ibu/Saudara/i</p>
              <h2 className="text-2xl md:text-3xl font-serif text-white drop-shadow-md">
                {guestName || "Tamu Terhormat"}
              </h2>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-lg shadow-gold/20"
            >
              <MailOpen className="h-5 w-5" />
              <span className="font-medium tracking-wide uppercase">Open Invitation</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 2 }}
              className="mt-12 text-xs italic font-light max-w-xs mx-auto text-white/60 leading-relaxed"
            >
              Mohon maaf apabila ada kesalahan penulisan nama dan gelar.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
