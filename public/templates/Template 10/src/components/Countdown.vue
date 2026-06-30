<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const targetDate = new Date('2027-03-15T10:00:00+07:00').getTime()
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer = null

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) {
    clearInterval(timer)
    return
  }

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="py-20 relative overflow-hidden bg-magical-blue flex flex-col items-center">
    <!-- Section Title -->
    <div class="text-center mb-12 z-10">
      <h2 class="fairytale-font text-5xl md:text-6xl text-magical-gold glow-text-gold mb-4 uppercase tracking-widest">Nantikan Momen Kami</h2>
      <p class="text-magical-gold-light/80 uppercase tracking-[0.3em]">15 Maret 2027</p>
    </div>

    <!-- Countdown Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4 z-10 w-full">
      <div class="glass-panel p-6 flex flex-col items-center group hover:bg-magical-gold/20 transition-colors duration-500">
        <span class="text-5xl font-bold glow-text-gold mb-2">{{ days }}</span>
        <span class="text-sm uppercase tracking-widest text-magical-gold-light">{{ days > 1 ? 'Hari' : 'Hari' }}</span>
      </div>
      <div class="glass-panel p-6 flex flex-col items-center group hover:bg-magical-gold/20 transition-colors duration-500">
        <span class="text-5xl font-bold glow-text-gold mb-2">{{ hours }}</span>
        <span class="text-sm uppercase tracking-widest text-magical-gold-light">Jam</span>
      </div>
      <div class="glass-panel p-6 flex flex-col items-center group hover:bg-magical-gold/20 transition-colors duration-500">
        <span class="text-5xl font-bold glow-text-gold mb-2">{{ minutes }}</span>
        <span class="text-sm uppercase tracking-widest text-magical-gold-light">Menit</span>
      </div>
      <div class="glass-panel p-6 flex flex-col items-center group hover:bg-magical-gold/20 transition-colors duration-500">
        <span class="text-5xl font-bold glow-text-gold mb-2">{{ seconds }}</span>
        <span class="text-sm uppercase tracking-widest text-magical-gold-light">Detik</span>
      </div>
    </div>

    <!-- Save to Calendar Button -->
    <a 
      href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Blacky+%26+Cimeng&dates=20270315T100000Z/20270315T150000Z&details=Selamat+datang+di+pernikahan+kami!&location=RT+02,+Desa+Padang+Jaya,+Kec.+Kuaro,+Kab.+Paser,+Kaltim" 
      target="_blank"
      class="mt-12 px-10 py-4 border border-magical-gold text-magical-gold hover:bg-magical-gold hover:text-magical-blue transition-all duration-300 rounded-full uppercase tracking-widest font-bold z-10"
    >
      Simpan Di Kalender
    </a>

    <!-- Decorative Asset -->
    <div 
      class="absolute bottom-0 left-0 w-full h-full opacity-20 pointer-events-none bg-bottom bg-no-repeat bg-contain"
      style="background-image: url('/asset/img/hutan.webp')"
    ></div>
  </div>
</template>
