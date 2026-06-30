<script setup lang="ts">
import { Instagram, Globe, MessageCircle } from 'lucide-vue-next'
import SakuraOrnament from './SakuraOrnament.vue'
</script>

<template>
  <footer class="py-24 relative overflow-hidden">
    <!-- Sakura ornaments -->
    <SakuraOrnament position="top-left" class="w-48 h-48 md:w-72 md:h-72 opacity-30" />
    <SakuraOrnament position="bottom-right" class="w-48 h-48 md:w-72 md:h-72 opacity-20" />

    <div class="container px-6 mx-auto relative z-10 text-center">

      <!-- Closing Ayat -->
      <div class="mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-serif text-rose-gold mb-6 drop-shadow-sm text-shadow">اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ</h2>
        <div class="section-divider mb-8"></div>
        <p class="font-sans font-light text-gray-600 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila<br class="hidden md:block" />
          Bapak/Ibu/Saudara/i berkenan hadir dalam acara pernikahan kami.<br class="hidden md:block" />
          Atas kehadiran dan doa restu Anda, kami ucapkan terima kasih.
        </p>
      </div>

      <!-- Couple Names Large -->
      <div class="mb-20" data-aos="zoom-in">
        <h3 class="text-5xl md:text-7xl lg:text-8xl font-serif text-rose-gold drop-shadow-md text-shadow">Razi & Seli</h3>
        <p class="font-sans text-xs tracking-[0.4em] uppercase text-gray-400 mt-4">15 · III · 2027</p>
      </div>

      <!-- Vendor Footer -->
      <div class="border-t border-rose-gold/20 pt-10" data-aos="fade-up" data-aos-offset="0">
        <div class="flex flex-col items-center justify-center mb-6">
          <img src="/assets/img/Logo-EnP.webp" alt="EnP Digital Service" class="w-16 h-auto mb-3 object-contain" loading="lazy" />
          <h4 class="font-serif text-xl text-gray-700">EnP Digital Service</h4>
          <p class="font-sans text-xs text-gray-400 tracking-widest mt-1 uppercase">Undangan Digital Premium</p>
        </div>

        <div class="flex justify-center gap-6 mb-8">
          <a href="https://enpdigitalservice.my.id" target="_blank" rel="noopener" class="text-rose-gold hover:text-blush transition-colors flex items-center gap-2 group">
            <Globe class="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span class="font-sans text-sm hidden md:inline">enpdigitalservice.my.id</span>
          </a>
          <a href="https://instagram.com/enpdigitalservice" target="_blank" rel="noopener" class="text-rose-gold hover:text-blush transition-colors flex items-center gap-2 group">
            <Instagram class="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span class="font-sans text-sm hidden md:inline">@enpdigitalservice</span>
          </a>
          <a href="https://wa.me/6282229243737" target="_blank" rel="noopener" class="text-rose-gold hover:text-blush transition-colors flex items-center gap-2 group">
            <MessageCircle class="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span class="font-sans text-sm hidden md:inline">WhatsApp</span>
          </a>
        </div>

        <p class="font-sans text-xs text-gray-400 tracking-wider">
          Dibuat dengan ❤️ oleh EnP Digital Service · 2027
        </p>
      </div>

    </div>
  </footer>
</template>
