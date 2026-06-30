<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const modules = [EffectCoverflow, Pagination, Autoplay];

const moments = [
  { img: '/Asset/Image/galery.webp', title: 'Lamaran' },
  { img: '/Asset/Image/galery2.webp', title: 'Pre-Wedding 1' },
  { img: '/Asset/Image/galery3.webp', title: 'Pre-Wedding 2' },
  { img: '/Asset/Image/galery4.webp', title: 'Kasih Sayang' },
  { img: '/Asset/Image/overlay.webp', title: 'Cinta Suci' },
  { img: '/Asset/Image/galery5.webp', title: 'Bahagia' }
]

const marqueeImages = [
  '/Asset/Image/hero.webp',
  '/Asset/Image/pria.webp',
  '/Asset/Image/wanita.webp',
  '/Asset/Image/galery.webp',
  '/Asset/Image/galery2.webp',
  '/Asset/Image/galery3.webp',
  '/Asset/Image/galery4.webp',
  '/Asset/Image/galery5.webp',
]
</script>

<template>
  <section class="py-28 bg-white relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <!-- Header -->
      <div class="mb-12 reveal text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <p class="text-[10px] tracking-[0.5em] uppercase text-swan-deep/30 mb-4">Our Memories</p>
          <h2 class="text-5xl md:text-6xl font-serif text-swan-deep">Momen<br><em class="not-italic text-swan-silver">Berharga</em></h2>
        </div>
        <div class="mt-8 md:mt-0 flex items-center justify-center md:justify-end gap-3 text-swan-deep/50 text-sm italic font-serif">
          <span class="animate-pulse">←</span>
          <span>Geser foto di bawah</span>
          <span class="animate-pulse">→</span>
        </div>
      </div>

      <!-- Interactive Swiper Gallery -->
      <div class="reveal mb-24">
        <Swiper
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :coverflowEffect="{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }"
          :pagination="true"
          :modules="modules"
          class="w-full pb-12"
        >
          <SwiperSlide v-for="(item, i) in moments" :key="i" class="w-[280px] md:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
            <img :src="item.img" :alt="item.title" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-swan-deep/80 via-transparent to-transparent opacity-100 flex flex-col justify-end p-6">
              <p class="text-white font-serif text-2xl leading-none mb-1">{{ item.title }}</p>
              <div class="w-12 h-[1px] bg-swan-silver/50 mt-2"></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <!-- Auto Scrolling Marquee Gallery -->
    <div class="relative overflow-hidden h-64 md:h-80 -rotate-3 bg-swan-gray/30 py-4 reveal shadow-inner flex border-y border-swan-silver/20">
      <div class="flex animate-marquee-optimized">
        <!-- First set -->
        <div class="flex gap-4 px-2 w-1/2 justify-around">
          <div v-for="(img, idx) in marqueeImages" :key="'m1-'+idx" class="w-48 md:w-64 h-full rounded-2xl overflow-hidden shrink-0 shadow-lg relative group">
             <img :src="img" loading="lazy" class="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
          </div>
        </div>
        <!-- Duplicated set for seamless loop -->
        <div class="flex gap-4 px-2 w-1/2 justify-around">
          <div v-for="(img, idx) in marqueeImages" :key="'m2-'+idx" class="w-48 md:w-64 h-full rounded-2xl overflow-hidden shrink-0 shadow-lg relative group">
             <img :src="img" loading="lazy" class="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.swiper-slide {
  transition: transform 0.3s ease;
}
.swiper-slide-active {
  transform: scale(1.05);
}
.animate-marquee-optimized {
  display: flex;
  width: 200%;
  animation: marquee-scroll 40s linear infinite;
  will-change: transform;
}
@keyframes marquee-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
@media (max-width: 768px) {
  .animate-marquee-optimized { animation-duration: 25s; }
}
</style>
