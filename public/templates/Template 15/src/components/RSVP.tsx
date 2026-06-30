"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle2, Bell, Sparkles } from "lucide-react/dist/cjs/lucide-react.js";
import Image from "next/image";

export default function RSVP() {
  const [formData, setFormData] = useState({ name: "", status: "", guests: "1", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Halo Aditya & Lestari, saya ${formData.name} ingin mengonfirmasi kehadiran.\nStatus: ${formData.status === "yes" ? "Hadir" : "Tidak Hadir"}\nJumlah Tamu: ${formData.guests}\nPesan: ${formData.message}`;
    window.open(`https://wa.me/6282229243737?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Heading */}
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-6xl font-heading font-bold text-gray-900 flex items-center justify-center gap-3"
          >
            <Bell size={26} className="text-soft-purple" /> RSVP
          </motion.h2>
          <p className="text-base text-gray-500 font-body">Konfirmasi kehadiran via WhatsApp</p>
        </div>

        {/* IG Notification Card + Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Notification Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
            <div className="relative">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="bg-white p-0.5 rounded-full">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src="/assets/Image/hero.jpg" alt="Profile" fill className="object-cover" />
                  </div>
                </div>
              </div>
              {/* Notif badge */}
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[9px] font-black">1</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 leading-tight">
                <span className="font-black">aditya_lestari_official</span> mengundang Anda ke pernikahan mereka.
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Harap konfirmasi kehadiran · 15 Mar 2027</p>
            </div>
            <Bell size={18} className="text-gray-400 flex-shrink-0" />
          </div>

          {/* Form Area */}
          <div className="px-4 py-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 py-8"
              >
                <CheckCircle2 size={72} className="text-mint mx-auto" />
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800 flex items-center justify-center gap-2">
                  Terima Kasih! <Sparkles className="text-yellow-400 w-6 h-6" />
                </h3>
                <p className="text-base text-gray-600 font-body">Konfirmasi kehadiran Anda telah kami terima.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-500 font-bold text-sm hover:underline"
                >
                  Kirim Ulang
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-soft-purple focus:outline-none text-sm font-body transition-all"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="flex gap-3">
                    {[
                      { val: "yes", label: "Hadir" },
                      { val: "no", label: "Tidak Hadir" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: opt.val })}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                          formData.status === opt.val
                            ? "bg-soft-purple text-white border-soft-purple shadow-md"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">
                    Jumlah Tamu
                  </label>
                  <div className="flex items-center gap-3">
                    {["1", "2", "3", "4", "5+"].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: n })}
                        className={`w-11 h-11 rounded-xl text-sm font-bold border transition-all ${
                          formData.guests === n
                            ? "bg-soft-purple text-white border-soft-purple shadow-md"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">
                    Pesan & Doa
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="Tulis doa dan ucapan terbaik..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-soft-purple focus:outline-none text-sm font-body transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!formData.status}
                  className="w-full py-3 bg-green-500 text-white rounded-xl font-heading font-bold text-base flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                  <span>Kirim via WhatsApp</span>
                </motion.button>

                <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Mohon konfirmasi sebelum 01 Des 2026
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
