<script setup>
import { ref, watch, onUnmounted } from 'vue'

const isModalOpen = ref(false)

// Prevent body scroll when modal is open
watch(isModalOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const banks = [
  {
    name: 'Bank BRI',
    number: '0822 2924 3737',
    holder: 'Franz',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg'
  }
]

const copyNumber = (num) => {
  navigator.clipboard.writeText(num.replace(/\s/g, ''))
  alert('Nomor rekening berhasil disalin!')
}
</script>

<template>
  <section class="section-padding bg-swan-gray relative overflow-hidden min-h-[500px] flex items-center">
    <div class="max-w-4xl mx-auto text-center relative z-10">
      <div class="mb-12 reveal">
        <p class="text-[10px] tracking-[0.5em] uppercase text-swan-deep/30 mb-4 font-bold">Gift & Kado</p>
        <h2 class="text-4xl md:text-6xl font-serif text-swan-deep mb-6">Tanda Kasih</h2>
        <p class="text-swan-deep/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan kasih, kami dengan rendah hati menerimanya.
        </p>
      </div>

      <button @click="isModalOpen = true" 
              class="reveal px-12 py-5 bg-white border-2 border-swan-blue/30 text-swan-deep rounded-full shadow-2xl hover:bg-swan-blue/10 transition-all duration-500 tracking-[0.3em] uppercase text-xs font-bold">
        Buka Tanda Kasih
      </button>

      <div class="mt-20 reveal">
        <p class="text-xs md:text-sm italic text-swan-deep/50 font-serif leading-loose">
          "dan sesungguhnya Dialah yang menciptakan pasangan laki-laki dan perempuan,"<br>
          <span class="not-italic tracking-[0.4em] uppercase font-sans text-[10px] font-bold mt-4 block">— QS. An-Najm: 45</span>
        </p>
      </div>
    </div>

    <!-- Gift Modal -->
    <Transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-swan-deep/40 backdrop-blur-md">
        <div class="bg-white rounded-[40px] w-full max-w-md p-6 md:p-10 shadow-2xl relative overflow-y-auto max-h-[90vh]">
          <!-- Modal Decoration -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-swan-blue/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          
          <button @click="isModalOpen = false" class="absolute top-6 right-6 text-swan-deep/40 hover:text-swan-deep transition-colors text-2xl font-bold">✕</button>
          
          <h3 class="text-2xl font-serif text-swan-deep mb-8 text-center">Informasi Rekening</h3>
          
          <div class="space-y-6">
            <!-- Bank List -->
            <div v-for="bank in banks" :key="bank.number" class="p-6 rounded-3xl bg-swan-blue/10 border border-swan-blue/20">
              <div class="flex justify-between items-start mb-4">
                <img :src="bank.icon" :alt="bank.name" class="h-6 opacity-80">
                <button @click="copyNumber(bank.number)" class="text-[10px] tracking-widest uppercase text-swan-blue font-bold hover:underline">Salin</button>
              </div>
              <p class="text-xl font-mono text-swan-deep tracking-wider mb-2">{{ bank.number }}</p>
              <p class="text-xs tracking-widest uppercase text-swan-deep/40">{{ bank.holder }}</p>
            </div>

            <!-- QRIS SECTION -->
            <div class="p-6 rounded-3xl bg-white border-2 border-swan-blue/20 text-center">
              <p class="text-[10px] tracking-widest uppercase text-swan-deep/40 mb-4 font-bold">QRIS Tanda Kasih</p>
              <img src="/Asset/Image/donate.webp" alt="QRIS" class="w-48 h-48 mx-auto rounded-2xl shadow-md mb-4 object-contain">
              <p class="text-[10px] text-swan-deep/40 italic">Scan QRIS melalui Aplikasi Bank atau E-Wallet Anda</p>
            </div>

            <!-- Address Option -->
            <div class="p-6 rounded-3xl border border-dashed border-swan-deep/20 text-center">
              <p class="text-[10px] tracking-widest uppercase text-swan-deep/40 mb-4 font-bold">Kirim Kado / Barang</p>
              <p class="text-sm text-swan-deep/70 mb-4 leading-relaxed">RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281</p>
              <a href="https://maps.app.goo.gl/..." target="_blank" class="inline-block px-6 py-2 bg-swan-blue/10 text-swan-blue text-[10px] tracking-widest uppercase font-bold rounded-full hover:bg-swan-blue/20 transition-colors">Lihat Alamat di Maps</a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>
