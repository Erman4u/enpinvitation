<template>
  <section id="cerita" class="py-20 px-6 bg-neo-white grid-bg border-b-6 border-neo-black overflow-hidden group">
    <div class="max-w-6xl mx-auto relative">
      <!-- Massive Background Text -->
      <div class="absolute top-0 right-0 text-[15rem] font-black text-neo-black opacity-[0.03] pointer-events-none rotate-90 translate-x-20">STORY</div>
      
      <div class="mb-24 relative z-10">
        <h2 class="section-label bg-neo-red text-neo-white mb-4">Our Journey</h2>
        <h3 class="text-[clamp(2rem,10vw,4.5rem)] font-black text-neo-black uppercase tracking-tighter leading-[0.8] transform -rotate-2">
          KISAH <span class="text-neo-red">CINTA</span>
        </h3>
      </div>

      <div class="space-y-24 relative z-10">
        <!-- Story 1 -->
        <div class="flex justify-center">
          <div class="w-full max-w-5xl flex flex-col md:flex-row bg-neo-yellow neo-border-4 neo-shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 overflow-hidden">
            <div class="w-full md:w-2/5 border-b-4 md:border-b-0 md:border-r-4 border-neo-black relative group">
              <img src="/assets/Image/gallery1.jpg" alt="Pertemuan" class="w-full h-full object-cover aspect-video md:aspect-auto filter grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
              <div class="absolute inset-0 bg-neo-red opacity-0 group-hover:opacity-20 transition-opacity mix-blend-multiply"></div>
            </div>
            <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-neo-yellow">
              <div class="mb-6 flex justify-start">
                <span class="text-2xl font-black uppercase bg-neo-black text-neo-white px-4 py-2 transform -rotate-2 shadow-neo-red">Januari 2026</span>
              </div>
              <h4 class="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">Awal Pertemuan Sederhana</h4>
              <p class="text-base md:text-lg font-bold leading-relaxed text-neo-black">
                Pada Januari 2026, Claude dipertemukan dengan Fanny. Pertemuan yang awalnya tidak disengaja ini menjadi awal dari segalanya, di mana dua kepribadian berbeda mulai menemukan kecocokan dalam visi hidup yang sama.
              </p>
            </div>
          </div>
        </div>

        <!-- Story 2 (Right aligned image) -->
        <div class="flex justify-center">
          <div class="w-full max-w-5xl flex flex-col md:flex-row-reverse bg-neo-blue text-neo-white neo-border-4 neo-shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300 overflow-hidden">
            <div class="w-full md:w-2/5 border-b-4 md:border-b-0 md:border-l-4 border-neo-black relative group">
              <img src="/assets/Image/gallery4.jpg" alt="Kebersamaan" class="w-full h-full object-cover aspect-video md:aspect-auto filter grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
              <div class="absolute inset-0 bg-neo-yellow opacity-0 group-hover:opacity-20 transition-opacity mix-blend-multiply"></div>
            </div>
            <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <div class="mb-6 flex justify-start">
                <span class="text-2xl font-black uppercase bg-neo-white text-neo-blue px-4 py-2 transform rotate-2 shadow-neo">Februari 2026</span>
              </div>
              <h4 class="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight text-neo-yellow">Benih Cinta dalam Ujian</h4>
              <p class="text-base md:text-lg font-bold leading-relaxed">
                Memasuki Februari 2026, Claude dan Fanny mulai sering menghabiskan waktu bersama. Mereka menyadari bahwa tantangan hidup akan terasa lebih ringan jika dihadapi bersama dengan penuh strategi dan saling mendukung.
              </p>
            </div>
          </div>
        </div>

        <!-- Story 3 -->
        <div class="flex justify-center">
          <div class="w-full max-w-5xl flex flex-col md:flex-row bg-neo-red text-neo-white neo-border-4 neo-shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 overflow-hidden">
            <div class="w-full md:w-2/5 border-b-4 md:border-b-0 md:border-r-4 border-neo-black relative group">
              <img src="/assets/Image/gallery6.jpg" alt="Lamaran" class="w-full h-full object-cover aspect-video md:aspect-auto filter grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
              <div class="absolute inset-0 bg-neo-blue opacity-0 group-hover:opacity-20 transition-opacity mix-blend-multiply"></div>
            </div>
            <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <div class="mb-6 flex justify-start">
                <span class="text-2xl font-black uppercase bg-neo-black text-neo-yellow px-4 py-2 transform -rotate-1 shadow-neo-white">Maret 2026</span>
              </div>
              <h4 class="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">Langkah Menuju Ridha Allah</h4>
              <p class="text-base md:text-lg font-bold leading-relaxed">
                Setelah proses taaruf yang penuh keikhlasan, Claude memantapkan niatnya untuk melamar Fanny. Kejujuran dan tekad bulat Claude meluluhkan hati keluarga besar Fanny.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
</style>
