<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref(null)
const particles = ref([])

const stories = [
  {
    date: 'Januari 2026',
    title: 'Awal Pertemuan Sederhana',
    image: '/asset/img/overlay.jpg',
    desc: '"Pada Januari 2026, Andro dipertemukan dengan Yuki dalam sebuah pertemuan yang tak terduga namun penuh makna..."',
    subDesc: 'Andro mengagumi sosok Yuki yang anggun. Tanpa Andro ketahui, Yuki pun menyimpan kekaguman yang sama sejak awal mereka berjumpa.'
  },
  {
    date: 'Februari 2026',
    title: 'Benih Cinta dalam Ujian',
    image: '/asset/img/background.jpg',
    desc: '"Memasuki Februari 2026, hubungan mereka semakin kuat melewati berbagai rintangan. Kedewasaan dan ketenangan Yuki membuat Andro semakin yakin."',
    subDesc: 'Bukan hanya tentang kecocokan, tetapi tentang bagaimana mereka saling melengkapi satu sama lain.'
  },
  {
    date: 'Maret 2026',
    title: 'Langkah Menuju Ridha Allah',
    image: '/asset/img/gallery5.jpg',
    desc: '"Setelah proses perkenalan yang penuh keikhlasan, Andro menunjukkan keseriusannya di hadapan keluarga Yuki. Keikhlasan dan visinya meluluhkan hati mereka."',
    subDesc: 'Maret 2026, Andro melamar Yuki dalam acara sederhana yang penuh doa dan harapan baik.'
  }
]

onMounted(() => {
  particles.value = Array.from({ length: 40 }).map(() => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    delay: Math.random() * 5 + 's',
    duration: 5 + Math.random() * 5 + 's'
  }))

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
})
</script>

<template>
  <div ref="sectionRef" class="py-32 bg-magical-purple/10 relative overflow-hidden" style="perspective: 2000px;">
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

    <div class="max-w-5xl mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-24 relative z-10">
        <h2 class="fairytale-font text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-magical-gold-light via-magical-gold to-magical-gold-light glow-text-gold mb-6 drop-shadow-2xl">Our Journey</h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-magical-gold"></div>
          <span class="text-magical-gold/80 tracking-[0.3em] uppercase text-sm md:text-base font-bold">Kisah Cinta Kami</span>
          <div class="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-magical-gold"></div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="relative w-full">
        <!-- Glowing Center Line -->
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-magical-gold to-transparent md:-translate-x-1/2 opacity-30"></div>

        <!-- Stories Map -->
        <div v-for="(story, idx) in stories" :key="idx" 
          class="mb-24 md:mb-40 relative flex flex-col md:flex-row items-center gap-12 group"
          :class="idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        >
          <!-- Timeline Node -->
          <div class="absolute left-6 md:left-1/2 w-4 h-4 bg-magical-gold rounded-full -translate-x-1/2 shadow-[0_0_15px_#D4AF37] z-20 hidden md:block"></div>

          <!-- Image Column -->
          <div class="w-full md:w-1/2 px-4 md:px-8">
            <div class="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-magical-gold/50 shadow-2xl transform group-hover:scale-105 transition-transform duration-700">
              <img :src="story.image" :alt="story.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-magical-blue/60 to-transparent"></div>
            </div>
          </div>

          <!-- Text Column -->
          <div class="w-full md:w-1/2 px-4 md:px-8 text-center" :class="idx % 2 === 0 ? 'md:text-left' : 'md:text-right'">
            <div class="relative bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 shadow-xl group-hover:border-magical-gold/40 transition-all duration-500">
              <h3 class="fairytale-font text-4xl text-magical-gold mb-3">{{ story.date }}</h3>
              <div class="h-px w-20 bg-magical-gold/50 mb-6 mx-auto" :class="idx % 2 === 0 ? 'md:ml-0' : 'md:mr-0'"></div>
              <h4 class="text-2xl font-bold text-white mb-4 tracking-wide">{{ story.title }}</h4>
              <p class="text-white/80 leading-relaxed italic font-light mb-6">
                {{ story.desc }}
              </p>
              <p class="text-magical-gold/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                {{ story.subDesc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Decoration -->
    <div 
      class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-center bg-no-repeat bg-cover -z-10 bg-fixed"
      style="background-image: url('/asset/img/hutan.webp')"
    ></div>
  </div>
</template>
