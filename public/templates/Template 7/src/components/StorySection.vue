<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import SakuraOrnament from './SakuraOrnament.vue'

const scrollContainer = ref<HTMLElement | null>(null)

const scrollPrev = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' })
  }
}

const scrollNext = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' })
  }
}

const stories = [
  {
    num: "1",
    date: "Zaman Purba",
    title: "Zaman Purba (Masa Kecil)",
    text: "Hubungan Razi dan Seli dimulai jauh sebelum era smartphone menyerang. Mereka adalah partner satu tim saat main bentengan dan musuh bebuyutan saat main monopoli di teras rumah. Seli sering menangis karena kalah main, dan Razi adalah orang pertama yang selalu memberikan mainannya agar Seli diam. Persahabatan mereka murni beralaskan sandal jepit dan es mambo."
  },
  {
    num: "2",
    date: "Fase Beranjak Dewasa",
    title: "Fase Sadar Kamera",
    text: "Setelah melewati fase cinta monyet masing-masing dengan orang lain, mereka akhirnya \"sadar\" saat beranjak dewasa. Orang-orang di sekitar sering mengejek, \"Kalian kok nggak pacaran aja sih?\" yang selalu dijawab dengan tawa canggung. Sampai akhirnya ada momen di mana Razi melihat Seli bukan lagi sebagai bocah ingusan yang suka minta jajan, melainkan sosok wanita mandiri yang ingin ia lindungi selamanya."
  },
  {
    num: "3",
    date: "Maret 2026",
    title: "Acc, Langsung Gas!",
    text: "Karena orang tua kedua belah pihak sudah bosan melihat mereka berdua bolak-balik main bersama sebagai \"teman\", pengajuan restu pun berjalan sangat mulus tanpa hambatan. Tanpa perlu proses pendekatan yang berbelit-belit karena sudah saling tahu baik dan buruknya sejak kecil, Razi dan Seli memutuskan untuk meningkatkan status mereka dari \"Sahabat Seumur Hidup\" menjadi \"Suami Istri\"."
  }
]
</script>

