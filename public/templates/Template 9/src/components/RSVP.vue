<template>
  <section id="rsvp" class="py-20 px-6 bg-neo-white grid-bg border-b-8 border-neo-black relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-main)] opacity-50 z-0"></div>
    
    <div class="max-w-3xl mx-auto">
      <div class="mb-16 text-center transform rotate-[1deg] relative z-10">
        <h2 class="section-label mb-4 bg-neo-red text-neo-white">RSVP</h2>
        <h3 class="section-title">Konfirmasi Kehadiran</h3>
        <p class="font-bold mt-4 max-w-lg mx-auto text-neo-black">
          Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
      </div>

      <div class="bg-neo-white text-neo-black neo-border-4 neo-shadow-lg p-8 md:p-12 relative z-10">
        <!-- Floating label -->
        <div class="absolute -top-6 -right-6 bg-neo-red text-neo-white px-6 py-2 font-black text-xl neo-border rotate-3">
          DAFTAR HADIR
        </div>

        <form @submit.prevent="sendRSVP" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-black uppercase tracking-widest">Nama Lengkap</label>
            <input 
              v-model="form.nama" 
              type="text" 
              placeholder="Masukkan Nama Anda" 
              required 
              class="neo-input"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-black uppercase tracking-widest">Konfirmasi Kehadiran</label>
            <select v-model="form.status" required class="neo-input">
              <option value="" disabled>Pilih Status Kehadiran</option>
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>

          <div class="space-y-2" v-if="form.status === 'Hadir'">
            <label class="block text-sm font-black uppercase tracking-widest">Jumlah Tamu</label>
            <select v-model="form.jumlah" class="neo-input">
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
          </div>

          <div class="pt-4">
            <button 
              type="submit" 
              class="neo-btn neo-btn-black w-full flex items-center justify-center gap-3 text-lg py-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.768 0 3.18 2.586 5.767 5.767 5.767 3.18 0 5.768-2.587 5.768-5.767 0-3.182-2.588-5.768-5.768-5.768zm0 9.44c-2.024 0-3.671-1.647-3.671-3.672 0-2.023 1.647-3.671 3.671-3.671 2.025 0 3.672 1.648 3.672 3.671 0 2.025-1.647 3.672-3.672 3.672z"/><path d="M12.031 3C1.439 3 1.439 12.03 1.439 12.03c0 9.03 10.592 9.03 10.592 9.03s10.592 0 10.592-9.03c0-9.03-10.592-9.03-10.592-9.03zm0 15.65c-6.108 0-6.108-6.62-6.108-6.62 0-6.621 6.108-6.621 6.108-6.621s6.108 0 6.108 6.621c0 6.62-6.108 6.62-6.108 6.62z"/></svg>
              KIRIM VIA WHATSAPP
            </button>
          </div>
        </form>
      </div>

      <!-- Ucapan Section -->
      <div class="mt-20 relative z-10">
        <div class="text-center mb-8">
          <h3 class="text-3xl font-black uppercase tracking-tight">Doa & Ucapan</h3>
        </div>
        
        <div class="bg-neo-white neo-border-4 neo-shadow p-8">
          <div class="space-y-4">
            <input v-model="newUcapan.nama" type="text" placeholder="Nama Anda" class="neo-input" />
            <textarea v-model="newUcapan.pesan" placeholder="Tulis doa dan ucapan terbaik..." rows="4" class="neo-input"></textarea>
            <button @click="addUcapan" class="neo-btn neo-btn-red w-full !text-white">KIRIM UCAPAN</button>
          </div>

          <div class="mt-12 space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scroll">
            <div v-if="ucapans.length === 0" class="text-center py-8 border-2 border-dashed border-neo-yellow/30 opacity-50">
              Belum ada ucapan...
            </div>
            <div v-for="(u, index) in ucapans" :key="index" class="bg-neo-white text-neo-black p-4 neo-border-4 neo-shadow mb-4">
              <p class="text-sm font-black uppercase text-neo-blue mb-1">{{ u.nama }}</p>
              <p class="font-bold leading-relaxed">{{ u.pesan }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  guestName: { type: String, default: '' }
})

const form = ref({
  nama: props.guestName,
  status: '',
  jumlah: '1'
})

const ucapans = ref([])
const newUcapan = ref({
  nama: props.guestName,
  pesan: ''
})

function sendRSVP() {
  const message = `Halo Claude & Fanny, saya ${form.value.nama} mengonfirmasi ${form.value.status} ${form.value.status === 'Hadir' ? `dengan ${form.value.jumlah} orang` : ''}. Terima kasih!`
  const url = `https://wa.me/082229243737?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

function addUcapan() {
  if (!newUcapan.value.nama || !newUcapan.value.pesan) return
  ucapans.value.unshift({ ...newUcapan.value })
  newUcapan.value.pesan = ''
}
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--neo-yellow); }
</style>
