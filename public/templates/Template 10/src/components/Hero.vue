<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroTitle = ref(null)
const heroSubtitle = ref(null)
const particles = ref([])

onMounted(() => {
  gsap.from(heroTitle.value, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out"
  })
  gsap.from(heroSubtitle.value, {
    y: 30,
    opacity: 0,
    duration: 1.2,
    delay: 1,
    ease: "power3.out"
  })

  // Fix hydration issues by generating random values on client side
  particles.value = Array.from({ length: 40 }).map(() => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    delay: Math.random() * 5 + 's',
    duration: 3 + Math.random() * 4 + 's'
  }))
})
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
    <!-- Parallax Background -->
    <div
      class="absolute inset-0 bg-cover bg-fixed bg-center scale-110"
      style="background-image: url('/asset/img/hutan.webp')"
    ></div>
    
    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-magical-blue/40"></div>

    <!-- Cinematic Content -->
    <div class="relative z-10 px-4 pt-12">
      <!-- Couple Image -->
      <div class="relative w-36 h-48 md:w-48 md:h-64 mx-auto mb-6 animate-float-slow">
        <div class="w-full h-full bg-magical-blue overflow-hidden rounded-[2rem] border-[6px] border-magical-gold/80 shadow-[0_0_50px_rgba(212,175,55,0.6)] relative">
          <img src="/asset/img/hero.jpg" alt="Andro & Yuki" class="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>

      <p ref="heroSubtitle" class="fairytale-font text-magical-gold text-2xl md:text-3xl mb-4 italic glow-text-gold">
        The Wedding Of
      </p>
      <h1 ref="heroTitle" class="fairytale-font text-3xl sm:text-5xl md:text-8xl font-bold mb-8 animate-gradient-text drop-shadow-[0_0_25px_rgba(147,51,234,0.8)] whitespace-nowrap">
        Andro & Yuki
      </h1>
      
      <div class="space-y-4">
        <div class="h-0.5 w-24 bg-magical-gold mx-auto glow-border-gold"></div>
        <p class="text-xl md:text-2xl tracking-[0.3em] font-light uppercase">15 . 03 . 2027</p>
        <div class="h-0.5 w-24 bg-magical-gold mx-auto glow-border-gold"></div>
      </div>

      <p class="mt-8 md:mt-12 max-w-lg mx-auto text-magical-gold/90 italic text-base md:text-lg px-6 leading-relaxed">
        "Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)."
        <br>
        <span class="font-bold">— QS. Adh-Dhariyat: 49</span>
      </p>
    </div>

    <!-- Floating Particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="(p, i) in particles" :key="i"
        class="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full animate-glow-slow will-change-transform"
        :style="{
          left: p.left,
          top: p.top,
          animationDelay: p.delay,
          animationDuration: p.duration
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.will-change-transform {
  will-change: transform, opacity;
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
}

@keyframes textGradient {
  to {
    background-position: 200% center;
  }
}

.animate-glow-slow {
  animation: glow-optimized var(--duration, 4s) ease-in-out infinite;
}

@keyframes glow-optimized {
  0%, 100% { opacity: 0.2; transform: translate3d(0, 0, 0) scale(1); }
  50% { opacity: 0.8; transform: translate3d(0, -10px, 0) scale(1.5); }
}
</style>