<template>
  <section id="story" class="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#fff5f7]/30 to-transparent">
    <!-- Sakura Ornaments -->
    <SakuraOrnament position="top-right" class="w-48 h-48 md:w-72 md:h-72 opacity-30" />
    <SakuraOrnament position="bottom-left" class="w-40 h-40 md:w-64 md:h-64 opacity-20" />

    <div class="container px-4 md:px-6 mx-auto relative z-10">
      <div class="text-center mb-24" data-aos="fade-down">
        <span class="inline-block px-4 py-1 text-xs tracking-widest text-rose-gold border border-rose-gold/30 rounded-full mb-4 font-sans uppercase">Our Journey</span>
        <h2 class="text-5xl md:text-6xl font-serif text-rose-gold mb-4 text-shadow">Kisah Cinta</h2>
        <div class="section-divider mb-4"></div>
        <p class="font-sans font-light text-gray-500 italic max-w-xl mx-auto">Perjalanan dua hati yang dipertemukan oleh takdir-Nya</p>
      </div>

      <!-- Japanese Calligraphy Accents -->
      <div class="absolute left-10 top-1/2 -translate-y-1/2 opacity-[0.03] hidden lg:block select-none pointer-events-none">
        <span class="text-[12rem] font-serif text-rose-gold leading-none block">愛</span>
        <span class="text-[12rem] font-serif text-rose-gold leading-none block ml-20">物語</span>
      </div>

      <!-- Mobile Slider (Visible on small screens) -->
      <div class="md:hidden relative">
        <div ref="scrollContainer" class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 scrollbar-hide px-4">
          <div v-for="(story, index) in stories" :key="index" 
               class="snap-center min-w-[85vw] relative py-8">
            <div class="glass p-8 shadow-xl border border-rose-gold/10 relative"
                 :class="index % 2 === 0 
                    ? 'rounded-t-[60px] rounded-bl-[20px] rounded-br-[80px]' 
                    : 'rounded-t-[60px] rounded-br-[20px] rounded-bl-[80px]'">
              
              <div class="absolute -top-4 -left-2 w-12 h-12 bg-rose-gold text-white rounded-full flex items-center justify-center shadow-lg font-serif text-xl">
                {{ story.num }}
              </div>
              
              <span class="font-serif text-rose-gold/60 italic text-sm block mb-2">{{ story.date }}</span>
              <h3 class="text-2xl font-serif text-rose-gold mb-3">{{ story.title }}</h3>
              <p class="font-sans font-light text-sm text-gray-600 leading-relaxed text-justify">{{ story.text }}</p>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation Controls -->
        <div class="flex justify-between items-center px-8 -mt-6 mb-10">
          <button @click="scrollPrev" class="w-10 h-10 rounded-full bg-white shadow-lg border border-rose-gold/10 flex items-center justify-center text-rose-gold active:scale-90 transition-transform">
            <ChevronLeft class="w-5 h-5" />
          </button>
          
          <div class="flex gap-2">
            <div v-for="n in stories.length" :key="n" class="w-1.5 h-1.5 rounded-full bg-rose-gold/30"></div>
          </div>

          <button @click="scrollNext" class="w-10 h-10 rounded-full bg-white shadow-lg border border-rose-gold/10 flex items-center justify-center text-rose-gold active:scale-90 transition-transform">
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Desktop Timeline (Visible on medium screens and up) -->
      <div class="hidden md:block max-w-4xl mx-auto relative pb-20">
        <!-- Connecting curved dashed line behind items -->
        <svg class="absolute top-[5%] bottom-[5%] left-8 md:left-1/2 w-[2px] md:w-[200px] transform md:-translate-x-1/2 h-[90%] text-rose-gold/20 pointer-events-none stroke-current stroke-[2px] fill-none" preserveAspectRatio="none" viewBox="0 0 100 1000">
           <path class="md:hidden" d="M50,0 L50,1000" stroke-dasharray="10 10"/>
           <path class="hidden md:block" d="M50,0 Q120,250 50,500 T50,1000" stroke-dasharray="15 15"/>
        </svg>

        <div v-for="(story, index) in stories" :key="index" 
             class="relative flex flex-col md:flex-row items-center w-full mb-20 md:mb-32" 
             :class="[index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse']">
            
            <!-- Date marker (floating) -->
            <div class="hidden md:flex w-1/2 justify-center" data-aos="fade-up">
              <div class="relative group">
                <span class="font-serif text-3xl md:text-4xl italic text-rose-gold/40 group-hover:text-rose-gold/80 transition-colors duration-500">{{ story.date }}</span>
                <div class="absolute -bottom-3 left-0 w-0 group-hover:w-full h-0.5 bg-rose-gold/30 transition-all duration-700"></div>
              </div>
            </div>

            <!-- Card Node -->
            <div class="w-full md:w-1/2 px-0 md:px-12 relative" data-aos="zoom-in-up">
              <div class="glass p-8 md:p-10 hover:bg-white/90 transition-all duration-700 shadow-xl relative z-20 border border-rose-gold/10 group"
                   :class="index % 2 === 0 
                    ? 'rounded-t-[80px] rounded-bl-[30px] rounded-br-[100px]' 
                    : 'rounded-t-[80px] rounded-br-[30px] rounded-bl-[100px]'">
                
                <!-- Number indicator -->
                <div class="absolute -top-6 -left-6 w-16 h-16 bg-white border-2 border-rose-gold/20 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-rose-gold group-hover:bg-rose-gold group-hover:text-white">
                  <span class="font-serif text-2xl text-rose-gold">{{ story.num }}</span>
                </div>
                
                <h3 class="text-3xl font-serif text-rose-gold mb-2 mt-4">{{ story.title }}</h3>
                <div class="section-divider w-12 mx-0 mb-4"></div>
                <p class="font-sans text-[10px] md:text-xs text-rose-gold uppercase tracking-[0.2em] font-bold mb-4 md:hidden">{{ story.date }}</p>
                <p class="font-sans font-light text-sm md:text-base text-gray-600 leading-relaxed text-justify">{{ story.text }}</p>
              </div>
            </div>
            
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
