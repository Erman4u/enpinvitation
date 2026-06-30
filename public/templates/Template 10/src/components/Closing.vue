<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref(null)
const lanterns = ref([])

onMounted(() => {
  gsap.from(sectionRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      end: "top center",
      scrub: 1,
    },
    rotationX: -20,
    transformOrigin: "top center",
    opacity: 0,
    ease: "none"
  })

  // Generate random values on client side to prevent hydration mismatch
  lanterns.value = Array.from({ length: 8 }).map(() => ({
    left: (10 + Math.random() * 80) + '%',
    delay: (Math.random() * 10) + 's',
    duration: (15 + Math.random() * 10) + 's'
  }))
})
</script>

<template>
  <div ref="sectionRef" class="py-24 bg-magical-blue text-center relative overflow-hidden" style="perspective: 2000px;">
    <!-- Quote Section (Below Gift) -->
    <div class="max-w-4xl mx-auto px-4 relative z-10 mb-24">
      <div class="w-12 h-px bg-magical-gold mx-auto mb-6"></div>
      <p class="text-magical-gold italic text-xl max-w-2xl mx-auto font-light leading-relaxed">
        "dan sesungguhnya Dialah yang menciptakan pasangan laki-laki dan perempuan,"
        <br><br>
        <span class="font-bold tracking-widest text-sm uppercase not-italic">— QS. An-Najm: 45 —</span>
      </p>
      <div class="w-12 h-px bg-magical-gold mx-auto mt-6"></div>
    </div>

    <div class="max-w-4xl mx-auto px-4 relative z-10">
      <h2 class="fairytale-font text-5xl md:text-6xl text-magical-gold glow-text-gold mb-8">Terima Kasih</h2>
      
      <p class="text-white/80 leading-relaxed max-w-2xl mx-auto mb-12 italic">
        Alhamdulillahirabbil'alamin. Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami. Wassalamualaikum Warahmatullahi Wabarakatuh.
      </p>

      <div class="mb-16">
        <p class="text-magical-gold uppercase tracking-[0.3em] text-sm mb-4">Kami Yang Berbahagia</p>
        <h3 class="fairytale-font text-4xl mb-4 animate-gradient-text whitespace-nowrap">Andro & Yuki</h3>
        <p class="text-white/60">Keluarga Besar Bapak Andro Hengky & Bapak Jusrin</p>
      </div>

      <!-- Credit Section -->
      <div class="pt-16 border-t border-white/10 flex flex-col items-center">
        <img src="/asset/img/Logo-EnP.webp" alt="Logo EnP" class="w-16 h-16 object-contain mb-4 opacity-80" loading="lazy" />
        <p class="text-sm text-white/40 mb-2 tracking-widest">Created with love by</p>
        <h4 class="fairytale-font text-2xl text-magical-gold mb-4">EnP Digital Service</h4>
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-white/60 text-sm">
          <a href="https://enpdigitalservice.my.id" target="_blank" class="hover:text-magical-gold hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
            enpdigitalservice.my.id
          </a>
          <span class="md:block hidden opacity-20">|</span>
          <a href="https://wa.me/082229243737" target="_blank" class="hover:text-magical-gold hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43 0 9.856-4.426 9.858-9.855.002-5.43-4.425-9.856-9.855-9.856-2.67 0-5.18 1.04-7.07 2.93-1.88 1.89-2.919 4.41-2.92 7.07l.001 5.438.395.635c.812 1.306 1.33 2.113 2.35 3.321l-1.01 3.7l3.867-1.015zM16.845 13.6c-.302-.152-1.791-.883-2.067-.984-.277-.101-.478-.152-.676.152-.198.303-.565.714-.693.858-.128.145-.257.163-.559.012-.302-.152-1.272-.469-2.423-1.492-.894-.795-1.498-1.782-1.674-2.085-.176-.302-.019-.466.132-.616.136-.135.302-.352.453-.529.151-.176.202-.303.302-.505.101-.201.05-.378-.025-.53-.075-.151-.676-1.629-.926-2.233-.243-.591-.491-.51-.676-.519-.174-.008-.372-.01-.571-.01-.198 0-.521.074-.794.372-.605.659-1.312 1.536-1.312 3.743 0 2.208 1.606 4.341 1.833 4.643.227.302 3.161 4.827 7.657 6.764 1.069.461 1.905.736 2.556.944 1.074.341 2.052.293 2.825.177.862-.129 2.651-1.084 3.027-2.133.377-1.048.377-1.95.264-2.133-.113-.183-.415-.284-.717-.436z"/></svg>
            082229243737
          </a>
          <span class="md:block hidden opacity-20">|</span>
          <a href="https://www.instagram.com/enpdigitalservice/" target="_blank" class="hover:text-magical-gold hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @enpdigitalservice
          </a>
        </div>
        <p class="mt-8 text-[10px] text-white/20 uppercase tracking-widest">
          Copyright © 2026 EnP Digital Service. All rights reserved.
        </p>
      </div>
    </div>

    <!-- Final Lantern Animation -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="(l, i) in lanterns" :key="i" 
        class="absolute w-6 h-8 bg-magical-gold/40 rounded-full animate-float-up"
        :style="{
          left: l.left,
          animationDelay: l.delay,
          animationDuration: l.duration
        }"
      >
        <div class="w-full h-full lantern-light opacity-30"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

@keyframes float-up {
  0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
}

.animate-float-up {
  animation: float-up var(--duration, 20s) linear infinite;
}
</style>
