<script setup>
import { Instagram } from 'lucide-vue-next'
</script>

<template>
  <section class="py-28 bg-white relative overflow-hidden">
    <!-- Subtle background decorations -->
    <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-[#E6F3F7]/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#E6F3F7]/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
    
    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Header with Swan Heart Background -->
      <div class="relative mb-24 reveal">
        <!-- Removed Background Swan Image -->

        <div class="relative z-10">
          <p class="text-[10px] tracking-[0.5em] uppercase text-swan-deep/40 mb-4 font-bold">Sang Pengantin</p>
          <h2 class="text-6xl md:text-7xl font-serif text-swan-deep leading-tight">
            Dua Jiwa,<br>
            <span class="not-italic text-swan-silver block mt-2">Satu Cinta</span>
          </h2>
        </div>
      </div>

      <!-- Couple Layout -->
      <div class="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
        
        <!-- Groom -->
        <div class="flex-1 reveal group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F0F7FA]/80 to-white border border-white/80 hover:shadow-2xl hover:shadow-swan-blue/20 transition-all duration-700 backdrop-blur-sm">
          <!-- Photo -->
          <div class="relative h-72 md:h-80 overflow-hidden">
            <img src="/Asset/Image/pria.jpg" alt="Franz" loading="lazy" decoding="async"
                 class="w-full h-full object-cover object-top parallax-img">
            <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            
            <!-- Falling Feathers Overlay -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden">
              <div v-for="i in 5" :key="i" class="feather-particle" 
                   :style="{ left: (i * 20) + '%', animationDuration: (5 + i) + 's', animationDelay: (i * 1.2) + 's' }">
              </div>
            </div>
          </div>
          
          <!-- Info -->
          <div class="p-8 pt-4 relative">
            <p class="text-[10px] tracking-[0.4em] uppercase text-swan-deep/30 mb-2">Mempelai Pria</p>
            <h3 class="text-4xl font-serif text-swan-deep mb-6 leading-none">Franz</h3>
            <div class="space-y-1 mb-6 text-sm text-swan-deep/60 leading-relaxed">
              <p>Putra ke-1 dari</p>
              <p class="font-medium text-swan-deep/80">Bapak Rustam</p>
              <p class="text-swan-deep/30 text-xs">&</p>
              <p class="font-medium text-swan-deep/80">Ibu Farida</p>
            </div>
            <a href="https://instagram.com/enpdigitalservice" target="_blank" class="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-swan-deep/30 hover:text-swan-deep transition-colors group/ig">
              <Instagram class="w-3.5 h-3.5 group-hover/ig:rotate-12 transition-transform" /> @enpdigitalservice
            </a>
          </div>
        </div>

        <!-- Divider -->
        <div class="hidden md:flex items-center justify-center shrink-0 w-16">
          <span class="font-accent text-6xl text-swan-silver/60 leading-none">&</span>
        </div>

        <!-- Bride -->
        <div class="flex-1 reveal group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F0F7FA]/80 to-white border border-white/80 hover:shadow-2xl hover:shadow-swan-blue/20 transition-all duration-700 backdrop-blur-sm">
          <!-- Photo -->
          <div class="relative h-72 md:h-80 overflow-hidden">
            <img src="/Asset/Image/wanita.jpg" alt="Rosie" loading="lazy" decoding="async"
                 class="w-full h-full object-cover object-top parallax-img">
            <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            
            <!-- Falling Feathers Overlay -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden">
              <div v-for="i in 5" :key="i" class="feather-particle" 
                   :style="{ left: (i * 20) + '%', animationDuration: (5 + i) + 's', animationDelay: (i * 0.8) + 's' }">
              </div>
            </div>
          </div>
          
          <!-- Info -->
          <div class="p-8 pt-4 relative">
            <p class="text-[10px] tracking-[0.4em] uppercase text-swan-deep/30 mb-2">Mempelai Wanita</p>
            <h3 class="text-4xl font-serif text-swan-deep mb-6 leading-none">Rosie</h3>
            <div class="space-y-1 mb-6 text-sm text-swan-deep/60 leading-relaxed">
              <p>Putri ke-2 dari</p>
              <p class="font-medium text-swan-deep/80">Bapak Bima</p>
              <p class="text-swan-deep/30 text-xs">&</p>
              <p class="font-medium text-swan-deep/80">Ibu Lena</p>
            </div>
            <a href="https://instagram.com/enpdigitalservice" target="_blank" class="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-swan-deep/30 hover:text-swan-deep transition-colors group/ig">
              <Instagram class="w-3.5 h-3.5 group-hover/ig:rotate-12 transition-transform" /> @enpdigitalservice
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
