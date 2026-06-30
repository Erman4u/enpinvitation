<script setup lang="ts">
import SakuraOrnament from './SakuraOrnament.vue'
import CountdownTimer from './CountdownTimer.vue'
</script>

<template>
  <section id="hero" class="relative min-h-screen flex flex-col items-center justify-center pt-10 md:pt-20 overflow-hidden">
    <!-- Sakura Ornaments -->
    <SakuraOrnament position="top-right" class="w-64 h-64 md:w-96 md:h-96 opacity-40" />
    <SakuraOrnament position="bottom-left" class="w-48 h-48 md:w-72 md:h-72 opacity-30" />

    <!-- Overlay to ensure text readability against global background -->
    <div class="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
    
    <div class="container relative z-10 px-6 mx-auto flex flex-col items-center justify-center">
      
      <!-- Typography above image -->
      <div class="text-center mb-10" data-aos="fade-down" data-aos-duration="1200">
        <span class="inline-block px-4 py-1 text-xs tracking-[0.4em] uppercase font-sans text-rose-gold border border-rose-gold/20 rounded-full mb-6 font-bold bg-white/50 backdrop-blur-sm">The Wedding Of</span>
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-serif text-rose-gold leading-none drop-shadow-2xl text-shadow mb-4">Razi & Seli</h1>
        <div class="section-divider mb-2"></div>
      </div>

      <!-- Main Image Container - completely unobscured -->
      <div class="relative mb-12 group" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200">
        <!-- Floating frames -->
        <div class="absolute -inset-4 border-2 border-rose-gold/10 rounded-t-[120px] rounded-b-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-1000"></div>
        <div class="absolute inset-0 border-2 border-rose-gold/30 translate-x-4 translate-y-4 rounded-t-[110px] rounded-b-2xl transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6"></div>
        
        <div class="w-[280px] h-[380px] md:w-[380px] md:h-[520px] overflow-hidden rounded-t-[100px] rounded-b-2xl relative z-10 shadow-[0_20px_50px_rgba(183,110,121,0.3)] bg-white p-2.5 border border-white/50">
          <img src="/assets/img/galery4.webp" class="w-full h-full object-cover object-top rounded-t-[90px] rounded-b-xl transition-transform duration-1000 group-hover:scale-110" />
        </div>
      </div>
      
      <!-- Date overlay -->
      <div class="text-center" data-aos="fade-up" data-aos-delay="600">
        <div class="inline-flex flex-col items-center gap-4">
          <p class="font-serif text-xl md:text-2xl text-rose-gold/80 italic mb-1 tracking-wide text-shadow">Minggu, 15 Maret 2027</p>
          
          <!-- New Countdown Component -->
          <CountdownTimer />

          <div class="glass px-10 py-3 rounded-full shadow-xl text-gray-700 font-sans tracking-[0.3em] border border-white/80 text-xs md:text-sm font-bold uppercase transition-transform hover:scale-105">
            Save The Date
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>
