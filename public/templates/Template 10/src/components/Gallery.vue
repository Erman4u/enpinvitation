<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref(null)
const particles = ref([])
const lanterns = ref([])
const rotations = ref([])
const selectedImage = ref(null)

const openLightbox = (img) => {
  selectedImage.value = img
}

const closeLightbox = () => {
  selectedImage.value = null
}

const nextImage = () => {
  if (!selectedImage.value) return
  const currentIndex = galleryImages.findIndex(img => img.url === selectedImage.value.url)
  selectedImage.value = galleryImages[(currentIndex + 1) % galleryImages.length]
}

const prevImage = () => {
  if (!selectedImage.value) return
  const currentIndex = galleryImages.findIndex(img => img.url === selectedImage.value.url)
  selectedImage.value = galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length]
}

const handleKeydown = (e) => {
  if (!selectedImage.value) return
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => {
  particles.value = Array.from({ length: 30 }).map(() => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    delay: Math.random() * 5 + 's',
    duration: 4 + Math.random() * 4 + 's'
  }))

  lanterns.value = Array.from({ length: 10 }).map(() => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    delay: Math.random() * 8 + 's',
    duration: 10 + Math.random() * 10 + 's'
  }))

  // Generate random rotations for polaroid scattered effect
  rotations.value = galleryImages.map(() => (Math.random() * 6 - 3).toFixed(2))

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

  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const galleryImages = [
  { url: '/asset/img/gallery1.webp', title: 'Moment 1' },
  { url: '/asset/img/gallery2.webp', title: 'Moment 2' },
  { url: '/asset/img/galerry3.webp', title: 'Moment 3' },
  { url: '/asset/img/gallery4.webp', title: 'Moment 4' },
  { url: '/asset/img/gallery5.webp', title: 'Moment 5' },
  { url: '/asset/img/gallery6.webp', title: 'Moment 6' }

]
</script>

<template>
  <div ref="sectionRef" class="py-32 bg-magical-purple/20 relative overflow-hidden" style="perspective: 2000px;">
    <!-- Floating Particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="(p, i) in particles" :key="i" 
        class="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-white/40 rounded-full blur-[1px] animate-float-optimized will-change-transform" 
        :style="{ 
          left: p.left, 
          top: p.top, 
          animationDelay: p.delay, 
          animationDuration: p.duration 
        }"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="mb-24 relative z-10 text-center">
        <h2 class="fairytale-font text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-magical-gold-light via-magical-gold to-magical-gold-light glow-text-gold mb-6 drop-shadow-2xl">Our Memories</h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-magical-gold"></div>
          <span class="text-magical-gold/80 tracking-[0.3em] uppercase text-sm md:text-base font-bold">Gallery Our Moment</span>
          <div class="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-magical-gold"></div>
        </div>
      </div>

      <!-- Gallery Polaroid Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 pt-10 px-4 md:px-0">
        <div v-for="(img, idx) in galleryImages" :key="idx" 
             @click="openLightbox(img)"
             class="relative group cursor-pointer transition-all duration-700 hover:z-30 active:scale-95"
             :style="{ transform: `rotate(${rotations[idx] || 0}deg)` }"> 
             
          <!-- Polaroid Frame -->
          <div class="bg-[#fefefe] p-1.5 md:p-3 pb-6 md:pb-12 shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-100 transform group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-out relative">
            
            <!-- Magic Tape Effect -->
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-magical-gold/20 backdrop-blur-sm border border-white/30 -rotate-2 z-20 group-hover:opacity-0 transition-opacity duration-500"></div>

            <div class="w-full aspect-square overflow-hidden bg-gray-100 relative">
              <img 
                :src="img.url" 
                :alt="img.title" 
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <!-- Subtle inner shadow for photo paper look -->
              <div class="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"></div>
            </div>

            <!-- Caption (Handwritten style) -->
            <div class="mt-3 md:mt-6 text-center px-1">
              <p class="fairytale-font text-gray-800 text-base md:text-2xl opacity-80 group-hover:opacity-100 group-hover:text-magical-gold transition-all duration-500 transform group-hover:scale-110">
                {{ img.title }}
              </p>
            </div>

            <!-- Shimmer reflection on hover -->
            <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
          </div>

          <!-- Magical Glow behind the polaroid -->
          <div class="absolute -inset-4 bg-magical-gold/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
        </div>
      </div>
    </div>

    <!-- Floating Lanterns -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="(l, i) in lanterns" :key="i" 
        class="absolute w-3 h-3 md:w-4 md:h-4 bg-magical-gold rounded-full blur-[1px] animate-float-optimized will-change-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
        :style="{ 
          left: l.left, 
          top: l.top, 
          animationDelay: l.delay, 
          animationDuration: l.duration 
        }"
      ></div>
    </div>
    
    <!-- Lightbox Overlay -->
    <Transition name="lightbox">
      <div v-if="selectedImage" 
           class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
           @click.self="closeLightbox">
        
        <button @click="closeLightbox" class="absolute top-6 right-6 text-white hover:text-magical-gold transition-colors z-[1010]">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Navigation Buttons -->
        <button 
          @click.stop="prevImage" 
          class="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-magical-gold transition-all z-[1010] p-2 hover:bg-white/10 rounded-full"
          aria-label="Previous Image"
        >
          <svg class="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          @click.stop="nextImage" 
          class="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-magical-gold transition-all z-[1010] p-2 hover:bg-white/10 rounded-full"
          aria-label="Next Image"
        >
          <svg class="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="relative max-w-4xl w-full flex flex-col items-center animate-zoom-in">
          <div class="bg-[#fefefe] p-2 md:p-4 pb-12 md:pb-24 shadow-2xl relative">
            <img :src="selectedImage.url" :alt="selectedImage.title" class="max-h-[75vh] w-auto object-contain" />
            <div class="absolute bottom-0 left-0 w-full p-4 md:p-8 text-center">
              <p class="fairytale-font text-gray-800 text-2xl md:text-5xl leading-none">
                {{ selectedImage.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.custom-scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.custom-scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.5s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.animate-zoom-in {
  animation: zoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes zoomIn {
  from { transform: scale(0.8) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}
</style>
