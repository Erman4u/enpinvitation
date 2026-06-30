<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref(null)
const particles = ref([])

const rsvp = ref({
  name: '',
  status: '',
  message: ''
})

// Mock database for wishes (local state)
const wishes = ref([
  { id: 1, name: 'Bapak Andro Hengky', message: 'Selamat menempuh hidup baru anakku. Semoga menjadi keluarga sakinah mawaddah warahmah.', time: '2 hari yang lalu' },
  { id: 2, name: 'Teman Seperjuangan', message: 'Selamat menempuh hidup baru Andro & Yuki! Semoga bahagia selalu selamanya.', time: '1 hari yang lalu' }
])

const sendRSVP = () => {
  if (!rsvp.value.name) return;
  
  // 1. Add to wishes board instantly
  wishes.value.unshift({
    id: Date.now(),
    name: rsvp.value.name,
    message: rsvp.value.message || 'Hadir dan memberikan doa restu.',
    time: 'Baru saja'
  })

  // 2. Send via WhatsApp
  const text = `Halo Andro & Yuki, Saya *${rsvp.value.name}* mengonfirmasi kehadiran: *${rsvp.value.status}*. \n\nDoa & Ucapan: ${rsvp.value.message || '-'}`
  const url = `https://wa.me/082229243737?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  
  // 3. Reset form
  rsvp.value = { name: '', status: '', message: '' }
}

onMounted(() => {
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

  // Generate random values on client side to prevent hydration mismatch
  particles.value = Array.from({ length: 20 }).map(() => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    delay: (Math.random() * 2) + 's'
  }))
})
</script>

<template>
  <div ref="sectionRef" class="py-32 bg-gradient-to-b from-magical-blue to-magical-purple relative overflow-hidden" style="perspective: 2000px;">
    <!-- Magical Particles Background -->
    <div class="absolute inset-0 pointer-events-none opacity-30">
      <div v-for="(p, i) in particles" :key="i" 
        class="absolute w-1 h-1 bg-white rounded-full animate-pulse" 
        :style="{ 
          left: p.left, 
          top: p.top, 
          animationDelay: p.delay 
        }"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="mb-24 relative z-10 text-center">
        <h2 class="fairytale-font text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-magical-gold-light via-magical-gold to-magical-gold-light glow-text-gold mb-6 drop-shadow-2xl">Kehadiran & Doa</h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-magical-gold"></div>
          <span class="text-magical-gold/80 tracking-[0.3em] uppercase text-sm md:text-base font-bold">RSVP & Wishes</span>
          <div class="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-magical-gold"></div>
        </div>
        <p class="text-white/80 max-w-2xl mx-auto mt-8 font-light leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 lg:gap-8">
        
        <!-- RSVP Form (Left Column, takes 2 spans) -->
        <div class="lg:col-span-2 relative group">
          <div class="absolute inset-0 bg-magical-gold/5 blur-[50px] rounded-[3rem] opacity-100"></div>
          <div class="relative bg-white/5 backdrop-blur-md rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-[0_0_40px_rgba(30,10,40,0.5)]">
            <h3 class="fairytale-font text-4xl text-magical-gold mb-8 text-center drop-shadow-lg">Form RSVP</h3>
            
            <form @submit.prevent="sendRSVP" class="space-y-6">
              <div>
                <label class="block text-magical-gold-light uppercase tracking-[0.2em] text-xs font-bold mb-3 pl-2">Nama Lengkap</label>
                <input 
                  v-model="rsvp.name"
                  type="text" 
                  placeholder="Masukkan Nama Anda"
                  class="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-magical-gold focus:ring-1 focus:ring-magical-gold transition-all duration-300 placeholder-white/30 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label class="block text-magical-gold-light uppercase tracking-[0.2em] text-xs font-bold mb-3 pl-2">Konfirmasi Kehadiran</label>
                <div class="relative">
                  <select 
                    v-model="rsvp.status"
                    class="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-magical-gold focus:ring-1 focus:ring-magical-gold transition-all duration-300 appearance-none backdrop-blur-sm cursor-pointer"
                    required
                  >
                    <option value="" disabled selected class="text-gray-500 bg-magical-blue">Pilih Status Kehadiran</option>
                    <option value="Hadir" class="bg-magical-blue">Hadir</option>
                    <option value="Tidak Hadir" class="bg-magical-blue">Tidak Hadir</option>
                    <option value="Masih Ragu" class="bg-magical-blue">Masih Ragu</option>
                  </select>
                  <div class="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-magical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-magical-gold-light uppercase tracking-[0.2em] text-xs font-bold mb-3 pl-2">Doa & Ucapan</label>
                <textarea 
                  v-model="rsvp.message"
                  placeholder="Tulis doa dan ucapan terbaik..."
                  rows="4"
                  class="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-magical-gold focus:ring-1 focus:ring-magical-gold transition-all duration-300 placeholder-white/30 backdrop-blur-sm resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                class="w-full mt-8 py-4 bg-gradient-to-r from-magical-gold to-magical-gold-light text-magical-purple font-bold rounded-2xl hover:brightness-110 transition-all duration-300 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] group relative overflow-hidden"
              >
                <span class="relative z-10 flex items-center justify-center gap-2">
                  Kirim Ucapan
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </span>
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </button>
            </form>
          </div>
        </div>

        <!-- Wishes Board (Right Column, takes 3 spans) -->
        <div class="lg:col-span-3 relative">
          <div class="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[3rem] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]"></div>
          
          <div class="relative p-8 md:p-10 h-full flex flex-col">
            <h3 class="fairytale-font text-4xl text-white mb-6 flex items-center gap-4">
              <span class="bg-magical-gold w-8 h-px"></span>
              Papan Ucapan
              <span class="text-magical-gold text-lg ml-auto bg-magical-gold/20 px-4 py-1 rounded-full border border-magical-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]">{{ wishes.length }} Pesan</span>
            </h3>
            
            <!-- Scrollable Messages Area -->
            <div class="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[550px] custom-scrollbar">
              <transition-group name="list" tag="div" class="space-y-4">
                <div 
                  v-for="wish in wishes" 
                  :key="wish.id"
                  class="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-magical-gold/50 hover:bg-white/10 transition-all duration-500 group/msg shadow-lg"
                >
                  <div class="flex justify-between items-start mb-3">
                    <h4 class="font-bold text-magical-gold text-lg group-hover/msg:glow-text-gold transition-all">{{ wish.name }}</h4>
                    <span class="text-white/40 text-xs text-right ml-2 shrink-0">{{ wish.time }}</span>
                  </div>
                  <p class="text-white/80 font-light leading-relaxed text-sm whitespace-pre-wrap">{{ wish.message }}</p>
                </div>
              </transition-group>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.3);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.6);
}

/* List transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
