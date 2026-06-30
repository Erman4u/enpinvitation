<template>
  <section id="acara" class="py-20 px-6 bg-neo-white grid-bg border-b-8 border-neo-black relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-main)] opacity-50 z-0"></div>
    
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <!-- Left: Big Text -->
      <div class="flex-1 text-center md:text-left relative z-10">
        <h2 class="text-neo-red text-xl font-black uppercase tracking-[0.2em] mb-4">Hitung Mundur</h2>
        <h3 class="text-[clamp(2.5rem,8vw,4.5rem)] font-black uppercase leading-[0.9] mb-8 tracking-tighter">
          NANTIKAN <br /> <span class="text-neo-red">MOMEN</span> <br /> KAMI
        </h3>
        <button 
          @click="saveToCalendar"
          class="neo-btn neo-btn-red text-neo-white inline-flex items-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          SIMPAN DI KALENDER
        </button>
      </div>

      <!-- Right: Countdown Boxes -->
      <div class="flex-1 grid grid-cols-2 gap-4 w-full md:max-w-md relative">
        <!-- Floating shapes -->
        <div class="absolute -top-10 -right-10 w-24 h-24 bg-neo-blue border-4 border-neo-white rotate-12 -z-10"></div>
        <div class="absolute -bottom-10 -left-10 w-20 h-20 border-4 border-neo-red rotate-[-15deg] -z-10"></div>

        <div class="count-box">
          <span class="count-number">{{ timeLeft.days }}</span>
          <span class="count-label">Hari</span>
        </div>
        <div class="count-box bg-neo-red !text-white neo-shadow">
          <span class="count-number">{{ timeLeft.hours }}</span>
          <span class="count-label">Jam</span>
        </div>
        <div class="count-box bg-neo-blue !text-white neo-shadow">
          <span class="count-number">{{ timeLeft.minutes }}</span>
          <span class="count-label">Menit</span>
        </div>
        <div class="count-box">
          <span class="count-number">{{ timeLeft.seconds }}</span>
          <span class="count-label">Detik</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const targetDate = new Date('2027-03-15T10:00:00').getTime()
const timeLeft = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
})

let timer = null

function updateCountdown() {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) {
    clearInterval(timer)
    return
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24))
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((distance % (1000 * 60)) / 1000)

  timeLeft.value = {
    days: d.toString().padStart(2, '0'),
    hours: h.toString().padStart(2, '0'),
    minutes: m.toString().padStart(2, '0'),
    seconds: s.toString().padStart(2, '0')
  }
}

function saveToCalendar() {
  const title = "Pernikahan Claude & Fanny"
  const details = "Acara Akad Nikah & Resepsi Claude & Fanny"
  const location = "RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur"
  const startDate = "20270315T100000"
  const endDate = "20270315T210000"
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`
  window.open(url, '_blank')
}

function handleVisibility() {
  if (document.hidden) {
    if (timer) clearInterval(timer)
  } else {
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
  }
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
  document.addEventListener('visibilitychange', handleVisibility)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<style scoped>
</style>
