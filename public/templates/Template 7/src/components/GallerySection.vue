<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import SakuraOrnament from './SakuraOrnament.vue'

const images = [
  '/assets/img/galery.webp',
  '/assets/img/galery2.webp',
  '/assets/img/galery3.webp',
  '/assets/img/galery4.webp',
  '/assets/img/overlay.webp',
  '/assets/img/galery5.webp',
]

const isOpen = ref(false)
const currentImage = ref('')

const openLightbox = (img: string) => {
  currentImage.value = img
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <section id="gallery" class="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#fff5f7]/50 to-transparent">
    <!-- Floating Sakura Petals Animation -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div v-for="n in 8" :key="n" :class="`petal petal-${n}`"></div>
    </div>

    <!-- Sakura Ornaments -->
    <SakuraOrnament position="top-left" class="w-48 h-48 md:w-80 md:h-80 opacity-40 -translate-x-10 -translate-y-10" />
    <SakuraOrnament position="bottom-right" class="w-40 h-40 md:w-64 md:h-64 opacity-30 translate-x-10 translate-y-10" />

    <div class="container px-6 mx-auto relative z-10">
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block px-4 py-1 text-xs tracking-widest text-rose-gold border border-rose-gold/30 rounded-full mb-4 font-sans uppercase">Our Gallery</span>
        <h2 class="text-5xl md:text-6xl font-serif text-rose-gold mb-4 text-shadow">Galeri Foto</h2>
        <div class="section-divider mb-4"></div>
        <p class="font-sans font-light text-gray-500 italic uppercase tracking-[0.2em] text-xs">Pre-Wedding Moments</p>
      </div>
      
      <!-- Japanese Calligraphy Accents -->
      <div class="flex justify-center gap-6 mb-8 opacity-20 select-none" data-aos="fade-up">
        <span class="text-rose-gold text-3xl font-serif">桜</span>
        <span class="text-rose-gold text-3xl font-serif">美</span>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto relative px-4 mt-8">
        <div v-for="(img, index) in images" :key="index" 
             class="group relative overflow-hidden cursor-pointer shadow-lg hover:shadow-rose-gold/30 transition-all duration-700 rounded-2xl bg-white p-1.5 border border-rose-gold/20 z-10"
             :class="{
               'md:col-span-2 md:row-span-2 !rounded-t-[100px] !rounded-bl-[40px] !rounded-br-[120px]': index === 0,
               'md:col-span-2 !rounded-br-[100px] !rounded-tl-[40px]': index === 5,
               'md:translate-y-8 !rounded-tr-[80px]': index === 1 || index === 3
             }"
             data-aos="fade-up" :data-aos-delay="index * 100"
             @click="openLightbox(img)">
          <div class="w-full h-full min-h-[180px] md:min-h-[240px] rounded-inherit overflow-hidden relative">
            <img :src="img" alt="Gallery" class="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" loading="lazy" />
            <!-- Inner overlay on hover -->
            <div class="absolute inset-0 bg-soft-pink/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-4 items-center">
              <div class="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-white/20 backdrop-blur-md p-2 rounded-full">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-3xl mx-auto text-center mt-32 md:mt-48" data-aos="fade-up">
        <div class="glass p-10 rounded-[40px] border border-white/50 shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <svg class="w-20 h-20" viewBox="0 0 24 24" fill="currentColor text-rose-gold"><path d="M12 2C13 7 17 11 22 12C17 13 13 17 12 22C11 17 7 13 2 12C7 11 11 7 12 2Z"/></svg>
          </div>
          <p class="font-serif text-xl md:text-2xl text-gray-700 italic leading-relaxed text-center px-4 mb-6">
            "Dan di antara tanda-tanda kekuasaan-Nya lah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
          </p>
          <div class="section-divider w-16 mb-4"></div>
          <p class="font-sans text-rose-gold font-bold tracking-[0.3em] text-sm uppercase">- Q.S Ar Rum : 21 -</p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
        <button @click="closeLightbox" class="absolute top-8 right-8 text-white hover:text-rose-gold z-[110] transition-all hover:rotate-90">
          <X class="w-10 h-10" />
        </button>
        <img :src="currentImage" class="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-xl border-4 border-white/10" @click.stop />
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.rounded-inherit {
  border-radius: inherit;
}

/* Petal Animation Style */
.petal {
  position: absolute;
  background: #fda4af;
  border-radius: 150% 0 150% 0;
  opacity: 0.3;
  z-index: 1;
  animation: petal-fall linear infinite;
}

@keyframes petal-fall {
  0% { transform: translate(0, -10%) rotate(0deg); opacity: 0; }
  10% { opacity: 0.5; }
  90% { opacity: 0.5; }
  100% { transform: translate(100px, 100vh) rotate(360deg); opacity: 0; }
}

.petal-1 { width: 10px; height: 10px; left: 10%; animation-duration: 7s; }
.petal-2 { width: 15px; height: 15px; left: 25%; animation-duration: 9s; animation-delay: 2s; }
.petal-3 { width: 8px; height: 8px; left: 40%; animation-duration: 6s; animation-delay: 1s; }
.petal-4 { width: 12px; height: 12px; left: 55%; animation-duration: 8s; animation-delay: 3s; }
.petal-5 { width: 10px; height: 10px; left: 70%; animation-duration: 7s; animation-delay: 0.5s; }
.petal-6 { width: 14px; height: 14px; left: 85%; animation-duration: 10s; animation-delay: 1.5s; }
.petal-7 { width: 11px; height: 11px; left: 15%; animation-duration: 8s; animation-delay: 4s; }
.petal-8 { width: 9px; height: 9px; left: 95%; animation-duration: 9s; animation-delay: 2.5s; }

@media (max-width: 768px) {
  .petal { display: none; } /* Matikan animasi di mobile agar performa ringan */
}
</style>
