"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Heart, Calendar, Image as ImageIcon, Gift, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);

      const sections = ['hero', 'mempelai', 'story', 'countdown', 'acara', 'gallery', 'gift', 'rsvp'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', icon: <Home size={18} />, label: 'Home' },
    { id: 'mempelai', icon: <User size={18} />, label: 'Pasangan' },
    { id: 'story', icon: <Heart size={18} />, label: 'Kisah' },
    { id: 'acara', icon: <Calendar size={18} />, label: 'Acara' },
    { id: 'gallery', icon: <ImageIcon size={18} />, label: 'Galeri' },
    { id: 'gift', icon: <Gift size={18} />, label: 'Hadiah' },
    { id: 'rsvp', icon: <MessageSquare size={18} />, label: 'Pesan' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[4000] px-4"
        >
          <div className="bg-vintage-cream/80 backdrop-blur-md border border-vintage-gold/30 px-4 py-2 rounded-full shadow-2xl flex items-center gap-1 relative overflow-hidden">
             {/* Texture inside navbar */}
             <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]"></div>
             
             {navItems.map((item) => (
               <a
                 key={item.id}
                 href={`#${item.id}`}
                 onClick={() => setActiveSection(item.id)}
                 className={`relative z-10 p-3 rounded-full transition-all duration-300 flex flex-col items-center group ${
                   activeSection === item.id ? 'text-vintage-gold scale-110' : 'text-vintage-brown/50 hover:text-vintage-brown'
                 }`}
               >
                 {item.icon}
                 <span className="absolute -top-10 bg-vintage-brown text-vintage-cream text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none serif-text">
                   {item.label}
                 </span>
                 {activeSection === item.id && (
                   <motion.div
                     layoutId="activeNav"
                     className="absolute inset-0 bg-vintage-gold/10 rounded-full -z-10"
                   />
                 )}
               </a>
             ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
