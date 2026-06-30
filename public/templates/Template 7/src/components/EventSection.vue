<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Calendar, MapPin, CalendarDays } from 'lucide-vue-next'
import SakuraOrnament from './SakuraOrnament.vue'

const targetDate = new Date('2027-03-15T08:00:00').getTime()
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer: number
let isPageHidden = false

const calculateTimeLeft = () => {
  if (isPageHidden) return
  const now = new Date().getTime()
  const distance = targetDate - now
  if (distance > 0) {
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
  }
}

const handleVisibilityChange = () => {
  isPageHidden = document.hidden
  if (!document.hidden) calculateTimeLeft()
}

const googleCalendarUrl = computed(() => {
  const start = '20270315T080000'
  const end = '20270315T130000'
  const text = encodeURIComponent('Pernikahan Blacky & Cimeng')
  const details = encodeURIComponent('Acara Pernikahan Blacky & Cimeng. RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur.')
  const location = encodeURIComponent('RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281')
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`
})

const mapsUrl = 'https://maps.app.goo.gl/search/Padang+Jaya+Kuaro+Paser'

onMounted(() => {
  calculateTimeLeft()
  timer = window.setInterval(calculateTimeLeft, 1000)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  clearInterval(timer)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>
<template>
  <section id="event" class="py-24 relative overflow-hidden">
    <!-- Sakura branch ornaments -->
    <SakuraOrnament position="top-right" class="w-48 h-48 md:w-72 md:h-72 opacity-40" />
    <SakuraOrnament position="bottom-left" class="w-40 h-40 md:w-64 md:h-64 opacity-30" />
    
    <div class="container px-6 mx-auto relative z-10">
      
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block px-4 py-1 text-xs tracking-widest text-rose-gold border border-rose-gold/30 rounded-full mb-4 font-sans uppercase">Acara & Waktu</span>
        <h2 class="text-5xl font-serif text-rose-gold mb-4 text-shadow">Save The Date</h2>
        <div class="section-divider mb-4"></div>
        <p class="font-sans font-light text-gray-500">Rabu, 15 Maret 2027</p>
      </div>
      
      <!-- Countdown -->
      <div class="flex justify-center gap-3 md:gap-6 mb-12" data-aos="zoom-in">
        <div v-for="(item, i) in [
          { value: days, label: 'Hari' },
          { value: hours, label: 'Jam' },
          { value: minutes, label: 'Menit' },
          { value: seconds, label: 'Detik' },
        ]" :key="i" class="flex flex-col items-center">
          <div class="glass rounded-2xl md:rounded-3xl px-4 py-4 md:px-8 md:py-6 min-w-[70px] md:min-w-[100px] text-center shadow-lg border border-white/50">
            <span class="block text-3xl md:text-5xl font-serif text-rose-gold font-light leading-none">{{ String(item.value).padStart(2, '0') }}</span>
            <span class="block text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 text-gray-500 font-sans">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <div class="text-center mb-16" data-aos="fade-up">
        <p class="text-xs text-gray-400 mb-4 italic font-sans">*Klik tombol di bawah untuk menyimpan tanggal pada Google Kalender</p>
        <a :href="googleCalendarUrl" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-8 py-3 text-white transition-all bg-rose-gold rounded-full shadow-md hover:bg-blush hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 font-sans text-sm tracking-widest uppercase">
          <CalendarDays class="w-5 h-5" />
          Simpan ke Kalender
        </a>
      </div>

      <!-- Divider -->
      <div class="section-divider mb-16"></div>

      <!-- Events Grid -->
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Akad -->
        <div class="glass p-8 md:p-10 rounded-3xl text-center relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500" data-aos="fade-right">
          <div class="absolute inset-0 bg-gradient-to-br from-soft-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <!-- Crown icon top -->
          <div class="w-14 h-14 rounded-full bg-rose-gold/10 flex items-center justify-center mx-auto mb-6">
            <Calendar class="w-7 h-7 text-rose-gold" />
          </div>
          
          <h3 class="text-3xl font-serif text-rose-gold mb-2">Akad Nikah</h3>
          <div class="section-divider mb-6"></div>
          
          <p class="font-sans font-light text-gray-600 mb-1">Rabu, 15 Maret 2027</p>
          <p class="font-sans font-semibold text-rose-gold/80 text-lg mb-6">08:00 – 10:00 WITA</p>
          
          <div class="flex justify-center gap-2 mb-8 text-gray-500">
            <MapPin class="w-4 h-4 text-rose-gold shrink-0 mt-0.5" />
            <p class="font-sans font-light text-sm text-left leading-relaxed">RT 02, Desa Padang Jaya,<br/>Kec. Kuaro, Kab. Paser, Kaltim</p>
          </div>
          
          <a :href="mapsUrl" target="_blank" rel="noopener" class="inline-block px-8 py-2.5 text-rose-gold transition-all border border-rose-gold rounded-full hover:bg-rose-gold hover:text-white font-sans text-xs tracking-widest uppercase hover:shadow-lg hover:-translate-y-0.5">
            Petunjuk Lokasi
          </a>
        </div>

        <!-- Resepsi -->
        <div class="glass p-8 md:p-10 rounded-3xl text-center relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500" data-aos="fade-left">
          <div class="absolute inset-0 bg-gradient-to-br from-champagne/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div class="w-14 h-14 rounded-full bg-rose-gold/10 flex items-center justify-center mx-auto mb-6">
            <Calendar class="w-7 h-7 text-rose-gold" />
          </div>
          
          <h3 class="text-3xl font-serif text-rose-gold mb-2">Resepsi Pernikahan</h3>
          <div class="section-divider mb-6"></div>
          
          <p class="font-sans font-light text-gray-600 mb-1">Rabu, 15 Maret 2027</p>
          <p class="font-sans font-semibold text-rose-gold/80 text-lg mb-6">13:00 – Selesai</p>
          
          <div class="flex justify-center gap-2 mb-8 text-gray-500">
            <MapPin class="w-4 h-4 text-rose-gold shrink-0 mt-0.5" />
            <p class="font-sans font-light text-sm text-left leading-relaxed">RT 02, Desa Padang Jaya,<br/>Kec. Kuaro, Kab. Paser, Kaltim</p>
          </div>
          
          <a :href="mapsUrl" target="_blank" rel="noopener" class="inline-block px-8 py-2.5 text-rose-gold transition-all border border-rose-gold rounded-full hover:bg-rose-gold hover:text-white font-sans text-xs tracking-widest uppercase hover:shadow-lg hover:-translate-y-0.5">
            Petunjuk Lokasi
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
