<script setup>
import { ref, onMounted } from 'vue'
import Castle from './Castle.vue'
import Swan from './Swan.vue'
import Cygnet from './Cygnet.vue'
import Water from './Water.vue'
import FallingFeathers from './FallingFeathers.vue'

const props = defineProps({
  isInteractive: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['open'])

const swanLeftRef = ref(null)
const swanRightRef = ref(null)
const cygnetsLeftRef = ref([])
const cygnetsRightRef = ref([])
const containerRef = ref(null)
const contentRef = ref(null)
const guestName = ref('')

const getGuestName = () => {
  const fullUrl = window.location.href
  const searchStr = fullUrl.includes('?') ? fullUrl.split('?')[1] : ''
  if (searchStr) {
    const urlParams = new URLSearchParams(searchStr)
    const to = urlParams.get('to')
    if (to) {
      return to.replace(/_/g, ' ').replace(/\+/g, ' ')
    }
  }
  return ''
}

onMounted(() => {
  guestName.value = getGuestName()
})

const handleOpen = () => {
  if (!props.isInteractive) return
  emit('open')
}
</script>

<template>
  <div ref="containerRef" class="relative w-full h-screen overflow-hidden bg-[#E6F3F7] origin-center">
    <!-- Atmospheric Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#B0C4DE] via-[#E6F3F7] to-[#FFFFFF] pointer-events-none"></div>

    <!-- Castle Parallax Layer -->
    <div class="parallax-bg absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div class="absolute bottom-[42%] md:bottom-[35%] w-[180%] md:w-full max-w-5xl opacity-40 text-swan-deep transition-all">
        <Castle />
      </div>
      <div class="absolute top-[58%] md:top-[65%] w-[180%] md:w-full max-w-5xl opacity-10 text-swan-deep scale-y-[-1] transition-all">
        <Castle />
      </div>
    </div>

    <!-- Water Layer -->
    <div class="absolute bottom-0 w-full z-10 pointer-events-none">
      <Water />
    </div>

    <!-- Falling Feathers -->
    <FallingFeathers />

    <!-- 1. Removed Swan Image -->

    <!-- 2. Swimming Swan Families (z-index below SwanHeart & content) -->
    <div class="absolute inset-0 pointer-events-none z-[12] overflow-hidden">
      <!-- Left Swan + Cygnets -->
      <div ref="swanLeftRef" class="absolute bottom-[20%] md:bottom-[10%] left-[2%] w-16 md:w-28 text-white opacity-80">
        <Swan />
      </div>
      <div v-for="i in 2" :key="'cl'+i"
           ref="cygnetsLeftRef"
           class="absolute bottom-[18%] md:bottom-[8%] left-[0%] w-8 md:w-12 text-white opacity-60"
           :style="{ transform: `translateX(${-i * 30}px)` }">
        <Cygnet />
      </div>

      <!-- Right Swan + Cygnets -->
      <div ref="swanRightRef" class="absolute bottom-[19%] md:bottom-[9%] right-[2%] w-16 md:w-24 text-white opacity-80">
        <Swan />
      </div>
      <div v-for="i in 2" :key="'cr'+i"
           ref="cygnetsRightRef"
           class="absolute bottom-[17%] md:bottom-[7%] right-[0%] w-8 md:w-10 text-white opacity-50"
           :style="{ transform: `translateX(${i * 28}px)` }">
        <Cygnet />
      </div>
    </div>

    <!-- Interactive Content Overlay -->
    <div v-if="isInteractive" ref="contentRef" class="relative z-30 flex flex-col items-center justify-between h-full px-4 pt-16 pb-12 text-center pointer-events-none">
      <div class="animate-fade-in">
        <p class="text-swan-deep/40 tracking-[0.4em] uppercase text-[9px] md:text-[11px] mb-2 font-bold">The Wedding of</p>
        <h1 class="text-4xl md:text-7xl font-serif text-swan-deep drop-shadow-sm leading-tight">Franz & Rosie</h1>
      </div>

      <div class="bg-white/60 backdrop-blur-xl p-6 md:p-8 rounded-[40px] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-[320px] md:max-w-md pointer-events-auto mt-auto">
        <p class="text-swan-deep/70 italic font-serif text-base md:text-lg mb-6">15 Maret 2027</p>
        <div class="mb-6 flex flex-col items-center">
          <p class="text-swan-deep/50 text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-2 font-bold">Kepada Yth.</p>
          <p class="text-swan-deep font-serif text-2xl md:text-3xl italic capitalize border-b border-swan-silver/30 pb-2 px-4">
            {{ guestName || 'Tamu Undangan' }}
          </p>
        </div>
        <button @click="handleOpen" 
                class="group relative overflow-hidden w-full py-4 bg-swan-deep text-white rounded-full shadow-xl hover:scale-[1.02] hover:bg-black transition-all duration-300">
          <span class="relative z-10 font-bold tracking-[0.4em] text-[10px] md:text-[11px] uppercase">Buka Undangan</span>
          <div class="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>
      </div>
    </div>

    <!-- Atmospheric Overlays -->
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] opacity-10 animate-mist pointer-events-none z-20"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent z-20 pointer-events-none"></div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 2s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
