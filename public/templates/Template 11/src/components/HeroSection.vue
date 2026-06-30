<script setup>
import Scene from './Scene.vue'
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Pure Code Background Scene -->
    <div class="absolute inset-0 z-0">
      <Scene :isInteractive="false" />
    </div>

    <!-- Content -->
    <div class="hero-content relative z-10 text-center px-6">
      <div class="mb-8 reveal flex items-center justify-center gap-4">
        <div class="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-swan-silver"></div>
        <span class="text-[10px] md:text-xs tracking-[0.5em] uppercase text-swan-deep font-bold bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50">The Wedding Of</span>
        <div class="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-swan-silver"></div>
      </div>
      
      <!-- Hero Photo -->
      <div class="reveal mx-auto mb-10 relative group">
        <div class="absolute inset-0 bg-swan-silver/20 rounded-full blur-2xl group-hover:bg-swan-blue/30 transition-colors duration-1000"></div>
        <div class="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[450px] mx-auto rounded-[120px] overflow-hidden border-8 border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:scale-[1.02]">
          <img src="/Asset/Image/hero.webp" alt="Bridal Couple" class="w-full h-full object-cover parallax-img">
          <div class="absolute inset-0 bg-gradient-to-t from-swan-deep/20 to-transparent"></div>
          
          <!-- Falling Feathers Overlay -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div v-for="i in 8" :key="i" class="feather-particle" 
                 :style="{ left: (i * 12) + '%', animationDuration: (6 + (i % 4)) + 's', animationDelay: (i * 0.7) + 's' }">
            </div>
          </div>
        </div>
        <!-- Decorative Swan-like curve or framing can be handled by CSS/Assets here -->
      </div>

      <h1 class="text-[2rem] sm:text-5xl md:text-7xl font-serif text-swan-deep mb-2 leading-tight drop-shadow-md flex flex-row items-center justify-center">
        <span>Franz</span>
        <span class="font-accent text-2xl sm:text-4xl md:text-5xl text-swan-silver mx-2 sm:mx-3 md:mx-4">&</span>
        <span>Rosie</span>
      </h1>
      
      <!-- Save The Date Only -->
      <div class="reveal mt-10 space-y-2 bg-white/40 px-10 py-6 rounded-[2rem] backdrop-blur-md border border-white/60 shadow-xl inline-block">
        <p class="text-xs tracking-[0.2em] uppercase text-swan-deep/60 font-bold">Save the Date</p>
        <div class="flex items-center gap-4">
          <div class="w-8 h-[1px] bg-swan-silver/30"></div>
          <p class="text-2xl md:text-3xl font-serif text-swan-deep italic">15 Maret 2027</p>
          <div class="w-8 h-[1px] bg-swan-silver/30"></div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60">
      <div class="w-[1px] h-12 bg-gradient-to-b from-swan-deep to-transparent animate-pulse"></div>
    </div>
  </section>
</template>
