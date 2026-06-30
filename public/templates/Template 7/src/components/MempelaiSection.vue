<script setup lang="ts">
import SakuraOrnament from './SakuraOrnament.vue'
</script>

<template>
  <section id="couple" class="py-24 relative overflow-hidden">
    <!-- Sakura Ornaments -->
    <SakuraOrnament position="top-left" class="w-48 h-48 md:w-80 md:h-80 opacity-40" />
    <SakuraOrnament position="bottom-right" class="w-40 h-40 md:w-64 md:h-64 opacity-30" />

    <div class="container relative z-10 px-6 mx-auto">
      <div class="text-center mb-20" data-aos="fade-up">
        <p class="text-rose-gold font-serif text-3xl md:text-4xl mb-6 drop-shadow-sm">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
        <div class="section-divider mb-8"></div>
        <p class="font-sans text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base italic">
          Assalamu'alaikum Wr. Wb.<br/><br/>
          Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i serta Kerabat sekalian untuk menghadiri acara pernikahan kami:
        </p>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 relative">
        
        <!-- Bride (seli) -->
        <div class="flex flex-col items-center text-center relative z-10" data-aos="fade-up">
          <!-- Modern Arch Frame -->
          <div class="relative w-64 h-[340px] md:w-72 md:h-[400px] mb-8 group">
            <div class="absolute inset-0 border-2 border-rose-gold/30 rounded-t-full rounded-bl-3xl rounded-br-[100px] transform -translate-x-3 translate-y-3 transition-transform group-hover:-translate-x-5 group-hover:translate-y-5"></div>
            <div class="absolute inset-0 bg-soft-pink/20 rounded-t-full rounded-bl-3xl rounded-br-[100px] transform translate-x-3 -translate-y-3"></div>
            
            <div class="absolute inset-0 bg-white p-2 rounded-t-full rounded-bl-3xl rounded-br-[100px] shadow-2xl z-20 overflow-hidden border border-white/50">
              <img src="/assets/img/wanita.webp" alt="Cimeng" class="w-full h-full object-cover object-top rounded-t-full rounded-bl-2xl rounded-br-[90px] transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </div>
          </div>
          
          <h2 class="text-5xl font-serif text-rose-gold mb-3 text-shadow">seli</h2>
          <div class="section-divider w-12 mb-4"></div>
          <div class="glass px-6 py-4 rounded-2xl border border-white/50 shadow-lg">
            <span class="block text-xs uppercase tracking-[0.2em] text-rose-gold font-bold mb-2">Putri ke-2 Dari</span>
            <p class="font-sans font-light text-gray-600 text-sm md:text-base">
              Bapak rafi <br/> Ibu gigi
            </p>
          </div>
        </div>

        <!-- Ampersand -->
        <div class="font-serif text-7xl md:text-8xl text-rose-gold/20 md:static absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 scale-150 md:scale-100" data-aos="zoom-in">&</div>

        <!-- Groom (Razi) -->
        <div class="flex flex-col items-center text-center relative z-10 mt-12 md:mt-0 md:pt-24" data-aos="fade-up" data-aos-delay="200">
          <!-- Modern Arch Frame Drop Shape -->
          <div class="relative w-64 h-[340px] md:w-72 md:h-[400px] mb-8 group">
            <div class="absolute inset-0 border-2 border-rose-gold/30 rounded-t-full rounded-br-3xl rounded-bl-[100px] transform translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <div class="absolute inset-0 bg-champagne/30 rounded-t-full rounded-br-3xl rounded-bl-[100px] transform -translate-x-3 -translate-y-3"></div>
            
            <div class="absolute inset-0 bg-white p-2 rounded-t-full rounded-br-3xl rounded-bl-[100px] shadow-2xl z-20 overflow-hidden border border-white/50">
              <img src="/assets/img/pria.webp" alt="Blacky" class="w-full h-full object-cover object-top rounded-t-full rounded-br-2xl rounded-bl-[90px] transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </div>
          </div>
          
          <h2 class="text-5xl font-serif text-rose-gold mb-3 text-shadow">Razi</h2>
          <div class="section-divider w-12 mb-4"></div>
          <div class="glass px-6 py-4 rounded-2xl border border-white/50 shadow-lg">
            <span class="block text-xs uppercase tracking-[0.2em] text-rose-gold font-bold mb-2">Putra ke-1 Dari</span>
            <p class="font-sans font-light text-gray-600 text-sm md:text-base">
              Bapak Mawi <br/> Ibu Cindy
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
