"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Quote } from "lucide-react";
import { weddingData } from "@/lib/constants";

interface Message {
  name: string;
  text: string;
  date: string;
}

export default function RSVP() {
  const [name, setName] = useState("");
  const [presence, setPresence] = useState("Hadir");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Basic local storage to persist wishes for the demo
    const savedWishes = localStorage.getItem("wedding_wishes");
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    }
  }, []);

  const handleSubmitPresence = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Blacky & Cimeng, Saya ${name} memberikan konfirmasi bahwa saya ${presence} di acara pernikahan kalian. Terima kasih!`;
    const url = `https://wa.me/${weddingData.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newWish: Message = {
        name,
        text: message,
        date: new Date().toLocaleDateString("id-ID", { 
          day: "numeric", 
          month: "long", 
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
      };

      const updatedWishes = [newWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem("wedding_wishes", JSON.stringify(updatedWishes));
      
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Presence Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-beige/10 p-10 rounded-[2.5rem] border border-gold/10 shadow-soft"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Send className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-3xl font-serif text-accent">RSVP</h3>
            </div>
            
            <p className="text-sm text-accent/70 mb-8 leading-relaxed">
              Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>

            <form onSubmit={handleSubmitPresence} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-accent/60 mb-2 ml-1">Nama</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  className="w-full bg-white border border-gold/10 focus:border-gold/50 rounded-2xl p-4 text-sm outline-none transition-all shadow-sm"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-accent/60 mb-2 ml-1">Konfirmasi Kehadiran</label>
                <select
                  className="w-full bg-white border border-gold/10 focus:border-gold/50 rounded-2xl p-4 text-sm outline-none transition-all shadow-sm appearance-none"
                  onChange={(e) => setPresence(e.target.value)}
                >
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                  <option value="Masih Ragu">Masih Ragu</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-white font-bold tracking-[0.2em] uppercase text-xs py-5 rounded-2xl shadow-lg shadow-gold/20 transition-all flex items-center justify-center gap-3"
              >
                Kirim via WhatsApp
              </button>
            </form>
          </motion.div>

          {/* Wishes Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="bg-accent/5 p-10 rounded-[2.5rem] border border-accent/5 mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-accent/5 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-accent/60" />
                    </div>
                    <h3 className="text-3xl font-serif text-accent">Doa & Ucapan</h3>
                </div>

                <form onSubmit={handleSubmitWish} className="space-y-5">
                    <input
                        type="text"
                        required
                        value={name}
                        placeholder="Nama Anda"
                        className="w-full bg-white border border-gold/10 focus:border-gold/50 rounded-2xl p-4 text-sm outline-none transition-all"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        required
                        value={message}
                        rows={4}
                        placeholder="Tulis doa dan ucapan terbaik..."
                        className="w-full bg-white border border-gold/10 focus:border-gold/50 rounded-2xl p-4 text-sm outline-none transition-all resize-none"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-accent text-white font-bold tracking-[0.2em] uppercase text-xs py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
                    </button>
                </form>
            </div>

            {/* Wishes List */}
            <div className="flex-1 max-h-[400px] overflow-y-auto px-2 space-y-4 custom-scrollbar">
                <AnimatePresence initial={false}>
                    {wishes.map((wish, idx) => (
                        <motion.div
                            key={idx + wish.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gold/5 relative overflow-hidden group"
                        >
                            <Quote className="absolute -right-2 -bottom-2 h-16 w-16 text-gold/5 group-hover:text-gold/10 transition-colors" />
                            <h4 className="font-serif text-gold text-lg mb-1">{wish.name}</h4>
                            <p className="text-xs text-accent/40 mb-3 uppercase tracking-tighter">{wish.date}</p>
                            <p className="text-sm text-accent/70 leading-relaxed relative z-10">{wish.text}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {wishes.length === 0 && (
                    <div className="text-center py-10 opacity-30 text-sm italic">Belum ada ucapan...</div>
                )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
