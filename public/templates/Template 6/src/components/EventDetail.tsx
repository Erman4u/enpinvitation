"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";
import { weddingData } from "@/lib/constants";

export default function EventDetail() {
  const { akad, resepsi, date, day } = weddingData.event;

  const events = [
    {
      title: "Akad Nikah",
      time: akad.time,
      location: akad.location,
      maps: akad.mapsUrl,
      icon: <Clock className="h-6 w-6 text-gold" />,
    },
    {
      title: "Resepsi",
      time: resepsi.time,
      location: resepsi.location,
      maps: resepsi.mapsUrl,
      icon: <Calendar className="h-6 w-6 text-gold" />,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-serif text-accent mb-4">Momen Bahagia</h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-beige/10 p-10 rounded-[2.5rem] border border-gold/10 hover:border-gold/30 hover:bg-beige/20 transition-all duration-500 shadow-soft"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-white shadow-md flex items-center justify-center mb-8 border border-gold/5 group-hover:scale-110 transition-transform duration-500">
                  {event.icon}
                </div>
                
                <h3 className="text-3xl font-serif text-gold mb-8">{event.title}</h3>
                
                <div className="space-y-6 w-full text-accent/80">
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-serif text-xl italic">{day}, 15 Maret 2027</span>
                    <span className="text-sm font-medium tracking-widest uppercase">{event.time}</span>
                  </div>

                  <div className="h-[1px] w-full bg-gold/10" />

                  <div className="flex flex-col items-center gap-3">
                    <MapPin className="h-5 w-5 text-gold/60" />
                    <p className="text-sm leading-relaxed max-w-xs">{event.location}</p>
                  </div>

                  <div className="pt-4">
                    <p className="text-xs uppercase tracking-widest font-bold mb-6">Dress Code: Busana batik dan bersepatu.</p>
                    <a
                      href={event.maps}
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:bg-accent/90"
                    >
                      Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
