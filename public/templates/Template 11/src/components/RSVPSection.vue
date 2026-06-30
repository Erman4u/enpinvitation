<script setup>
import { ref } from 'vue'
import { CheckCircle2, MessageSquareHeart, ArrowUpRight } from 'lucide-vue-next'
import Swan from './Swan.vue'
import Water from './Water.vue'

const phoneNumber = '6282229243737'

const rsvpForm = ref({ name: '', status: '' })
const wishForm = ref({ name: '', message: '' })

const sendRSVP = () => {
  if (!rsvpForm.value.name || !rsvpForm.value.status) {
    alert('Mohon lengkapi nama dan status kehadiran.')
    return
  }
  const text = `Halo, saya ${rsvpForm.value.name} mengkonfirmasi bahwa saya *${rsvpForm.value.status}* pada acara pernikahan Franz & Rosie.`
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank')
}

const sendWish = () => {
  if (!wishForm.value.name || !wishForm.value.message) {
    alert('Mohon lengkapi nama dan ucapan.')
    return
  }
  const text = `Halo, saya ${wishForm.value.name} ingin memberikan ucapan untuk Franz & Rosie:\n\n"${wishForm.value.message}"`
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank')
}
</script>

<template>
  <section class="py-28 relative overflow-hidden bg-[#F0F7FA]">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-white/60 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-full opacity-[0.05] scale-y-50 origin-bottom pointer-events-none">
      <Water />
    </div>
    <div class="absolute top-40 right-20 w-64 h-64 opacity-[0.02] text-swan-deep pointer-events-none transform rotate-12">
      <Swan />
    </div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Header -->
      <div class="mb-20 reveal">
        <p class="text-[10px] tracking-[0.5em] uppercase text-swan-deep/30 mb-4">Kehadiran & Doa</p>
        <h2 class="text-5xl md:text-6xl font-serif text-swan-deep">RSVP &<br><em class="not-italic text-swan-silver">Wishes</em></h2>
        <p class="mt-6 text-sm text-swan-deep/50 max-w-md leading-relaxed">
          Merupakan kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir memberikan doa restu. Konfirmasi kehadiran dan ucapan via WhatsApp.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">

        <!-- RSVP Form -->
        <div class="reveal group relative overflow-hidden rounded-[32px] p-10 bg-white/80 border border-white/80 hover:shadow-2xl hover:shadow-swan-blue/20 transition-all duration-700 backdrop-blur-sm">
          <div class="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-swan-deep/40 bg-[#F0F7FA] px-4 py-2 rounded-full mb-8">
            <CheckCircle2 class="w-3.5 h-3.5" />
            Konfirmasi Kehadiran
          </div>

          <form @submit.prevent="sendRSVP" class="space-y-5">
            <div>
              <label class="block text-[10px] tracking-widest uppercase text-swan-deep/30 mb-2">Nama</label>
              <input v-model="rsvpForm.name" type="text" placeholder="Nama lengkap Anda" autocomplete="name"
                     class="w-full px-5 py-4 rounded-2xl bg-[#F8FBFC]/60 border border-swan-gray/60 text-base text-swan-deep placeholder:text-swan-deep/20 focus:outline-none focus:ring-2 focus:ring-swan-silver/30 transition-all">
            </div>
            <div>
              <label class="block text-[10px] tracking-widest uppercase text-swan-deep/30 mb-2">Status</label>
              <select v-model="rsvpForm.status"
                      class="w-full px-5 py-4 rounded-2xl bg-[#F8FBFC]/60 border border-swan-gray/60 text-base text-swan-deep focus:outline-none focus:ring-2 focus:ring-swan-silver/30 transition-all">
                <option value="" disabled>Pilih status kehadiran</option>
                <option value="Akan Hadir">Akan Hadir</option>
                <option value="Berhalangan">Berhalangan</option>
              </select>
            </div>
            <button type="submit"
                    class="w-full mt-2 py-4 bg-swan-deep text-white rounded-2xl text-[10px] tracking-[0.4em] uppercase hover:bg-swan-deep/80 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-swan-deep/20">
              Kirim via WhatsApp <ArrowUpRight class="w-4 h-4" />
            </button>
          </form>
        </div>

        <!-- Wish Form -->
        <div class="reveal group relative overflow-hidden rounded-[32px] p-10 bg-white/80 border border-white/80 hover:shadow-2xl hover:shadow-swan-blue/20 transition-all duration-700 backdrop-blur-sm" style="transition-delay: 80ms;">
          <div class="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-swan-deep/40 bg-[#F0F7FA] px-4 py-2 rounded-full mb-8">
            <MessageSquareHeart class="w-3.5 h-3.5" />
            Doa & Ucapan
          </div>

          <form @submit.prevent="sendWish" class="space-y-5">
            <div>
              <label class="block text-[10px] tracking-widest uppercase text-swan-deep/30 mb-2">Nama</label>
              <input v-model="wishForm.name" type="text" placeholder="Nama lengkap Anda"
                     class="w-full px-5 py-4 rounded-2xl bg-[#F8FBFC]/60 border border-swan-gray/60 text-sm text-swan-deep placeholder:text-swan-deep/20 focus:outline-none focus:ring-2 focus:ring-swan-silver/30 transition-all">
            </div>
            <div>
              <label class="block text-[10px] tracking-widest uppercase text-swan-deep/30 mb-2">Pesan</label>
              <textarea v-model="wishForm.message" rows="4" placeholder="Tulis doa dan ucapan terbaik..."
                        class="w-full px-5 py-4 rounded-2xl bg-[#F8FBFC]/60 border border-swan-gray/60 text-sm text-swan-deep placeholder:text-swan-deep/20 focus:outline-none focus:ring-2 focus:ring-swan-silver/30 transition-all resize-none"></textarea>
            </div>
            <button type="submit"
                    class="w-full mt-2 py-4 bg-[#F0F7FA] text-swan-deep border border-swan-silver/20 rounded-2xl text-[10px] tracking-[0.4em] uppercase hover:bg-swan-deep hover:text-white transition-all flex items-center justify-center gap-2">
              Kirim via WhatsApp <ArrowUpRight class="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>
