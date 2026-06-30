<template>
  <section id="galeri" class="py-20 px-6 bg-neo-white grid-bg border-b-6 border-neo-black overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
        <div class="transform -rotate-1">
          <h2 class="section-label mb-4 bg-neo-black text-neo-red">Our Memories</h2>
          <h3 class="text-[clamp(2rem,10vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.8]">
            GALLERY <br /> <span class="text-neo-red">OUR</span> <span class="text-neo-blue">MOMENT</span>
          </h3>
        </div>
        <div class="hidden md:block bg-neo-yellow neo-border-4 p-4 neo-shadow rotate-2 font-black text-xl">
          NO FILTERS. <br /> JUST BRUTAL.
        </div>
      </div>

      <!-- Brutal Asymmetrical Grid -->
      <div ref="galleryRef" class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-12 group/grid">
        <div 
          v-for="(img, index) in images" 
          :key="index"
          class="gallery-item-brutal relative group cursor-pointer neo-border-4 neo-shadow-lg transform transition-all duration-700 hover:-translate-y-2 hover:scale-[1.05] group-hover/grid:blur-sm group-hover/grid:opacity-50 hover:!blur-none hover:!opacity-100 active:scale-95"
          :class="[
            img.class, 
            img.bg,
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-90 pointer-events-none'
          ]"
          :style="isVisible && !animationDone ? { transitionDelay: `${index * 100}ms` } : {}"
          @click="openLightbox(index)"
        >
          <!-- Brutalist Tape -->
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-neo-black z-20" :class="index % 2 === 0 ? '-rotate-3' : 'rotate-2'"></div>
          
          <!-- Frame Padding -->
          <div class="p-3 md:p-4 h-full flex flex-col">
            <div class="w-full h-full relative overflow-hidden neo-border-4 border-neo-black bg-neo-white">
              <img 
                :src="img.src" 
                :alt="img.alt" 
                loading="lazy"
                class="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110" 
              />
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-neo-black opacity-0 group-hover:opacity-20 transition-opacity mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Lightbox -->
      <div v-if="lightboxOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-neo-black/95 p-4 animate-pop-in">
        <button @click="lightboxOpen = false" class="absolute top-6 right-6 neo-btn neo-btn-red text-neo-white z-[10000]">
          CLOSE [X]
        </button>
        
        <div class="relative w-full max-w-5xl flex flex-col items-center">
          <div class="relative neo-border-4 border-neo-white bg-neo-black overflow-hidden max-h-[85vh] p-2 md:p-4 transform rotate-1">
            <img :src="images[currentIndex].src" :alt="images[currentIndex].alt" class="max-w-full max-h-[80vh] object-contain neo-border-2 border-neo-white" />
            
            <!-- Floating Navigation -->
            <button @click.stop="prev" class="absolute left-2 top-1/2 -translate-y-1/2 neo-btn neo-btn-blue p-3 !shadow-neo-white transform -translate-x-1/2 hover:scale-110"><-</button>
            <button @click.stop="next" class="absolute right-2 top-1/2 -translate-y-1/2 neo-btn neo-btn-red p-3 !shadow-neo-white transform translate-x-1/2 hover:scale-110">-></button>
          </div>
          
          <div class="mt-8 bg-neo-white text-neo-black font-black px-8 py-3 neo-border-4 text-2xl uppercase tracking-widest shadow-[8px_8px_0px_var(--neo-blue)] transform -rotate-2">
            Photo {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  { src: '/assets/Image/gallery1.jpg', alt: 'Gallery 1', class: 'col-span-2 row-span-2 transform -rotate-1', bg: 'bg-neo-yellow' },
  { src: '/assets/Image/gallery4.jpg', alt: 'Gallery 2', class: 'col-span-2 aspect-video transform rotate-2', bg: 'bg-neo-blue' },
  { src: '/assets/Image/pria.jpg', alt: 'Fanny Photo', class: 'col-span-1 aspect-square transform md:rotate-3', bg: 'bg-neo-red' },
  { src: '/assets/Image/wanita.jpg', alt: 'Claude Photo', class: 'col-span-1 aspect-square transform md:-rotate-2', bg: 'bg-neo-yellow' },
  { src: '/assets/Image/gallery6.jpg', alt: 'Slider 3', class: 'col-span-2 aspect-video transform -rotate-1', bg: 'bg-neo-red' },
  { src: '/assets/Image/gallery3.webp', alt: 'Background Photo', class: 'col-span-2 md:col-span-1 aspect-square transform rotate-2', bg: 'bg-neo-blue' }
]

const lightboxOpen = ref(false)
const currentIndex = ref(0)

const galleryRef = ref(null)
const isVisible = ref(false)
const animationDone = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      // Tunggu hingga semua item selesai beranimasi (durasi + max stagger delay)
      setTimeout(() => {
        animationDone.value = true
      }, 1500)
      observer.disconnect()
    }
  }, { threshold: 0.1 })

  if (galleryRef.value) {
    observer.observe(galleryRef.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

function openLightbox(index) {
  currentIndex.value = index
  lightboxOpen.value = true
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}
</script>

<style scoped>
.gallery-item-brutal {
  box-shadow: 8px 8px 0px var(--border-main);
}
.gallery-item-brutal:hover {
  z-index: 50;
  box-shadow: 16px 16px 0px var(--border-main);
}
</style>
