<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref(null)
const particles = ref([])

onMounted(() => {
  particles.value = Array.from({ length: 30 }).map(() => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    delay: Math.random() * 5 + 's',
    duration: 6 + Math.random() * 4 + 's'
  }))

  gsap.from(sectionRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      end: "top center",
      scrub: 1,
    },
    rotationX: -20,
    transformOrigin: "top center",
    opacity: 0,
    ease: "none"
  })
})
</script>

<template>
  <div ref="sectionRef" class="py-32 relative text-center overflow-hidden" style="perspective: 2000px;">
    <!-- Parallax Background -->
    <div 
      class="absolute inset-0 bg-cover bg-fixed bg-center opacity-20"
      style="background-image: url('/asset/img/hutan.webp')"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-magical-blue via-magical-blue/90 to-magical-purple/80"></div>
    
    <!-- Floating Particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="(p, i) in particles" :key="i" 
        class="absolute w-1 h-1 md:w-2 md:h-2 bg-magical-gold/30 rounded-full blur-[1px] animate-float-optimized will-change-transform" 
        :style="{ 
          left: p.left, 
          top: p.top, 
          animationDelay: p.delay, 
          animationDuration: p.duration 
        }"
      ></div>
    </div>

    <!-- Section Header -->
    <div class="mb-24 relative z-10">
      <h2 class="fairytale-font text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-magical-gold-light via-magical-gold to-magical-gold-light glow-text-gold mb-6 drop-shadow-2xl">Mempelai</h2>
      <div class="flex items-center justify-center gap-4">
        <div class="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-magical-gold"></div>
        <span class="text-magical-gold/80 tracking-[0.3em] uppercase text-sm md:text-base font-bold">Sang Pengantin</span>
        <div class="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-magical-gold"></div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
      <!-- Groom: Blacky -->
      <div class="relative group">
        <div class="absolute inset-0 bg-magical-gold/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-1000"></div>
        <div class="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl hover:-translate-y-4 transition-transform duration-500">
          <div class="relative w-56 h-72 md:w-64 md:h-80 mx-auto mb-8">
            <div class="absolute inset-0 bg-magical-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div class="w-full h-full bg-magical-blue overflow-hidden rounded-[3rem] border-2 border-white/30 p-2 shadow-2xl relative z-10 transition-all duration-700 group-hover:border-magical-gold">
              <div class="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-magical-gold/80">
              <img src="/asset/img/pria.jpg" alt="Andro" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
            </div>
          </div>
          
          <h3 class="fairytale-font text-5xl md:text-6xl text-white mb-2 glow-text-gold tracking-wider">Andro</h3>
          <div class="h-px w-32 bg-gradient-to-r from-transparent via-magical-gold to-transparent mx-auto mb-6"></div>
          
          <p class="text-magical-gold text-sm tracking-[0.2em] font-bold mb-4 uppercase">Putra ke-1 Dari :</p>
          <p class="text-white/90 font-light leading-relaxed mb-8 italic text-lg px-2">
            Bapak Andro Hengky <br> <span class="text-magical-gold/50 my-1 inline-block">&</span> <br> Ibu Meyden
          </p>
          
          <a href="https://www.instagram.com/andro/" target="_blank" class="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full border border-magical-gold/40 text-magical-gold hover:bg-magical-gold hover:text-magical-blue transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span class="font-bold tracking-widest text-sm">@Andro</span>
          </a>
        </div>
      </div>

      <!-- Ampersand -->
      <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:flex hidden flex-col items-center justify-center pointer-events-none">
        <div class="h-32 w-px bg-gradient-to-b from-transparent to-magical-gold/60 mb-6"></div>
        <div class="w-28 h-28 rounded-full border border-magical-gold/40 flex items-center justify-center bg-magical-blue/60 backdrop-blur-md shadow-[0_0_40px_rgba(212,175,55,0.4)]">
          <span class="fairytale-font text-7xl text-magical-gold glow-text-gold pt-2">&</span>
        </div>
        <div class="h-32 w-px bg-gradient-to-t from-transparent to-magical-gold/60 mt-6"></div>
      </div>

      <!-- Bride: Cimeng -->
      <div class="relative group mt-8 md:mt-0">
        <div class="absolute inset-0 bg-magical-gold/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-1000"></div>
        <div class="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl hover:-translate-y-4 transition-transform duration-500">
          <div class="relative w-56 h-72 md:w-64 md:h-80 mx-auto mb-8">
            <div class="absolute inset-0 bg-magical-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div class="w-full h-full bg-magical-blue overflow-hidden rounded-[2rem] border-[4px] border-magical-gold/80 shadow-[0_0_30px_rgba(212,175,55,0.4)] relative z-10">
              <img src="/asset/img/wanita.jpg" alt="Yuki" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            </div>
          </div>
          
          <h3 class="fairytale-font text-5xl md:text-6xl text-white mb-2 glow-text-gold tracking-wider">Yuki</h3>
          <div class="h-px w-32 bg-gradient-to-r from-transparent via-magical-gold to-transparent mx-auto mb-6"></div>
          
          <p class="text-magical-gold text-sm tracking-[0.2em] font-bold mb-4 uppercase">Putri ke-2 Dari :</p>
          <p class="text-white/90 font-light leading-relaxed mb-8 italic text-lg px-2">
            Bapak Jusrin <br> <span class="text-magical-gold/50 my-1 inline-block">&</span> <br> Ibu Sisca
          </p>
          
          <a href="https://www.instagram.com/yuki/" target="_blank" class="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full border border-magical-gold/40 text-magical-gold hover:bg-magical-gold hover:text-magical-blue transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span class="font-bold tracking-widest text-sm">@Yuki</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
