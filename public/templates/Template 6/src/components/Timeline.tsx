"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/constants";

export default function Timeline() {
  return (
    <section className="py-24 bg-beige/10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.4em] uppercase font-bold text-gold/60 mb-4 block">Our Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif text-accent">Kisah Cinta</h2>
        </motion.div>

        <div className="relative border-l border-gold/20 ml-4 md:mx-auto md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:h-full md:before:w-[1px] md:before:bg-gold/20">
          {weddingData.story.map((item, idx) => (
            <div key={item.title} className="relative mb-20 last:mb-0">
              {/* Timeline Dot */}
              <div className="absolute -left-[21px] top-1 h-10 w-10 md:left-1/2 md:-ml-5 bg-white border border-gold/40 rounded-full flex items-center justify-center z-10 shadow-sm">
                <div className="h-2 w-2 bg-gold rounded-full" />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`relative ml-10 md:ml-0 md:w-1/2 pb-4 ${
                  idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto md:text-left"
                }`}
              >
                <div className="bg-white p-8 rounded-3xl shadow-soft border border-gold/5 hover:border-gold/20 transition-colors duration-500">
                  <span className="font-sans text-xs font-bold text-gold/80 uppercase tracking-widest mb-3 block">
                    {item.date}
                  </span>
                  <h3 className="text-2xl font-serif text-accent mb-4">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-accent/70 italic">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
