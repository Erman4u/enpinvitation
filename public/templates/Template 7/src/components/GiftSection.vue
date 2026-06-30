<script setup lang="ts">
import { ref, watch } from 'vue'
import { Copy, Gift, CreditCard, CheckCircle2, MapPin } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import SakuraOrnament from './SakuraOrnament.vue'
import AOS from 'aos'

const { copy } = useClipboard()

const isRevealed = ref(false)
const copiedState = ref(false)
const copyClick = () => {
  copy('082229243737')
  copiedState.value = true
  setTimeout(() => {
    copiedState.value = false
  }, 2000)
}

watch(isRevealed, (revealed) => {
  if (revealed) {
    setTimeout(() => {
      AOS.refresh()
    }, 100)
  }
})
</script>

<template>
  <section id="gift" class="py-24 relative overflow-hidden">
    <!-- Sakura Ornaments -->
    <SakuraOrnament position="top-right" class="w-48 h-48 md:w-64 md:h-64 opacity-30" />
    
    <div class="container px-6 mx-auto relative z-10">
      
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block px-4 py-1 text-xs tracking-widest text-rose-gold border border-rose-gold/30 rounded-full mb-4 font-sans uppercase">Wedding Gift</span>
        <h2 class="text-5xl font-serif text-rose-gold mb-4 text-shadow">Kirim Hadiah</h2>
        <div class="section-divider mb-4"></div>
        <p class="font-sans font-light text-gray-500 max-w-md mx-auto">Doa restu Anda merupakan hadiah terindah bagi kami</p>
      </div>

      <!-- Reveal Button -->
      <div v-if="!isRevealed" class="flex justify-center" data-aos="zoom-in">
        <button @click="isRevealed = true" class="group flex flex-col items-center gap-4 p-10 glass rounded-[40px] border border-rose-gold/20 hover:border-rose-gold/50 transition-all hover:shadow-2xl active:scale-95">
          <div class="w-20 h-16 rounded-full bg-rose-gold text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
            <Gift class="w-8 h-8" />
          </div>
          <div class="text-center">
            <span class="block font-sans font-bold tracking-[0.2em] uppercase text-rose-gold text-sm mb-1">Klik Untuk Kirim Hadiah</span>
            <span class="text-xs text-gray-400 font-sans">Bank Transfer / QRIS / Kado Fisik</span>
          </div>
        </button>
      </div>

      <Transition name="reveal">
        <div v-if="isRevealed" class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <!-- Bank Transfer -->
          <div class="glass p-8 md:p-10 rounded-3xl relative overflow-hidden text-center h-full flex flex-col justify-center group hover:shadow-2xl transition-shadow duration-500" data-aos="fade-right">
            <div class="absolute inset-0 bg-gradient-to-br from-soft-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div class="w-14 h-14 rounded-full bg-rose-gold/10 flex items-center justify-center mx-auto mb-6">
              <CreditCard class="w-7 h-7 text-rose-gold" />
            </div>
            <h3 class="text-2xl font-serif text-gray-800 mb-2">Bank BRI</h3>
            <div class="section-divider mb-6"></div>
            <p class="font-sans text-xs text-gray-400 uppercase tracking-widest mb-2">Nomor Rekening</p>
            <p class="font-mono text-2xl md:text-3xl tracking-widest text-rose-gold mb-2 font-semibold">0822 2924 3737</p>
            <p class="font-sans text-gray-500 mb-6 text-sm">a.n. <span class="font-semibold text-gray-700">Blacky</span></p>
            
            <button @click="copyClick" class="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-white transition-all bg-rose-gold rounded-full shadow-md hover:bg-blush hover:-translate-y-0.5 active:translate-y-0">
              <CheckCircle2 v-if="copiedState" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
              <span class="font-sans text-xs tracking-widest uppercase">{{ copiedState ? '✓ Tersalin!' : 'Salin Rekening' }}</span>
            </button>
          </div>

          <!-- QRIS -->
          <div class="glass p-8 md:p-10 rounded-3xl relative overflow-hidden text-center h-full flex flex-col justify-center group hover:shadow-2xl transition-shadow duration-500" data-aos="fade-left">
            <div class="absolute inset-0 bg-gradient-to-br from-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div class="w-14 h-14 rounded-full bg-rose-gold/10 flex items-center justify-center mx-auto mb-4">
              <span class="font-serif text-rose-gold text-xl font-bold">QR</span>
            </div>
            <h3 class="text-2xl font-serif text-gray-800 mb-2">QRIS</h3>
            <div class="section-divider mb-5"></div>
            <div class="bg-white p-3 inline-block rounded-2xl border border-rose-gold/10 mb-4 shadow-sm mx-auto">
              <img src="/assets/img/donate.webp" alt="QRIS Cimeng" class="w-40 h-auto object-contain rounded-xl" loading="lazy" />
            </div>
            <p class="font-sans text-sm text-gray-500">a.n. <span class="font-semibold text-gray-700">Cimeng</span></p>
          </div>

          <!-- Alamat Kado -->
          <div class="glass p-8 rounded-3xl relative overflow-hidden text-center md:col-span-2 group hover:shadow-xl transition-shadow duration-500" data-aos="fade-up">
            <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div class="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center shrink-0">
                <Gift class="w-6 h-6 text-rose-gold" />
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-xl font-serif text-gray-800 mb-1">Kirim Kado Fisik</h3>
                <p class="font-sans text-xs text-gray-400 uppercase tracking-widest mb-2">Alamat Pengiriman</p>
                <div class="flex items-start gap-2 justify-center md:justify-start">
                  <MapPin class="w-4 h-4 text-rose-gold shrink-0 mt-0.5" />
                  <p class="font-sans text-gray-600 text-sm leading-relaxed">RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.reveal-enter-active {
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.reveal-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
</style>
