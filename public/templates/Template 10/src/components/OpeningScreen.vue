<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  guestName: String
})

const emit = defineEmits(['open'])

const leftDoor = ref(null)
const rightDoor = ref(null)
const doorGlow = ref(null)
const content = ref(null)
const isAnimating = ref(false)
const lanterns = ref([])

onMounted(() => {
  lanterns.value = Array.from({ length: 25 }).map(() => ({
    left: Math.random() * 100 + '%',
    delay: (Math.random() * 15) + 's',
    duration: (10 + Math.random() * 10) + 's'
  }))
})

// Inisialisasi audio (pastikan file ada di path tersebut)
const doorSound = new Audio('/asset/audio/door-open.mp3')

const openInvitation = () => {
  if (isAnimating.value) return
  isAnimating.value = true

  // Mainkan efek suara pintu yang dramatis
  doorSound.play().catch(e => console.warn("Audio play blocked or file not found:", e))

  const tl = gsap.timeline({
    onComplete: () => {
      emit('open')
    }
  })

  tl.to(leftDoor.value, {
    rotationY: -110,
    opacity: 0,
    duration: 2.5,
    transformOrigin: "left center",
    ease: "power2.inOut"
  })
  .to(rightDoor.value, {
    rotationY: 110,
    opacity: 0,
    duration: 2.5,
    transformOrigin: "right center",
    ease: "power2.inOut"
  }, 0)
  .to(".sparkle-burst", {
    opacity: 1,
    x: (i, target) => (Math.random() - 0.5) * 800,
    y: (i, target) => (Math.random() - 0.5) * 1000,
    scale: () => Math.random() * 2 + 1,
    duration: 3,
    stagger: 0.01,
    ease: "power2.out"
  }, 0.3)
  .to(".sparkle-burst", {
    opacity: 0,
    duration: 1.5,
    stagger: 0.01,
    ease: "power1.in"
  }, 1.5)
  .to(doorGlow.value, {
    opacity: 1,
    scaleX: 800,
    duration: 2,
    ease: "power1.in",
    transformOrigin: "center center"
  }, 0.2)
  .to(content.value, {
    opacity: 0,
    scale: 1.2,
    duration: 1.5,
    ease: "power2.inOut"
  }, 0)
}
</script>

<template>
  <div class="fixed inset-0 z-[100] overflow-hidden bg-magical-blue flex items-center justify-center">
    <!-- Background Forest -->
    <div 
      class="absolute inset-0 bg-cover bg-center z-0 opacity-50"
      style="background-image: url('/asset/img/hutan.webp')"
    ></div>

    <!-- Door Panels -->
    <div class="absolute inset-0 flex z-20" style="perspective: 2000px;">
      <div 
        ref="leftDoor" 
        class="w-1/2 h-full border-r border-magical-gold/50 shadow-[10px_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div 
           class="absolute top-0 left-0 w-[200%] h-full bg-cover bg-center"
           style="background-image: url('/asset/img/Gerbang.jpg');"
        ></div>
        <div class="absolute inset-0 bg-magical-blue/20"></div>
      </div>
      <div 
        ref="rightDoor" 
        class="w-1/2 h-full border-l border-magical-gold/50 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div 
           class="absolute top-0 right-0 w-[200%] h-full bg-cover bg-center"
           style="background-image: url('/asset/img/Gerbang.jpg');"
        ></div>
        <div class="absolute inset-0 bg-magical-blue/20"></div>
      </div>
    </div>

    <!-- Sparkles Burst Effect (Behind Content, Over Doors) -->
    <div class="absolute inset-0 z-[25] pointer-events-none overflow-hidden flex items-center justify-center">
      <div v-for="i in 50" :key="i" 
        class="sparkle-burst absolute w-1 h-1 bg-white rounded-full opacity-0 shadow-[0_0_10px_2px_rgba(212,175,55,0.8)]"
      ></div>
    </div>

    <!-- Light Glow Effect (Behind Doors) -->
    <div 
      ref="doorGlow"
      class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 z-[15] pointer-events-none opacity-0 bg-white shadow-[0_0_80px_40px_rgba(255,255,255,0.9),0_0_150px_70px_rgba(212,175,55,0.6)] blur-2xl"
    ></div>

    <!-- Content Over Doors -->
    <div ref="content" class="relative z-30 text-center px-4 max-w-lg">
      <h3 class="fairytale-font text-magical-gold text-base md:text-xl tracking-[0.4em] mb-4 glow-text-gold uppercase opacity-90">The Wedding of</h3>
      <h1 class="fairytale-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 animate-gradient-text whitespace-nowrap leading-tight">
        Andro & Yuki
      </h1>
      
      <div class="mt-4 mb-10 p-6 md:p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] min-w-[280px] mx-auto relative overflow-hidden group">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-magical-gold/50 to-transparent"></div>
        <p class="text-[9px] md:text-xs uppercase tracking-[0.4em] text-magical-gold mb-4 font-medium italic">Kepada Yth. Bapak/Ibu/Sdr/i:</p>
        <h2 class="fairytale-font text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] break-words px-2 leading-snug">
          {{ guestName || 'Tamu Terhormat' }}
        </h2>
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-magical-gold/50 to-transparent"></div>
      </div>

      <button 
        @click="openInvitation"
        class="px-10 py-4 bg-gradient-to-r from-magical-gold to-magical-gold-light text-magical-purple font-bold rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-500 uppercase tracking-[0.2em] border border-white/30 text-sm md:text-base relative overflow-hidden group"
      >
        <span class="relative z-10">Buka Undangan</span>
        <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
      </button>
    </div>

    <!-- Floating Lanterns -->
    <div class="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <div v-for="(l, i) in lanterns" :key="i" 
        class="absolute w-3 h-5 md:w-5 md:h-7 bg-gradient-to-t from-orange-500 via-magical-gold to-yellow-200 rounded-b-lg rounded-t-sm shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-float-slow will-change-transform opacity-70"
        :style="{
          left: l.left,
          top: '100%',
          animationDelay: l.delay,
          animationDuration: l.duration
        }"
      >
        <div class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full blur-[1px] animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.will-change-transform {
  will-change: transform;
}

.animate-gradient-text {
  background: linear-gradient(
    to right,
    #D4AF37,
    #F3E5AB,
    #FFFFFF,
    #F3E5AB,
    #D4AF37
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textGradient 4s linear infinite;
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
}

@keyframes textGradient {
  to {
    background-position: 200% center;
  }
}

.animate-float-slow {
  animation: float-up var(--duration, 15s) linear infinite;
}

@keyframes float-up {
  0% { transform: translate3d(0, 100vh, 0) scale(0.5); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translate3d(0, -120vh, 0) scale(1.2); opacity: 0; }
}
</style>
