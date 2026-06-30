"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Gift, MapPin, HandHeart, Heart, ExternalLink, CreditCard, Package } from "lucide-react/dist/cjs/lucide-react.js";
import { useState } from "react";
import Image from "next/image";

export default function Gifts() {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(3841);

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
    <section id="gifts" className="py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Section Heading */}
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-6xl font-heading font-bold text-gray-900 flex items-center justify-center gap-3"
          >
            Kado Cinta <Gift size={26} className="text-soft-purple" />
          </motion.h2>
          <p className="text-sm text-gray-500 font-body">
            Doa restu Anda adalah hadiah terindah bagi kami 💕
          </p>
        </div>

        {/* IG Post Frame — teaser / highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="bg-white p-0.5 rounded-full">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image src="/assets/Image/hero.jpg" alt="Profile" fill className="object-cover" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-none">aditya_lestari_official</p>
                <p className="text-xs text-gray-400 mt-0.5">🔗 link in bio</p>
              </div>
            </div>
            <button className="text-gray-500 font-bold text-lg tracking-widest leading-none pb-1">···</button>
          </div>

          {/* Cover Image */}
          <div className="relative w-full aspect-square bg-gradient-to-br from-pastel-pink/30 via-white to-soft-purple/20">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
              {/* Highlight circles styled like IG Highlights */}
              <div className="flex gap-5">
                {[
                  { icon: <CreditCard size={28} className="text-soft-purple" />, label: "Transfer", color: "bg-soft-purple/10 border-soft-purple/30" },
                  { icon: <Package size={28} className="text-baby-blue" />, label: "Kirim Kado", color: "bg-baby-blue/20 border-baby-blue/40" },
                  { icon: <HandHeart size={28} className="text-pastel-pink" />, label: "Donasi", color: "bg-pastel-pink/30 border-pastel-pink/50" },
                ].map((h) => (
                  <div key={h.label} className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-full border-2 ${h.color} flex items-center justify-center shadow-sm bg-white`}>
                      {h.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-600">{h.label}</span>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-2">
                <p className="text-lg font-heading font-black text-gray-800">Kado & Tanda Kasih</p>
                <p className="text-sm text-gray-500 font-body leading-relaxed max-w-xs">
                  Bagi yang ingin memberikan tanda kasih, dapat melalui transfer, donasi, atau pengiriman langsung.
                </p>
              </div>

              {!showGifts && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGifts(true)}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <ExternalLink size={16} /> Lihat Detail
                </motion.button>
              )}
            </div>
          </div>

          {/* Action bar */}
          <div className="px-4 pt-3 pb-1 space-y-2">
            <div className="flex items-center gap-4">
              <motion.button whileTap={{ scale: 0.75 }} onClick={() => { setLiked(!liked); setLikeCount(c => liked ? c - 1 : c + 1); }}>
                <Heart
                  size={26}
                  className={`transition-colors ${liked ? "text-red-500" : "text-gray-800"}`}
                  fill={liked ? "currentColor" : "none"}
                />
              </motion.button>
            </div>
            <p className="text-sm font-bold text-gray-900">{likeCount.toLocaleString("id")} likes</p>
            <p className="text-sm text-gray-800">
              <span className="font-bold">aditya_lestari_official</span>{" "}
              Doa dan kehadiran kalian adalah hadiah terbesar untuk kami 🙏❤️{" "}
              <span className="text-blue-500">#KadoCinta #AdityaLestari</span>
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Rabu, 15 Maret 2027</p>
          </div>
          <div className="h-3" />
        </motion.div>

        {/* Detail Cards — shown after click */}
        <AnimatePresence>
          {showGifts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              {/* Bank Transfer Card — IG Link-in-bio style */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <Gift size={18} className="text-soft-purple flex-shrink-0" />
                  <p className="font-bold text-gray-900 text-sm">Transfer Bank</p>
                  <span className="ml-auto px-2 py-0.5 bg-soft-purple/10 text-soft-purple text-[10px] font-black rounded-full uppercase tracking-wide">Aktif</span>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Bank BRI</span>
                  </div>
                  <p className="text-2xl font-heading font-black text-gray-800 tabular-nums tracking-tight">
                    0822 2924 3737
                  </p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Atas Nama: Aditya</p>
                  <button
                    onClick={() => copyToClipboard("082229243737", "account")}
                    className="w-full py-2.5 bg-soft-purple text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow transition-all active:scale-95"
                  >
                    <Copy size={16} />
                    {copiedAccount ? "✓ Disalin!" : "Salin Rekening"}
                  </button>
                </div>
              </motion.div>

              {/* QR Donation Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <HandHeart size={18} className="text-neon-pink flex-shrink-0" />
                  <p className="font-bold text-gray-900 text-sm">Donasi / Angpao</p>
                </div>
                <div className="px-4 py-4 flex items-center gap-4">
                  <div className="relative w-28 h-28 flex-shrink-0 bg-white rounded-2xl overflow-hidden border-2 border-gray-100 shadow-inner">
                    <Image
                      src="/assets/Image/donate.webp"
                      alt="Donation QR"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-800">Scan QR Code</p>
                    <p className="text-xs text-gray-500 font-body leading-relaxed">
                      Pindai kode QR untuk mengirimkan tanda kasih dengan mudah.
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Heart size={12} className="text-neon-pink" fill="currentColor" />
                      Terima kasih atas kebaikannya
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address — IG Location tag style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <MapPin size={18} className="text-gray-500 flex-shrink-0" />
                  <p className="font-bold text-gray-900 text-sm">Alamat Pengiriman</p>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <p className="text-sm text-gray-700 font-body leading-relaxed">
                    RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser,<br />Kalimantan Timur 76281
                  </p>
                  <button
                    onClick={() => copyToClipboard("RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281", "address")}
                    className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <Copy size={16} />
                    {copiedAddress ? "✓ Alamat Disalin!" : "Salin Alamat"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
