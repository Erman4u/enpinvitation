<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Home, Users, Calendar, Image, MessageSquareHeart, Gift } from 'lucide-vue-next'

const navItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'couple', icon: Users, label: 'Couple' },
  { id: 'event', icon: Calendar, label: 'Event' },
  { id: 'gallery', icon: Image, label: 'Gallery' },
  { id: 'rsvp', icon: MessageSquareHeart, label: 'RSVP' },
  { id: 'gift', icon: Gift, label: 'Gift' }
]

const activeSection = ref('hero')

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2
  for (const item of navItems) {
    const el = document.getElementById(item.id)
    if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
      activeSection.value = item.id
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <Transition name="nav-slide" appear>
    <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] w-[90%] max-w-lg">
      <div class="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-[32px] px-4 py-3 flex items-center justify-between">
        <button 
          v-for="item in navItems" 
          :key="item.id"
          @click="scrollTo(item.id)"
          class="flex flex-col items-center gap-1 group transition-all duration-300"
          :class="activeSection === item.id ? 'text-swan-deep' : 'text-swan-deep/30'"
        >
          <div class="p-2 rounded-2xl transition-all duration-300"
               :class="activeSection === item.id ? 'bg-swan-blue/10 scale-110' : 'group-hover:bg-swan-gray group-hover:scale-105'">
            <component :is="item.icon" class="w-5 h-5" />
          </div>
          <span class="text-[8px] tracking-[0.2em] uppercase font-bold transition-opacity duration-300"
                :class="activeSection === item.id ? 'opacity-100' : 'opacity-0'">
            {{ item.label }}
          </span>
        </button>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
.nav-slide-enter-active {
  transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: 0.8s; /* Muncul saat Opening Scene mulai memudar secara transparan */
}

.nav-slide-enter-from {
  opacity: 0;
  /* Menggunakan translate(-50%, ...) untuk menjaga centering X yang ada di class tailwind */
  transform: translate(-50%, 100px);
}
</style>