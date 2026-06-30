<script setup>
import Swan from './Swan.vue'

const stories = [
  {
    number: '01',
    year: 'Januari',
    date: '2026',
    title: 'Awal Pertemuan Sederhana',
      desc: 'Di balik dinginnya gudang tua, dua pasang mata bertemu. Franz, sang penguasa bayangan, menemukan Rosie yang seputih salju. Sebuah kontras yang melahirkan harmoni.',
    extra: 'Takdir mempertemukan mereka dalam keheningan yang bicara lebih banyak dari kata-kata.',
    img: '/Asset/Image/galery.webp',
    accent: 'bg-swan-blue/20'
  },
  {
    number: '02',
    year: 'Februari',
    date: '2026',
    title: 'Benih Cinta dalam Ujian',
      desc: 'Krisis melanda wilayah mereka, namun di sanalah strategi "Gerakan Senyap" Rosie membuktikan bahwa kecantikan hanyalah selapis dari kecerdasannya yang luar biasa.',
      extra: 'Franz terpesona, bukan hanya oleh rupa, tapi oleh jiwa yang tangguh di balik bulu putih itu.',
    img: '/Asset/Image/galery2.webp',
    accent: 'bg-swan-silver/10'
  },
  {
    number: '03',
    year: 'Maret',
    date: '2026',
    title: 'Langkah Menuju Ridha Allah',
      desc: 'Proses taaruf yang tulus membawa Franz ke hadapan keluarga Rosie. Keikhlasan visi hidupnya meruntuhkan segala keraguan, menyatukan dua keluarga dalam restu.',
    extra: 'Di taman belakang yang saksi bisu, sebuah janji suci mulai dirajut menuju masa depan.',
    img: '/Asset/Image/galery3.webp',
    accent: 'bg-swan-blue/20'
  }
]
</script>

<template>
  <section class="py-32 relative overflow-hidden bg-white">
    <!-- Ambient background elements -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-swan-blue/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-swan-silver/10 rounded-full blur-3xl pointer-events-none"></div>
    
    <!-- Background Swan Silhouette -->
    <div class="absolute top-1/2 left-0 w-64 h-64 opacity-[0.02] text-swan-deep pointer-events-none transform -translate-y-1/2 -rotate-12">
      <Swan />
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="mb-32 text-center reveal">
        <p class="text-[10px] tracking-[0.6em] uppercase text-swan-deep/30 mb-6 font-bold">The Chronicles</p>
        <h2 class="text-6xl md:text-8xl font-serif text-swan-deep leading-none relative inline-block">
          Kisah <span class="italic text-swan-silver">Cinta</span>
          <div class="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-swan-silver/40 to-transparent"></div>
        </h2>
      </div>

      <!-- Story Timeline -->
      <div class="space-y-40 md:space-y-64">
        <div v-for="(story, index) in stories" :key="index" 
             class="reveal relative flex flex-col md:flex-row items-center gap-12 md:gap-24"
             :class="index % 2 !== 0 ? 'md:flex-row-reverse' : ''">
          
          <!-- Large Decorative Number Background (Parallax) -->
          <div class="story-number absolute -top-20 md:-top-32 opacity-[0.03] select-none pointer-events-none font-serif text-[200px] md:text-[350px] leading-none"
               :class="index % 2 === 0 ? '-left-10 md:-left-20' : '-right-10 md:-right-20 text-right'">
            {{ story.number }}
          </div>

          <!-- Image/Visual Placeholder -->
          <div class="w-full md:w-1/2 relative group">
            <div class="aspect-[4/5] overflow-hidden rounded-[60px] md:rounded-[100px] relative z-10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-swan-deep/20 z-10 pointer-events-none"></div>
              <img :src="story.img" :alt="'Chapter ' + story.number" class="w-full h-full object-cover parallax-img">
            </div>
            <!-- Decorative Offset Frame -->
            <div class="absolute -inset-4 border-2 border-swan-silver/20 rounded-[70px] md:rounded-[110px] -z-0 transform rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
          </div>

          <!-- Text Content -->
          <div class="w-full md:w-1/2 space-y-8 relative z-10" :class="index % 2 !== 0 ? 'md:text-right' : ''">
            <div class="flex flex-col" :class="index % 2 !== 0 ? 'md:items-end' : ''">
              <span class="text-swan-silver font-serif text-3xl italic mb-1">{{ story.year }}</span>
              <span class="text-swan-deep/20 font-bold tracking-[0.5em] uppercase text-xs">{{ story.date }}</span>
            </div>

            <h3 class="text-4xl md:text-5xl font-serif text-swan-deep leading-tight">
              {{ story.title }}
            </h3>

            <div class="space-y-6">
              <p class="text-lg text-swan-deep/60 leading-relaxed font-light">
                {{ story.desc }}
              </p>
              <div class="w-16 h-[1px] bg-swan-silver/40" :class="index % 2 !== 0 ? 'md:ml-auto' : ''"></div>
              <p class="text-sm text-swan-deep/40 italic">
                {{ story.extra }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom Background Transition -->
    <div class="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-swan-gray to-transparent pointer-events-none"></div>
  </section>
</template>
