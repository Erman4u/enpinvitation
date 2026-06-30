<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-end justify-center overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-10">
        <img src="/assets/Image/hero.webp" alt="Background" class="w-full h-full object-cover filter brightness-[0.5] grayscale-[0.5] contrast-125" />
        <!-- Gradient mask to clear the center -->
        <div class="absolute inset-0 bg-gradient-to-t from-neo-black via-neo-black/40 to-transparent"></div>
        <!-- Grain/Noise Filter Overlay -->
        <div class="absolute inset-0 pointer-events-none opacity-[0.08] bg-noise"></div>
      </div>

      <!-- Content Overlay -->
      <div class="relative z-30 flex flex-col items-center text-center p-8 pb-16 animate-pop-in max-w-xl w-full">
        <div class="bg-neo-red text-neo-white px-6 py-2 font-black uppercase text-xs mb-6 tracking-[0.5em] shadow-neo transform -rotate-2">Special Invitation</div>
        
        <h1 class="text-[clamp(1.5rem,10vw,3.5rem)] font-black text-neo-white leading-tight uppercase mb-8 tracking-tighter whitespace-nowrap">
          CLAUDE <span class="text-neo-red">&</span> FANNY
        </h1>

        <!-- Guest Info Section (Kepada Yth) -->
        <div class="mb-10 w-full">
          <p class="text-white font-black uppercase text-[11px] tracking-[0.4em] mb-4">Kepada Yth. Tamu Terhormat</p>
          <div class="bg-neo-white p-6 neo-border-4 shadow-neo-red transform rotate-1">
            <h2 class="text-2xl md:text-3xl font-black text-neo-black uppercase tracking-tighter leading-none">
              {{ guestName || 'Nama Tamu Undangan' }}
            </h2>
          </div>
        </div>

        <div class="group cursor-pointer" @click="handleOpen">
          <button class="neo-btn neo-btn-black text-lg py-4 px-12 relative overflow-hidden group-hover:bg-neo-red group-hover:text-neo-white transition-all shadow-neo active:scale-95">
            <span class="relative z-10 uppercase tracking-[0.2em] font-black">Buka Undangan</span>
          </button>
        </div>
      </div>
      
      <!-- Background Decoration -->
      <div class="absolute -bottom-10 -right-10 text-neo-white opacity-[0.05] text-[15rem] font-black pointer-events-none select-none rotate-12">2027</div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  guestName: { type: String, default: '' }
})

const isOpen = ref(true)
const emit = defineEmits(['opened'])

function handleOpen() {
  isOpen.value = false
  emit('opened')
}
</script>

<style scoped>
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pop-in {
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes kenBurns {
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
}
.animate-ken-burns {
  animation: kenBurns 20s ease-in-out infinite alternate;
}
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>