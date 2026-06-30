<script setup lang="ts">
import { ref } from 'vue'
import SakuraOrnament from './SakuraOrnament.vue'

const name = ref('')
const attendance = ref('Hadir')
const guests = ref('1')
const message = ref('')

const sendToWhatsapp = () => {
  const phoneNumber = '6282229243737'
  const text = `Halo, saya *${name.value}* ingin konfirmasi kehadiran.
Kehadiran: *${attendance.value}*
Jumlah Tamu: *${guests.value}*
Ucapan: "${message.value}"`
  
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank')
}
</script>

<template>
  <section id="rsvp" class="py-24 relative overflow-hidden">
    <!-- Sakura Ornaments -->
    <SakuraOrnament position="top-right" class="w-48 h-48 md:w-80 md:h-80 opacity-30" />
    <SakuraOrnament position="bottom-left" class="w-40 h-40 md:w-64 md:h-64 opacity-20" />

    <div class="container px-6 mx-auto relative z-10">
      
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block px-4 py-1 text-xs tracking-widest text-rose-gold border border-rose-gold/30 rounded-full mb-4 font-sans uppercase">RSVP & Wishes</span>
        <h2 class="text-5xl font-serif text-rose-gold mb-4 text-shadow">Kehadiran & Ucapan</h2>
        <div class="section-divider mb-4"></div>
        <p class="font-sans font-light text-gray-500 max-w-md mx-auto">Suatu kehormatan bagi kami atas kehadiran Anda</p>
      </div>

      <!-- Container Grid Desktop -->
      <div class="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto mb-20 items-stretch">
        
        <!-- RSVP Form -->
        <div class="w-full h-full flex flex-col" data-aos="fade-right">
          <div class="glass p-8 md:p-10 rounded-[40px] text-left shadow-2xl flex-1 border border-white/50 group">
            <h3 class="text-2xl font-serif text-gray-800 mb-2">Konfirmasi Kehadiran</h3>
            <div class="section-divider w-12 mx-0 mb-8 transition-all group-hover:w-20"></div>
            
            <form @submit.prevent="sendToWhatsapp" class="space-y-5">
              <div>
                <label class="block text-xs font-sans text-gray-400 uppercase tracking-widest mb-2 font-bold ml-1">Nama Lengkap</label>
                <input v-model="name" type="text" required class="w-full px-5 py-4 bg-white/50 border border-rose-gold/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/30 font-sans transition-all shadow-inner" placeholder="Masukkan nama Anda..." />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-sans text-gray-400 uppercase tracking-widest mb-2 font-bold ml-1">Kehadiran</label>
                  <select v-model="attendance" class="w-full px-5 py-4 bg-white/50 border border-rose-gold/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/30 font-sans transition-all shadow-inner">
                    <option>Hadir</option>
                    <option>Tidak Hadir</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-sans text-gray-400 uppercase tracking-widest mb-2 font-bold ml-1">Jumlah Tamu</label>
                  <select v-model="guests" class="w-full px-5 py-4 bg-white/50 border border-rose-gold/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/30 font-sans transition-all shadow-inner">
                    <option v-for="n in 5" :key="n">{{ n }}</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="w-full py-4 mt-4 text-white bg-rose-gold uppercase tracking-[0.2em] font-sans text-sm font-bold rounded-2xl hover:bg-blush hover:shadow-xl hover:-translate-y-1 transition-all">
                Kirim Konfirmasi
              </button>
            </form>
          </div>
        </div>

        <!-- Guestbook -->
        <div class="w-full h-full flex flex-col mt-8 md:mt-0" data-aos="fade-left" data-aos-delay="200">
          <div class="glass p-8 md:p-10 rounded-[40px] text-left shadow-2xl flex-1 flex flex-col border border-white/50 group">
            <h3 class="text-2xl font-serif text-gray-800 mb-2">Buku Tamu & Ucapan</h3>
            <div class="section-divider w-12 mx-0 mb-8 transition-all group-hover:w-20"></div>

            <form @submit.prevent="sendToWhatsapp" class="space-y-5 flex-1 flex flex-col">
              <div>
                <label class="block text-xs font-sans text-gray-400 uppercase tracking-widest mb-2 font-bold ml-1">Nama</label>
                <input v-model="name" type="text" required class="w-full px-5 py-4 bg-white/50 border border-rose-gold/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/30 font-sans transition-all shadow-inner" placeholder="Nama Anda" />
              </div>
              <div class="flex-1 flex flex-col">
                <label class="block text-xs font-sans text-gray-400 uppercase tracking-widest mb-2 font-bold ml-1">Ucapan & Doa</label>
                <textarea v-model="message" rows="5" required class="w-full px-5 py-4 bg-white/50 border border-rose-gold/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/30 font-sans transition-all resize-none shadow-inner flex-1" placeholder="Tuliskan ucapan terbaik Anda..."></textarea>
              </div>
              <button type="submit" class="w-full py-4 mt-6 text-rose-gold border-2 border-rose-gold/30 uppercase tracking-[0.2em] font-sans text-sm font-bold bg-transparent rounded-2xl hover:bg-rose-gold hover:text-white hover:shadow-xl hover:-translate-y-1 transition-all">
                Kirim Ucapan via WhatsApp
              </button>
            </form>
          </div>
        </div>
        
      </div>

    </div>
  </section>
</template>
