"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, CreditCard, Gift as GiftIcon, MapPin } from "lucide-react";
import { weddingData } from "@/lib/constants";
import { useState } from "react";
import Image from "next/image";

export default function Gift() {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showGifts, setShowGifts] = useState(false);

  const copyToClipboard = (text: string, type: "account" | "address") => {
    navigator.clipboard.writeText(text);
    if (type === "account") {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <section className="py-24 bg-beige/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.4em] uppercase font-bold text-gold/60 mb-4 block">Gifts</span>
          <h2 className="text-4xl md:text-5xl font-serif text-accent mb-6">Love Gift</h2>
          <p className="text-sm text-accent/70 max-w-lg mx-auto leading-relaxed">
            Doa restu Anda merupakan hadiah terindah bagi kami. Namun bagi Anda yang ingin memberikan tanda kasih, dapat melalui:
          </p>
          <button
            onClick={() => setShowGifts(!showGifts)}
            className="mt-10 bg-gold text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/90 transition-all shadow-lg shadow-gold/20 flex items-center gap-3 mx-auto"
          >
            <GiftIcon className="h-4 w-4" />
            {showGifts ? "Tutup Pilihan Kado" : "Kirim Hadiah"}
          </button>
        </motion.div>

        <AnimatePresence>
          {showGifts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
                {/* Bank Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-[2rem] shadow-soft border border-gold/5 flex flex-col items-center text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-gold/5 flex items-center justify-center mb-6">
                      <CreditCard className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-serif text-accent mb-2">{weddingData.gift.bank.name}</h3>
                  <p className="text-2xl font-sans tracking-widest font-bold text-accent mb-2">
                      {weddingData.gift.bank.accountNumber}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-accent/50 mb-8">
                      Atas Nama: {weddingData.gift.bank.accountHolder}
                  </p>
                  <button
                      onClick={() => copyToClipboard(weddingData.gift.bank.accountNumber, "account")}
                      className="inline-flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                  >
                      <Copy className="h-4 w-4" />
                      {copiedAccount ? "Tersalin!" : "Salin Rekening"}
                  </button>
                </motion.div>

                {/* QRIS Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-8 rounded-[2rem] shadow-soft border border-gold/5 flex flex-col items-center text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-gold/5 flex items-center justify-center mb-6">
                      <GiftIcon className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-serif text-accent mb-6">QRIS {weddingData.gift.qris.name}</h3>
                  <div className="relative w-40 h-40 mb-6 bg-beige/5 rounded-xl border border-gold/10 p-2">
                      <Image 
                          src={weddingData.gift.qris.image} 
                          alt="QRIS" 
                          fill 
                          className="object-contain p-2"
                      />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-accent/50 mb-4">
                      Pindai untuk kirim tanda kasih
                  </p>
                  <button
                      className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                  >
                      Kirim Kado
                  </button>
                </motion.div>

                {/* Shipping Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-8 rounded-[2rem] shadow-soft border border-gold/5 flex flex-col items-center text-center md:col-span-2 lg:col-span-1"
                >
                  <div className="h-14 w-14 rounded-full bg-gold/5 flex items-center justify-center mb-6">
                      <MapPin className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-serif text-accent mb-6">Alamat Pengiriman</h3>
                  <p className="text-sm text-accent/70 mb-8 leading-relaxed italic px-4">
                      {weddingData.gift.delivery.address}
                  </p>
                  <button
                      onClick={() => copyToClipboard(weddingData.gift.delivery.address, "address")}
                      className="inline-flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                  >
                      <Copy className="h-4 w-4" />
                      {copiedAddress ? "Tersalin!" : "Salin Alamat"}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
