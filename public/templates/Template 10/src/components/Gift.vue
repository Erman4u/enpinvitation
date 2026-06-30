<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref(null)

const isRevealed = ref(false)

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  alert('Berhasil disalin: ' + text)
}

onMounted(() => {
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
  <div ref="sectionRef" class="py-32 bg-magical-blue relative overflow-hidden" style="perspective: 2000px;">
    <!-- Starry overlay -->
    <div class="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

    <div class="max-w-5xl mx-auto px-4 relative z-10 text-center">
      <!-- Section Header -->
      <div class="mb-24 relative z-10">
        <h2 class="fairytale-font text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-magical-gold-light via-magical-gold to-magical-gold-light glow-text-gold mb-6 drop-shadow-2xl">Gift & Kadou</h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-magical-gold"></div>
          <span class="text-magical-gold/80 tracking-[0.3em] uppercase text-sm md:text-base font-bold">Tanda Kasih</span>
          <div class="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-magical-gold"></div>
        </div>
      </div>

      <!-- Trigger Button container -->
      <div v-if="!isRevealed" class="flex justify-center items-center py-10 relative z-20">
        <button 
          @click="isRevealed = true"
          class="px-10 py-5 bg-gradient-to-r from-magical-gold to-magical-gold-light text-magical-purple font-bold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-500 uppercase tracking-widest border-2 border-white/20 text-lg flex items-center gap-3 animate-pulse group"
        >
          <svg class="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Buka Tanda Kasih
        </button>
      </div>

      <!-- Wrapped Content -->
      <div v-else class="animate-fade-in-up">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16">
          <!-- Bank Card -->
          <div class="relative group">
            <div class="absolute inset-0 bg-magical-gold/5 blur-[50px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative bg-white/5 backdrop-blur-md rounded-[3rem] p-10 md:p-12 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] flex flex-col items-center transition-all duration-500 hover:-translate-y-2 hover:border-magical-gold/30">
              <div class="w-20 h-20 bg-white/5 rounded-full border border-magical-gold/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-transform duration-500">
                <svg class="w-10 h-10 text-magical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
              </div>
              <h3 class="fairytale-font text-4xl text-white mb-4">BANK BRI</h3>
              <div class="h-px w-12 bg-magical-gold/50 mb-6"></div>
              <p class="text-magical-gold-light text-3xl font-bold mb-4 tracking-widest">0822 2924 3737</p>
              <p class="text-white/70 mb-8 uppercase tracking-[0.2em] text-sm">Atas Nama: Andro</p>
              <button 
                @click="copyToClipboard('082229243737')"
                class="px-8 py-3 bg-magical-gold/10 border border-magical-gold/50 text-magical-gold hover:bg-magical-gold hover:text-magical-purple transition-colors duration-300 rounded-full text-sm font-bold uppercase tracking-widest w-full max-w-xs"
              >
                Salin Rekening
              </button>
            </div>
          </div>

          <!-- QRIS Card -->
          <div class="relative group">
            <div class="absolute inset-0 bg-magical-gold/5 blur-[50px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative bg-white/5 backdrop-blur-md rounded-[3rem] p-10 md:p-12 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] flex flex-col items-center transition-all duration-500 hover:-translate-y-2 hover:border-magical-gold/30">
              <div class="w-20 h-20 bg-white/5 rounded-full border border-magical-gold/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-transform duration-500">
                <svg class="w-10 h-10 text-magical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
              </div>
              <h3 class="fairytale-font text-4xl text-white mb-6">QRIS YUKI</h3>
              <div class="w-48 h-48 bg-white p-2 rounded-2xl mb-8 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                <img src="/asset/img/donate.webp" alt="QRIS YUKI" class="w-full h-full object-contain" loading="lazy" />
              </div>
              <p class="text-white/60 uppercase tracking-[0.2em] text-xs">Pindai untuk mengirim</p>
            </div>
          </div>
        </div>

        <!-- Address Card -->
        <div class="mt-16 max-w-2xl mx-auto relative group">
          <div class="absolute inset-0 bg-magical-gold/5 blur-[50px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div class="relative bg-white/5 backdrop-blur-md rounded-[3rem] p-10 md:p-12 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 hover:border-magical-gold/30">
            <h3 class="fairytale-font text-4xl text-white mb-6">Kirim Kado</h3>
            <div class="h-px w-24 bg-gradient-to-r from-transparent via-magical-gold to-transparent mx-auto mb-6"></div>
            <p class="text-white/80 max-w-lg mx-auto mb-8 font-light leading-relaxed">
              RT 02, Desa Padang Jaya, Kec. Kuaro, <br> Kab. Paser, Kalimantan Timur 76281
            </p>
            <button 
              @click="copyToClipboard('RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281')"
              class="px-10 py-4 bg-magical-gold text-magical-purple font-bold rounded-full hover:bg-white transition-colors uppercase tracking-[0.2em] text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              Salin Alamat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
