<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref(null)

onMounted(() => {
  gsap.from(sectionRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      end: "top center",
      scrub: 1,
    },
    rotationX: -15,
    transformOrigin: "top center",
    opacity: 0,
    ease: "none"
  })
})
</script>

<template>
  <div ref="sectionRef" class="py-32 bg-magical-blue relative overflow-hidden" style="perspective: 2000px;">
    <!-- Parallax Background -->
    <div 
      class="absolute inset-0 bg-cover bg-fixed bg-center opacity-10"
      style="background-image: url('/asset/img/hutan.webp')"
    ></div>
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-magical-blue/60 backdrop-blur-sm"></div>

    <!-- Floating Lanterns & Particles -->
    <div class="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
      <div class="w-full h-full lantern-light"></div>
    </div>
    <!-- Floating Particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 25" :key="i" 
        class="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-magical-gold/30 rounded-full blur-[1px] animate-float-optimized will-change-transform" 
        :style="{ 
          left: Math.random() * 100 + '%', 
          top: Math.random() * 100 + '%', 
          animationDelay: Math.random() * 5 + 's', 
          animationDuration: 4 + Math.random() * 4 + 's' 
        }"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto px-4 relative z-10 text-center">
      <!-- Section Header -->
      <div class="mb-24 relative z-10">
        <h2 class="fairytale-font text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-magical-gold-light via-magical-gold to-magical-gold-light glow-text-gold mb-6 drop-shadow-2xl">Informasi Acara</h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-magical-gold"></div>
          <span class="text-magical-gold/80 tracking-[0.3em] uppercase text-sm md:text-base font-bold">Simpan di Kalender</span>
          <div class="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-magical-gold"></div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-16 md:gap-20">
        <!-- Akad Nikah -->
        <div class="relative group">
          <div class="absolute inset-0 bg-magical-gold/10 blur-[80px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div class="relative bg-white/5 backdrop-blur-md rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-[0_0_40px_rgba(30,10,40,0.5)] hover:-translate-y-4 transition-transform duration-500 overflow-hidden">
            <!-- Corner Ornaments -->
            <div class="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-magical-gold/50 rounded-tl-2xl"></div>
            <div class="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-magical-gold/50 rounded-br-2xl"></div>
            
            <h3 class="fairytale-font text-5xl text-white mb-8 glow-text-purple tracking-wide">Akad Nikah</h3>
            <div class="h-px w-24 bg-gradient-to-r from-transparent via-magical-gold to-transparent mx-auto mb-8"></div>
            
            <div class="space-y-8 text-white/90">
              <div class="flex flex-col items-center gap-2">
                <span class="text-magical-gold font-bold uppercase tracking-[0.2em] text-xs">Hari & Tanggal</span>
                <p class="text-xl font-light">Rabu, 15 Maret 2027</p>
              </div>
              
              <div class="flex flex-col items-center gap-2">
                <span class="text-magical-gold font-bold uppercase tracking-[0.2em] text-xs">Waktu</span>
                <p class="text-xl font-light">10.00 WIB — Selesai</p>
              </div>
              
              <div class="flex flex-col items-center gap-2">
                <span class="text-magical-gold font-bold uppercase tracking-[0.2em] text-xs">Lokasi</span>
                <p class="leading-relaxed font-light text-center max-w-[250px]">
                  RT 02, Desa Padang Jaya, Kec. Kuaro, <br> Kab. Paser, Kaltim 76281
                </p>
              </div>

              <div class="flex flex-col items-center gap-2">
                <span class="text-magical-gold font-bold uppercase tracking-[0.2em] text-xs">Dress Code</span>
                <p class="font-light italic">Busana batik dan bersepatu.</p>
              </div>
            </div>

            <a href="https://maps.apple.com/?address=Padang%20Jaya,%20Kalimantan%20Timur,%20Indonesia" target="_blank" class="mt-12 inline-flex items-center gap-3 px-8 py-3 rounded-full border border-magical-gold/40 text-magical-gold hover:bg-magical-gold hover:text-magical-blue transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] group-hover:scale-105">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span class="font-bold tracking-[0.2em] text-sm">GOOGLE MAPS</span>
            </a>
          </div>
        </div>

        <!-- Resepsi -->
        <div class="relative group">
          <div class="absolute inset-0 bg-magical-gold/10 blur-[80px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div class="relative bg-white/5 backdrop-blur-md rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-[0_0_40px_rgba(30,10,40,0.5)] hover:-translate-y-4 transition-transform duration-500 overflow-hidden">
            <!-- Corner Ornaments -->
            <div class="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-magical-gold/50 rounded-tr-2xl"></div>
            <div class="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-magical-gold/50 rounded-bl-2xl"></div>
            
            <h3 class="fairytale-font text-5xl text-white mb-8 glow-text-purple tracking-wide">Resepsi</h3>
            <div class="h-px w-24 bg-gradient-to-r from-transparent via-magical-gold to-transparent mx-auto mb-8"></div>
            
            <div class="space-y-8 text-white/90">
              <div class="flex flex-col items-center gap-2">
                <span class="text-magical-gold font-bold uppercase tracking-[0.2em] text-xs">Hari & Tanggal</span>
                <p class="text-xl font-light">Rabu, 15 Maret 2027</p>
              </div>
              
              <div class="flex flex-col items-center gap-2">
                <span class="text-magical-gold font-bold uppercase tracking-[0.2em] text-xs">Waktu</span>
                <p class="text-xl font-light">13.00 WIB — Selesai</p>
              </div>
              
              <div class="flex flex-col items-center gap-2">
                <span class="text-magical-gold font-bold uppercase tracking-[0.2em] text-xs">Lokasi</span>
                <p class="leading-relaxed font-light text-center max-w-[250px]">
                  RT 02, Desa Padang Jaya, Kec. Kuaro, <br> Kab. Paser, Kaltim 76281
                </p>
              </div>

              <div class="flex flex-col items-center gap-2">
                <span class="text-magical-gold font-bold uppercase tracking-[0.2em] text-xs">Dress Code</span>
                <p class="font-light italic">Busana batik dan bersepatu.</p>
              </div>
            </div>

            <a href="https://maps.apple.com/?address=Padang%20Jaya,%20Kalimantan%20Timur,%20Indonesia" target="_blank" class="mt-12 inline-flex items-center gap-3 px-8 py-3 rounded-full border border-magical-gold/40 text-magical-gold hover:bg-magical-gold hover:text-magical-blue transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] group-hover:scale-105">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span class="font-bold tracking-[0.2em] text-sm">GOOGLE MAPS</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
