<script setup lang="ts">
import { MailOpen } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import SakuraOrnament from './SakuraOrnament.vue'

defineEmits(['open'])

const guestName = ref('Tamu Undangan')

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const to = urlParams.get('to')
  if (to) {
    guestName.value = to.replace(/[-_]/g, ' ')
  }
})
</script>

<template>
  <div class="fixed inset-0 z-[100] overflow-y-auto bg-center bg-cover overflow-x-hidden" style="background-image: url('/assets/img/bg-new.webp');">
    <!-- Fixed background overlay (Optimized: no blur) -->
    <div class="fixed inset-0 bg-[#fff5f7]/85 pointer-events-none"></div>
    
    <!-- Decor Sakura Branch corner ornaments -->
    <SakuraOrnament position="top-right" class="w-64 h-64 md:w-96 md:h-96 opacity-60" />
    <SakuraOrnament position="bottom-left" class="w-64 h-64 md:w-96 md:h-96 opacity-40" />

    <!-- Content Container -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-[100vh] py-12 px-4 text-center w-full" data-aos="zoom-in">
      
      <!-- The Couple Photo -->
      <div class="relative mb-8 group shrink-0">
        <div class="absolute -inset-2 border-2 border-rose-gold/20 rounded-[100px] transform rotate-6 transition-transform group-hover:rotate-0 duration-1000"></div>
        <div class="w-40 h-40 md:w-48 md:h-48 rounded-[100px] border-[6px] border-white shadow-2xl overflow-hidden relative backdrop-blur-md">
           <img src="/assets/img/hero.webp" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
        </div>
      </div>

      <div class="mb-6">
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-serif text-rose-gold drop-shadow-xl text-shadow leading-tight">Razi & Seli</h1>
        <div class="section-divider mt-4 mb-2"></div>
        <h3 class="text-xs md:text-sm tracking-[0.4em] uppercase font-sans text-gray-500 font-bold">Undangan Pernikahan</h3>
      </div>
      
      <div class="mb-10 p-8 md:p-10 glass rounded-[40px] border border-white max-w-[90%] md:max-w-sm mx-auto shadow-2xl relative overflow-hidden shrink-0 group">
        <div class="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none"></div>
        <div class="relative z-10">
          <p class="text-xs text-gray-400 mb-2 font-sans uppercase tracking-[0.2em] font-bold">Yth. Bapak / Ibu / Saudara/i</p>
          <p class="text-3xl md:text-4xl font-serif text-rose-gold mb-4 capitalize text-shadow">{{ guestName }}</p>
          <div class="section-divider w-12 mb-4"></div>
          <p class="text-xs md:text-sm font-sans font-light text-gray-600 leading-relaxed italic">Kami mengundang Anda untuk hadir di acara pernikahan kami.</p>
        </div>
      </div>
      
      <button @click="$emit('open')" class="flex items-center gap-3 px-10 py-4 text-white transition-all bg-rose-gold rounded-full shadow-2xl hover:bg-blush hover:shadow-rose-gold/40 hover:-translate-y-1 active:translate-y-0 group relative overflow-hidden shrink-0">
        <div class="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <MailOpen class="w-5 h-5 transition-transform group-hover:scale-110 relative z-10" />
        <span class="tracking-[0.2em] uppercase font-sans text-xs md:text-sm font-bold relative z-10">Buka Undangan</span>
      </button>
    </div>
  </div>
</template>
