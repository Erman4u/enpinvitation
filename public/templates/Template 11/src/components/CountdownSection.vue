<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Water from './Water.vue'

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let timer

onMounted(() => {
  const targetDate = new Date('2027-03-15T10:00:00').getTime()
  timer = setInterval(() => {
    const now = new Date().getTime()
    const distance = targetDate - now
    countdown.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timer))

const labels = { days: 'Hari', hours: 'Jam', minutes: 'Menit', seconds: 'Detik' }

// Google Calendar Link
const calendarLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Blacky+%26+Cimeng&dates=20270315T030000Z/20270315T130000Z&details=Mohon+doa+restu+atas+pernikahan+kami.&location=RT+02,+Desa+Padang+Jaya,+Kec.+Kuaro,+Kab.+Paser,+Kaltim+76281"
</script>

<template>
  <section class="py-28 relative overflow-hidden bg-[#F0F7FA]">
    <!-- Animated Water Background (Subtle) -->
    <div class="absolute bottom-0 left-0 w-full opacity-[0.1] scale-y-50 origin-bottom pointer-events-none">
      <Water />
    </div>

    <!-- Floating background shapes -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/50 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="max-w-4xl mx-auto px-6 relative z-10 text-center reveal">
      <!-- Header -->
      <p class="text-[10px] tracking-[0.5em] uppercase text-swan-deep/30 mb-4">Nantikan Momen Kami</p>
      <h2 class="text-5xl md:text-6xl font-serif text-swan-deep mb-6 leading-tight">
        15 Maret<br><em class="not-italic text-swan-silver">2027</em>
      </h2>
      <div class="w-12 h-[1px] bg-swan-silver/40 mx-auto mb-20"></div>

      <!-- Countdown -->
      <div class="flex justify-center gap-2 md:gap-6 mb-20">
        <div
          v-for="(value, key) in countdown"
          :key="key"
          class="group relative flex-1 max-w-[90px] md:max-w-[120px]"
        >
          <!-- Card -->
          <div class="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl py-6 px-2 border border-white/60 shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500">
            <p class="text-3xl md:text-5xl font-serif text-swan-deep leading-none mb-2">{{ String(value).padStart(2, '0') }}</p>
            <p class="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-swan-deep/40">{{ labels[key] }}</p>
          </div>
          <!-- Separator -->
          <span v-if="key !== 'seconds'" class="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 text-swan-silver/60 text-2xl font-light select-none hidden md:block">:</span>
        </div>
      </div>

      <!-- CTA -->
      <a :href="calendarLink" target="_blank" 
         class="inline-flex items-center gap-3 px-10 py-4 bg-swan-deep text-white rounded-full text-[10px] tracking-[0.4em] uppercase hover:bg-swan-deep/80 transition-colors shadow-xl shadow-swan-deep/20">
        Simpan Di Kalender
      </a>
    </div>
  </section>
</template>
