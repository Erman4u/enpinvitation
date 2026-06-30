"use client";

import { motion } from "framer-motion";
import { Home, Users, Calendar, MessageSquare, Image as ImageIcon, Mail } from "lucide-react/dist/cjs/lucide-react.js";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", icon: <Home size={20} />, href: "#" },
  { label: "Mempelai", icon: <Users size={20} />, href: "mempelai" },
  { label: "Acara", icon: <Calendar size={20} />, href: "acara" },
  { label: "Cerita", icon: <MessageSquare size={20} />, href: "cerita" },
  { label: "Galeri", icon: <ImageIcon size={20} />, href: "galeri" },
  { label: "RSVP", icon: <Mail size={20} />, href: "rsvp" },
];

export default function Navbar() {
  const [active, setActive] = useState("#");

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = navItems.map((i) => i.href).filter((h) => h !== "#");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActive("#");
      return;
    }

    const target = document.getElementById(href);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({ top, behavior: "smooth" });
    setActive(href);
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.3 }}
        className="pointer-events-auto px-2 py-2 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-white/60 flex items-center gap-0.5"
      >
        {navItems.map((item) => {
          const isActive = active === item.href;
          return (
            <motion.button
              key={item.label}
              onClick={(e) => handleClick(e, item.href)}
              whileTap={{ scale: 0.85 }}
              className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                isActive ? "text-white" : "text-gray-400 hover:text-soft-purple"
              }`}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-soft-purple rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {item.icon}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
}
