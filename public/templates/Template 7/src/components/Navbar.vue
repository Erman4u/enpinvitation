<script setup lang="ts">
import { Home, Users, Heart, Image as ImageIcon, CheckCircle, Gift } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

const activeSection = ref('hero')

const updateActiveSection = () => {
  const sections = ['hero', 'couple', 'event', 'story', 'gallery', 'gift', 'rsvp']
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection.value = id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection()
})
</script>

<template>
  <nav class="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg">
    <div class="glass border border-white/50 px-4 md:px-8 py-3 rounded-full shadow-[0_20px_50px_rgba(183,110,121,0.2)] flex gap-2 md:gap-4 items-center justify-between">
      
      <a v-for="item in [
        { id: 'hero', icon: Home, label: 'Beranda' },
        { id: 'couple', icon: Users, label: 'Mempelai' },
        { id: 'event', icon: CheckCircle, label: 'Acara' },
        { id: 'gallery', icon: ImageIcon, label: 'Galeri' },
        { id: 'gift', icon: Gift, label: 'Kado' },
        { id: 'rsvp', icon: Heart, label: 'RSVP' }
      ]" 
      :key="item.id"
      :href="'#' + item.id" 
      class="relative flex flex-col items-center gap-1 group py-1 px-3 transition-all duration-300"
      :class="[activeSection === item.id ? 'text-rose-gold scale-110' : 'text-gray-400']"
      >
        <component :is="item.icon" class="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
        <span class="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-rose-gold text-white px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap">
          {{ item.label }}
        </span>
        
        <!-- Active Dot -->
        <div v-show="activeSection === item.id" class="absolute -bottom-1 w-1 h-1 bg-rose-gold rounded-full shadow-[0_0_8px_rgba(183,110,121,0.8)]"></div>
      </a>

    </div>
  </nav>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}
</style>
