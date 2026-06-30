<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const targetDate = new Date('2027-03-15T08:00:00').getTime()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer: any = null

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
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2 md:gap-4 drop-shadow-sm">
    <div v-for="(val, label) in { Hari: days, Jam: hours, Menit: minutes, Detik: seconds }" :key="label" 
         class="group relative" data-aos="zoom-in" :data-aos-delay="200">
      
      <!-- Background Petal Shape -->
      <div class="absolute inset-0 bg-rose-gold/5 blur-xl group-hover:bg-rose-gold/10 transition-colors duration-500 rounded-full"></div>
      
      <div class="glass flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 
                  border border-white/60 relative z-10 transition-all duration-700 group-hover:-translate-y-2
                  !rounded-t-[30px] !rounded-bl-[12px] !rounded-br-[35px]">
        <span class="text-xl md:text-2xl font-serif text-rose-gold font-bold">{{ val }}</span>
        <span class="text-[8px] md:text-[10px] font-sans uppercase tracking-widest text-gray-500 mt-0.5">{{ label }}</span>
      </div>

      <!-- Bottom Accent Decor -->
      <div class="absolute -bottom-1 -right-1 w-4 h-4 text-rose-gold opacity-30 group-hover:rotate-45 transition-transform duration-1000">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13 7 17 11 22 12C17 13 13 17 12 22C11 17 7 13 2 12C7 11 11 7 12 2Z"/></svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>