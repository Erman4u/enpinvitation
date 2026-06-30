<script setup>
import { ref } from 'vue'
import { MapPin, Calendar, Clock, ArrowUpRight } from 'lucide-vue-next'
import Swan from './Swan.vue'
import Water from './Water.vue'

const mapLink = "https://www.google.com/maps/search/RT+02,+Desa+Padang+Jaya,+Kec.+Kuaro,+Kab.+Paser,+Kaltim+76281"
</script>

<template>
  <section class="py-28 bg-white relative overflow-hidden">
    <!-- Ambient decorations -->
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E6F3F7]/60 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
    
    <!-- Background Elements -->
    <div class="absolute top-20 left-10 w-48 h-48 opacity-[0.02] text-swan-deep pointer-events-none transform -rotate-6">
      <Swan />
    </div>
    <div class="absolute bottom-0 left-0 w-full opacity-[0.05] scale-y-50 origin-bottom pointer-events-none">
      <Water />
    </div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Header -->
      <div class="mb-20 reveal">
        <p class="text-[10px] tracking-[0.5em] uppercase text-swan-deep/30 mb-4">Informasi Acara</p>
        <h2 class="text-5xl md:text-6xl font-serif text-swan-deep">Hari Istimewa<br><em class="not-italic text-swan-silver">Kami</em></h2>
      </div>

      <!-- Event Cards -->
      <div class="grid md:grid-cols-2 gap-6">

        <!-- Akad -->
        <div class="reveal group relative overflow-hidden rounded-[32px] p-10 bg-gradient-to-br from-[#F0F7FA]/80 to-white border border-white/80 hover:shadow-2xl hover:shadow-swan-blue/20 transition-all duration-700 hover:-translate-y-1 backdrop-blur-sm">
          <!-- Tag -->
          <div class="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-swan-deep/40 bg-white/80 px-4 py-2 rounded-full border border-white mb-8">
            <div class="w-1.5 h-1.5 rounded-full bg-swan-silver"></div>
            Akad Nikah
          </div>

          <div class="space-y-7 mb-10">
            <div class="flex items-start gap-5">
              <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-swan-gray">
                <Calendar class="w-4 h-4 text-swan-deep/40" />
              </div>
              <div>
                <p class="text-[10px] tracking-widest uppercase text-swan-deep/30 mb-1">Hari & Tanggal</p>
                <p class="font-serif text-swan-deep text-lg">Rabu, 15 Maret 2027</p>
              </div>
            </div>

            <div class="flex items-start gap-5">
              <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-swan-gray">
                <Clock class="w-4 h-4 text-swan-deep/40" />
              </div>
              <div>
                <p class="text-[10px] tracking-widest uppercase text-swan-deep/30 mb-1">Waktu</p>
                <p class="font-serif text-swan-deep text-lg">10.00 WIB — Selesai</p>
              </div>
            </div>

            <div class="flex items-start gap-5">
              <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-swan-gray">
                <MapPin class="w-4 h-4 text-swan-deep/40" />
              </div>
              <div>
                <p class="text-[10px] tracking-widest uppercase text-swan-deep/30 mb-1">Lokasi</p>
                <p class="text-swan-deep/70 text-sm leading-relaxed">RT 02, Desa Padang Jaya, Kec. Kuaro,<br>Kab. Paser, Kaltim 76281</p>
              </div>
            </div>

            <div class="pl-[60px] text-xs text-swan-deep/40 italic border-l-2 border-swan-silver/20 ml-[20px]">
              Busana batik dan bersepatu.
            </div>
          </div>

          <a :href="mapLink" target="_blank" class="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-swan-deep/60 hover:text-swan-deep transition-colors group/link">
            Google Maps <ArrowUpRight class="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <!-- Resepsi -->
        <div class="reveal group relative overflow-hidden rounded-[32px] p-10 bg-gradient-to-br from-[#F0F7FA]/80 to-white border border-white/80 hover:shadow-2xl hover:shadow-swan-blue/20 transition-all duration-700 hover:-translate-y-1 backdrop-blur-sm" style="transition-delay: 80ms;">
          <!-- Tag -->
          <div class="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-swan-deep/40 bg-white/80 px-4 py-2 rounded-full border border-white mb-8">
            <div class="w-1.5 h-1.5 rounded-full bg-swan-gold"></div>
            Resepsi
          </div>

          <div class="space-y-7 mb-10">
            <div class="flex items-start gap-5">
              <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-swan-gray">
                <Calendar class="w-4 h-4 text-swan-deep/40" />
              </div>
              <div>
                <p class="text-[10px] tracking-widest uppercase text-swan-deep/30 mb-1">Hari & Tanggal</p>
                <p class="font-serif text-swan-deep text-lg">Rabu, 15 Maret 2027</p>
              </div>
            </div>

            <div class="flex items-start gap-5">
              <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-swan-gray">
                <Clock class="w-4 h-4 text-swan-deep/40" />
              </div>
              <div>
                <p class="text-[10px] tracking-widest uppercase text-swan-deep/30 mb-1">Waktu</p>
                <p class="font-serif text-swan-deep text-lg">13.00 WIB — Selesai</p>
              </div>
            </div>

            <div class="flex items-start gap-5">
              <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-swan-gray">
                <MapPin class="w-4 h-4 text-swan-deep/40" />
              </div>
              <div>
                <p class="text-[10px] tracking-widest uppercase text-swan-deep/30 mb-1">Lokasi</p>
                <p class="text-swan-deep/70 text-sm leading-relaxed">RT 02, Desa Padang Jaya, Kec. Kuaro,<br>Kab. Paser, Kaltim 76281</p>
              </div>
            </div>

            <div class="pl-[60px] text-xs text-swan-deep/40 italic border-l-2 border-swan-silver/20 ml-[20px]">
              Busana batik dan bersepatu.
            </div>
          </div>

          <a :href="mapLink" target="_blank" class="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-swan-deep/60 hover:text-swan-deep transition-colors group/link">
            Google Maps <ArrowUpRight class="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
