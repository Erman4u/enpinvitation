<template>
  <section id="hadiah" class="py-20 px-6 bg-neo-white grid-bg border-b-6 border-neo-black">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-label mb-4 bg-neo-red text-neo-white">Gifts</h2>
        <h3 class="section-title">LOVE GIFT</h3>
        <p class="font-bold mt-4 max-w-lg mx-auto">
          Doa restu Anda merupakan hadiah terindah bagi kami. Namun bagi Anda yang ingin memberikan tanda kasih, dapat melalui:
        </p>
      </div>

      <div class="flex justify-center mb-12">
        <button 
          v-if="!showGiftInfo"
          @click="showGiftInfo = true"
          class="neo-btn neo-btn-black text-2xl py-6 px-12 transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
        >
          TAMPILKAN INFORMASI HADIAH
        </button>
      </div>

      <div v-if="showGiftInfo" class="animate-pop-in">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- Bank Card -->
          <div class="bg-neo-white neo-border-4 neo-shadow-lg p-8 relative group overflow-hidden">
            <div class="absolute -top-6 -right-6 text-6xl font-black text-neo-black opacity-5 group-hover:opacity-10 transition-opacity">BRI</div>
            <div class="relative z-10">
              <div class="bg-neo-black text-neo-white inline-block px-4 py-1 font-black uppercase text-sm mb-6">BANK BRI</div>
              <div class="text-3xl font-black tracking-tighter mb-2">0822 2924 3737</div>
              <p class="text-lg font-bold mb-6 uppercase">Atas Nama: <span class="text-neo-blue">Claude</span></p>
              <button 
                @click="copyToClipboard('082229243737', 'Rekening')"
                class="neo-btn neo-btn-blue flex items-center gap-2 w-full justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                SALIN NOMOR REKENING
              </button>
            </div>
          </div>

          <!-- QRIS Card -->
          <div class="bg-neo-white neo-border-4 neo-shadow-lg p-8 relative flex flex-col items-center text-center group">
            <div class="bg-neo-red text-neo-white inline-block px-4 py-1 font-black uppercase text-sm mb-6 w-full">QRIS FANNY</div>
            <div class="w-48 h-48 bg-neo-black neo-border-4 p-2 mb-6 group-hover:rotate-2 transition-transform relative">
              <img src="/assets/Image/donate.webp" alt="QRIS" loading="lazy" class="w-full h-full object-cover" />
              <div class="absolute inset-0 border-2 border-dashed border-neo-white/30 pointer-events-none"></div>
            </div>
            <p class="font-black text-sm uppercase tracking-widest opacity-60">Pindai untuk kirim tanda kasih</p>
          </div>
        </div>

        <!-- Shipping Address -->
        <div class="bg-neo-white neo-border-4 neo-shadow-red p-8 md:p-12 relative overflow-hidden mb-12">
          <div class="absolute -top-10 -left-10 text-9xl font-black text-neo-black opacity-5 pointer-events-none uppercase">KIRIM</div>
          <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 text-center md:text-left">
              <div class="bg-neo-black text-neo-white inline-block px-3 py-1 text-xs font-black uppercase mb-4">Alamat Pengiriman</div>
              <h4 class="text-3xl font-black uppercase mb-2">Kirim Kado Fisik</h4>
              <p class="text-xl font-bold leading-tight">RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281</p>
            </div>
            <button 
              @click="copyToClipboard('RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281', 'Alamat')"
              class="neo-btn neo-btn-black flex items-center gap-3 shrink-0 py-4 px-8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              SALIN ALAMAT
            </button>
          </div>
        </div>

        <div class="text-center">
          <button @click="showGiftInfo = false" class="text-sm font-black uppercase underline decoration-4 decoration-neo-red hover:text-neo-red transition-colors">
            Sembunyikan Informasi
          </button>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div 
      v-if="toast.show" 
      class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1000] bg-neo-black text-neo-yellow neo-border-yellow px-6 py-3 font-black uppercase tracking-widest flex items-center gap-3 animate-pop-in"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      {{ toast.message }} Berhasil Disalin!
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const showGiftInfo = ref(false)
const toast = ref({
  show: false,
  message: ''
})

function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    toast.value = { show: true, message: label }
    setTimeout(() => {
      toast.value.show = false
    }, 2000)
  })
}
</script>

<style scoped>
</style>
